import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchHotel } from "../redux/slice/hotel/thunk";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { updateFilters, updateSearchParams } from "../redux/slice/hotel/hotelSlice";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const filters = useSelector((state) => state.hotel.filters); // Get filters from Redux
  const searchParamsState = useSelector((state) => state.hotel.searchParams); // Get filters from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkInDate = checkIn ? checkIn.toISOString() : new Date().toISOString();
    const checkOutDate = checkOut ? checkOut.toISOString() : new Date().toISOString();

    const searchQuery = {
      destination,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adultCount: adultCount.toString(),
      childCount: childCount.toString(),
    };

    // Update the filters in Redux
    dispatch(updateSearchParams(searchQuery));
    const searchParams = ({
      ...searchQuery,
      ...filters
    })
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/search?${queryString}`);
    dispatch(searchHotel(new URLSearchParams(searchParams)));
  };

  const handleClear = () => {
    console.log('Clear button clicked');
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);
    dispatch(updateFilters({})); // Clear filters
    dispatch(updateSearchParams({})); // Clear searchParams
    navigate(`/search`);
    console.log('Filters and search params cleared');
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="container mx-auto">
      <div className="px-2 sm:px-0">

        <form
          onSubmit={handleSubmit}
          className="-mt-8 bg-orange-400 p-2 gap-2 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center "
        >
          <div className="flex flex-row items-center flex-1 bg-white p-2">
            <MdTravelExplore size={25} className="mr-2" />
            <input
              required
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
                required
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
                required
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
              required
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
              required
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
              className="w-2/3 bg-indigo-800 hover:bg-indigo-600 p-2 text-white h-full font-bold text-xl"
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
      </div>
    </div>
  );
};

export default SearchBar;
