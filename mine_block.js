const {blockHeaderwithoutnounce, block} = require('./blockHeader.js');
const { decimalToLittleEndian8,bigToLittleEndian, hash256 } = require('./utils.js');


// Function to mine the block
function mineBlock() {
    let nonce = 0;
    while (true) {
        // Combine block header and nonce for hashing
        const data = blockHeaderwithoutnounce + decimalToLittleEndian8(nonce);
        // Calculate hash of the block header and nonce
        const hash = bigToLittleEndian(hash256(data));
        // Check if hash meets the difficulty target
        if (hash < block.difficultyTarget) {
            return data; // Return the valid nonce
        }
        nonce++; // Increment nonce for next attempt
    }
}



const minedBlock = mineBlock()
module.exports = {minedBlock}

// Mine the block
