import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/sect-trois.css";
import SectTroisImg from "../assets/images/startacampaign.png";

import styled from "styled-components";

const SectTrois = ({
  sectTroisClass,
  mainHeading,
  subHeading,
  para,
  buttonTxt,
  showStartCampaignOption,
  buttonFirstOptionText,
  buttonSecondOptionText,

}) => {

  const navigate = useNavigate();

  const [openOption, setOpenOption] = useState(false);


  return (
    <section id="section-trois" className={sectTroisClass}>
      <div>
        <img id="call-to-action-lg" src={SectTroisImg} alt="" />
        <article>
          <h2>{mainHeading}</h2>
          <img id="call-to-action-mb" src={SectTroisImg} alt="" />
          <h3>{subHeading}</h3>
          <p>{para}</p>
          {/* <button>{buttonTxt}</button> */}
          {showStartCampaignOption ? (

            <button onClick={() => setOpenOption(!openOption)}>{buttonTxt}</button>

          ) : (
            <button onClick={() => navigate("/signup/vendor")}>
              <ButtonText style={{ color: "white" }}>{buttonTxt}</ButtonText>
            </button>
          )}
          {openOption && (
            <div>
              <button
                onClick={() => navigate("/book-campaign/")}>
                <ButtonText>{buttonFirstOptionText}</ButtonText>
              </button>
              <button onClick={() => navigate("/talk-with-an-expert")}>
                <ButtonText>{buttonSecondOptionText}</ButtonText>
              </button>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};
const ButtonText = styled.p`
  color: black;
`;
export default SectTrois;
