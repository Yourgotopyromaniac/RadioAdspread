import React, { useState, useEffect } from "react";
import "./css/station.css";
import { useFormatAmount } from "../../hook";

const Station = ({
  id,
  img,
  name,
  clearSelect,
  startingPrice,
  setCheckBox,
  discountedStatingPrice,
  discountPercentage,
}) => {
  const [check, setCheck] = useState(false);

  const formatAmount = useFormatAmount;

  useEffect(() => {
    if (clearSelect) {
      setCheck(false);
    }
  }, [clearSelect]);

  const selectedStations = localStorage.getItem("selectedStations") ?? "";
  const handleCheck = (id) => {
    let mutatedSelectedStation = selectedStations.length
      ? [...selectedStations.split(",")]
      : [];
    setCheck(!check);
    if (!check) {
      setCheckBox((prev) => [...new Set([...prev, id])]);

      mutatedSelectedStation = mutatedSelectedStation.concat(id);
    }

    if (check) {
      setCheckBox((prev) => prev.filter((station) => station !== id));
      mutatedSelectedStation = mutatedSelectedStation.filter(
        (station) => station !== id
      );
    }
    if (mutatedSelectedStation.length) {
      localStorage.setItem(
        "selectedStations",
        mutatedSelectedStation.join(",")
      );
    }
    if (!mutatedSelectedStation.length) {
      localStorage.setItem("selectedStations", "");
    }
  };
  const isSelectedLocalStorage =
    selectedStations && selectedStations.split(",").includes(id);
  return (
    <div onClick={() => handleCheck(id)} className="station-box">
      <input
        type="checkbox"
        className="toggle-select"
        checked={isSelectedLocalStorage}
      />

      <div className="station-img">
        <img src={img} alt={name} />
      </div>
      <div className="txt-cnt">
        <h3 className="station-title">{name}</h3>
        <h4>Starting From</h4>
        {discountPercentage > 0 && (
          <h4>
            <span id="discount-price">{`${formatAmount(
              startingPrice
            )}`}</span>
            {discountPercentage}%
          </h4>
        )}
        <h3>{formatAmount(discountedStatingPrice)}</h3>
      </div>
    </div>
  );
};

export default Station;
