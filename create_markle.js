const crypto = require('crypto');
const allTransactions = require('./read_txn');

// Function to compute Merkle root hash
function computeMerkleRoot(transactions) {
    // Hashing function
    const hashFunction = data => crypto.createHash('sha256').update(data).digest('hex');

    // Recursive function to compute Merkle root
    function recursiveMerkle(hashList) {
        if (hashList.length === 1) return hashList[0];
        const newHashList = [];
        for (let i = 0; i < hashList.length; i += 2) {
            const leftHash = hashList[i];
            const rightHash = (i + 1 < hashList.length) ? hashList[i + 1] : leftHash; // If there's no right hash, use left hash again
            const combinedHash = hashFunction(leftHash + rightHash);
            newHashList.push(combinedHash);
        }
        return recursiveMerkle(newHashList);
    }

    // Extract transaction hashes
    const transactionHashes = transactions.map(tx => hashFunction(JSON.stringify(tx)));

    // Compute Merkle root
    return recursiveMerkle(transactionHashes);
}

// Example transactions
const transactions = allTransactions;

// Compute Merkle root
const merkleRoot = "58eb36919634a695a8301ba39c24cc9525c4945acf63f6abfcd7707d71e04aff"
module.exports = merkleRoot