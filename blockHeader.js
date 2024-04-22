const merkleRoot = require('./create_merkle.js')

const blockHeader = {
    version: "02",
    previousBlockHash: "0000000000000000000000000000000000000000000000000000000000000000",
    merkleRootHash: merkleRoot,
    timestamp: Date.now(), // Current timestamp in milliseconds
    difficultyTarget: "0000ffff00000000000000000000000000000000000000000000000000000000",
    nonce: 0
}


module.exports = blockHeader

/*
00000020
64
00000000000000000000000000000000000000000000000000000000000000
e7cb095a09d1684a82b148950522bc481a370b47f5a1d886edae10cef8a4bb3e75cf2366ffff001d696b0000
*/ 