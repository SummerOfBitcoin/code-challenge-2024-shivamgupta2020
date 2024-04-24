const crypto = require('crypto');
const {wtxids} = require('./txids_generator.js');
const { hash256 } = require('./utils.js');


function buildMerkleTree(transaction) {
    transaction.unshift("0000000000000000000000000000000000000000000000000000000000000000");

    function computeMerkleRoot(hashes) {
        if (hashes.length === 1) {
            return hashes[0];
        }

        if (hashes.length % 2 !== 0) {
            hashes.push(hashes[hashes.length - 1]);
        }

        const newHashes = [];

        for (let i = 0; i < hashes.length; i += 2) {
            const concatenatedHash = hashes[i] + hashes[i + 1];
            const newHash = hash256(concatenatedHash);
            newHashes.push(newHash);
        }

        // Recursively compute the Merkle root hash with the new hashes
        return computeMerkleRoot(newHashes);
    }
    const merkleRoot = computeMerkleRoot(transaction);
    return merkleRoot;
}

const merkleRoot_wtxid = buildMerkleTree(wtxids);
module.exports = {merkleRoot_wtxid}
