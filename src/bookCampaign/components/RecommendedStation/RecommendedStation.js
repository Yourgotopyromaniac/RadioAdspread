import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/recommended-station.css";
import Station from "../Station.js";
import { GET_BROADCASTERS } from "../../../components/GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import fallBackImage from "../../../asset/img/fallback-station-img.jpeg";
import { SpinnerContainer, Spinner } from "./components";
import { ReactComponent as FilterIcon } from "../../../assets/icons/filter.svg";

const RecommendedStation = ({
  countrystateobj,
  searchState,
  location,
  filterByPriceRange,
}) => {
  const [selectedStation, setSelectedStation] = useState([]);
  const [clearSelect, setClearSelect] = useState(false);

  const navigate = useNavigate();
  const [checkBox, setCheckBox] = useState([]);

  localStorage.removeItem(checkBox);

  let selectStation = (data) => {
    setSelectedStation([...selectedStation, data]);
    setClearSelect(true);
  };
  let deSelectStation = (data) => {
    setSelectedStation(selectedStation.filter((a) => a.id !== data.id));
  };
  const [broadcasterData, setBroadcasterData] = useState([]);
  const { data, loading } = useQuery(GET_BROADCASTERS, {
    variables: {
      page: +1,
      itemsPerPage: 1000,
    },
  });

  useEffect(() => {
    if (searchState === true) {
      return setBroadcasterData(countrystateobj);
    }
    if (location.length) {
      const broadcasterArray = data?.guest.getBroadcasters.broadcasters?.filter(
        ({ state }) => location.includes(state)
      );
      return setBroadcasterData(broadcasterArray);
    }
    if (!searchState) {
      return setBroadcasterData(data?.guest.getBroadcasters.broadcasters);
    }
  }, [searchState, data, countrystateobj, location]);

  //clear selected stations

  const clearStations = () => {
    if (clearSelect === false) {
      setClearSelect(true);
      setCheckBox([]);
    } else {
      setClearSelect(false);
    }
    setTimeout(() => {
      setClearSelect(false);
    }, 1000);
  };

  const handleBooking = () => {
    if (!checkBox.length) {
      return toast.error("you've not select a radio station");
    }
    {
      // navigate(`/book-campaign/campaign-details?stations=${checkBox}`);
      navigate(`/book-campaign/campaign-details`);
    }
  };
  return (
    <div id="recommended-station">
      <div>
        <h2>Recommended For You</h2>
        <h3>Select one or more Radio Stations</h3>
      </div>
      <div>
        <div id="filter-station-ctrl">
          <button>
            <FilterIcon />
            <span>Filter</span>
          </button>
          <button onClick={clearStations}>Clear all</button>
        </div>
        {!loading ? (
          <div id="recommended-station-list">
            <div>
              {broadcasterData
                ?.filter((broadcaster) => broadcaster?.isApproved)
                .map((station, index) => {
                  return (
                    <Station
                      key={station.id}
                      id={station.id}
                      img={station.banner ?? fallBackImage}
                      name={station.name}
                      currency={station.stationCurrency}
                      startingPrice={station?.startingPrice}
                      discountedStatingPrice={station.discountedStatingPrice}
                      discountPercentage={station.discountPercentage}
                      clearSelect={clearSelect}
                      select={selectStation}
                      deSelect={deSelectStation}
                      setCheckBox={setCheckBox}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}
      </div>
      <div>
        <button className="book_now_btn" onClick={handleBooking}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RecommendedStation;
