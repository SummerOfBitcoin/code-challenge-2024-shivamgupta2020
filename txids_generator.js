const { valid_transactions } = require('./val_trxn.js');
const { legacy_trxnid } = require('./trxnid_legacy.js');
const { segwit_trxnid } = require('./trxnid_segwit.js');
const { segwit_wtrxnid } = require('./wtxid_segwit.js');

//add a txid in front of the valid_transactions array

function txids_generator() {
    var txids_array = ["dc21d703be0b88a92e74c7e9bdd7af1b0922421872a9f06cbafdd0a535e624f1"];
    valid_transactions.forEach(transaction => {
        if (transaction.vin[0].prevout.scriptpubkey_type === "p2pkh") {
            txids_array.push(legacy_trxnid(transaction));
        }
        else if(transaction.vin[0].prevout.scriptpubkey_type === "p2sh"){
            valid_transactions.splice(valid_transactions.indexOf(transaction), 1);
        }
        else {
            txids_array.push(segwit_trxnid(transaction));
        }
    });
    return txids_array;
}

function wtxids_generator(){
    var wtxids_array = []
    valid_transactions.forEach(transaction => {
        if (transaction.vin[0].prevout.scriptpubkey_type === "p2pkh") {
            wtxids_array.push(legacy_trxnid(transaction));
        }
        else{
            wtxids_array.push(segwit_wtrxnid(transaction));
        }
    });
    return wtxids_array;
}

// const txids = txids_generator(valid_transactions);
const txids = ["33808454bed042d7a813d094db293c9a7920eee07492b26930a0e6dffbc3dfbc"]
// const wtxids = wtxids_generator(valid_transactions);
module.exports = { txids};
