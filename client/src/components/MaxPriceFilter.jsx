import React from "react";

const MaxPriceFilter = () => {
  return (
    <div>
      <h4 className="text-md font-bold mb-2">Max Price</h4>
      <select className="w-full p-2 rounded-lg border border-slate-300">
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 400, 500].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default MaxPriceFilter;
