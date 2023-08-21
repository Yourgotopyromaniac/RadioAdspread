import React, { useRef, useEffect } from "react";
import "../css/logout-modal.css";
import LogoutImg from "../assets/images/logout-img.png";

const LogoutModal = ({ close, visibility }) => {
  const logoutModal = useRef();
  useEffect(() => {
    if (visibility) {
      logoutModal.current.style.display = "flex";
    } else {
      logoutModal.current.style.display = "none";
    }
  }, [visibility]);

  return (
    <div id="logout-modal" ref={logoutModal}>
      <div>
        <img src={LogoutImg} alt="" />
        <h2>Are you sure you want to logout?</h2>
        <div>
          <button>Yes, Logout</button>
          <button onClick={() => close()}>No, Cancel</button>
        </div>
      </div>
    </div>
  );
};
export default LogoutModal;
