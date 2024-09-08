import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/auth/thunk";
import Cookies from "js-cookie";

const SignOutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <button
      className="bg-white p-3 text-indigo-800 font-bold hover:bg-gray-200"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
