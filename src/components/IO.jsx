import { useState } from "react";
import Input from "./Input";

function unicodeToUTF8(unicode) {
  return unicode;
}

function unicodeToUTF16(unicode) {
  return unicode;
}

function unicodeToUTF32(unicode) {
  return unicode;
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
        <button title="Copy All">
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
