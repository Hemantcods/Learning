import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Agence from './Pages/Agence'
import Projects from './Pages/Projects'

const App = () => {
  return (
    <div className='text-white'>
      {/* <Link className='text-sm px-2' to={"/"} >Home</Link>
      <Link className='text-sm px-2' to={"/agence"} >Agence</Link>
      <Link className='text-sm px-2'  to={"/projects"} >Projects</Link> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/agence' element={<Agence/>} />
        <Route path='/projects' element={<Projects/>} />
      </Routes>
    </div>
  )
}

export default App