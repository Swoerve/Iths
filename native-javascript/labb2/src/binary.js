
/**
 * 
 * @param {String} str 
 * @returns {String} binaryfied string
 */
export function stringToBinary(str) {
  return Array.from(str, char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');
}

/**
 * 
 * @param {String} bin 
 * @returns {String}
 */
export function binaryToString(bin) {
  return bin
  // split binary
  .split(' ')
  // map array to turn each binary into its respective char
  .map(bin => String.fromCharCode(parseInt(bin, 2)))
  // join the array back to a single string
  .join('');
}