import ToggleDark from "./ToggleDark";

function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6 shadow-lg shadow-sm shadow-slate-500 mb-5 dark:shadow-slate-200 ">
      <span className="text-lg font-semibold flex flex-row gap-3 dark:text-white text-black">
       CSARCH2 Simulation Project - Unicode Converter{" "}
      </span>
      <ToggleDark className="dark:text-white" />
    </header>
  );
}

export default Navbar