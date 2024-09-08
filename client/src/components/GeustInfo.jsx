import React from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiMoney } from 'react-icons/bi';
import { setBookingDetails } from '../redux/slice/booking/bookingSlice';

const GeustInfo = ({ pricePerNight, hotelId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = () => {
    dispatch(setBookingDetails({
      checkIn: checkIn ? checkIn.toISOString() : null,
      checkOut: checkOut ? checkOut.toISOString() : null,
      adultCount: watch('adultCount'),
      childCount: watch('childCount'),
    }));
    navigate(`/login`);
  };

  const onSubmit = () => {
    dispatch(setBookingDetails({
      checkIn: checkIn ? checkIn.toISOString() : null,
      checkOut: checkOut ? checkOut.toISOString() : null,
      adultCount: watch('adultCount'),
      childCount: watch('childCount'),
    }));
    navigate(`/${hotelId}/booking`);
  };

  return (
    <div className="bg-blue-100 flex flex-col p-4 gap-5">
      <div className="text-xl font-bold flex items-center">
        <BiMoney className="mr-1" />
        <h2>{pricePerNight} per night</h2>
      </div>
      <form className="flex flex-col gap-5" onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div>
          <DatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue('checkIn', date)}
            minDate={minDate}
            maxDate={maxDate}
            startDate={checkIn}
            endDate={checkOut}
            selectsStart
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <div>
          <DatePicker
            required
            selected={checkOut}
            onChange={(date) => setValue('checkOut', date)}
            minDate={checkIn}
            maxDate={maxDate}
            startDate={checkIn}
            endDate={checkOut}
            selectsEnd
            placeholderText="Check-out Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <div className="flex flex-1 bg-white px-2 py-1 gap-2">
          <label className="items-center flex flex-1">
            Adults:
            <input
              required
              type="number"
              min={1}
              max={50}
              className="w-full p-1 focus:outline-none font-bold"
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: 'There must be at least one adult',
                },
                valueAsNumber: true
              })}
            />
            {errors.adultCount && (
              <span className="text-red-500 text-sm font-semibold">
                {errors.adultCount?.message}
              </span>
            )}
          </label>
          <label className="items-center flex flex-1">
            Children:
            <input
              type="number"
              min={0}
              max={20}
              className="w-full p-1 focus:outline-none font-bold"
              required
              {...register("childCount", {
                required: "This field is required",
                valueAsNumber: true,
              })}
            />
            {errors.childCount?.message && (
              <span className="text-red-500 text-sm font-semibold">
                {errors.childCount?.message}
              </span>
            )}
          </label>
        </div>
        <button type='submit' className="bg-indigo-800 hover:bg-indigo-600 text-white p-2 text-center">
          {isLoggedIn ? "Book Now" : "Sign in for booking"}
        </button>
      </form>
    </div>
  );
};

export default GeustInfo;
