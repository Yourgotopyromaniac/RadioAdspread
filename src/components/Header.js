import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/header.css";

const Header = ({
  headerBgClass,
  ill,
  title,
  paragraph,
  buttonText,
  buttonFirstOptionText,
  buttonSecondOptionText,
  showStartCampaignOption,

}) => {
  const [openOption, setOpenOption] = useState(false);

  const navigate = useNavigate();

  const headerTitle = useRef();
  useEffect(() => {
    headerTitle.current.innerHTML = title;
  }, [title]);

  const routeHandler = (route) => {
    navigate(route);
  };


  return (
    <header id="main-header" className={headerBgClass}>
      <div>
        <img src={ill} alt="" />
        <article>
          <h1 ref={headerTitle}>r</h1>
          <p>{paragraph}</p>
          {showStartCampaignOption ? (
            <button onClick={() => setOpenOption(!openOption)}>
              {buttonText}
            </button>
          ) : (
            <button onClick={() => routeHandler("/signup/vendor")}>
              <p style={{ color: "white" }}>{buttonText}</p>
            </button>
          )}

          {openOption && (
            <div>

              <button
                onClick={() => routeHandler("/book-campaign/")}>

                {buttonFirstOptionText}
              </button>
              <button onClick={() => routeHandler("/talk-with-an-expert")}>
                {buttonSecondOptionText}
              </button>
            </div>
          )}
        </article>
      </div>
    </header>
  );
};

export default Header;
