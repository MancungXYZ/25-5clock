import { useState, useEffect } from 'react'
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, seTtimeLeft] = useState(1500);
  const [timingType, setTimingtype] = useState("SESSION");
  
  const [play, setPlay] = useState(false);
  
  const timeout = setTimeout(() => {
    if(timeLeft && play){
      seTtimeLeft(timeLeft - 1)
    }
  }, 1000);
  
  const handleBreakIncrease = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  
  const handleBreakDecrease = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  
   const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      seTtimeLeft(timeLeft + 60)
    }
  }
  
  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      seTtimeLeft(timeLeft - 60)
    }
  }
  
  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
  
  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      seTtimeLeft(breakLength * 60)
      setTimingtype("BREAK")
      audio.play()
    }
    if(!timeLeft && timingType === "BREAK"){
      seTtimeLeft(sessionLength * 60)
      setTimingtype("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play){
      timeout
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }
  
  useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])
 
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <>
      <h1>25 + 5 Clock</h1>
      <div className="length-control">
          <h2 id='break-label'>Break Length</h2>
        <div id='break-length' className="break-length">
          <button disabled={play} id='break-increment' onClick={handleBreakIncrease}><FaArrowUp /></button>
          <h3>{breakLength}</h3>
          <button disabled={play} id='break-decrement' onClick={handleBreakDecrease}><FaArrowDown /></button>
        </div>
      </div>
      <div className="length-control">
          <h2 id='session-label'>Session Length</h2>
        <div id='session-length' className="break-length">
          <button disabled={play} id='session-increment' onClick={handleSessionIncrease}><FaArrowUp /></button>
          <h3>{sessionLength}</h3>
          <button disabled={play} id="session-decrement" onClick={handleSessionDecrease}><FaArrowDown /></button>
        </div>
      </div>
      <div className="session-wrapper">
        <h2 id='timer-label'>{title}</h2>
        <h1 id='time-left'>{timeFormatter()}</h1>
      </div>
      <div className="btn-wrapper">
        <button id='start_stop' onClick={handlePlay}><FaPlay /></button>
        <button id='reset' onClick={handleReset}><FaRedo /></button>
        <audio
          id="beep" 
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </>
  )
}

export default App
