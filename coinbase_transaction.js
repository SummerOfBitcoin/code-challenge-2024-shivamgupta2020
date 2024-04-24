// {
//     "version": 1,
//     "locktime": 0,
//     "vin": [
//       {
//         "txid": "0000000000000000000000000000000000000000000000000000000000000000",
//         "vout": 4294967295,
//         "scriptsig": "49a80c4468697261636B",
//         "scriptsig_asm": "",
//         "witness": [
//           "0000000000000000000000000000000000000000000000000000000000000000"
//         ],
//         "is_coinbase": true,
//         "sequence": 4294967295
//       }
//     ],
//     "vout": [
//       {
//         "scriptpubkey": "0014473888b0e569c41cc12fdd59956d3afaa1c9e616",
//         "scriptpubkey_asm": " aa21a9ed9f43877fb73a8930a62c303ccfca2e0579a1ef9739b1cd4c208aac0c4d1ab23b",
//         "scriptpubkey_type": "v0_p2wpkh",
//         "scriptpubkey_address": "bc1qguug3v89d8zpesf0m4ve2mf6l2sunesk4xjdu4",
//         "value": 100000000
//       },
//       {
//         "scriptpubkey": "aa21a9ed38ec807f50254e85ec083dc70f0bdd2406ee027c82287acfbba565733bcd9be8",
//         "scriptpubkey_asm": "OP_RETURN OP_PUSHBYTES_36 38ec807f50254e85ec083dc70f0bdd2406ee027c82287acfbba565733bcd9be8",
//         "value": 0
//       }
//     ]
//   }

  

const coinbase_trxn =   "010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0A49a80c4468697261636Bffffffff0200e1f505000000001976a914edf10a7fac6b32e24daa5305c723f3de58db1bc888ac000000000000000024aa21a9ed38ec807f50254e85ec083dc70f0bdd2406ee027c82287acfbba565733bcd9be80120000000000000000000000000000000000000000000000000000000000000000000000000"

module.exports = {coinbase_trxn}
  
