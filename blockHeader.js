const {merkleRootTxid} = require('./create_merkle_txid.js')
const { decimalToLittleEndian8, bigToLittleEndian } = require('./utils.js');
const {hexTime_reverse} = require('./check.js')
// const currentTimeInSeconds = Math.floor(Date.now() / 1000);

// // Convert to hexadecimal
// const hexTime = currentTimeInSeconds.toString(16);
// const {hexTime_reverse} = bigToLittleEndian(hexTime)
// console.log(hexTime_reverse)
//000000200000000000000000000000000000000000000000000000000000000000000000f4c4dd3bad0777712bd9d657991f33185831d9a59f4757cc30346496bf7453e33c612666ffff001f92ee0000
const block = {
    version: 20000000,//VERSION
    previousBlockHash: "0000000000000000000000000000000000000000000000000000000000000000",
    merkleRootHash: merkleRootTxid,
    timeStamp: hexTime_reverse,
    difficultyTarget: "0000ffff00000000000000000000000000000000000000000000000000000000",
    nonce: 0
}


function createBlockHeader(x){
    let blockheader = ""
    blockheader += "00000020";
    blockheader += (x.previousBlockHash);
    blockheader += (x.merkleRootHash);
    blockheader += x.timeStamp;
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

