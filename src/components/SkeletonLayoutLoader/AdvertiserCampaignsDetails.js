import React from 'react'
import { Skeleton, Button } from "@chakra-ui/react"
import OrderIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/order.svg"
import StatusIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/status.svg"
import StartDateIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/calendar.svg"
import EndDateIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/endDateCalendar.svg"
import AdvertTypeIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/advertType.svg"
import DurationIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/time.svg"
import SpotIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/spot.svg"
import LanguageIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/language.svg"
import DaysIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/duration.svg"
import DollarIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/currency.svg"
import CardIcon from "../../pages/ResponsiveAdvertiserDashboard/assets/card.svg"

const AdvertiserCampaignsDetails = () => {
    return (
        <>
            <div>
                <h4><Skeleton width="40px" height="20px" /> </h4>
                <div className='booking-document-wrapper'>
                    <p>Campaign Document</p>
                    {/* <div className='campaign-document-wrapper'> */}
                    <Skeleton width="200px" height="30px"
                    />
                    {/* </div> */}
                </div>
            </div>
            <div className='station-btn'>
                <Button w={50} h={20}>
                    <Skeleton width="50px" height="20px" />
                </Button>
                <Button w={50} h={20}>
                    <Skeleton width="50px" height="20px" />
                </Button>
                <Button w={50} h={20}>
                    <Skeleton width="50px" height="20px" />
                </Button>
            </div>
            <div className='station-info-wrapper'>
                <div className='station-header-info'>
                    <div className='station-wraps'>
                        <img src={OrderIcon} alt='order_icon' />
                        <span>Order ID: <Skeleton width="30px" height="20px" /> </span>
                    </div>
                    <div className='station-wraps'>
                        <img src={StatusIcon} alt='status_icon' />
                        Status: <span className='campaign_status'> <Skeleton width="50px" height="20px" /> </span>
                    </div>
                    <div className='station-wraps'>
                        <img src={StartDateIcon} alt='start-date_icon' />
                        <span>Start Date: <Skeleton width="60px" height="20px" /> </span>
                    </div>
                    <div className='station-wraps'>
                        <img src={EndDateIcon} alt='end-date_icon' />
                        <span>End Date: <Skeleton width="60px" height="20px" /></span>
                    </div>
                </div>
                <div className='station-booking-cards-container'>
                    <>
                        <div className='station-card'>
                            <img src={AdvertTypeIcon} alt='advert-type_icon' />
                            <span>
                                <Skeleton width="100px" height="20px" />

                            </span>
                        </div>
                        <div className='station-card'>
                            <img src={DurationIcon} alt='duration_icon' />
                            <span>
                                <Skeleton width="100px" height="20px" />

                            </span>
                        </div>
                        <div className='station-card'>
                            <img src={SpotIcon} alt='spot_icon' />
                            <span>
                                <Skeleton width="100px" height="20px" />

                            </span>
                        </div>

                        <div className='station-card'>
                            <img src={LanguageIcon} alt='language_icon' />
                            <span>
                                <Skeleton width="100px" height="20px" />

                            </span>
                        </div>
                        <div className='station-card'>
                            <img src={DaysIcon} alt='days_icon' />
                            <span>
                                <Skeleton width="100px" height="20px" />

                            </span>
                        </div>

                        <div className='station-card'>
                            <img src={DollarIcon} alt='currency_icon' />
                            <span>
                                <Skeleton width="100px" height="20px" />

                            </span>
                        </div>
                        <div className='station-card'>
                            <img src={CardIcon} alt='card_icon' />
                            <span>
                                <Skeleton width="100px" height="20px" />

                            </span>
                        </div>
                    </>

                </div>
            </div>
        </>)
}

export default AdvertiserCampaignsDetails