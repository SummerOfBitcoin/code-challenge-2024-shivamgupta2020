const { valid_transactions } = require('./val_trxn.js');
const { hash_trxn_legacy } = require('./trxnid_legacy.js');
const { hash_trxn_segwit } = require('./trxnid_segwit.js');

//add a txid in front of the valid_transactions array

function txids_generator() {
    var txids_array = ["d1ef86f090dd46ff92fe96d20ce858d7d1efbb2b241196daad89142e58f3f3cd"];
    valid_transactions.forEach(transaction => {
        if (transaction.vin[0].prevout.scriptpubkey_type === "p2pkh") {

            txids_array.push(hash_trxn_legacy(transaction));
        }
        else if (transaction.vin[0].prevout.scriptpubkey_type === "v0_p2wpkh") {
            if (hash_trxn_segwit(transaction) !== false) {
                txids_array.push(hash_trxn_segwit(transaction));
            }
            else {
                valid_transactions.splice(valid_transactions.indexOf(transaction), 1);
            }
        }
        else {
            valid_transactions.splice(valid_transactions.indexOf(transaction), 1);
        }
    });
    return txids_array;
}

const txids = txids_generator(valid_transactions);

module.exports = txids ;
