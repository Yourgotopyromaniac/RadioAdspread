import React from "react";
import "./css/recent-search.css";

const RecentSearch = ({ searchName }) => {
  return (
    <button className="recent-state-search">
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#search-icon-cnt)">
          <path
            d="M8.75 14.875C12.1327 14.875 14.875 12.1327 14.875 8.75C14.875 5.36726 12.1327 2.625 8.75 2.625C5.36726 2.625 2.625 5.36726 2.625 8.75C2.625 12.1327 5.36726 14.875 8.75 14.875Z"
            stroke="white"
            strokeWidth="1.3125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.375 18.375L13.125 13.125"
            stroke="white"
            strokeWidth="1.3125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="search-icon-cnt">
            <rect width="21" height="21" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>{searchName}</span>
    </button>
  );
};

export default RecentSearch;
