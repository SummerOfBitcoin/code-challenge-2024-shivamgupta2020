const crypto = require('crypto');

const blockHeader = require('./block_header.js')

// Function to mine the block
function mineBlock(blockHeader) {
    let nonce = 0;
    while (true) {
        // Combine block header and nonce for hashing
        const data = JSON.stringify(blockHeader) + nonce;
        // Calculate hash of the block header and nonce
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        // Check if hash meets the difficulty target
        if (hash < blockHeader.difficultyTarget) {
            // console.log("Block Mined! Nonce:", nonce);
            // console.log("Block Hash:", hash);
            return hash; // Return the valid nonce
        }
        nonce++; // Increment nonce for next attempt
    }
}

// Mine the block
mineBlock(blockHeader);

const fs = require('fs');
const block_header = "01000000ab9e7165d4862c5129643ad6a6c5d173d21503d6c3ed671c7301000000000000996f96ddd10c297a8523d587a4d95c9cda31e8e5ddb096b6b7ec9b36ec559f998e412b515c98041a0771fb41"
function generateOutputFile(block_header, coinbaseTransaction, transactionIDs) {
    const outputContent = `${block_header}\n${coinbaseTransaction}\n${transactionIDs.join('\n')}`;

    fs.writeFile('output.txt', outputContent, (err) => {
        if (err) {
            console.error('Error writing to output.txt:', err);
        } else {
            // console.log('output.txt generated successfully.');
        }
    });
}

// Example usage:
const coinbaseTransaction = "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff29034e0105062f503253482f0472d35454085fffedf2400000f90f54696d652026204865616c7468202100000000012c374495000000001976a914a09be8040cbf399926aeb1f470c37d1341f3b46588ac00000000";
const transactionIDs = [
    "ff4ae0717d70d7fcabf663cf5a94c42595cc249ca31b30a895a634969136eb58",
];

generateOutputFile(block_header, coinbaseTransaction, transactionIDs);
