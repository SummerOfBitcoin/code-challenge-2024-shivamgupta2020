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
            console.log("Block Mined! Nonce:", nonce);
            console.log("Block Hash:", hash);
            return nonce; // Return the valid nonce
        }
        nonce++; // Increment nonce for next attempt
    }
}

// Mine the block
mineBlock(blockHeader);
