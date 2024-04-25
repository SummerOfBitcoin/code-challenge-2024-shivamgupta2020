const {merkleRootTxid} = require('./create_merkle_txid.js')
const { decimalToLittleEndian8, bigToLittleEndian } = require('./utils.js');

const currentTimeInSeconds = Math.floor(Date.now() / 1000);
const hexTime = currentTimeInSeconds.toString(16);
const hexTime_reverse = bigToLittleEndian(hexTime)

const block = {
    version: 20000000,//VERSION
    previousBlockHash: "0000000000000000000000000000000000000000000000000000000000000000",
    merkleRootHash: "2b4fece3cd17db10b9947b1f620f7abd3d31a78646bfd6b1e5f7131770bea7f2",
    timeStamp: hexTime_reverse,
    difficultyTarget: "0000ffff00000000000000000000000000000000000000000000000000000000",
    nonce: 0
}
console.log(block)

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
