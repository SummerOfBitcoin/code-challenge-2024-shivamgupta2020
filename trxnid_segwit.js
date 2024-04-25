const { decimalToLittleEndian8, decimalToLittleEndian16, intToTwoCharString,sha256, hash256, bigToLittleEndian } = require('./utils.js');

function trxnid_segwit(transaction) {
    var serialized = ""
    serialized += decimalToLittleEndian8(transaction.version);
    // serialized += "0001"
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
        serialized += intToTwoCharString(output.scriptpubkey.length / 2)
        serialized += output.scriptpubkey;
    })
    // serialized += intToTwoCharString(input.witness.length);
    // transaction.vin.forEach(input => {
    //     input.witness.forEach(wit => {
    //         serialized += ((wit.length) / 2).toString(16);
    //         serialized += wit;
    //     })
    // })
    serialized += decimalToLittleEndian8(transaction.locktime)
    return serialized;
}

function serialize_trxn_segwit(transaction) {
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

function segwit_trxnid(trxn) {
    const trxnid = ((hash256((trxnid_segwit(trxn)))));
    const trxnid_reverse = ((bigToLittleEndian(trxnid)));
    const trxn_filename = sha256(trxnid_reverse);
    return trxnid_reverse;
}

function segwit_serialized(trxn){
    const serialized = serialize_trxn_segwit(trxn);
    return serialized;
}
module.exports = {segwit_serialized, segwit_trxnid};