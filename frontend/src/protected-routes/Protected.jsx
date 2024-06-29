import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Protected = (props) => {
  const { Component } = props;

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token,  "token");
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
