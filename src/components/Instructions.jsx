function Instructions() {
  return (
    <div className="px-14 dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold text-center w-full">
        {" "}
        Unicode to UTF converter{" "}
      </h1>
      <br />
      Features:
      <ol type="1" className="list-disc pl-9">
        <li>
          {" "}
          Input must be valid Unicode in hexadecimal. Input can also be a symbol in the symbol field. The valid Unicode range is from U+0000 to U+10FFFF.
        </li>
        <li> Outputs are generated as you type the input. </li>
        <li>
          {" "}
          All outputs can be copied to clipboard by clicking the clipboard
          symbol beside the 'Output' text{" "}
        </li>
        <li>
          {" "}
          Individual outputs can be copied by the clipboard icon beside their
          respective fields.
        </li>
      </ol>
      <br />
      <div className="text-center">
        <p className="font-bold">CSARCH2 S12 Group 11</p>
        <p>Members: </p>
        <p>Anjelo Patrick Atanacio</p>
        <p>Joel Ethan Batac</p>
        <p>Paul Ivan Enclonar</p>
        <p>Alonzo Andrei Rimando</p>
      </div>
    </div>
  );
}

export default Instructions;
