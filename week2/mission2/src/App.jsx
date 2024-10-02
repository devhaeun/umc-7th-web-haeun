// import { useState } from 'react'
import './App.css'
import Poster from './Poster'

function App() {

  return (
    <div id='container'>
      {Array.from({length:20}, (v,i)=>i).map((val) => {
        return <Poster key={val} val={val} />
      })}
    </div>
  )
}

export default App
