import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Sketch } from './Sketch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Sketch/>
  )
}

export default App
