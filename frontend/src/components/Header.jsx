import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between align-items-center">
        <Link to = '/' className="text-white text-3xl font-bold">SpentHolidays.com</Link>
        {isLoggedIn ? (
          <>
            <Link
              to="/my-bookings"
              className="text-white flex items-center px-3 font-bold hover:bg-blue-600"
            >
              My Bookings
            </Link>
            <Link
              to="/my-hotels"
              className="text-white flex items-center px-3 font-bold hover:bg-blue-600"
            >
              My Hotels
            </Link>
            <SignOutButton />
          </>
        ) : (
          <Link
            className="flex items-center bg-white px-3 text-blue-800 font-bold hover-bg-white-500"
            to="/login"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
