import React from "react";

const Pagination = ({ pages, currentPage, onPageChange }) => {
  console.log(currentPage, 'currentpage');
  console.log(pages, 'pages');
  
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      {pages > 1 && (
        <ul className="flex border border-slate-300">
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`${(pages === 2 || currentPage === 1) && "hidden"} px-2`}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`${currentPage === number ? "bg-gray-200" : ""}`}
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
            onClick={() => currentPage < pages && onPageChange(currentPage + 1)}
            className={`${
              (pages === 2 || currentPage === pages) && "hidden"
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
