const { decimalToLittleEndian8, bigToLittleEndian } = require('./utils.js');


const currentTimeInSeconds = Math.floor(Date.now() / 1000);

// Convert to hexadecimal
const hexTime = currentTimeInSeconds.toString(16);
const hexTime_reverse = bigToLittleEndian(hexTime)

module.exports= {hexTime_reverse}