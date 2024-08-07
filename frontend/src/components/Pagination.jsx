import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { searchHotel } from "../redux/slice/hotel/thunk";

const Pagination = () => {
  const { pages, pageNumber } = useSelector(
    (state) => state.hotel.searchResult?.pagination
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onPageChange = (page) => {
    // const params = new URLSearchParams(location.search);
    // params.set("page", page);
    const qeuryParams = new URLSearchParams();
    qeuryParams.append("page", page);
    dispatch(searchHotel(qeuryParams));
    navigate(`/search?${qeuryParams}`);
  };

  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      {pages > 1 && (
        <ul className="flex border border-slate-300">
          <button
            onClick={() => onPageChange(pageNumber - 1)}
            className={`${(pages === 2 || pageNumber === 1) && "hidden"} px-2`}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`${pageNumber === number ? "bg-gray-200" : ""}`}
            >
              <button
                onClick={() => onPageChange(number)}
                className="px-2 py-1 "
              >
                {number}
              </button>
            </li>
          ))}
          <button
            onClick={(e) => onPageChange(pageNumber + 1)}
            className={`${
              (pages === 2 || pageNumber === pages) && "hidden"
            } px-2`}
          >
            Next
          </button>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
