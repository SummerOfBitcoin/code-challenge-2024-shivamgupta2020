const merkleRoot = require('./create_markle')

const blockHeader = {
    version: "01",
    previousBlockHash: "0000000000000000000000000000000000000000000000000000000000000000",
    merkleRootHash: merkleRoot,
    timestamp: Date.now(), // Current timestamp in milliseconds
    difficultyTarget: "0000ffff00000000000000000000000000000000000000000000000000000000",
    nonce: 0
}

module.exports = blockHeader
