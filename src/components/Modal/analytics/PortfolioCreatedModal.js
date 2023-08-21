import React from "react";
import { useNavigate } from "react-router-dom";

import SuccessGif from "../../../assets/gifs/success-popup.gif";
import "./style.css";

const PortfolioCreatedModal = () => {
  const navigate = useNavigate();
  return (
    <div className="portfolio-modal-container">
      <div>
        <div className="portfolio-modal-content">
          <img src={SuccessGif} alt="success-gif" width={202}/>
          <div className="portfolio-modal-text">
            <span>Portfolio successfully created!</span>
            <span>
              To view campaign analytics, please check your dashboard.
            </span>
          </div>
          <div className="portfolio-modal-btn">
            <button onClick={() => navigate("/analytics/portfolios")}>
              Back to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCreatedModal;
