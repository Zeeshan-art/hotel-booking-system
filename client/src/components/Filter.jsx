import React, { useState } from 'react'
import StarRating from "../components/StarRating";
import HotelType from "../components/HotelType";
import HotelFacilities from "../components/HotelFacilities";
import MaxPriceFilter from "../components/MaxPriceFilter";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
const Filter = ({ handleFacilityChange, selectedFacilties,
    handleStarChange, selectedStars,
    handleTypeChange, selectedTypes,
    setSelectedPrice, selectedPrice }) => {
    const [filterVisible, setFilterVisible] = useState(false);
    return (
        <div>
            <div className="lg:hidden flex justify-between items-center mb-4 gap-2">
                <h3 className="text-xl font-bold">Filter By:</h3>
                <button
                    className="p-2 text-white bg-indigo-800 hover:bg-indigo-600 rounded-md"
                    onClick={() => setFilterVisible(!filterVisible)}
                >
                    {filterVisible ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                    <span className="sr-only">
                        {filterVisible ? "Close Filters" : "Open Filters"}
                    </span>
                </button>
            </div>

            <div className={`${filterVisible ? "block" : "hidden"} lg:block rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10`}>
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b pb-5 border-slate-300">Filter By:</h3>
                    <StarRating onChange={handleStarChange} selectedStars={selectedStars} />
                    <HotelType onChange={handleTypeChange} selectedTypes={selectedTypes} />
                    <HotelFacilities onChange={handleFacilityChange} selectedFacilties={selectedFacilties} />
                    <MaxPriceFilter selectedPrice={selectedPrice} onChange={(value) => setSelectedPrice(value)} />
                </div>
            </div>
        </div>
    )
}

export default Filter