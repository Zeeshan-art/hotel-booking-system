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
      className="bg-white px-3 text-blue-800 font-bold"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
