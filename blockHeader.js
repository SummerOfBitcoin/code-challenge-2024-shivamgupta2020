const {merkleRootTxid} = require('./create_merkle_txid.js')
const { decimalToLittleEndian8, bigToLittleEndian } = require('./utils.js');

const block = {
    version: 2,
    previousBlockHash: "0000000000000000000000000000000000000000000000000000000000000000",
    merkleRootHash: merkleRootTxid,
    timeStamp: Math.floor(Date.now() / 1000),
    difficultyTarget: "0000ffff00000000000000000000000000000000000000000000000000000000",
    nonce: 0
}

function createBlockHeader(x){
    var blockheader = ""
    blockheader += decimalToLittleEndian8(x.version);
    blockheader += (x.previousBlockHash);
    blockheader += (x.merkleRootHash);
    blockheader += bigToLittleEndian(x.timeStamp.toString(16));
    blockheader += decimalToLittleEndian8("1f00ffff")
    return blockheader;
}

const blockHeaderwithoutnounce = createBlockHeader(block)

module.exports = {blockHeaderwithoutnounce, block}

/*
00000020
64
00000000000000000000000000000000000000000000000000000000000000
e7cb095a09d1684a82b148950522bc481a370b47f5a1d886edae10cef8a4bb3e75cf2366ffff001d696b0000
*/ 

