import React from 'react'

const Header = () => {
  return (
    <div className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between '>
        <span className='text-white text-3xl font-bold'>SpentHolidays.com</span>
        <button className='bg-white px-3 text-blue-800 font-bold'>Sign In</button>
      </div>
    </div>
  )
}

export default Header
