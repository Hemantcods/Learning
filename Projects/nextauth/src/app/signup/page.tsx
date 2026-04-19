'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function SignUppage() {
  const router=useRouter()
  const [user,setuser]=useState({
    email:"",
    password:"",
    username:""
  })
  const [buttonDisabled,setbuttonDisabled]=useState(true)
  const [loading,setloading]=useState(false)
  const onSignup=async()=>{
    try {
      setloading(true)
      const response=await axios.post("/api/users/signup",user)
      console.log("Signup was sucessfull");
      setloading(false) 
      router.push('/login')     
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }
  useEffect(()=>{
    if(user.username.length>0 && user.email.length>0 && user.password.length>0){
      setbuttonDisabled(false)
    }
    else{
      setbuttonDisabled(true)
    }
  },[user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>
        {loading ? "Processing":"Signup"}
      </h1> 
      <hr />
      <label htmlFor="username">username</label>
      <input 
      className='p-2 corder border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white'
      id='username' value={user.username} onChange={(e)=>setuser({...user,username:e.target.value})} type="text" />
      <hr />
      <label htmlFor="username">email</label>
      <input 
      className='p-2 corder border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white'
      id='username' value={user.email} onChange={(e)=>setuser({...user,email:e.target.value})} type="text" />
      <hr />
      <label htmlFor="username">password</label>
      <input 
      className='p-2 corder border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white'
      id='username' value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})} type="password" />
      <button
      onClick={onSignup}
      disabled={buttonDisabled}
      className='p-2 border-gray-300 bg-red-500 rounded-lg '
      >
        {buttonDisabled?'Please fill the form':'Signup'}
      </button>
      <Link href={'/login'}>Visit login page</Link>
    </div>
  )
}

