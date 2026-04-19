'use client'
import React, { use } from 'react'

export default function page({params}:any) {
    const {id}:any=use(params)
  return (
    <div>{id}</div>
  )
}
