import { useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import './App.css'

function App() {
  const [brek, setBrek] = useState(5)
  const [sesi, setSesi] = useState(25)

  return (
    <>
      <h1>25 + 5 Clock</h1>
      <div className="length-control">
          <h2>Break Length</h2>
        <div className="break-length">
          <button onClick={() => setBrek(brek + 1)}><FaArrowUp /></button>
          <h3>{brek}</h3>
          <button onClick={() => setBrek(brek - 1)}><FaArrowDown /></button>
        </div>
      </div>
      <div className="length-control">
          <h2>Session Length</h2>
        <div className="break-length">
          <button onClick={() => setSesi(sesi + 1)}><FaArrowUp /></button>
          <h3>{sesi}</h3>
          <button onClick={() => setSesi(sesi - 1)}><FaArrowDown /></button>
        </div>
      </div>
      <div className="session-wrapper">
        <h2>Session</h2>
        <h1>{sesi}:00</h1>
      </div>
      <div className="btn-wrapper">
        <button onClick={() => alert("clicked")}><FaPlay /></button>
        <button><FaPause /></button>
        <button><FaRedo /></button>
      </div>
    </>
  )
}

export default App
