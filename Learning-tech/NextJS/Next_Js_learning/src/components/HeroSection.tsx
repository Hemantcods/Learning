import Link from 'next/link'
import React from 'react'
import { Spotlight } from './ui/spotlight'
import { Button } from './ui/moving-border'

const HeroSection = () => {
  return (
    <div
    className='h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0'
    >
        <Spotlight
            className='-top-40 left-0 md:-top-20 md:left-60'
            fill='white '
            />

        <div className='py-4 relative z-10 w-full text-center'>
            <h1 className='mt-20 md:mt-0 text-4xl md:text-8xl font-bold bg-clip-text text-transparent bg-linear-to-b  from-neutral-50 to-neutral-400'>
                Master the Art of Music
            </h1>
            <p className='mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'>
                Dive into our comprehensive courses and unleash your musical potential with us. Weather you're a beginner or an experienced musician, we have something for everyone, join us today!
            </p>
            <div className="mt-4">
                <Button 
                borderRadius='1.75rem'
                className='bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800'
                >
                <Link  href={'/course'}>
                    Explore Courses
                </Link>
                </Button>
            </div>
        </div>
    
    
    
    </div>
  )
}

export default HeroSection