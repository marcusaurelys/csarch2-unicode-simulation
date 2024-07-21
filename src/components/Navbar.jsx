function Navbar(){
    return (
        <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6 shadow-lg shadow-sm mb-5">
          
            
            <span className="text-lg font-semibold flex flex-row gap-3"><MountainIcon className="h-6 w-6" /> UTF-fy</span>


        </header>
      )
}

//TODO: Make a Logo
function MountainIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }

export default Navbar