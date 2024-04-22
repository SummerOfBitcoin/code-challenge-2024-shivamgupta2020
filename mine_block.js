const crypto = require('crypto');
const { decimalToLittleEndian8, decimalToLittleEndian16, intToTwoCharString, decimalToLittleEndianInt16, bigToLittleEndian } = require('./utils.js');


const block = require('./blockHeader.js');
const { create } = require('domain');


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


function createBlockHeader(block){
    var blockHeader = ""
    blockHeader += decimalToLittleEndian8(block.version);
    blockHeader += (block.previousBlockHash);
    blockHeader += bigToLittleEndian(block.merkleRootHash);
    blockHeader += decimalToLittleEndian8(block.timestamp.toString(16));
    blockHeader += "1f00ffff"
    blockHeader += decimalToLittleEndian8(mineBlock(block));
    return blockHeader;
}
/*
07000000
0000000000000000000000000000000000000000000000000000000000000000
c16bcf5d8c955166695eec0a1d4891b2887d2b1856938cbc4866390535742771
11e91f66
ffff001f
6c380100
*/


// Mine the block
module.exports = createBlockHeader(block);