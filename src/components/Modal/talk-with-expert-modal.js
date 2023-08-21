import React from "react";

import { useNavigate } from "react-router-dom";

import FormSuccessPopUp from "../../assets/images/success-popup.gif";

const TalkWithExpertModal = () => {
  const navigate = useNavigate();
  return (
    <div className="talk-with-expert-modal">
      <div className="talk-with-expert-modal-container">
        <div className="talk-with-expert-modal-wrapper">
          <div className="talk-with-expert-modal-gif">
            <img src={FormSuccessPopUp} alt="talk-with-expert-modal-gif" />
          </div>
          <div className="talk-with-expert-modal-details">
            <h6 className="talk-with-expert-modal-title">
              Success! Your project brief has been sent!
            </h6>
            <p className="talk-with-expert-modal-text">
              An expert will get in touch with you shortly!{" "}
            </p>
            <button onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkWithExpertModal;
