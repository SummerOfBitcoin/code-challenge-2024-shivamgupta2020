const { valid_transactions } = require('./val_trxn.js');
// const { legacy_trxnid } = require('./trxnid_legacy.js');
const { segwit_trxnid } = require('./trxnid_segwit.js');
const { segwit_wtrxnid } = require('./wtxid_segwit.js');

//add a txid in front of the valid_transactions array

function txids_generator(transactions) {
    var txids_array = ["d9758e0654dd678db4d875b606a5992a8e66cdf9cc8396c50e40b44a793292d8"];
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
