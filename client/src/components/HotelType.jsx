import React from "react";
import hotelTypes from "../config/HotelType";

const HotelType = ({ selectedTypes, onChange }) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-bold mb-2">Hotel Types</h4>
      <div className="">
        {hotelTypes.map((types) => (
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="rounded"
              value={types}
              checked={selectedTypes.includes(types)}
              onChange={onChange}
            />
            <span>{types}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelType;
