const {minedBlock} = require('./mine_block.js');
const {final_serialized} = require('./coinbase_transaction.js');
const {txids} = require('./txids_generator.js');

const fs = require('fs');
const { bigToLittleEndian } = require('./utils.js');

// Sample array
const array1 = [minedBlock, final_serialized];
//convert each element of the txids array to a little endian
const array2 = txids;
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

// const filePath1 = 'output1.txt';
// const array3 = txids.map((txid) => {
//     return bigToLittleEndian(txid);
// });
// const content1 = array3.join('\n');
// // Write content to file
// fs.writeFile(filePath1, content1, (err) => {
//     if (err) {
//         console.error('Error writing file:', err);
//     } else {
//         console.log('File saved successfully:', filePath1);
//     }
// });
