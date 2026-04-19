import React, { useState } from 'react'
import { useEffect} from 'react'
import { useLoaderData } from 'react-router-dom'
function Github() {
    const data=useLoaderData()
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/hemantcods')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setdata(data)
    //     });
        
    // },[])
  return (
    <>
      <div className='m-4 bg-green-500 text-3xl' > Github Followers:{data.followers}
        <img src={data.avatar_url} alt="" className='width-300' />
      </div>
    </>
  )
}

export default Github

export const account_info_loader= async ()=>{
    const res=await fetch('https://api.github.com/users/hemantcods')
    if(!res.ok){
        throw new Error('Failed to fetch data')
    }
    const data=await res.json()
    return data
}