import { useState } from 'react'
import Navbar from './components/Navbar'
import Instructions from './components/Instructions'
import IO from './components/IO'


function App() {
  return (
    <div className="dark:bg-black dark:text-white h-screen overflow-auto flex flex-col">
      <Navbar/>

    <main className="md:px-3 flex flex-col-reverse flex-grow justify-cente r pt-16 md:flex-row">

      <div className="md:w-2/5 pb-10 dark:bg-black">
        <Instructions/>
      </div>

      <div className="md:w-3/5 flex-grow px-14">
          <IO/>
      </div>
    
    </main>
    </div>
  )
}



export default App

