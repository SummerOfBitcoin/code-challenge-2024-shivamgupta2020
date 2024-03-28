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
const blockHashReversed = mineBlock(blockHeader);

const fs = require('fs');

function generateOutputFile(blockHashReversed, coinbaseTransaction, transactionIDs) {
    const outputContent = `${blockHashReversed}\n${coinbaseTransaction}\n${transactionIDs.join('\n')}`;

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

generateOutputFile(blockHashReversed, coinbaseTransaction, transactionIDs);
