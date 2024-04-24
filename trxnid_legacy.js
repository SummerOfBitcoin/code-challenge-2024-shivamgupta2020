const { decimalToLittleEndian8, decimalToLittleEndian16, intToTwoCharString, hash256, sha256, bigToLittleEndian } = require('./utils.js');

function legacy_serialized(transaction) {
    var serialized = ""
    serialized += decimalToLittleEndian8(transaction.version);
    serialized += intToTwoCharString(transaction.vin.length);
    transaction.vin.forEach(input => {
        serialized += bigToLittleEndian(input.txid);
        serialized += decimalToLittleEndian8(input.vout);
        serialized += ((input.scriptsig.length) / 2).toString(16);
        serialized += input.scriptsig;
        serialized += bigToLittleEndian(input.sequence.toString(16));
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

function legacy_trxnid(trxn) {
    const trxnid = ((hash256((legacy_serialized(trxn)))));
    const trxnid_reverse = (bigToLittleEndian(trxnid));
    const trxn_filename = sha256(trxnid_reverse);
    return trxnid_reverse;
}


module.exports = { legacy_trxnid, legacy_serialized};


