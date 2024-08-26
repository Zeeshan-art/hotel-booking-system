import React from "react";
import { useFormContext } from "react-hook-form";
import hotelFacilites from "../../config/HotelFaciliteis";

const HotelFacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Facilities</h1>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilites.map((facilities, index) => (
          <label className="text-sm flex gap-1 text-gray-700" key={index}>
            <input
              type="checkbox"
              value={facilities}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) return true;
                  return "At least one facility is required";
                },
              })}
            />
            <span className="text-sm">{facilities}</span>
          </label>
        ))}
      </div>
      {errors.facilities?.message && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities?.message}
        </span>
      )}
    </div>
  );
};

export default HotelFacilitiesSection;
