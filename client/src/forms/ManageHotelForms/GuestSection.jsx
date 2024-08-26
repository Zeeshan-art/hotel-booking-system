import React from "react";
import { useFormContext } from "react-hook-form";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Guests</h1>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            min={0}
            type="number"
            {...register("adultCount", {
              required: "This field is required",
            })}
            className="border rounded w-full py-2 px-3 font-normal"
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text sm font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            min={0}
            type="number"
            {...register("childCount", {
              required: "This field is required",
            })}
            className="border rounded w-full py-2 px-3 font-normal"
          />
          {errors.childrenCount?.message && (
            <span className="text-red-500 text sm font-bold">
              {errors.childrenCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
