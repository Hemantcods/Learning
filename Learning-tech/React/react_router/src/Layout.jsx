import React from 'react'
import Header from './componets/Header/header'
import Footer from './componets/Footer/footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />

    </>
  )
}

export default Layout
