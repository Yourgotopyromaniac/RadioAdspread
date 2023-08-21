import React from "react";
import "./style.css";

const VerifyModal = ({handleVerification, closeModal}) => {

  
  return (
    <div className="verify-modal-container">
    <div>
      <div className="verify-modal-content">
        <div className="verify-modal-text">
          <span>
            Verify Account?
          </span>
        </div>
        <div className="verify-modal-btn">
          <button onClick={handleVerification}>
            Yes, Verify
          </button>

          <button onClick={closeModal}>
           No, Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default VerifyModal;