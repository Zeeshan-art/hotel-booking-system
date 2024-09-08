import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/auth/thunk";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  console.log(token, "auth_token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(login(data));
    if (!token) {
      console.log("login");
      navigate("/");
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Log In to your Account</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password with 6 or more characters is required",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className="bg-indigo-800 hover:bg-indigo-600 text-white p-2 border rounded font-bold"
        >
          Log In
        </button>
      </span>
      <Link to='/register' className="text-indigo-800 font-bold hover:underline">Create a New Account</Link>
    </form>
  );
};

export default Login;
