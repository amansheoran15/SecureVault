import { useState } from 'react'

import './App.css'

import Login from "./pages/Login.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/*<div className="text-4xl font-serif text-center mt-10"> Initial commit for MyLocker </div>*/}
        <Login></Login>
    </>
  )
}

export default App
