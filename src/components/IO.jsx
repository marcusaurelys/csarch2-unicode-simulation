import { useState } from "react";
import Input from "./Input";
import Popup from './Popup';
import { checkValid, unicodeToUTF8, unicodeToUTF16, unicodeToUTF32, unicodeToChar, charToUnicode, formattedUTF } from '../logic.js'

function IO() {
  const [input, setInput] = useState("");
  const unicode = `U+${input}`;
  const symbol = unicodeToChar(input);
  const utf8 = unicodeToUTF8(input);
  const utf16 = unicodeToUTF16(input);
  const utf32 = unicodeToUTF32(input);
  const [clipboardFeedback, setClipboardFeedback] = useState(false);

  const copyToClipboard = (text) => {
    setClipboardFeedback(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setClipboardFeedback(false);
    }, 3000);
  }

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
            invalid={utf8 == 'INVALID HEX' || utf8 == 'OUT OF RANGE'}
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

      <span className="font-bold mb-3 text-3xl flex items-center gap-3">
        Output
        {input.length != 0 && (utf8 != 'INVALID HEX' && utf8 != 'OUT OF RANGE')  ? (
          <button title="Copy All" onClick={() => { input.length != 0 && copyToClipboard(formattedUTF(unicode, symbol, utf8, utf16, utf32)) }} className="flex items-center hover:text-gray-500 radius-md boder-radius-md">
            <ClipboardIcon />
          </button>) : <div className="text-gray-700"><ClipboardIcon /></div>}
      </span>

      <div className="flex flex-row items-center w-full">
        {input.length != 0 && (utf8 != 'INVALID HEX' && utf8 != 'OUT OF RANGE') ? (
          <button title="Copy UTF-8 Output" onClick={() => { input.length != 0 && copyToClipboard(utf8) }} className="flex items-center hover:text-gray-500 radius-md boder-radius-md">
            <ClipboardIcon />
          </button>) : <div className="text-gray-700"><ClipboardIcon /></div>}
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
        {input.length != 0 && (utf16 != 'INVALID HEX' && utf16 != 'OUT OF RANGE') ? (
          <button title="Copy UTF-16 Output" onClick={() => input.length != 0 && copyToClipboard(utf16)} className="flex items-center hover:text-gray-500 radius-md boder-radius-md">
            <ClipboardIcon />
          </button>) : <div className="text-gray-700"><ClipboardIcon /></div>}
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
        {input.length != 0 && (utf32 != 'INVALID HEX' && utf32 != 'OUT OF RANGE') ? (
          <button title="Copy UTF-32 Output" onClick={() => input.length != 0 && copyToClipboard(utf32)} className="flex items-center hover:text-gray-500 radius-md boder-radius-md">
            <ClipboardIcon />
          </button>) : <div className="text-gray-700"><ClipboardIcon /></div>}
        <div className="flex-grow">
          <Input
            label="UTF-32"
            placeholder="XX XX XX XX"
            value={utf32}
            disabled
          />
        </div>
      </div>

      {clipboardFeedback && <Popup message="Copied to Clipboard!" />}
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
