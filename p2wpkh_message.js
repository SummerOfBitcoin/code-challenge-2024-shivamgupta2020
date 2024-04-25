const { decimalToLittleEndian8, decimalToLittleEndian16, hash256, intTo16CharHexString, intToTwoCharString, bigToLittleEndian } = require('./utils.js');
const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
// const transaction = require('./mempool/0bfa0482c989e84f5d83e338cff2adaa9bd0bb99e4e276ed7dc913be76f8c543.json')
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
        sequence += bigToLittleEndian(inputs[i].sequence.toString(16));
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
        output += intToTwoCharString(outputs[i].scriptpubkey.length/2);
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
      const hash256Msg = hash256(message)
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

module.exports = {ecdsa_verify_p2wpkh}