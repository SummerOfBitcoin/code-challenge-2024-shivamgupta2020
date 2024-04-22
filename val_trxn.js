const allTransactions = require('./read_txn.js');
const crypto = require('crypto');
const {bigToLittleEndian} = require('./utils.js');

const {ecdsa_verify_p2pkh} = require('./p2pkh_message.js');
const {ecdsa_verify_p2wpkh} = require('./p2wpkh_message.js');
// console.log(allTransactions.length);

//check if the transaction id is present in the UTXO set
function check_txid_utxo(allTransactions) {
    const txid = [];
    allTransactions.forEach((transaction) => {
        transaction.vin.forEach((input) => {
            //txid array is populated with sha256 hash of the transaction id
            txid.push(crypto.createHash('sha256').update(input.txid).digest('hex'));
        })
    })

    const hash_trxn_id = [];

    allTransactions.forEach((transaction) => {
        //hash_trxn_id array is populated with file name
        hash_trxn_id.push(transaction.filename);
    })

    //check if trxn id is present in the hash_trxn_id array, if not present then remove the transaction from the allTransactions array
    for (let i = 0; i < txid.length; i++) {
        if (!hash_trxn_id.includes(txid[i])) {
            allTransactions.splice(i, 1);
        }
        else {
            //checks for double spend
            if (txid.indexOf(txid[i]) !== txid.lastIndexOf(txid[i])) {
                allTransactions.splice(i, 1);
            }
        }
    }
}


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

        if (input_value < output_value) {
            allTransactions.splice(allTransactions.indexOf(transaction), 1);
        }
    })
}

function check_p2pkh(str, str1, address) {
    const syntax = /OP_DUP OP_HASH160 OP_PUSHBYTES_20 ([0-9a-f]{40}) OP_EQUALVERIFY OP_CHECKSIG/;
    const match = str.match(syntax);
    const pattern = /\b[0-9a-f]{40}\b/g;
    const hexStrings = str.match(pattern);
    const req_scriptpubkey = "76a914" + hexStrings[0] + "88ac"
    const address_created = utils.createAddress_p2pkh(hexStrings[0]);
    if (match && req_scriptpubkey === str1 && address_created === address) {
        return true; // Group 1 contains the public key hash
    } else {
        return false; // Return null if no match found
    }
}

function check_p2sh(str, str1, address) {
    const syntax = /^OP_HASH160 OP_PUSHBYTES_20 [0-9a-f]{40} OP_EQUAL$/;
    const match = str.match(syntax);
    const pattern = /\b[0-9a-f]{40}\b/g;
    const hexStrings = str.match(pattern);
    const req_scriptpubkey = "a914" + hexStrings[0] + "87"
    const address_created = utils.createAddress_p2sh(hexStrings[0]);
    if (match && req_scriptpubkey === str1 && address_created === address) {
        return true; // Group 1 contains the public key hash
    } else {
        return false; // Return null if no match found
    }

}

function check_p2wpkh(str, str1) {
    const syntax = /^OP_0 OP_PUSHBYTES_20 [0-9a-f]{40}$/;
    const match = str.match(syntax);
    const pattern = /\b[0-9a-f]{40}\b/g;
    const hexStrings = str.match(pattern);
    const req_scriptpubkey = "0014" + hexStrings[0]
    if (match && req_scriptpubkey === str1) {
        return true; // Group 1 contains the public key hash
    } else {
        return false; // Return null if no match found
    }
}

function check_p2wsh(str, str1) {
    const syntax = /^OP_0 OP_PUSHBYTES_32 [0-9a-f]{64}$/;
    const match = str.match(syntax);
    const pattern = /\b[0-9a-f]{64}\b/g;
    const hexStrings = str.match(pattern);
    const req_scriptpubkey = "0020" + hexStrings[0]
    if (match && req_scriptpubkey === str1) {
        return true; // Group 1 contains the public key hash
    } else {
        return false; // Return null if no match found
    }
}

function check_p2tr(str, str1) {
    const syntax = /^OP_1 OP_PUSHBYTES_32 [0-9a-f]{64}$/;
    const match = str.match(syntax);
    const pattern = /\b[0-9a-f]{64}\b/g;
    const hexStrings = str.match(pattern);
    const req_scriptpubkey = "5120" + hexStrings[0]
    if (match && req_scriptpubkey === str1) {
        return true; // Group 1 contains the public key hash
    } else {
        return false; // Return null if no match found
    }
}



function check_input_format(allTransactions) {
    allTransactions.forEach((transaction) => {
        transaction.vin.forEach((input) => {
            //p2pkh
            if (input.prevout.scriptpubkey_type === "p2pkh") {
                if (!check_p2pkh(input.prevout.scriptpubkey_asm, input.prevout.scriptpubkey, input.prevout.address)) {
                    allTransactions.splice(allTransactions.indexOf(transaction), 1);
                    return;
                }

            }
            //p2sh
            else if (input.prevout.scriptpubkey_type === "p2sh") {
                if (!check_p2sh(input.prevout.scriptpubkey_asm), input.prevout.scriptpubkey, input.prevout.address) {
                    allTransactions.splice(allTransactions.indexOf(transaction), 1);
                    //exit from the loop
                    return;
                }
            }
            //p2wpkh
            else if (input.prevout.scriptpubkey_type === "v0_p2wpkh") {
                if (!check_p2wpkh(input.prevout.scriptpubkey_asm, input.prevout.scriptpubkey)) {
                    allTransactions.splice(allTransactions.indexOf(transaction), 1);
                    //exit from the loop
                    return;
                }
            }
            //p2wsh
            else if (input.prevout.scriptpubkey_type === "v0_p2wsh") {
                if (!check_p2wsh(input.prevout.scriptpubkey_asm, input.prevout.scriptpubkey)) {
                    allTransactions.splice(allTransactions.indexOf(transaction), 1);
                    //exit from the loop
                    return;
                }
            }
            //p2tr
            else if (input.prevout.scriptpubkey_type === "v1_p2tr") {
                if (!check_p2tr(input.prevout.scriptpubkey_asm, input.prevout.scriptpubkey)) {
                    allTransactions.splice(allTransactions.indexOf(transaction), 1);
                    //exit from the loop
                    return;
                }
            }
            else {
                allTransactions.splice(allTransactions.indexOf(transaction), 1);
                //exit from the loop
                return;
            }
        })
    })
}

function check_type(transaction) {
    for (let j = 1; j < transaction.vin.length; j++) {
        //check that each input has same type of scriptpubkey
        if (transaction.vin[j].prevout.scriptpubkey_type !== transaction.vin[j-1].prevout.scriptpubkey_type || transaction.vin[j].prevout.scriptpubkey_type === "p2sh" || transaction.vin[j].prevout.scriptpubkey_type === "v0_p2wsh" || transaction.vin[j].prevout.scriptpubkey_type === "v1_p2tr") {
            return false;
        }
    }
    return true;
}


function validate_signature(allTransactions) {
    allTransactions.forEach((transaction) => {
        if (check_type(transaction)) {
            if (transaction.vin[0].prevout.scriptpubkey_type === "p2pkh") {
                if (!ecdsa_verify_p2pkh(transaction)) {
                    allTransactions.splice(allTransactions.indexOf(transaction), 1);
                }
            }
            else if (transaction.vin[0].prevout.scriptpubkey_type === "v0_p2wpkh") {
                if (!ecdsa_verify_p2wpkh(transaction)) {
                    allTransactions.splice(allTransactions.indexOf(transaction), 1);
                }
            }
            else{
                allTransactions.splice(allTransactions.indexOf(transaction), 1);
            }
        }
        else {
            allTransactions.splice(allTransactions.indexOf(transaction), 1);
        }
    })
}

    check_txid_utxo(allTransactions)
    check_value(allTransactions)
    // check_input_format(allTransactions)
    validate_signature(allTransactions)

const valid_transactions = allTransactions;
module.exports = {valid_transactions};