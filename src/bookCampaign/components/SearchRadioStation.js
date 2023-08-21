import React, { useState, useEffect } from "react";
import "./css/search-radio-station.css";
import RecentSearch from "./RecentSearch.js";
import countrydata from "../../countries+states.json";
import { GET_BROADCASTERS_REQ } from "../../components/GraphQL/Queries";
import request from "graphql-request";
import { URL } from "../../config/url";
import axios from "axios";

const SearchRadioStation = ({ stationLocation, status }) => {
  const [states, setStates] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [countrystatename, setCountryStateName] = useState({
    countryName: "",
    stateName: "",
  });

  const [location, setLocation] = useState({
    country: "",
    region: "",
  });

  useEffect(() => {
    const geoSuccess = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }, []);

  useEffect(() => {
    const fetchCountryState = async () => {
      if (latitude && longitude) {
        try {
          const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          const response = await axios.get(apiUrl);
          const { country, state } = response.data.address;
          const firstWord = state.split(" ")[0];
          setLocation({
            country,
            region: firstWord,
          });
          request({
            url: URL,
            document: GET_BROADCASTERS_REQ,
            variables: {
              page: 1,
              itemsPerPage: 50,
              country,
              state: firstWord,
            },
          }).then((data) => {
            setBroadcasters(data?.guest.getBroadcasters.broadcasters);
          });
        } catch (error) {
          setLocation({
            country: "",
            region: "",
          });
        }
      }
    };
    fetchCountryState();
  }, [latitude, longitude]);

  const handleCountry = (e) => {
    setLocation({
      country: "",
      region: "",
    });
    const getCountryId = e.target.value;
    const getStateData = countrydata.find(
      (country) => country.name === getCountryId
    ).states;
    setStates(getStateData);
    setCountryStateName({ ...countrystatename, countryName: e.target.value });
  };

  const handleState = (e) => {
    setLocation({
      country: "",
      region: "",
    });
    setCountryStateName({ ...countrystatename, stateName: e.target.value });
  };
  const [broadcasters, setBroadcasters] = useState([]);
  stationLocation(broadcasters);
  const [searchStatus, setSearcStatus] = useState(false);
  status(searchStatus);
  const handleSubmit = (e) => {
    e.preventDefault();
    request({
      url: URL,
      document: GET_BROADCASTERS_REQ,
      variables: {
        page: 1,
        itemsPerPage: 50,
        country: countrystatename.countryName,
        state: countrystatename.stateName,
      },
    }).then((data) => {
      setBroadcasters(data?.guest.getBroadcasters.broadcasters);
    });
    setSearcStatus(true);
  };
  return (
    <section id="search-radio-station">
      <div>
        <h1>Search for and discover your preferred radio station</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <select id="countries" onChange={(e) => handleCountry(e)}>
                {/* <option selected>Select Country</option> */}
                {location.country ? (
                  <option selected>{location.country}</option>
                ) : (
                  <option selected>Select Country</option>
                )}
                {countrydata.map((getcountry, index) => (
                  <option value={getcountry.name} key={index}>
                    {getcountry.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select id="states" onChange={(e) => handleState(e)}>
                {/* <option selected>Select State</option> */}
                {location.region ? (
                  <option selected>{location.region}</option>
                ) : (
                  <option selected>Select State</option>
                )}
                {states.map((getState, index) => (
                  <option value={getState.name} key={index}>
                    {getState.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit">Find a Radio Station</button>
        </form>
        <div>
          <h2>Popular Searches</h2>
          <div
            onBlur={(e) => {
              e.target.style.scroll = "hidden";
            }}
          >
            <div>
              <RecentSearch searchName="Lagos State" />
              <RecentSearch searchName="Oyo State" />
              <RecentSearch searchName="Federal Capital Territory" />
              <RecentSearch searchName="Ogun State" />
              <RecentSearch searchName="Osun State" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchRadioStation;
