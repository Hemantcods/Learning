import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
  return (
    <div className='font-[font1] pt-5 text-center sm:gap-y-5 lg:mt-0 mt-72'>
        <div className='text-[11.5vw] lg:text-[9xl] sm:text-[8vw] uppercase lg:leading-[8vw] leading-[8vw] sm:leading-[6vw] items-center justify-center'>
            The spark
        </div>
        <div className='text-[11.5vw] lg:text-[9xl] sm:text-[8vw] uppercase lg:leading-[8vw] leading-[8vw] sm:leading-[6vw] flex items-center justify-center'>
            who
            <div className='h-[8vw] w-[17vw] rounded-full  items-center justify-center overflow-hidden'>
                <Video/>
            </div>
        </div>
        <div className='text-[11.5vw] lg:text-[9xl] sm:text-[8vw] uppercase lg:leading-[8vw] leading-[8vw] sm:leading-[6vw] items-center justify-center mt-3'>
            generates there 
        </div>
        <div className='text-[11.5vw] lg:text-[9xl] sm:text-[8vw] uppercase lg:leading-[8vw] leading-[8vw] sm:leading-[6vw] items-center justify-center'> 
            creativity
        </div>
    </div>
  )
}

export default HomeHeroText