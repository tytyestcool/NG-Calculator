import { useState } from 'react'
import './App.css'
import NavBar from "./assets/Main/NavBar.jsx";

function Home() {
  const [count, setCount] = useState(10)

  return (
    <>
       <NavBar></NavBar>
        <div className={"pagecontent"}>
            <h1>Calculator !</h1>
        </div>
    </>
  )
}

export default Home
