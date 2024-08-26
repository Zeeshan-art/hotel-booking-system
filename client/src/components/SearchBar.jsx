import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchHotel } from "../redux/slice/hotel/thunk";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load state from sessionStorage when the component mounts
  useEffect(() => {
    const savedState = sessionStorage.getItem("searchBarState");
    if (savedState) {
      const {
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
      } = JSON.parse(savedState);
      setDestination(destination);
      setCheckIn(new Date(checkIn));
      setCheckOut(new Date(checkOut));
      setAdultCount(adultCount);
      setChildCount(childCount);
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    const state = {
      destination,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      adultCount,
      childCount,
    };
    sessionStorage.setItem("searchBarState", JSON.stringify(state));
  }, [destination, checkIn, checkOut, adultCount, childCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkInDate = checkIn ? checkIn.toISOString() : new Date().toISOString();
    const checkOutDate = checkOut ? checkOut.toISOString() : new Date().toISOString();

    const queryParams = new URLSearchParams({
      destination:destination,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adultCount: adultCount.toString(),
      childCount: childCount.toString(),
    }).toString();
    dispatch(searchHotel(queryParams));
    navigate(`/search?${queryParams}`);
  };

  const handleClear = () => {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 bg-orange-400 p-2 gap-2 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="text-md w-full focus:outline-none"
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
      <div className="flex gap-1">
        <button
          type="submit"
          className="w-2/3 bg-blue-600 p-2 text-white h-full font-bold text-xl hover:bg-blue-500"
        >
          Search
        </button>
        <button
          type="button"
          className="w-1/3 bg-red-600 p-2 text-white h-full font-bold text-xl hover:bg-red-500"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
