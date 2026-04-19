import React from 'react'
import { useState,useContext } from 'react'
import UserContext from '../context/UserContext'
function Login() {
    const  [Username,setUsername]=useState('')
    const  [Password,setPassword]=useState('')
    const {setUser}=useContext(UserContext)
    const handelSubmit=(e)=>{
        e.preventDefault()
        setUser({Username,Password})
    }
  return (
    <div>
      <input type="text" placeholder='username' value={Username} onChange={(e)=>setUsername(e.target.value)} name="" id="" />
      {'  '}
        <input type="password" placeholder='password' value={Password} onChange={(e)=>setPassword(e.target.value)} name="" id="" />
        <button onClick={handelSubmit}>Login</button>
    </div>
  )
}

export default Login
