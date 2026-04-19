'use client'
import React from 'react'
import { WavyBackground } from './ui/wavy-background'
import { AnimatedTooltip } from './ui/animated-tooltip'

function Instructor() {
    const instructors = [
        {
      id: 1,
      name: 'Hemant',
      designation: 'Erin Yeager ',
      image:
        'https://avatars.githubusercontent.com/u/181967205?v=4',
    },
    {
      id: 3,
      name: 'Sidaarth',
      designation: 'Piano Teacher',
      image:
        'https://res.cloudinary.com/dfppijifg/image/upload/v1761213847/IMG_20251023_15312888_uejhfk.jpg',
    },
    {
      id: 4,
      name: 'Ankush Prajapati',
      designation: 'Rock Guitar Specialist',
      image:
        'https://res.cloudinary.com/dfppijifg/image/upload/v1761213847/IMG20250509093319_ewjrfg.jpg',
    },
    ]
  return (
    <div className=' relative h-[40rem] overflow-hidden flex items-center justify-center'>
        <WavyBackground className='h-full w-full max-w-7xl mx-auto flex flex-col items-center justify-center'>
                <h1 className='text-2xl md:text-6xl lg:7xl text-center  font-bold text-white mb-8'
                >Meet Our Instructor</h1>
                <p className='text-base md:text-lg text-white text-center mb-4'
                >Discover the talanted professionalswho will guide your musical journey </p>

                <div className='flex flex-row items-center justify-center mb-10 w-full scale-110'>
                    <AnimatedTooltip items={ instructors}  />
                </div>
        </WavyBackground>
    </div>
  )
}

export default Instructor