const fs = require('fs');
const path = require('path');

// Function to read transaction data from JSON files in a directory
function readTransactionDataFromDirectory(directoryPath) {
    try {
        // Read all files in the directory
        const files = fs.readdirSync(directoryPath);

        // Array to store transaction data from all files
        const allTransactions = [];

        // Loop through each file
        files.forEach(file => {
            // Construct the full file path
            const filePath = path.join(directoryPath, file);

            // Read and parse transaction data from the file
            const transactionData = readTransactionData(filePath);

            // If transaction data is not null, add it to the array
            if (transactionData) {
                allTransactions.push(transactionData);
            }
        });

        return allTransactions;
    } catch (err) {
        console.error(`Error reading files from directory ${directoryPath}:`, err);
        return [];
    }
}

// Function to read transaction data from a JSON file
function readTransactionData(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(data);
        
        //read file name without extension
        const fileName = path.basename(filePath, '.json');
        const modifiedTxn = {
            version: parsedData.version,
            locktime: parsedData.locktime,
            filename: fileName,
            vin: [],
            vout: []
        };

        // Parse vin
        parsedData.vin.forEach(input => {
            const modifiedInput = {
                txid: input.txid,
                vout: input.vout,
                prevout: {
                    scriptpubkey: input.prevout.scriptpubkey,
                    scriptpubkey_asm: input.prevout.scriptpubkey_asm,
                    scriptpubkey_type: input.prevout.scriptpubkey_type,
                    scriptpubkey_address: input.prevout.scriptpubkey_address,
                    value: input.prevout.value
                },
                scriptsig: input.scriptsig,
                scriptsig_asm: input.scriptsig_asm,
                witness: input.witness,
                sequence: input.sequence
            };
            modifiedTxn.vin.push(modifiedInput);
        });

        // Parse vout
        parsedData.vout.forEach(output => {
            const modifiedOutput = {
                scriptpubkey: output.scriptpubkey,
                scriptpubkey_asm: output.scriptpubkey_asm,
                scriptpubkey_type: output.scriptpubkey_type,
                scriptpubkey_address: output.scriptpubkey_address,
                value: output.value
            };
            modifiedTxn.vout.push(modifiedOutput);
        });

        return modifiedTxn;
    } catch (err) {
        console.error(`Error reading or parsing file ${filePath}:`, err);
        return null;
    }
}

// Directory path containing JSON files
const directoryPath = 'mempool';

// Read transaction data from JSON files in the directory
// const allTransactions = readTransactionDataFromDirectory(directoryPath);
const allTransactions = readTransactionDataFromDirectory(directoryPath)


module.exports = allTransactions

