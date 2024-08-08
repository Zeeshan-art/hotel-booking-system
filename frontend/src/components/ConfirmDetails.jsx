import React from "react";
import { useForm, useFormContext } from "react-hook-form";

const ConfirmDetails = ({ currentUser }) => {
  const { register, formState: { errors }, } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });
  return (
    <form className=" grid grid-cols-1 gap-4">
      <h1 className="text-xl font-bold">Confirm Your Detail</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <label className="mb-1">
          First Name
          <input
            type="text"
            className="bg-slate-200 px-2 py-1 w-full rounded-sm"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="mb-1">
          Last Name
          <input
            type="text"
            className="bg-slate-200 px-2 py-1 w-full rounded-sm"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm flex-1">
        Email
        <input
          type="email"
          className="border bg-slate-200 rounded-sm font-normal w-full py-1 px-2"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <div className="">
        <h2 className="text-md semibold">Your Price Summary</h2>
        <label>
          <div className="p-2 bg-blue-200 border rounded">
            <h3 className="text-md font-bold ">123</h3>
            <div>Tax and charges include</div>
          </div>
        </label>
      </div>
      <label className="flex-1 text-sm font-bold">
        Payment Details
        <input
          type="card"
          className="border border-slate-300 rounded w-full py-1 px-2 font-normal"
        />
      </label>
      <div className="flex justify-end">
        <button className="p-2 bg-blue-700 w-fit justify-end text-white">
          Continue Booking
        </button>
      </div>
    </form>
  );
};

export default ConfirmDetails;
