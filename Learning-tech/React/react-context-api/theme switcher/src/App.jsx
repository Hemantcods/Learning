
import './App.css'
import Card from './Componets/card'
import ThemeBtn from './Componets/ThemeBtn'
import { Themeprovider } from './Contexts/Theme'
import { useEffect, useState } from 'react'


function App() {
  const [thememode,setThememode]=useState('light')

  const lightmode=()=>{
    setThememode('light')
  }
  const darkmode=()=>{
    setThememode('dark')
  }

  // actual change in theme
  useEffect(()=>{
    document.querySelector('html').classList.remove('dark','light')
    document.querySelector('html').classList.add(thememode)
  },[thememode])
  

  return (
    <Themeprovider value={{thememode,darkmode,lightmode}}>
    <>
      
<div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        <ThemeBtn />
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                       <Card />
                    </div>
                </div>
            </div>

    </>
    </Themeprovider>
  )
}

export default App
