const blockHeader = require('./mine_block.js');
const coinbase = require('./coinbase_transaction.js');
const txids = require('./txids_generator.js');
const {bigToLittleEndian} = require('./utils.js');

const fs = require('fs');

// Sample array
const array1 = [blockHeader, coinbase];
//convert each element of the txids array to a little endian
const array2 = txids.map(txid => bigToLittleEndian(txid));
const array = array1.concat(array2);
// File path
const filePath = 'output.txt';

// Convert array to string with line breaks
const content = array.join('\n');

// Write content to file
fs.writeFile(filePath, content, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File saved successfully:', filePath);
    }
});
