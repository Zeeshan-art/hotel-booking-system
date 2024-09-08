import React from "react";
import { useFormContext } from "react-hook-form";
import hotelTypes from "../../config/HotelType";

const HotelTypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const typeWatch = watch("type");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Type</h1>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
        {hotelTypes.map((type, index) => (
          <label key= {index}
            className={
              typeWatch === type
                ? "cursor-pointer text-sm bg-blue-300 rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer text-sm bg-gray-300 rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelTypeSection;
