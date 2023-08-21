import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/main-footer-sect.css";
import Logo from "./Logo";
import { ReactComponent as FootDdIcon } from "../assets/icons/footer/footer-dd.svg";
import { ReactComponent as FootPhoneIcon } from "../assets/icons/footer/phone.svg";
import { ReactComponent as FootLocationIcon } from "../assets/icons/footer/location.svg";

import {
  FacebookLogo,
  InstagramLogo,
  LinkedInLogo,
  SocialLink,
  TwitterLogo,
} from "./svgs";

const MainFooterSect = () => {
  const [ddOneShow, setddOneShow] = useState(true);
  const [ddTwoShow, setddTwoShow] = useState(true);
  const [ddThreeShow, setddThreeShow] = useState(true);
  const toggleNavItem = (ctrlVar, ctrlSetter) => {
    ctrlSetter(!ctrlVar);
  };

  return (
    <section id="main-footer-sect">
      <div>
        <div>
          <div>
            <Link to="/">
              <Logo textColor={"#FFFFFE"} favColor={"#FC9732"} />
            </Link>
            <p>
              RadioAdSpread is an AI-driven global advertisement platform that
              digitalizes the operation of radio advert globally while providing
              real-time report of the campaign.
            </p>
          </div>
          <address>
            <div>
              <span>
                <FootPhoneIcon />
              </span>
              <span>(+234) 81 7710 0095</span>
            </div>
            <div>
              <span>
                <FootLocationIcon />
              </span>
              <span>2b Montgomery Rd, Yaba, Lagos, Nigeria</span>
            </div>
          </address>
        </div>
        <dl>
          <dt>
            <span>GO</span>
            <button
              className={ddOneShow ? "foot-btn-spin" : null}
              onClick={() => {
                toggleNavItem(ddOneShow, setddOneShow);
              }}
            >
              <FootDdIcon />
            </button>
          </dt>
          <div className={ddOneShow ? "foot-dd-open" : null}>
            <dd>
              <a href="https://more.radioadspread.com/knowledgebase/contact-us/">
                Contact Us
              </a>
            </dd>
            <a href="https://more.radioadspread.com/knowledgebase/">
              <dd>Knowledge Base</dd>
            </a>
          </div>
        </dl>
        <dl>
          <dt>
            <span>COMPANY</span>
            <button
              className={ddTwoShow ? "foot-btn-spin" : null}
              onClick={() => {
                toggleNavItem(ddTwoShow, setddTwoShow);
              }}
            >
              <FootDdIcon />
            </button>
          </dt>
          <div className={ddTwoShow ? "foot-dd-open" : null}>
            <a href="https://more.radioadspread.com/knowledgebase/about-us/">
              <dd>About us</dd>
            </a>
            <a href="https://more.radioadspread.com/knowledgebase/terms-and-conditions/">
              <dd>Terms and condition</dd>
            </a>
            <a href="https://more.radioadspread.com/knowledgebase/cookie-policy/">
              <dd>Cookie Policy</dd>
            </a>
            <a href="https://more.radioadspread.com/knowledgebase/privacy-policy/">
              <dd>Privacy Policy</dd>
            </a>
          </div>
        </dl>
        <dl>
          <dt>
            <span>SOLUTION</span>
            <button
              className={ddThreeShow ? "foot-btn-spin" : null}
              onClick={() => {
                toggleNavItem(ddThreeShow, setddThreeShow);
              }}
            >
              <FootDdIcon />
            </button>
          </dt>
          <div className={ddThreeShow ? "foot-dd-open" : null}>
            <dd>
              <a href="https://more.radioadspread.com/blog/">Blog</a>
            </dd>
            <dd>
              <a href="/radio-station">Radio Stations</a>
            </dd>
          </div>
        </dl>
        <div id="foot-socials">
          <span>
            CONNECT
          </span>
          <div>
            <SocialLink
              href="https://web.facebook.com/people/Radioadspread/100077786237234/"
              target="_blank"
            >
              <FacebookLogo />
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/company/radioadspread/"
              target="_blank"
            >
              <LinkedInLogo />
            </SocialLink>
            <SocialLink
              href="https://twitter.com/radioadspread"
              target="_blank"
            >
              <TwitterLogo />
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/radioadspread.africa/"
              target="_blank"
            >
              <InstagramLogo />
            </SocialLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainFooterSect;
