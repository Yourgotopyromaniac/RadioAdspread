import React, { useState, useEffect } from "react";
import "./css/landing-page.css";
// import components for the landing page
import NavBar from "../components/Navbar.js";
import Header from "../components/Header.js";
import SectUn from "../components/mainSectUn.js";
import SectDuex from "../components/mainSectDuex.js";
import SectTrois from "../components/mainSectTrois.js";
import SectQuart from "../components/mainSectQuart.js";
import Newsletter from "../components/Newsletter.js";
import MainFooterSect from "../components/MainFooterSect.js";
// import image for the header of the landing page
import HeaderIll from "../assets/images/lp-hero-img.png";
// import gif for the first section of the landing page
import SectUnIll from "../assets/images/radioad.gif";
// import png illustration for the second section of the landing page
import ClickIll from "../assets/images/click-img.png";
import ExecuteIll from "../assets/images/execute-img.png";
import DetRepIll from "../assets/images/detailed-reporting-img.png";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const LandingPage = () => {
  useEffect(() => {
    const scriptTagManager = document.createElement("script");
    scriptTagManager.async = true;
    scriptTagManager.src =
      "https://www.googletagmanager.com/gtag/js?id=G-VB1L096GYE";
    document.head.appendChild(scriptTagManager);

    const js = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VB1L096GYE');
  `;
    const script = document.createElement("script");
    const scriptText = document.createTextNode(js);
    script.appendChild(scriptText);
    document.head.appendChild(script);
  }, []);

  const [startCampaign] = useState(true);

  return (
    <div>
      <TawkMessengerReact
        propertyId="63f499f94247f20fefe1c52d"
        widgetId="1gppniu96"
      />
      <NavBar
        bgClass="navbar-dark"
        navTextColor="#FFFFFE"
        navFavColor="#FC9732"
        userType="advertiser"

      />
      <Header
        headerBgClass="header-dark"
        ill={HeaderIll}
        title="Welcome to the<br> New Age of<br> Radio Advertisement"
        paragraph=""
        buttonText="Start a Campaign"
        buttonFirstOptionText="Yes, I can do it myself."
        buttonSecondOptionText="No, Help me with it"
        showStartCampaignOption={startCampaign}
      />

      <SectUn
        sectUnClass="lp-sect-un"
        sectImgUn={SectUnIll}
        sectTitleUn="Track and Analyze Your Radio Ad Campaign"
        paraTextUn=""
      />
      <SectDuex
        sectDuexClass="lp-sect-duex"
        title="How would I benefit from this?"
        card1={{
          img: ClickIll,
          header: "Click",
          para: `
                        Easily select radio stations that fit your campaign goals at a go.<br>
                        We optimize your plan automatically, ensuring you meet audience targeting and 
                        budget goals, maximizing campaign results.
                    `,
        }}
        card2={{
          img: ExecuteIll,
          header: "Execute",
          para: `
                        No more back-and-forth with radio stations, your inventory is guaranteed once booked. 
                        Find out what's available in real time. By using our algorithm, your plan is automatically 
                        optimized, ensuring you meet audience targeting and budget goals.
                    `,
        }}
        card3={{
          img: DetRepIll,
          header: "Detailed Reporting",
          para: `
                        Our ad-tech is evolving at lightning speed. RadioAdspread ensures 
                        marketers or agencies get the most out of their radio campaigns. 
                        Using our real-time reporting dashboard, you can see when, where, 
                        and what ads were run, providing you with continuous campaign intelligence.
                    `,
        }}
      />
      <SectTrois
        sectTroisClass="lp-sect-trois"
        mainHeading="Why RadioAdSpread?"
        subHeading="Easy Access"
        para="
                    Our platform allows business owners of all sizes, regardless of budget, 
                    to advertise remotely on their preferred radio stations. From the comfort of their homes/offices, 
                    advertisers can easily run radio campaigns across multiple radio stations in Africa.
                "
        buttonTxt="Start a Campaign"
        buttonFirstOptionText="Yes, I can do it myself."
        buttonSecondOptionText="No, Help me with it"
        showStartCampaignOption={startCampaign}
      />
      <SectQuart />
      <footer>
        <Newsletter />
        <MainFooterSect />
      </footer>
    </div>
  );
};

export default LandingPage;
