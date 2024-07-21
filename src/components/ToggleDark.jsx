import { useState } from "react"
import { SunIcon } from "@heroicons/react/24/outline"
import { MoonIcon } from "@heroicons/react/24/outline"

function ToggleDark(){

    const [dark, setDark] = useState('false')

    const darkModeHandler = () => {
        document.body.classList.toggle("dark")
        setDark(!dark)
        
    }

    return (
        <button className="w-7 flex items-center justify-center " onClick={()=> darkModeHandler()}>
        {
            
            dark && <SunIcon className="dark:text-white text-black"/> // render sunny when dark is true
        }
        {
            !dark && <MoonIcon className="dark:text-white text-black"/> // render moon when dark is false
        }
    </button>
    )

}

export default ToggleDark