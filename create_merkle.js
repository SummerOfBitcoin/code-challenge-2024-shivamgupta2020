const crypto = require('crypto');
const transactions = require('./txids_generator.js');

// Step 1: Hash each transaction in the array
function hashTransactions(transactions) {
    return transactions.map(transaction => crypto.createHash('sha256').update(transaction).digest('hex'));
}

// Step 3: Pair the hashed transactions and concatenate them
function pairAndConcatenate(hashes) {
    const pairedHashes = [];
    for (let i = 0; i < hashes.length; i += 2) {
        const hash1 = hashes[i];
        const hash2 = (i + 1 < hashes.length) ? hashes[i + 1] : hash1; // Duplicate the last hash if odd number of hashes
        const concatenatedHash = hash1 + hash2;
        pairedHashes.push(concatenatedHash);
    }
    return pairedHashes;
}

// Step 4: Hash each pair
function hashPairs(hashes) {
    return hashes.map(hash => crypto.createHash('sha256').update(hash).digest('hex'));
}

// Step 5: Recursively build the Merkle tree until there is only one hash left
function buildMerkleTree(transactions) {
    let hashes = hashTransactions(transactions);
    while (hashes.length > 1) {
        hashes = pairAndConcatenate(hashes);
        hashes = hashPairs(hashes);
    }
    return hashes[0]; // Return the Merkle root
}

// Example usage

const merkleRoot = buildMerkleTree(transactions);

module.exports = merkleRoot;
