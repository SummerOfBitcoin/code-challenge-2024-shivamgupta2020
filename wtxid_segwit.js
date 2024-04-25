const { decimalToLittleEndian8, decimalToLittleEndian16, intToTwoCharString,sha256, hash256, bigToLittleEndian } = require('./utils.js');
const trxn = require('./mempool/0b23caae0dc80d697be1206fc7c652c6460425bff04a6b0a4a5cd5791e09a209.json')

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
        serialized += (output.scriptpubkey.length / 2).toString(16);
        serialized += output.scriptpubkey;
    })
    transaction.vin.forEach(input => {
        
        serialized += intToTwoCharString(input.witness.length);
        input.witness.forEach(wit => {
            serialized += ((wit.length) / 2).toString(16);
            serialized += wit;
        })
    })
    serialized += decimalToLittleEndian8(transaction.locktime)
    return serialized;
}

function segwit_wtrxnid(trxn) {
    const trxnid = ((hash256((wtrxnid_segwit(trxn)))));
    const trxnid_reverse = ((bigToLittleEndian(trxnid)));
    return trxnid;
}

function segwit_serialized_wtxid(trxn){
    const serialized = wtrxnid_segwit(trxn);
    return serialized;
}

// module.exports = {hash_trxn_segwit};
module.exports = {segwit_serialized_wtxid, segwit_wtrxnid};