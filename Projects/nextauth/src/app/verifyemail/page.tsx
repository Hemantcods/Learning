'use client'
import axios from 'axios'
import Link from 'next/link'
import React,{useState,useEffect} from 'react'

export default function VerifyEmailPage() {
  // const router=useRouter()
  const [token, settoken] = useState("")
  const [Verified, setVerified] = useState(false)
  const [Error, setError] = useState("")

  const verifyUseremail=async()=>{
    try {
      await axios.post("/api/users/verifyemail",{token})
      setVerified(true)
      setError("")
    } catch (error:any) {
      setError(error.message)
      console.log(Verified)
      console.log(error.message)
    }
  }

  useEffect(()=>{
    setError("")
    const urltoken=window.location.search.split("=")[1]
    settoken(urltoken||"")
    
    // with next js utilization
    // const {query}=router
    // const urltoken=query.token
  })
  
  useEffect(()=>{
    setError("")
    if (token.length>0){
      verifyUseremail()
    }
  },[token])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl'>
        Verify email
      </h1>
      {Verified && (
        <div>
          <h2>Verified</h2>
          <Link href={"/login"} >Login</Link>
        </div>
      )}
      {
        Error.length>0 && (
          <div >
            {Error}
            
          </div>
        )
      }
    </div>
  )
}

