let crypto = require('crypto');
const ec = require('secp256k1')

let msg = '0100000001141b04efa51955416471dcc906e882a28c2568310305595ab6bca2f6c73e28d100000000553276a91496bc8310635539000a65a7cc95cb773c0cc7009788ac0121025f0ba0cdc8aa97ec1fffd01fac34d3a7f700baf07658048263a2c925825e8d33ffffffff0179cb1000000000001976a914e5977cf916acdba010b9d847b9682135aa3ea81a88ac00000000';
let msgHash = crypto.createHash('sha256').update(msg).digest('hex');
let msghash256 = crypto.createHash('sha256').update(msgHash).digest('hex');
var messageHash = Buffer.from(msgHash, 'hex');

var signature = Buffer.from('200b9a61529151f9f264a04e9aa17bb6e1d53fb345747c44885b1e185a82c1750e41059f8ab4d3b3709dcb91b050c344b06c5086f05598d62bc06a8b746db429', 'hex');
signature = ec.signatureNormalize(signature);

console.log(`Msg: ${msg}`);
console.log(`Msg hash: ${msgHash}`);

var publicKey = Buffer.from('025f0ba0cdc8aa97ec1fffd01fac34d3a7f700baf07658048263a2c925825e8d33', 'hex');

console.log(ec.ecdsaVerify(signature, messageHash, publicKey))
