const { valid_transactions } = require('./val_trxn.js');
// const { legacy_trxnid } = require('./trxnid_legacy.js');
const { segwit_trxnid } = require('./trxnid_segwit.js');
const { segwit_wtrxnid } = require('./wtxid_segwit.js');

//add a txid in front of the valid_transactions array

function txids_generator(transactions) {
    var txids_array = ["906e93a0165695146bf5686d21a8beb742c2da796ac5c8c8d70e17fa80d74451"];
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
