const { valid_transactions } = require('./val_trxn.js');
// const { legacy_trxnid } = require('./trxnid_legacy.js');
const { segwit_trxnid } = require('./trxnid_segwit.js');
const { segwit_wtrxnid } = require('./wtxid_segwit.js');

//add a txid in front of the valid_transactions array

function txids_generator() {
    var txids_array = ["6662db25837bc91af55bc16e85b9d61acc0e34e53d64a48ed1472c0b0b818327"];
    valid_transactions.forEach(transaction => {
        {
            txids_array.push(segwit_trxnid(transaction));
        }
    });
    return txids_array;
}

function wtxids_generator(){
    var wtxids_array = []
    valid_transactions.forEach(transaction => {
        {
            wtxids_array.push(segwit_wtrxnid(transaction));
        }
    });
    return wtxids_array;
}

const txids = txids_generator(valid_transactions);
const wtxids = wtxids_generator(valid_transactions);
module.exports = { txids,wtxids};
