const allTransactions = require('./read_txn.js');
const crypto = require('crypto');
const { ecdsa_verify_p2wpkh } = require('./p2wpkh_message.js');

const fs = require('fs');
const path = require('path');
const { sha256 } = require('./utils.js');
const { segwit_trxnid } = require('./trxnid_segwit.js');

function readMempoolFiles(folderPath) {
    // Check if the folder path exists
    if (!fs.existsSync(folderPath)) {
        console.error(`Folder "${folderPath}" does not exist.`);
        return [];
    }

    try {
        // Read the contents of the folder
        const files = fs.readdirSync(folderPath);
        
        // Filter out only the files (excluding directories)
        const fileNames = files.filter(file => fs.statSync(path.join(folderPath, file)).isFile());
        
        // Remove the last 5 characters from each filename
        const modifiedFileNames = fileNames.map(fileName => fileName.slice(0, -5)); // Remove the last 5 characters
        
        // Return the array of modified file names
        return modifiedFileNames;
    } catch (error) {
        console.error(`Error reading files from "${folderPath}":`, error);
        return [];
    }
}

// Example usage:
const folderPath = './mempool'; // Update the path to your mempool folder
const filesInMempool = readMempoolFiles(folderPath);


console.log(allTransactions.length);
function check_value(allTransactions) {
    var fee = 0;
    valid_transactions.forEach((transaction) => {
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
        else {
            fee += input_value - output_value;
        }

    })
    return fee;
}

function check_type(transaction) {
    for (let j = 1; j < transaction.vin.length; j++) {
        //check that each input has same type of scriptpubkey
        if (transaction.vin[j].prevout.scriptpubkey_type !== transaction.vin[0].prevout.scriptpubkey_type) {
            return false;
        }
    }
    //check that each transction.vin has scriptpubkey_type = "v0_p2wpkh"
    if (transaction.vin[0].prevout.scriptpubkey_type !== "v0_p2wpkh") {
        return false;
    }

    return true;
}


function validate_signature(allTransactions) {
    var valid = []
    allTransactions.forEach((transaction) => {
        if (check_type(transaction) && ecdsa_verify_p2wpkh(transaction) && filesInMempool.includes(sha256(segwit_trxnid(transaction)))) {{
                valid.push(transaction);
            }
        }
    })
    return valid;
}


const valid_transactions = validate_signature(allTransactions);
module.exports = { valid_transactions };
const fee = check_value(allTransactions);
console.log(fee);
console.log(valid_transactions.length);