import React, { useState } from 'react';
import './css/broadcaster.css';
// import components for the broadcaster page
import NavBar from '../components/Navbar.js';
import Header from '../components/Header.js';
import SectUn from '../components/mainSectUn.js';
import SectDuex from '../components/mainSectDuex.js';
import SectTrois from '../components/mainSectTrois.js';
import Newsletter from '../components/Newsletter.js';
import MainFooterSect from '../components/MainFooterSect.js';
// import image for the header of the broadcaster page
import HeaderIll from '../assets/images/bp-hero-img.png';
// import gif for the first section of the broadcaster page
import SectUnIll from '../assets/images/broadcast-img.gif';
// import png illustrations for the second section of the broadcaster page
import RegisterIll from '../assets/images/register-img.png';
import SetupIll from '../assets/images/setup-img.png';
import StEarnIll from '../assets/images/start-earning-img.png';


const Broadcaster = () => {

  const [a, setA] = useState(false)

  return (
    <div>
      <NavBar
        bgClass="navbar-light"
        navTextColor="#004643"
        navFavColor="#FC9732"
        userType="vendor"
      />
      <Header
        headerBgClass="header-light"
        ill={HeaderIll}
        title="Make More Money With Your Radio Station"
        paragraph="
                    As Ad technology continues to rapidly advance, RadioAdSpread is committed to making 
                    sure radio stations can utilize ad technology and maximise ad revenue in the process.
                "
        buttonText="Get Started"
        show={a}
      />
      <SectUn
        sectUnClass="bp-sect-un"
        sectImgUn={SectUnIll}
        sectTitleUn="Meet Your Radio Station Monetization Goals!"
        paraTextUn="
                    Whether you're a small, medium or large Radio station, instantly boost your ad revenue 
                    with Radioadspread. Our advanced AI-driven platform ensures that you have full control 
                    and full disclosure over every order placed for your Ad spot.
                "
      />
      <SectDuex
        sectDuexClass="bp-sect-duex"
        title="Start in 3 easy steps"
        card1={{
          img: RegisterIll,
          header: "Register",
          para: `
                        It only takes a few clicks to gain access to 
                        advertisers who are ready to run radio campaigns.
                    `,
        }}
        card2={{
          img: SetupIll,
          header: "Setup",
          para: `
                        Go live by completing your profile, uploading your 
                        program schedule and time-slot pricing structure.
                    `,
        }}
        card3={{
          img: StEarnIll,
          header: "Start Earning",
          para: `
                        It works like magic, just relax once setup is complete. 
                        Campaign requests will start coming in from advertisers.
                    `,
        }}
      />
      <SectTrois
        sectTroisClass="bp-sect-trois"
        mainHeading="Be a part of our growing list of Radio stations."
        subHeading=""
        para="
                    RadioAdSpread connects advertisers with radio stations for their radio campaigns. 
                    Being a part of our radio stations will increase your revenue. As part of the service, 
                    you will also have access to a real-time reporting dashboard that you can use to 
                    measure and analyze your radio station's performance in real-time.
                "
        buttonTxt="Start Earning"
      />
      <footer>
        <Newsletter />
        <MainFooterSect />
      </footer>
    </div>
  );
}

export default Broadcaster;