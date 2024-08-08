import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { BiMoney } from "react-icons/bi";
import { Link } from "react-router-dom";
const GeustInfo = ({ pricePerNight, hotelId }) => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <div className="bg-blue-100 flex flex-col p-4 gap-5">
      <div className="text-xl font-bold flex items-center">
        <BiMoney className="mr-1" />
        <h2>{pricePerNight} per night</h2>
      </div>

      <form className=" flex flex-col gap-5">
        <div>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
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
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
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
        <div className="flex bg-white px-2 py-1 gap-2">
          <label className="items-center flex">
            Adults:
            <input
              type="number"
              min={1}
              max={50}
              value={adultCount}
              onChange={(e) => setAdultCount(e.target.value)}
              className="w-full p-1 focus:outline-none font-bold"
            />
          </label>
          <label className="items-center flex">
            Children:
            <input
              type="number"
              min={0}
              max={20}
              value={childCount}
              onChange={(e) => setChildCount(e.target.value)}
              className="w-full p-1 focus:outline-none font-bold"
            />
          </label>
        </div>
        <Link to={`/${hotelId}/booking`} className="bg-blue-700 text-white p-2 text-center">
          Book Now
        </Link>
      </form>
    </div>
  );
};

export default GeustInfo;
