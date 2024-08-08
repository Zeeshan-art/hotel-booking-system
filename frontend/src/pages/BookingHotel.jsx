import React from "react";
import ConfirmDetails from "../components/ConfirmDetails";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const BookingHotel = () => {
  const token = Cookies.get("token");
  const {user} = token ? jwtDecode(token) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
      <div className="border border-slate-300 rounded-lg p-4 h-fit">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold ">Your Booking details</h3>
          <div>
            <label className="text-md">
              Location:
              <div className="text-md font-bold ">Dublin</div>
            </label>
          </div>
          <div className="flex justify-between">
            <label className="text-md">
              Check-in:
              <div className="text-md font-bold ">Wed Dec 13 2024</div>
            </label>
            <label className="text-md">
              Check-out:
              <div className="text-md font-bold ">Wed Dec 15 2024</div>
            </label>
          </div>
          <div>
            <label className="text-md">
              Total length of stay:
              <div className="text-md font-bold ">3 nights</div>
            </label>
          </div>
          <div>
            <label className="text-md">
              Guests:
              <div className="text-md font-bold ">2 Adults & 3 Children</div>
            </label>
          </div>
        </div>
      </div>
      <div className="border border-slate-300 rounded-lg p-4">
        <ConfirmDetails currentUser={user} />
      </div>
    </div>
  );
};

export default BookingHotel;
