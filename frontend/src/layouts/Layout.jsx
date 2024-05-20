import React from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default Layout
