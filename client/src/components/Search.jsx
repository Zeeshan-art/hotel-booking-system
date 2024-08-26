import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import SearchCard from "./SearchCard";
import Pagination from "./Pagination";
import StarRating from "./StarRating";
import HotelType from "./HotelType";
import HotelFacilities from "./HotelFacilities";
import { searchHotel } from "../redux/slice/hotel/thunk";
import MaxPriceFilter from "./MaxPriceFilter";

const Search = () => {
  const searchResult = useSelector((state) => state.hotel.searchResult);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFacilties, setSelectedFacilties] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleStarChange = (e) => {
    const selected = e.target.value;
    const updatedStars = e.target.checked
      ? [...selectedStars, selected]
      : selectedStars.filter((stars) => stars !== selected);
    setSelectedStars(updatedStars);
  };

  const handleTypeChange = (e) => {
    const selected = e.target.value;
    const updatedTypes = e.target.checked
      ? [...selectedTypes, selected]
      : selectedTypes.filter((types) => types !== selected);
    setSelectedTypes(updatedTypes);
  };

  const handleFacilityChange = (e) => {
    const selected = e.target.value;
    const updatedFacilities = e.target.checked
      ? [...selectedFacilties, selected]
      : selectedFacilties.filter((facilities) => facilities !== selected);
    setSelectedFacilties(updatedFacilities);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (selectedStars.length > 0) {
      queryParams.append("stars", selectedStars.join(","));
    }

    if (selectedTypes.length > 0) {
      queryParams.append("types", selectedTypes.join(","));
    }

    if (selectedFacilties.length > 0) {
      queryParams.append("facilities", selectedFacilties.join(","));
    }
    dispatch(searchHotel(queryParams));
    navigate(`/search?${queryParams}`);
  }, [selectedStars, selectedTypes, selectedFacilties, location.pathname]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5">
        <div className="border border-slate-300 rounded-lg sticky p-5 h-fit top-10">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b pb-5 border-slate-300">
              Filter By:
            </h3>
            <StarRating
              onChange={handleStarChange}
              selectedStars={selectedStars}
            />
            <HotelType
              onChange={handleTypeChange}
              selectedTypes={selectedTypes}
            />
            <HotelFacilities
              onChange={handleFacilityChange}
              selectedFacilties={selectedFacilties}
            />
            <MaxPriceFilter />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">
              {searchResult?.pagination.total} Hotel found
            </span>
            <select className="p-2 rounded-md">
              <option > Sort By</option>
              <option > pricPerNight(low to high)</option>
              <option > pricPerNight(high to low)</option>
            </select>
          </div>
          {searchResult?.data &&
            searchResult?.data.map((hotel, index) => (
              <SearchCard key={index} hotel={hotel} />
            ))}
          <div>
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
