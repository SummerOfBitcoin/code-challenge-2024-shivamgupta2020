const { valid_transactions } = require('./val_trxn.js');
// const { legacy_trxnid } = require('./trxnid_legacy.js');
const { segwit_trxnid } = require('./trxnid_segwit.js');
const { segwit_wtrxnid } = require('./wtxid_segwit.js');

//add a txid in front of the valid_transactions array

function txids_generator(transactions) {
    var txids_array = ["3adddda141e970223ee28a7d063f65071a5b896efa40ae00552120a0475a817f"];
    transactions.forEach(transaction => {
        {
            txids_array.push(segwit_trxnid(transaction));
        }
    });
    return txids_array;
}

function wtxids_generator(transactions){
    var wtxids_array = ["0000000000000000000000000000000000000000000000000000000000000000"]
    transactions.forEach(transaction => {
        {
            wtxids_array.push(segwit_wtrxnid(transaction));
        }
    });
    return wtxids_array;
}

const txids = txids_generator(valid_transactions);
const wtxids = wtxids_generator(valid_transactions);
module.exports = {txids, wtxids};
