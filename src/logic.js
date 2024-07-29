/**
 * Checks if the input string is a valid unicode point
 * @param {string} unicode unicode point to be verified
 * @returns true if unicode is valid, false if unicode is invalid
 */
function checkValid(unicode) {

    // this block will check if the string contains all valid hex digits 0-9, a-f.
    const invalidHex = /[^1234567890abcdef]/i.test(unicode);
    if (invalidHex) {
      return false
    }
  
    if (parseInt(unicode, 16) > 0x10FFFF || parseInt(unicode, 16) < 0) {
      return false
    }
  
    return true //return true if all tests are passed.
  
  }
  
  /**
   * Converts a binary representation to hex representation
   * @param {string} binaryStr binary representation of a number as a string.
   * @returns hex representation of a string.
   */
  function binaryStringToHex(binaryStr) {
    // Pad the binary string to make its length a multiple of 4
    const paddedBinaryStr = binaryStr.padStart(Math.ceil(binaryStr.length / 4) * 4, '0');
  
    // Split the binary string into groups of 4 bits
    const binaryGroups = paddedBinaryStr.match(/.{1,4}/g);
  
    // Convert each 4-bit group to its hexadecimal equivalent
    const hexString = binaryGroups.map(bin => parseInt(bin, 2).toString(16)).join('');
  
    return hexString.toUpperCase();
  }
  
  /**
   * Converts a unicode point to its UTF-8 encoding. returns 'invalid' if the code point is invalid.
   * @param {string} unicode 
   * @returns unicode point in UTF-8.
   */
  function unicodeToUTF8(unicode) {
  
    if (unicode === '') {
      return ''
    }
  
    if (checkValid(unicode) == false) {
      return "invalid";
    }
  
    let res = [];
  
    unicode = parseInt(unicode, 16).toString(16)
  
  
  
    if (unicode.length == 0) {
      return '';
    } else if (parseInt(unicode, 16) <= 0x7F) {
      let binary = unicode.padStart(2, '0').toUpperCase();
      res.push(binary.slice(0, 2))
      res.push(binary.slice(2, 4))
      return res.join(' ')
    } else if (parseInt(unicode, 16) <= 0x7FF) {
      let binary = parseInt(unicode, 16).toString(2).padStart(11, '0');
      res.push('110' + binary.slice(0, 5));
      res.push('10' + binary.slice(5));
    } else if (parseInt(unicode, 16) <= 0xFFFF) {
      let binary = parseInt(unicode, 16).toString(2).padStart(16, '0');
      res.push('1110' + binary.slice(0, 4));
      res.push('10' + binary.slice(4, 10));
      res.push('10' + binary.slice(10));
    } else if (parseInt(unicode, 16) <= 0x1FFFFF) {
      let binary = parseInt(unicode, 16).toString(2).padStart(21, '0');
      res.push('11110' + binary.slice(0, 3));
      res.push('10' + binary.slice(3, 9));
      res.push('10' + binary.slice(9, 15));
      res.push('10' + binary.slice(15));
    } else {
      return "invalid";
    }
  
    let utf8 = res.map((binary) => binaryStringToHex(binary)).join(' ');
  
    return utf8;
  }
  
  /**
   * Converts a unicode point to its UTF-16 encoding. returns 'invalid' if the code point is invalid.
   * @param {string} unicode code point in string
   * @returns unicode point in UTF-16 encoding as a string.
   */
  function unicodeToUTF16(unicode) {
  
  
    if (unicode === '') {
      return ''
    }
  
    if (checkValid(unicode) == false) {
      return "invalid";
    }
  
  
    unicode = parseInt(unicode, 16).toString(16)
  
    if (unicode.length == 0) {
      return '';
    } else if (parseInt(unicode, 16) <= 0xFFFF) {
      let res = []
      unicode = unicode.padStart(4, '0');
      res.push(unicode.slice(0, 2))
      res.push(unicode.slice(2, 4))
      return res.join(' ').toUpperCase()
    } else if (parseInt(unicode, 16) <= 0x10FFFF) {
      let res = []
      let hex = parseInt(unicode, 16) - 0x10000;
      let binary = hex.toString(2).padStart(20, '0');
      let highSurrogate = 0xD800 + parseInt(binary.slice(0, 10), 2);
      let lowSurrogate = 0xDC00 + parseInt(binary.slice(10), 2);
      res.push(highSurrogate.toString(16).toUpperCase());
      res.push(lowSurrogate.toString(16).toUpperCase());
  
      return res.map((hex) => [hex.slice(0, 2), hex.slice(2)]).flat().join(' ').toUpperCase();
    } else {
      return "invalid";
    }
  }
  
  
  /**
   * Converts an input unicode (as string) to its UTF-32 encoding, as string
   * @param {string} input
   * @returns { string } equivalent UTF-32 encoding as string.
   */
  function unicodeToUTF32(input) {
    let unicode = input
  
    if (unicode.length == 0) {
      return ''
    }
  
    if (!checkValid(unicode)) {
      return 'invalid'
    }
  
    unicode = parseInt(unicode, 16).toString(16) //this will remove leading 0's
  
    let result = []
  
    //zero extend unicode to 32 bits
    unicode = unicode.padStart(8, '0')
  
  
    //group unicode into two characters each then push to result
    for (let i = 0; i < 8; i += 2) {
      result.push(unicode.slice(i, i + 2))
    }
  
    //convert result to string then return
    return result.join(' ').toUpperCase()
  
  }
  
  /**
   * converts unicode point to its respective symbol
   * @param {string} unicode 
   * @returns character represented by unicode, invalid if the unicode is not a valid code point
   */
  function unicodeToChar(unicode) {
  
    if(!unicode.length){
      return '';
    }
  
    //Test the string for invalid input.
    if(!checkValid(unicode)){
      return 'invalid';
    }
  
  
    //convert hex to character
    try {
      const hexValue = parseInt(unicode, 16);
  
      //switch case for special unicode values that might break the copy function
      switch(hexValue){
        case 0: return 'Null Character'
        default: break
      }
      return String.fromCodePoint(parseInt(unicode, 16));
    } catch (e) {
      return "invalid";
    }
  }
  
  /**
   * converts a character to its unicode point
   * @param {string} symbol - symbol to be used as input
   * @returns unicode point for the given symbol
   */
  function charToUnicode(symbol) {
    try {
      if (symbol.length == 0) {
        return "";
      }
      return symbol.codePointAt(0).toString(16).toUpperCase();
    } catch (e) {
      return "invalid";
    }
  }
  
  /**
   * Creates a format string with all pertinent information for pasting.
   * @param {string} unicode 
   * @param {string} symbol
   * @param {string} utf8 
   * @param {string} utf16 
   * @param {string} utf32 
   * @returns a formatted string that contains the Unicode point and its corresponding character, utf-8, utf-16, and utf-32 encodings.
   */
  function formattedUTF(unicode, symbol, utf8, utf16, utf32) {
    return "Unicode: " + unicode + "\n" + "Symbol: " + symbol + "\n" + "UTF-8: " + utf8 + "\n" + "UTF-16: " + utf16 + "\n" + "UTF-32: " + utf32;
  }

export { checkValid, unicodeToUTF8, unicodeToUTF16, unicodeToUTF32, unicodeToChar, charToUnicode, formattedUTF }