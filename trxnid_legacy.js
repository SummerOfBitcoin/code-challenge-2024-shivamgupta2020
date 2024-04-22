const { decimalToLittleEndian8, decimalToLittleEndian16, intToTwoCharString, hash256, bigToLittleEndian } = require('./utils.js');

function serialize_trxn_legacy(transaction) {
    var serialized = ""
    serialized += decimalToLittleEndian8(transaction.version);
    serialized += intToTwoCharString(transaction.vin.length);
    transaction.vin.forEach(input => {
        serialized += bigToLittleEndian(input.txid);
        serialized += decimalToLittleEndian8(input.vout);
        serialized += ((input.scriptsig.length) / 2).toString(16);
        serialized += input.scriptsig;
        serialized += input.sequence.toString(16);
    })
    serialized += intToTwoCharString(transaction.vout.length);
    transaction.vout.forEach(output => {
        serialized += decimalToLittleEndian16((output.value))
        serialized += (output.scriptpubkey.length / 2).toString(16);
        serialized += output.scriptpubkey;
    })
    serialized += decimalToLittleEndian8(transaction.locktime)
    return serialized;
}

function hash_trxn_legacy(trxn) {
    return hash256(serialize_trxn_legacy(trxn));
}

module.exports = {hash_trxn_legacy};