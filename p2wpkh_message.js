const { decimalToLittleEndian8, decimalToLittleEndian16, hash256, intTo16CharHexString, intToTwoCharString, bigToLittleEndian } = require('./utils.js');
const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
// working for sngle input

function hashInputs(inputs){
    var input = ""
    for (let i = 0; i < inputs.length; i++) {
        input += bigToLittleEndian(inputs[i].txid);
        input += decimalToLittleEndian8(inputs[i].vout);
    }
    return hash256(input);
}
function Input(array){
    var input = ""
    input += bigToLittleEndian(array.txid);
    input += decimalToLittleEndian8(array.vout);
    return (input);
}

function hashSequence(inputs){
    var sequence = ""
    for (let i = 0; i < inputs.length; i++) {
        sequence += inputs[i].sequence.toString(16);
    }
    return hash256(sequence);
}


function scriptCodeGenerator(input){
    var scriptCode = "1976a914";
    scriptCode+= input.prevout.scriptpubkey.slice(4, input.prevout.scriptpubkey.length);
    scriptCode+= "88ac";
    return scriptCode;
}
function hashOutputs(outputs){
    var output = ""
    for (let i = 0; i < outputs.length; i++) {
        output += decimalToLittleEndian16(outputs[i].value);
        output += (outputs[i].scriptpubkey.length/2).toString(16);
        output += outputs[i].scriptpubkey;
    }
    return hash256(output);
}

function create_message(transaction){
    var preImages = [];
    for (let i = 0; i < transaction.vin.length; i++) {
        var preImage = "";
        preImage += decimalToLittleEndian8(transaction.version);
        preImage += hashInputs(transaction.vin);
        preImage += hashSequence(transaction.vin);
        preImage += Input(transaction.vin[i]);
        preImage += scriptCodeGenerator(transaction.vin[i]);
        preImage += decimalToLittleEndian16(transaction.vin[i].prevout.value);
        preImage += decimalToLittleEndian8(transaction.vin[i].sequence);
        preImage += hashOutputs(transaction.vout);
        preImage += decimalToLittleEndian8(transaction.locktime);
        preImage += "01000000"
        preImages.push(preImage);
    }
    return preImages;
}


function ecdsa_verify_p2wpkh(transaction) {
    const messages = create_message(transaction);
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i]
      const sha256Msg = crypto.createHash('sha256').update(Buffer.from(message, 'hex')).digest('hex');
      const hash256Msg = crypto.createHash('sha256').update(Buffer.from(sha256Msg, 'hex')).digest('hex');
      // signature in hex format
      const publicKeyHex = transaction.vin[i].witness[1]
      const signature = transaction.vin[i].witness[0].slice(0, -2)

      const publicKey = ec.keyFromPublic(publicKeyHex, 'hex')
      //return false if verification fails
      if (!publicKey.verify(hash256Msg, signature)) {
        return false;
      }
    }
    return true
  }
/*
01000000
7200d0a4f4d71b73306147f6e62b045178354efc11d84ef9cabb9a2d9b59c6b0
3bb13029ce7b1f559ef5e747fcac439f1455a2ec7c5f09b72290795e70665044
c7a1682bdf54913a4d825b4f1b79ae9c3ad0638cb70ed4e60cab88ab39a5de2601000000
1976a914d817581d6c580afe261df66d2e2d5e8b809cd9f988ac
2349aa0200000000
ffffffff
5ce9a8aba8c687ae235f2630d8526e249b5e38e9cca8d04865a52440c37afd61
00000000
01000000
*/
module.exports = {ecdsa_verify_p2wpkh}