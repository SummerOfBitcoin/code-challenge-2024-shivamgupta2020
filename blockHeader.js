const {merkleRootTxid} = require('./create_merkle_txid.js')
const { decimalToLittleEndian8, bigToLittleEndian } = require('./utils.js');

const currentTimeInSeconds = Math.floor(Date.now() / 1000);
const hexTime = currentTimeInSeconds.toString(16);
const hexTime_reverse = bigToLittleEndian(hexTime)

const block = {
    version: 20000000,//VERSION
    previousBlockHash: "0000000000000000000000000000000000000000000000000000000000000000",
    merkleRootHash: "c3cde35006601b0b08cf9d4b6e2dd551ceba49e67497e48032bcdafb86191a83",
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
    blockheader += bigToLittleEndian("1f00ffff")
    return blockheader;
}

const blockHeaderwithoutnounce = createBlockHeader(block)
module.exports = {blockHeaderwithoutnounce, block}
