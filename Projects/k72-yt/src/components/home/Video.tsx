import React from 'react'

const Video = () => {
  return (
    <div className='h-full w-full'>
        <video autoPlay loop muted className='object-cover w-full h-full' src="/video/video.mp4"></video>
    </div>
  )
}

export default Video