const {txids} = require('./txids_generator.js');
const { hash256, bigToLittleEndian } = require('./utils.js');

function buildMerkleTree(transaction) {
    
    function computeMerkleRoot(txids) {
        // Exit Condition: Stop recursion when we have one hash result left
        if (txids.length === 1) {
            // Convert the result to a string and return it
            return txids.join('');
        }
    
        // Keep an array of results
        const result = [];
    
        // 1. Split up array of hashes into pairs
        for (let i = 0; i < txids.length; i += 2) {
            // 2a. Concatenate each pair
            const one = txids[i];
            const two = txids[i + 1] || one; // If there's no second element, duplicate the first
            const concat = one + two;
    
            // 3. Hash the concatenated pair and add to results array
            result.push(hash256(concat));
        }
    
        // Recursion: Do the same thing again for these results
        return computeMerkleRoot(result);
    }
    const merkleRoot = computeMerkleRoot(transaction); //transaction in natural order
    return merkleRoot;
}

const merkleRootTxid = buildMerkleTree(txids); 
module.exports = {merkleRootTxid}