
var CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
var GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3]; // i dont find its use in the code
function polymod(values) {
  var chk = 1;
  for (var p = 0; p < values.length; ++p) {
    var top = chk >> 25;
    chk = (chk & 0x1ffffff) << 5 ^ values[p];
    for (var i = 0; i < 5; ++i) {
      if ((top >> i) & 1) {
        chk ^= GENERATOR[i];
      }
    }
  }
  return chk;
}
//hrp is used here, think of it as a key for encoding
//given below is the way of encoding thats all I know, I found it in bitcoin bech32 encoding github online repo
function hrpExpand(hrp) {
  var ret = [];
  var p;
  for (p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) >> 5);
  }
  ret.push(0);
  for (p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) & 31);
  }
  return ret;
}

//
function createChecksum(hrp, data) {
  var values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  var mod = polymod(values) ^ 1;
  var ret = [];
  for (var p = 0; p < 6; ++p) {
    ret.push((mod >> 5 * (5 - p)) & 31);
  }
  return ret;
}
function bech32_verify_checksum(hrp, data) {
  return polymod(hrpExpand(hrp) + data) == 1
}

const trxnHash = "751e76e8199196d454941c45d1b3a323f1433bd6"
// //
function hexToDecimals(hex) {
  // Step 1: Convert hexadecimal string to binary
  let binary = BigInt('0x' + hex).toString(2); // Convert hexadecimal to binary

  // Step 2: Add five 0 bits at the start of the binary string
  binary = '0'.repeat(5 - binary.length % 5) + binary; // Add leading 0 bits to make the length a multiple of 5

  // Step 3: Combine every five characters in the binary string
  const binaryChunks = binary.match(/.{1,5}/g); // Split binary string into chunks of 5 bits

  // Step 4: Convert each group of five bits to decimal
  const decimals = binaryChunks.map(chunk => parseInt(chunk, 2));

  return decimals;
}

// Example usage
const decimalArray = hexToDecimals(trxnHash);
console.log('Decimal array:', decimalArray);
const checksum = createChecksum("bc", decimalArray);
//hrp =  "bc" and data = decimalArray
console.log(checksum);
console.log(bech32_verify_checksum("bc", decimalArray));

function decimalsToCharacters(decimals) {
  const mapping = {
    0: 'q', 1: 'p', 2: 'z', 3: 'r', 4: 'y', 5: '9', 6: 'x', 7: '8',
    8: 'g', 9: 'f', 10: '2', 11: 't', 12: 'v', 13: 'd', 14: 'w', 15: '0',
    16: 's', 17: '3', 18: 'j', 19: 'n', 20: '5', 21: '4', 22: 'k', 23: 'h',
    24: 'c', 25: 'e', 26: '6', 27: 'm', 28: 'u', 29: 'a', 30: '7', 31: 'l'
  };

  const characters = decimals.map(decimal => mapping[decimal]);

  return characters.join('');
}

// Example usage
const characterString = decimalsToCharacters(decimalArray);
// console.log('Character string:', characterString);

// console.log('Bech32 address:', `bc1${characterString}${checksum.map(checksum => CHARSET[checksum]).join('')}`);

function encode(hrp, data) {
  var combined = data.concat(createChecksum(hrp, data));
  var ret = hrp + '1';
  for (var p = 0; p < combined.length; ++p) {
    ret += CHARSET.charAt(combined[p]);
  }
  return ret;
}

console.log(encode("bc", decimalArray));

//////////////
// function bech32_polymod(values) {
//   const GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
//   let chk = 1;
//   for (const v of values) {
//       const b = (chk >> 25);
//       chk = ((chk & 0x1ffffff) << 5) ^ v;
//       for (let i = 0; i < 5; i++) {
//           chk ^= ((b >> i) & 1) ? GEN[i] : 0;
//       }
//   }
//   return chk;
// }

// function bech32_hrp_expand(s) {
//   const expanded = [];
//   for (const char of s) {
//       expanded.push(char.charCodeAt(0) >> 5);
//   }
//   expanded.push(0);
//   for (const char of s) {
//       expanded.push(char.charCodeAt(0) & 31);
//   }
//   return expanded;
// }

// function bech32_create_checksum(hrp, data) {
//   const values = bech32_hrp_expand(hrp).concat(data);
//   const polymod = bech32_polymod(values.concat([0, 0, 0, 0, 0, 0])) ^ 0x2bc830a3;
//   const checksum = [];
//   for (let i = 0; i < 6; i++) {
//       checksum.push((polymod >> (5 * (5 - i))) & 31);
//   }
//   return checksum;
// }

// // Example usage
// const hrp = 'bc';
// const data = hexToDecimals('751e76e8199196d454941c45d1b3a323f1433bd6')
// const checksum = bech32_create_checksum(hrp, data);
// console.log('Checksum:', decimalsToCharacters(checksum));
