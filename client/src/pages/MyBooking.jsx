import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { myBookings } from '../redux/slice/booking/thunk';
const MyBooking = () => {
  const { bookings, message } = useSelector(state => state?.booking)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(myBookings())
  }, [])
  if(bookings.length ===0){
    return <div>No Booking Found</div>
  }
  return (
    <div className='space-y-4'>
      {bookings && bookings.map((booking) => (
        <div className='w-full border border-slate-300 lg:rounded grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 p-4'>
          <div className='h-[300px]'>
            <img src={booking.imageUrls[0]} alt='' className='h-full w-full object-fit object-cover object-center' />
          </div>
          <div className='space-y-3'>
            <div>
              <h1 className='text-2xl font-bold'>{booking.hotelName}</h1>
              <span className='text-gray-500 text-sm font-semibold'>{booking.hotelCity}, {booking.hotelCountry}</span>
            </div>
            <div className='font-bold'>Check-In: {booking.checkIn}</div>
            <div className='font-bold'>Check-Out: {booking.checkOut}</div>
            <div className='font-bold'>Adult: {booking.adultCount}, Children: {booking.childCount}</div>
          </div>
        </div>
      ))}
    </div>

  )
}

export default MyBooking
