import React from "react";
import hotelFacilites from "../config/HotelFaciliteis";

const HotelFacilities = ({ selectedFacilties, onChange }) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-sm font-bold mb-2">Hotel Facilities</h4>
      <div className="">
        {hotelFacilites.map((facilities) => (
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="rounded"
              value={facilities}
              checked={selectedFacilties.includes(facilities)}
              onChange={onChange}
            />
            <span>{facilities}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelFacilities;
