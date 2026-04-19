import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserContextProvider from './context/UserContextProvider'
import Login from './Componets/login'
import Profile from './Componets/profile'

function App() {

  return (
    <UserContextProvider>
      <h1>Login Page</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
