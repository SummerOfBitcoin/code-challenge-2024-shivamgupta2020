const {txids} = require('./txids_generator.js');
const {sha256} = require('./utils.js');


const fs = require('fs');
const path = require('path');

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


function check(transactions) {
    //hash each txid in the txids array
    transactions.forEach((txid) => {
        const hash = sha256(txid);
        if(!filesInMempool.includes(hash)){
            console.log(txid);
        }
    });
}

check(txids);