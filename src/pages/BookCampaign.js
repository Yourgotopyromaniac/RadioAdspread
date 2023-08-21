import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchRadioStation from "../bookCampaign/components/SearchRadioStation.js";

import NavBar from "../components/Navbar.js";

export const MyContext = React.createContext();
const BookCampaign = () => {
  const [countrystatedata, setCountryStateData] = useState({});
  const [search, setSearch] = useState(false);
  const getLocation = (data) => {
    setCountryStateData(data);
  };
  // console.log(countrystatedata, "countrystatedata");
  localStorage.setItem("countrystatedata", JSON.stringify(countrystatedata));
  const getSearchStatus = (data) => {
    setSearch(data);
  };

  return (
    <MyContext.Provider value={{ countrystateinfo: countrystatedata, search }}>
      <div>
        <NavBar
          bgClass="navbar-light"
          navTextColor="#0F3433"
          navFavColor="#FC9732"
        />
        <SearchRadioStation
          stationLocation={getLocation}
          status={getSearchStatus}
        />
        <Outlet />
      </div>
    </MyContext.Provider>
  );
};

export default BookCampaign;
