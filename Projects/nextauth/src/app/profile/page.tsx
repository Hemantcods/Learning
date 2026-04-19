'use client'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function ProfilePage() {
  const router=useRouter()
  const [data, setdata] = useState(null)
  const getUserDetails=async()=>{
    const res=await axios.post("/api/users/me")
    console.log(res.data.user._id)
    setdata(res.data.user._id)
    toast.success("fetched data sucessfully")
  }
  const logout=async()=>{
    try {
      axios.post('/api/users/logout')
      toast.success("Logout Sucessfull")
      router.push("/login")
    } catch (error:any) {
      console.log(error.message)      
      toast.error(error.message)
    }
  }
  return (
    <>
    <div><Toaster/></div>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data===""?"No data":<Link href={`/profile/${data}`}>{data}</Link> }
      </h2>
      <hr />
      <button className='bg-blue-600 w-20 rounded-xl hover:cursor-pointer hover:bg-blue-500 m-4' onClick={getUserDetails}>
        get Data
      </button>
      <button className='bg-red-600 w-20 rounded-xl hover:cursor-pointer hover:bg-red-500' onClick={logout}>
        Logout
      </button>
    </div>
    </>
  )
}
