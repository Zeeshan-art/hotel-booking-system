import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchCard from "../components/SearchCard";
import Pagination from "../components/Pagination";
import StarRating from "../components/StarRating";
import HotelType from "../components/HotelType";
import HotelFacilities from "../components/HotelFacilities";
import MaxPriceFilter from "../components/MaxPriceFilter";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { updateFilters } from "../redux/slice/hotel/hotelSlice";
import { searchHotel } from "../redux/slice/hotel/thunk";

const Search = () => {
  const { data, pagination } = useSelector((state) => state.hotel);
  const filters = useSelector((state) => state.hotel.filters); // Get filters from Redux
  const searchParams = useSelector((state) => state.hotel.searchParams);
  const isLoading = useSelector((state) => state.hotel.isLoading);// Get filters from Redux
  const [filterVisible, setFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFacilties, setSelectedFacilties] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleStarChange = (e) => {
    const selected = e.target.value;
    const updatedStars = e.target.checked
      ? [...selectedStars, selected]
      : selectedStars.filter((stars) => stars !== selected);
      dispatch(updateFilters({stars: updatedStars}))
    setSelectedStars(updatedStars);
  };

  const handleTypeChange = (e) => {
    const selected = e.target.value;
    const updatedTypes = e.target.checked
      ? [...selectedTypes, selected]
      : selectedTypes.filter((types) => types !== selected);
      dispatch(updateFilters({types: updatedTypes}))
    setSelectedTypes(updatedTypes);
  };

  const handleFacilityChange = (e) => {
    const selected = e.target.value;
    const updatedFacilities = e.target.checked
      ? [...selectedFacilties, selected]
      : selectedFacilties.filter((facilities) => facilities !== selected);
      dispatch(updateFilters({facilities: updatedFacilities}))
      setSelectedFacilties(updatedFacilities);
  };
  const handleSortChange = (e)=>{
    const option = e.target.value
    dispatch(updateFilters({sort: option}))
    setSortOption(option)
  }
  const handlePriceChange = (maxPrice)=>{
    dispatch(updateFilters({maxPrice: maxPrice}))
    setSelectedPrice(maxPrice)
  }
  const handlePageChange = (page)=>{
    dispatch(updateFilters({page: page}))
    setCurrentPage(page)
    window.scrollTo(0, 0);
  }
  
  useEffect(() => {
    if(Object.keys(filters).length === 0){
      console.log('ds');
      setSelectedStars([]); // Reset selected stars
      setSelectedTypes([]); // Reset selected types
      setSelectedFacilties([]); // Reset selected facilities
      setSelectedPrice(""); // Reset selected price
      setSortOption("")
    }
    const queryParams = new URLSearchParams({
      ...filters,
      ...searchParams,
    });
    dispatch(searchHotel(queryParams))
    navigate(`/search?${queryParams.toString()}`);
  }, [filters,searchParams, dispatch]);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5">
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
            <MaxPriceFilter selectedPrice={selectedPrice} onChange={handlePriceChange} />
          </div>
        </div>

        {data?.length > 0 ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{pagination.total} Hotels found</span>
              <select className="p-2 rounded-md" value={sortOption} onChange={handleSortChange}>
                <option value="">Sort By</option>
                <option value="pricePerNight_asc">Price (Low to High)</option>
                <option value="pricePerNight_desc">Price (High to Low)</option>
              </select>
            </div>
            {data.map((hotel, index) => (
              <SearchCard key={index} hotel={hotel} />
            ))}
            <div>
              <Pagination pages={pagination?.pages} currentPage={pagination?.pageNumber} onPageChange={handlePageChange} />
            </div>
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-2xl">No Hotels Found</p>
            <p>Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
