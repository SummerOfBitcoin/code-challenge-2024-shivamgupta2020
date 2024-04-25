const coinbase_trxn = {
    "version": 1,
    "locktime": 0,
    "vin": [
      {
        "txid": "0000000000000000000000000000000000000000000000000000000000000000",
        "vout": 4294967295,
        "scriptsig": "03233708184d696e656420627920416e74506f6f6c373946205b8160a4256c0000946e0100",
        "scriptsig_asm": "",
        "witness": [
          "0000000000000000000000000000000000000000000000000000000000000000"
        ],
        "is_coinbase": true,
        "sequence": 429496729565
      }
    ],
    "vout": [
      {
        "scriptpubkey": "76a914edf10a7fac6b32e24daa5305c723f3de58db1bc888ac",
        "scriptpubkey_asm": " ",
        "scriptpubkey_type": "",
        "scriptpubkey_address": "",
        "value": "1268270308" //VALUE  = SUBSIDY + FEES
        // 
      },

      {
        "scriptpubkey": "6a24aa21a9edaa45eab78e3ac7286f2d1620cba23f55811e97aaacd0816c4e9feb86c514708c", // wtxid commitment = aa45eab78e3ac7286f2d1620cba23f55811e97aaacd0816c4e9feb86c514708c
        "scriptpubkey_asm": "OP_RETURN OP_PUSHBYTES_36 aa45eab78e3ac7286f2d1620cba23f55811e97aaacd0816c4e9feb86c514708c",
        "scriptpubkey_type": "",
        "scriptpubkey_address": "",
        "value": 0
      }
    ]
  }

  
const final_txid = "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff2503233708184d696e656420627920416e74506f6f6c373946205b8160a4256c0000946e0100ffffffff022d76634b000000001976a914edf10a7fac6b32e24daa5305c723f3de58db1bc888ac0000000000000000266a24aa21a9edaa45eab78e3ac7286f2d1620cba23f55811e97aaacd0816c4e9feb86c514708c00000000"
const txid = "e8d86242349ff4acb2710e0753cc8bfc9ed754a73f54e2dafea9c05a6cfe66ae"
const final_serialized = "010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff2503233708184d696e656420627920416e74506f6f6c373946205b8160a4256c0000946e0100ffffffff022d76634b000000001976a914edf10a7fac6b32e24daa5305c723f3de58db1bc888ac0000000000000000266a24aa21a9edaa45eab78e3ac7286f2d1620cba23f55811e97aaacd0816c4e9feb86c514708c0120000000000000000000000000000000000000000000000000000000000000000000000000"

module.exports = {final_txid,final_serialized}

