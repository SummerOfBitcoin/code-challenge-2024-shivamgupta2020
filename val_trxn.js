const allTransactions = require('./read_txn.js');
const crypto = require('crypto');
const { ecdsa_verify_p2wpkh } = require('./p2wpkh_message.js');

console.log(allTransactions.length);
function check_value(allTransactions) {
    allTransactions.forEach((transaction) => {
        let input_value = 0;
        let output_value = 0;
        transaction.vin.forEach((input) => {
            input_value += input.prevout.value;
        })

        transaction.vout.forEach((output) => {
            output_value += output.value;
        })

        if (input_value <= output_value) {
            allTransactions.splice(allTransactions.indexOf(transaction), 1);
        }
    })
}

function check_type(transaction) {
    for (let j = 1; j < transaction.vin.length; j++) {
        //check that each input has same type of scriptpubkey
        if (transaction.vin[j].prevout.scriptpubkey_type !== transaction.vin[0].prevout.scriptpubkey_type ) {
            return false;
        }
    }
    //check that each transction.vin has scriptpubkey_type = "v0_p2wpkh"
    if (transaction.vin[0].prevout.scriptpubkey_type !== "v0_p2wpkh") {
        return false;
    }

    return true;
}

check_value(allTransactions);


function validate_signature(allTransactions) {
    var valid = []
    allTransactions.forEach((transaction) => {
        if (check_type(transaction)) {
            if(ecdsa_verify_p2wpkh(transaction)) {
                valid.push(transaction);
            }
        }
    })
    return valid;
}

const valid_transactions = validate_signature(allTransactions);
console.log(valid_transactions.length);
module.exports = { valid_transactions };