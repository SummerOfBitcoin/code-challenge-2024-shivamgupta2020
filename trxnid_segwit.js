const { decimalToLittleEndian8, decimalToLittleEndian16, intToTwoCharString, hash256, bigToLittleEndian } = require('./utils.js');

function serialize_trxn_segwit(transaction) {
    var serialized = ""
    serialized += decimalToLittleEndian8(transaction.version);
    serialized += intToTwoCharString(transaction.vin.length);
    transaction.vin.forEach(input => {
        serialized += bigToLittleEndian(input.txid);
        serialized += decimalToLittleEndian8(input.vout);
        serialized += "00"
        serialized += input.sequence.toString(16);
    })
    serialized += intToTwoCharString(transaction.vout.length);
    transaction.vout.forEach(output => {
        serialized += decimalToLittleEndian16((output.value))
        serialized += (output.scriptpubkey.length / 2).toString(16);
        serialized += output.scriptpubkey;
    })
    transaction.vin.forEach(input => {
        serialized += "02"
        if(typeof input.witness === 'undefined' || input.witness.length !== 2) {
            return "Invalid witness length"
        }
        serialized += ((input.witness[0].length) / 2).toString(16);
        serialized += input.witness[0];
        serialized += ((input.witness[1].length) / 2).toString(16);
        serialized += input.witness[1];
    })
    serialized += decimalToLittleEndian8(transaction.locktime)
    return serialized;
}

function hash_trxn_segwit(trxn) {
    if(serialize_trxn_segwit(trxn) === "Invalid witness length") {
        return false
    }
    return hash256(serialize_trxn_segwit(trxn));
}

module.exports = {hash_trxn_segwit};