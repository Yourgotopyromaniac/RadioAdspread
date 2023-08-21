import React from "react";
import EditIcon from "../../assets/dashboardIcons/editIcon.svg";
import DeleteIcon from "../../assets/dashboardIcons/deleteIcon.svg";

const DashboardTable = ({ children, title }) => {
  return (
    <>
      <section className="first-campaign-section">
        <h2>{title}</h2>
        <div className="lazy">
          <div>
            <span>show</span>
            <select>
              <option>10</option>
            </select>
            <span>entries</span>
          </div>

          <div className="input-box form-control">
            <input
              type="text"
              className="search-input form-control"
              placeholder="Search"
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1739_1797)">
                <path
                  d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                  stroke="#F99B28"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 21L15 15"
                  stroke="#F99B28"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1739_1797">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            {/* <i class="fa fa-search"></i> */}
          </div>
        </div>
      </section>
      <section>
        <div className="table-icons-container">
          <div className="icon-text-wrapper">
            <img src={EditIcon} alt="edit-icon" />
            <span>Edit</span>
          </div>
          <div className="icon-text-wrapper">
            <img src={DeleteIcon} alt="delete-icon" />
            <span>Delete</span>
          </div>
        </div>
        {children}
      </section>
    </>
  );
};

export default DashboardTable;
