import React, { useState } from "react";

const StarRating = ({ selectedStars, onChange }) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-bold mb-2">Properly Rating</h4>
      <div className="">
        {["5", "4", "3", "2", "1"].map((stars) => (
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="rounded"
              value={stars}
              checked={selectedStars.includes(stars)}
              onChange={onChange}
            />
            <span>{stars} Stars</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
