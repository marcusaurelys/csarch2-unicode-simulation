import { useState } from "react";
import Input from "./Input";
import { parse } from "postcss";

function checkValid(unicode) {

  const invalidHex = /[^1234567890abcdef]/i.test(unicode);
  if (invalidHex) {
    return false
  }

  try {
    String.fromCodePoint(parseInt(unicode, 16))
  } catch (e) {
    return false
  }
  return true
}

function binaryStringToHex(binaryStr) {
  // Pad the binary string to make its length a multiple of 4
  const paddedBinaryStr = binaryStr.padStart(Math.ceil(binaryStr.length / 4) * 4, '0');

  // Split the binary string into groups of 4 bits
  const binaryGroups = paddedBinaryStr.match(/.{1,4}/g);

  // Convert each 4-bit group to its hexadecimal equivalent
  const hexString = binaryGroups.map(bin => parseInt(bin, 2).toString(16)).join('');

  return hexString.toUpperCase();
}

function unicodeToUTF8(unicode) {
  let res = [];

  unicode = parseInt(unicode, 16).toString(16)

  if (checkValid(unicode) == false) {
    return "invalid";
  }

  if (unicode.length == 0) {
    return '';
  } else if (parseInt(unicode, 16) <= 0x7F) {
    return unicode.padStart(2, '0').toUpperCase();
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

function unicodeToUTF16(unicode) {

  unicode = parseInt(unicode, 16).toString(16)

  if (checkValid(unicode) == false) {
    return "invalid";
  }

  if (unicode.length == 0) {
    return '';
  } else if (parseInt(unicode, 16) <= 0xFFFF) {
    return unicode.padStart(4, '0').toUpperCase();
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
  while (unicode.length < 8) {
    unicode = "0" + unicode
  }
  console.log(unicode)

  //group unicode into two characters each then push to result
  for (let i = 0; i < 8; i += 2) {
    result.push(unicode.slice(i, i + 2))
  }

  //convert result to string then return
  return result.join(' ').toUpperCase()

}

function unicodeToChar(unicode) {
  //Test the string for invalid input.
  const invalidHex = /[^1234567890abcdef]/i.test(unicode);
  if (invalidHex) {
    return "invalid";
  }

  //convert hex to character
  try {
    if (unicode.length == 0) {
      return "";
    }
    return String.fromCodePoint(parseInt(unicode, 16));
  } catch (e) {
    return "invalid";
  }
}

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

function formattedUTF(unicode, symbol, utf8, utf16, utf32) {
  return "Unicode: " + unicode + "\n" + "Symbol: " + symbol + "\n" + "UTF-8: " + utf8 + "\n" + "UTF-16: " + utf16 + "\n" + "UTF-32: " + utf32;
}

function IO() {
  const [input, setInput] = useState("");
  const unicode = `U+${input}`;
  const symbol = unicodeToChar(input);
  const utf8 = unicodeToUTF8(input);
  const utf16 = unicodeToUTF16(input);
  const utf32 = unicodeToUTF32(input);

  return (
    <>
      <p className="font-bold text-3xl mb-3"> Input </p>
      <div className="flex gap-3">
        <div className="w-11/12">
          <Input
            label="Unicode"
            placeholder="U+XXXXXXXX"
            value={unicode}
            onChange={(e) =>
              e.target.value.startsWith("U+") &&
              setInput(e.target.value.slice(2))
            }
          />
        </div>
        <div>
          <Input
            label="Symbol"
            placeholder=""
            type="textarea"
            value={symbol}
            onChange={(e) => setInput(charToUnicode(e.target.value))}
          />
        </div>
      </div>
      <p className="font-bold mb-3 text-3xl flex items-center gap-3">
        Output
        <button title="Copy All" onClick={() => { navigator.clipboard.writeText(formattedUTF(unicode, symbol, utf8, utf16, utf32)) }}>
          <ClipboardIcon />
        </button>
      </p>

      <div className="flex flex-row items-center w-full">
        <button title="Copy UTF-8 Output">
          <ClipboardIcon />
        </button>
        <div className="flex-grow">
          <Input
            label="UTF-8"
            placeholder="XX XX XX XX"
            value={utf8}
            disabled
          />
        </div>
      </div>

      <div className="flex flex-row items-center w-full">
        <button title="Copy UTF-16 Output">
          <ClipboardIcon />
        </button>
        <div className="flex-grow">
          <Input
            label="UTF-16"
            placeholder="XX XX XX XX"
            value={utf16}
            disabled
          />
        </div>
      </div>

      <div className="flex flex-row items-center w-full">
        <button title="Copy UTF-32 Output">
          <ClipboardIcon />
        </button>
        <div className="flex-grow">
          <Input
            label="UTF-32"
            placeholder="XX XX XX XX"
            value={utf32}
            disabled
          />
        </div>
      </div>
    </>
  );
}

export default IO;

function ClipboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
      />
    </svg>
  );
}
