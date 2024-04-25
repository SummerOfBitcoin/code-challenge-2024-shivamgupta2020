const { decimalToLittleEndian8, decimalToLittleEndian16, intToTwoCharString,sha256, hash256, bigToLittleEndian } = require('./utils.js');

function wtrxnid_segwit(transaction) {
    var serialized = ""
    serialized += decimalToLittleEndian8(transaction.version);
    serialized += "0001"
    serialized += intToTwoCharString(transaction.vin.length);
    transaction.vin.forEach(input => {
        serialized += bigToLittleEndian(input.txid);
        serialized += decimalToLittleEndian8(input.vout);
        serialized += intToTwoCharString(input.scriptsig.length / 2);
        serialized += bigToLittleEndian(input.sequence.toString(16));
    })
    serialized += intToTwoCharString(transaction.vout.length);
    transaction.vout.forEach(output => {
        serialized += decimalToLittleEndian16((output.value))
        serialized += intToTwoCharString(output.scriptpubkey.length / 2);
        serialized += output.scriptpubkey;
    })
    transaction.vin.forEach(input => {
        serialized += intToTwoCharString(input.witness.length);
        input.witness.forEach(wit => {
            serialized += intToTwoCharString((wit.length) / 2);
            serialized += wit;
        })
    })
    serialized += decimalToLittleEndian8(transaction.locktime)
    return serialized;
}

function segwit_wtrxnid(trxn) {
    const wtrxnid = ((hash256((wtrxnid_segwit(trxn)))));
    const wtrxnid_reverse = ((bigToLittleEndian(wtrxnid)));
    return wtrxnid_reverse;
}

// module.exports = {hash_trxn_segwit};
module.exports = {segwit_wtrxnid};