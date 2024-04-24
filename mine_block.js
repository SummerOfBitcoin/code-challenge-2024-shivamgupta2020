const crypto = require('crypto');
const {blockHeaderwithoutnounce, block} = require('./blockHeader.js');
const { decimalToLittleEndian8 } = require('./utils.js');


// Function to mine the block
function mineBlock() {
    let nonce = 0;
    while (true) {
        // Combine block header and nonce for hashing
        const data = blockHeaderwithoutnounce + decimalToLittleEndian8(nonce);
        // Calculate hash of the block header and nonce
        const sha256data = crypto.createHash('sha256').update(data).digest('hex');
        const hash = crypto.createHash('sha256').update(sha256data).digest('hex');
        // Check if hash meets the difficulty target
        if (hash < block.difficultyTarget) {
            return data; // Return the valid nonce
        }
        nonce++; // Increment nonce for next attempt
    }
}



const minedBlock = mineBlock()
module.exports = {minedBlock}
// console.log(mineBlock())
/*

07000000
0000000000000000000000000000000000000000000000000000000000000000
c16bcf5d8c955166695eec0a1d4891b2887d2b1856938cbc4866390535742771
11e91f66
ffff001f
6c380100
*/

// Mine the block
