import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
  return (
    <div className='font-[font1] pt-5 text-center'>
        <div className='text-[10vw] uppercase leading-[8vw] items-center justify-center'>
            The spark
        </div>
        <div className='text-[10vw] uppercase leading-[8vw] flex items-center justify-center'>
            who
            <div className='h-[8vw] w-[17vw] rounded-full  items-center justify-center overflow-hidden'>
                <Video/>
            </div>
        </div>
        <div className='text-[10vw] uppercase leading-[8vw] items-center justify-center mt-3'>
            generates

        </div>
        <div className='text-[10vw] uppercase leading-[8vw] items-center justify-center'> 
            there 
        </div>
        <div className='text-[10vw] uppercase leading-[8vw] items-center justify-center'> 
            creativity
        </div>
    </div>
  )
}

export default HomeHeroText