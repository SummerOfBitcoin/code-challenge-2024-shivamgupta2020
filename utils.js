const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const bs58 = require('bs58');

function hexToBase58(hex) {
    // Convert hexadecimal string to Buffer
    const buffer = Buffer.from(hex, 'hex');
    // Convert Buffer to Base58
    const base58 = bs58.encode(buffer);
    return base58;
}

function hash160(str) {
    // Convert hex string to Buffer
    const publicKeyBuffer = Buffer.from(str, 'hex');

    // Step 1: SHA-256 hash of the public key
    const sha256Hash = crypto.createHash('sha256').update(publicKeyBuffer).digest();

    // Step 2: RIPEMD-160 hash of the SHA-256 hash
    const ripemd160Hash = CryptoJS.RIPEMD160(CryptoJS.enc.Hex.parse(sha256Hash.toString('hex')));
    return ripemd160Hash;
}

function hash256(str) {
    // Convert hex string to Buffer
    const message = Buffer.from(str, 'hex');
    const sha256Msg = crypto.createHash('sha256').update(Buffer.from(message, 'hex')).digest('hex');
    const hash256Msg = crypto.createHash('sha256').update(Buffer.from(sha256Msg, 'hex')).digest('hex');
    return hash256Msg;

}

function sha256(str) {
    return crypto.createHash('sha256').update(Buffer.from(str, 'hex')).digest('hex');
}

function createAddress_p2pkh(str) {
    const checksum = crypto.createHash('sha256').update("00" + str).digest('hex').slice(0, 8);
    const data = "00" + str + checksum;
    return hexToBase58(data);
}

function createAddress_p2sh(str) {
    const checksum = crypto.createHash('sha256').update("05" + str).digest('hex').slice(0, 8);
    const data = "00" + str + checksum;
    return hexToBase58(data);
}

function decimalToLittleEndian8(decimal) {
    var buffer = new ArrayBuffer(4); // Allocate a 4-byte buffer
    var view = new DataView(buffer); // Create a DataView to handle byte-level operations

    view.setInt32(0, decimal, true); // Set the 4-byte integer with little-endian byte order

    // Extract individual bytes and store them in an array
    var littleEndianBytes = [];
    for (var i = 0; i < 4; i++) {
        littleEndianBytes.push(view.getUint8(i).toString(16).padStart(2, '0'));
    }

    // Join the bytes into a string
    return littleEndianBytes.join('');
}
function decimalToLittleEndian16(intString) {
    // Convert the string to a number
    const num = parseInt(intString, 10);

    // Convert the number to a 32-bit unsigned integer array
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, num, true); // true for little endian

    // Get the hexadecimal representation
    const hex = view.getUint32(0, true).toString(16).padStart(8, '0');

    // Split into 2-character chunks
    const chunks = hex.match(/.{1,2}/g);

    // Reverse the order and pad with zeros to ensure 16 characters
    const littleEndian = chunks.reverse().join('').padEnd(16, '0');

    return littleEndian;
}

function intToTwoCharString(intValue) {
    // Convert integer to hexadecimal string with two characters
    const hexString = ('0' + intValue.toString(16)).slice(-2);
    return hexString;
}

function intTo16CharHexString(intValue) {
    // Convert integer to hexadecimal string with 16 characters
    const hexString = ('0000000000000000' + intValue.toString(16)).slice(-16);
    return hexString;
}

function bigToLittleEndian(inputString) {
    // Check if the input string is valid
  
    // Split the input string into pairs of characters representing bytes
    const bytePairs = [];
    for (let i = 0; i < inputString.length; i += 2) {
      bytePairs.push(inputString.slice(i, i + 2));
    }
  
    // Reverse the order of byte pairs
    const littleEndianPairs = bytePairs.reverse();
  
    // Convert byte pairs back to string
    let outputString = '';
    for (let i = 0; i < littleEndianPairs.length; i++) {
      outputString += littleEndianPairs[i];
    }
  
    return outputString;
  }


module.exports = {
    hash160,
    createAddress_p2pkh,
    createAddress_p2sh,
    decimalToLittleEndian8,
    decimalToLittleEndian16,
    intToTwoCharString,
    intTo16CharHexString,
    bigToLittleEndian,
    hash256, 
    sha256
}