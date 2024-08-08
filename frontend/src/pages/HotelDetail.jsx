import React, { useEffect } from "react";
import img from "../assests/Default_Certainly_Heres_a_logo_design_idea_for_your_channelDes_0.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import GeustInfo from "../components/GeustInfo";
import { getHotelById } from "../redux/slice/hotel/thunk";

const HotelDetail = () => {
  const hotel = useSelector((state) => state.hotel.data);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotelById(id));
  }, [id, dispatch]);
  if (hotel.length !== 0) {
    return (
      <div className="space-y-6">
        <div>
          <span className="flex">
            {Array.from({ length: hotel?.starRating }).map(() => (
              <AiFillStar className="fill-yellow-400" />
            ))}
          </span>
          <h1 className="text-3xl font-bold">{hotel.city}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {hotel?.imageUrls.map((image) => (
            <div className="h-[300px]">
              <img
                className=" h-full w-full rounded-md object-cover object-center"
                src={image}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {hotel.facilities.map((facility) => (
            <span className="p-3 text-md font-bold rounded-sm border border-slate-300 bg-gray-100">
              {facility}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
          <div className="whitespace-pre-line">{hotel.description}</div>
          <div className="h-fit">
            <GeustInfo
              pricePerNight={hotel.pricePerNight}
              hotelId={hotel._id}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default HotelDetail;
