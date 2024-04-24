const { create } = require('domain');
const { decimalToLittleEndian8, decimalToLittleEndian16, intToTwoCharString, decimalToLittleEndianInt16, bigToLittleEndian } = require('./utils.js');
const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
//working for sngle input
// function create_message(transaction){
//     var message = "";
//     message += decimalToLittleEndian8(transaction.version);
//     message += intToTwoCharString(transaction.vin.length);
//     transaction.vin.forEach(input => {
//       message += bigToLittleEndian(input.txid);
//       message += decimalToLittleEndian8(input.vout);
//       message += ((input.prevout.scriptpubkey.length)/2).toString(16);
//       message += input.prevout.scriptpubkey;
//       message += input.sequence.toString(16);
//     })
//     message += intToTwoCharString(transaction.vout.length);
//     transaction.vout.forEach(output =>{
//         message += decimalToLittleEndian16((output.value))
//         message += (output.scriptpubkey.length/2).toString(16);
//         message += output.scriptpubkey;
//     })
//     message += decimalToLittleEndian8(transaction.locktime)
//     message += "01000000"
//     return message
// }

//working for multiple inputs
function create_messages(transaction) {
  var messages = []
  for (let i = 0; i < transaction.vin.length; i++) {
    var message = "";
    message += decimalToLittleEndian8(transaction.version);
    message += intToTwoCharString(transaction.vin.length);
    for (let j = 0; j < transaction.vin.length; j++) {
      if (j === i) {
        message += bigToLittleEndian(transaction.vin[j].txid);
        message += decimalToLittleEndian8(transaction.vin[j].vout);
        message += ((transaction.vin[j].prevout.scriptpubkey.length) / 2).toString(16);
        message += transaction.vin[j].prevout.scriptpubkey;
        message += transaction.vin[j].sequence.toString(16);
      } else {
        message += bigToLittleEndian(transaction.vin[j].txid);
        message += decimalToLittleEndian8(transaction.vin[j].vout);
        message += "00";
        message += transaction.vin[j].sequence.toString(16);
      }
    }
    message += intToTwoCharString(transaction.vout.length);
    transaction.vout.forEach(output => {
      message += decimalToLittleEndian16((output.value))
      message += (output.scriptpubkey.length / 2).toString(16);
      message += output.scriptpubkey;
    })
    message += decimalToLittleEndian8(transaction.locktime)
    message += "01000000"
    messages.push(message)
  }
  return messages
}
// console.log(create_messages(transaction))
// messages is an array of messages
function ecdsa_verify_p2pkh(transaction) {
  const messages = create_messages(transaction)
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i]
    const sha256Msg = crypto.createHash('sha256').update(Buffer.from(message, 'hex')).digest('hex');
    const hash256Msg = crypto.createHash('sha256').update(Buffer.from(sha256Msg, 'hex')).digest('hex');
    // signature in hex format
    const publicKeyHex = transaction.vin[i].scriptsig_asm.split(' ')[3]
    const signature = transaction.vin[i].scriptsig_asm.split(' ')[1].slice(0, -2)
    const publicKey = ec.keyFromPublic(publicKeyHex, 'hex')
    //return false if verification fails
    if (!publicKey.verify(hash256Msg, signature)) {
      return false
    }
  }
  return true
}

//working fucntion=----------------------------
// const message = create_message(transaction)
// console.log("message:", message)
// const sha256Msg = crypto.createHash('sha256').update(Buffer.from(message, 'hex')).digest('hex');
// const hash256Msg = crypto.createHash('sha256').update(Buffer.from(sha256Msg, 'hex')).digest('hex');
// console.log("hash256Msg:",hash256Msg)
// // signature in hex format
// const publicKeyHex = "025f0ba0cdc8aa97ec1fffd01fac34d3a7f700baf07658048263a2c925825e8d33"
// const signature = '30440220200b9a61529151f9f264a04e9aa17bb6e1d53fb345747c44885b1e185a82c17502200e41059f8ab4d3b3709dcb91b050c344b06c5086f05598d62bc06a8b746db429'
// const publicKey = ec.keyFromPublic(publicKeyHex,'hex')
// console.log(publicKey.verify(hash256Msg, signature)) // true


module.exports = {ecdsa_verify_p2pkh}