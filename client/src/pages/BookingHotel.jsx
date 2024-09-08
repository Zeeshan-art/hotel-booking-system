import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDetails from '../components/ConfirmDetails';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { createPaymentIntent, getHotelById } from '../redux/slice/hotel/thunk';
import stripePromise from '../config/Stripe';
import { Elements } from '@stripe/react-stripe-js';


const BookingHotel = () => {
  const hotel = useSelector((state) => state.hotel.data);
  const paymentIntentData = useSelector((state) => state.hotel.paymentIntentData);

  const token = Cookies.get("token");
  const { user } = token ? jwtDecode(token) : { user: null };
  const { checkIn, checkOut, adultCount, childCount} = useSelector((state) => state.booking);
  const {isLoading} = useSelector(state=> state.hotel)
  const { hotelId } = useParams();
  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;
  const numberOfNights = checkInDate && checkOutDate ? `${Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))} nights` : 'N/A'
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotelById(hotelId));
  }, [dispatch, hotelId]);
  useEffect(()=>{
    dispatch(createPaymentIntent({hotelId,numberOfNights}))
  },[dispatch,hotelId,numberOfNights])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
      <div className="border border-slate-300 rounded-lg p-4 h-fit">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Your Booking details</h3>
          <div>
            <label className="text-md">
              Location:
              <div className="text-md font-bold">{hotel.name}, {hotel.city}, {hotel.country}</div>
            </label>
          </div>
          <div className="flex justify-between">
            <label className="text-md">
              Check-in:
              <div className="text-md font-bold">{checkInDate ? checkInDate.toDateString() : 'N/A'}</div>
            </label>
            <label className="text-md">
              Check-out:
              <div className="text-md font-bold">{checkOutDate ? checkOutDate.toDateString() : 'N/A'}</div>
            </label>
          </div>
          <div>
            <label className="text-md">
              Total length of stay:
              <div className="text-md font-bold">
                {numberOfNights}
              </div>
            </label>
          </div>
          <div>
            <label className="text-md">
              Guests:
              <div className="text-md font-bold">{adultCount} Adults & {childCount} Children</div>
            </label>
          </div>
        </div>
      </div>
      <div className="border border-slate-300 rounded-lg p-4">
        {user && paymentIntentData && (
          <Elements stripe={stripePromise} options={{ clientSecret: paymentIntentData.clientSecret }}>
            <ConfirmDetails currentUser={user} />
          </Elements>)}

      </div>
    </div>
  );
};

export default BookingHotel;
