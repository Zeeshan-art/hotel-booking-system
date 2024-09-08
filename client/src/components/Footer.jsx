import React from 'react'

const Footer = () => {
  return (
    <div className='bg-indigo-800 py-10 px-2 sm:px-0'>
      <div className='container mx-auto flex flex-col md:flex-row justify-center md:justify-between md:items-center items-start'>
        <span className='text-3xl text-white font-bold mb-4 sm:mb-0'>SpentHolidays.com</span>
        <span className='text-white font-bold tracking-tight flex gap-4 items-center mt-1'>
             <p className='cursor-pointer'>Privacy Policy</p>
             <p className='cursor-pointer'>Terms of Service</p>
        </span>
      </div>
    </div>
  )
}

export default Footer;
