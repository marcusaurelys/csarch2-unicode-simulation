import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'

function App() {
  const [input, setInput] = useState("")

  return (
    <>
      <Navbar/>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="border-blue-50 border-8"/> 
    </>
  )
}

export default App
