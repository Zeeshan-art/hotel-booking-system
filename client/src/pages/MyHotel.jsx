import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { myHotels } from "../redux/slice/my-hotel/thunk";

const MyHotel = () => {
  const hotel = useSelector((state) => state.myHotel.myHotelsDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myHotels());
  }, [dispatch]);

  return (
    <div className="space-y-5">
      <div className="flex justify-between align-items-center mb-3">
        <h1 className="text-3xl font-bold">My Hotel</h1>
        <Link
          to="/add-hotels"
          className="bg-indigo-800 p-2 text-white text-xl font-bold hover:bg-indigo-600"
        >
          Add Hotel
        </Link>
      </div>
      {hotel.length > 0 ?
        hotel?.map((hotel, index) => (
          <div className="grid grid-cols1 gap-8" key={index}>
            <div className="flex flex-col p-8 border border-slate-300 rounded-lg gap-2">
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap />
                  {hotel.city},{hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />
                  {hotel.pricePerNight} per night
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  Test city
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.starRating} star rating
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  to={`/edit-hotels/${hotel._id}`}
                  className="bg-indigo-800 p-2 text-white font-bold hover:bg-indigo-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        )) : <div className='flex justify-center p-20'>
          <div className='text-3xl font-bold'>No Hotels Found!</div>
        </div>}
    </div>
  );
};

export default MyHotel;
