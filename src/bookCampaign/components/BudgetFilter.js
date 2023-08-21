import React, { useState, useRef } from "react";
import ChevronDown from "../../assets/icons/chevronDown.svg"
import "./css/budget-filter.css";

const BudgetFilter = ({ searchState, priceFilter }) => {
  const [min, setMin] = useState(5000);
  const [max, setMax] = useState(15000);
  const slideWidth = useRef();

  const [priceRange, setPriceRange] = useState({
    startPrice: 0,
    endPrice: 0,
    budgetFilterStatus: false,
  });

  const setPriceFilter = () => {
    let slideLength = 30000;
    slideWidth.current.style.width = `${((max - min) / slideLength) * 100}%`;
    slideWidth.current.style.margin = `auto ${((slideLength - max) / slideLength) * 100
      }% auto ${(min / slideLength) * 100}%`;
  };
  const priceFilterHandler = () => {
    setPriceRange({
      startPrice: min,
      endPrice: max,
      budgetFilterStatus: true,
    });
  };
  priceFilter(priceRange);

  const selectedLocations = ["Lagos", "Oyo", "Ogun", "Ondo", "Osun"]
  const radioType = ["AM Radio", "FM Radio", "Internet Radio"]
  const [selectedStates, setSelectedStates] = useState([])
  const [isSortLocation, setIsSortLocation] = useState(false)
  const [isSortType, setIsSortType] = useState(false)

  const handleSelectedLocation = (state, e) => {
    if (!e.target.checked) {
      const data = selectedStates.filter((location) => location !== state)
      setSelectedStates(data)
    } else {
      const data = selectedLocations.find((location, index) => location === state)
      setSelectedStates([...selectedStates, data])
    }
  }
  const showSortLocationHandler = () => {
    if (isSortType) setIsSortType(!isSortType)
    setIsSortLocation(!isSortLocation)

  }

  selectedStates && searchState(selectedStates)

  return (
    <div id="budget-filter">
      <div>
        <h2>Budget Filter</h2>
        <button>Reset Filter</button>
      </div>
      <div>
        <div>
          <h2>Select your budget per radio station.</h2>
          <h3>
            {min} - {max}
          </h3>
          <div id="range-slider">
            <div className="slider-track"></div>
            <div className="slide-width" ref={slideWidth}></div>
            <input
              type="range"
              min="0"
              max="30000"
              value={min}
              id="slider-1"
              onChange={({ target: { value: radius } }) => {
                if (parseInt(radius) > max) {
                  setMin(parseInt(radius));
                  setMax(parseInt(radius));
                } else {
                  setMin(parseInt(radius));
                }
                setPriceFilter();
              }}
            />
            <input
              type="range"
              min="0"
              max="30000"
              value={max}
              id="slider-2"
              onChange={({ target: { value: radius } }) => {
                if (parseInt(radius) < min) {
                  setMin(parseInt(radius));
                  setMax(parseInt(radius));
                } else {
                  setMax(parseInt(radius));
                }
                setPriceFilter();
              }}
            />
          </div>
          <button onClick={priceFilterHandler}>Apply</button>
        </div>
        <form>

          <div className="location-sort-container">
            <div onClick={() => showSortLocationHandler()}
            >
              <h4>sort by location</h4>
              <button>
                <img src={ChevronDown} alt="chevrondown" />
              </button>
            </div>
            {isSortLocation && <div >
              <div>
                {selectedLocations.map((state, index) => {
                  return <div key={index}
                  >
                    <input type="checkbox"
                      value={state}
                      name={state}
                      id={state}
                      onChange={(e) => handleSelectedLocation(state, e)}
                    />
                    <label htmlFor={state}
                      style={{ width: "100%" }}
                    >{state}</label>
                  </div>
                })}
              </div>

            </div>}
          </div>
          <div className="type-sort-container">
            <div onClick={() => setIsSortType(!isSortType)}>
              <h4>sort by type</h4>
              <button>
                <img src={ChevronDown} alt="chevrondown" />
              </button>
            </div>
            {isSortType && <div>
              <div>
                {radioType.map((type, index) => {
                  return <div key={index}>{type}</div>
                })}
              </div>
            </div>}
          </div>
        </form>
        <div>
          <h3>Stay up-to-date with latest news and changes in our rate.</h3>
          <form>
            <input type="email" placeholder="Enter Your Email" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BudgetFilter;
