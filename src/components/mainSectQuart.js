import React from "react";
import { Link } from "react-router-dom";
import VON from "../assets/images/Von.png"
import IndependentLogo from "../assets/images/Independent_logo_logotype.png"
import BusinessInsiderLogo from "../assets/images/biblack.svg"
import MarketingEdgeLogo from "../assets/images/marketing-edge-logo.png"
import BusinessDayLogo from "../assets/images/Businessday-Logo.png"
import VanguardLogo from "../assets/images/vanguard-logo.svg"
import "../css/sect-quart.css";


const SectQuart = () => {

    const imageUrl = [
        {
            name: "marketingedge-image",
            img: MarketingEdgeLogo,
            path: "https://marketingedge.com.ng/space-universe-launches-ai-driven-global-radio-ad-platform-radioadspread/"
        },
        {
            name: "businessday-image",
            img: BusinessDayLogo,
            path: "https://businessday.ng/news/article/tech-firm-eases-radio-advertisement-launches-digital-platform/"
        },
        {
            name: "vanguardlogo-image",
            img: VanguardLogo,
            path: "https://www.vanguardngr.com/2022/12/radio-advertisement-goes-digital-as-group-unveils-technology-in-lagos/"
        },
        {
            name: "independentlogo-image",
            img: IndependentLogo,
            path: "https://independent.ng/radioadspread-launches-platform-to-bridge-gap-between-advertisers-radio-stations/"
        },
        {
            name: "businessinsider-image",
            img: BusinessInsiderLogo,
            path: "https://africa.businessinsider.com/local/markets/radio-advertisement-booking-goes-digital/b4wqewq"
        },
        {
            name: "von-image",
            img: VON,
            path: "https://von.gov.ng/nigerian-technology-company-launches-online-radio-advertisement-platform/"
        }

    ]


    return (
        <section id="section-quart">
            <h2 className="testimonial-header">As Featured In</h2>
            <div className="testimonial-container">
                {imageUrl.map(({ name, img, path }) => {
                    return (
                        <div className="testimonial-wrapper">
                            <a href={path}>
                                <img src={img}
                                    className="testimonial-image"
                                    alt={name}
                                />
                            </a>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default SectQuart;