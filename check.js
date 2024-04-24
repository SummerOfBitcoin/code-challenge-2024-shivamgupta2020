const trxn = require('./mempool/7a77de4a825200f3823f7489415bd062fa165d91d58716eeff6bf99882f7e357.json')

function check_type(transaction) {

    for (let j = 1; j < transaction.vin.length; j++) {
        //check that each input has same type of scriptpubkey
        if (transaction.vin[j].prevout.scriptpubkey_type !== transaction.vin[0].prevout.scriptpubkey_type) {
            return false;
        }
    }

    return true;
}

console.log(check_type(trxn));