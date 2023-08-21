import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import { ADVERTISER_CAMPAIGN_DETAILS } from '../../../../components/GraphQL/Queries'
import AdvertDashboardLayout from '../../ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout'
import OrderIcon from "../../assets/order.svg"
import StatusIcon from "../../assets/status.svg"
import StartDateIcon from "../../assets/calendar.svg"
import EndDateIcon from "../../assets/endDateCalendar.svg"
import AdvertTypeIcon from "../../assets/advertType.svg"
import DurationIcon from "../../assets/time.svg"
import SpotIcon from "../../assets/spot.svg"
import LanguageIcon from "../../assets/language.svg"
import DaysIcon from "../../assets/duration.svg"
import DollarIcon from "../../assets/currency.svg"
import CardIcon from "../../assets/card.svg"
import "../css/station-booking.css"
import AdvertiserCampaignsDetails from '../../../../components/SkeletonLayoutLoader/AdvertiserCampaignsDetails'

const StationBooking = () => {
    const [campaignDetails, setCampaignDetails] = useState([])
    const [activeButton, setActiveButton] = useState(0)
    const { id } = useParams();
    const { data, loading } = useQuery(ADVERTISER_CAMPAIGN_DETAILS, {
        variables: { campaignId: id }
    })

    useEffect(() => {
        if (data) {
            setCampaignDetails([data?.advertiser.getCampaignDetails.radioStationDetails[0]])
            setActiveButton(data?.advertiser.getCampaignDetails.radioStationDetails[0]?.id)
        }

    }, [data])

    const singleCampaignHandler = (index) => {
        setActiveButton(index)
        const singleCampaign = data?.advertiser.getCampaignDetails.radioStationDetails.filter((campaign) => {
            return campaign.id === index
        })
        setCampaignDetails(singleCampaign)
    }
    return (
        <AdvertDashboardLayout>
            <div className='advertiser-booking-container'>
                {loading ? <AdvertiserCampaignsDetails /> : <>
                    <div>
                        <h4>#{data?.advertiser.getCampaignDetails.id}</h4>
                        <div className='booking-document-wrapper'>
                            <p>Campaign Document</p>
                            <div className='campaign-document-wrapper'>
                                <p>{data?.advertiser.getCampaignDetails.campaignDocument.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='station-btn'>
                        {data?.advertiser.getCampaignDetails.radioStationDetails.map((btn, index) => {
                            return <button
                                key={index}
                                onClick={() => singleCampaignHandler(btn.id)
                                }
                                className={btn.id === activeButton ? "active" : ""}
                            >{btn.radioStation}</button>
                        })}
                    </div>
                    <div className='station-info-wrapper'>
                        <div className='station-header-info'>
                            <div>
                                <img src={OrderIcon} alt='order_icon' />
                                <span>Order ID: {data?.advertiser.getCampaignDetails.id}</span>
                            </div>
                            <div>
                                <img src={StatusIcon} alt='status_icon' />
                                Status: <span className='campaign_status'>{data?.advertiser.getCampaignDetails.status}</span>
                            </div>
                            <div>
                                <img src={StartDateIcon} alt='start-date_icon' />
                                <span>Start Date: {moment(new Date(data?.advertiser.getCampaignDetails.startDate)).format("MMM Do YYYY")}</span>
                            </div>
                            <div>
                                <img src={EndDateIcon} alt='end-date_icon' />
                                <span>End Date: {moment(new Date(data?.advertiser.getCampaignDetails.endDate)).format("MMM Do YYYY")}</span>
                            </div>
                        </div>
                        <div className='station-booking-cards-container'>
                            {campaignDetails?.map((data) => {
                                return (
                                    <>
                                        <div className='station-card'>
                                            <img src={AdvertTypeIcon} alt='advert-type_icon' />
                                            <span>
                                                Adert Type: {data.advertType}

                                            </span>
                                        </div>
                                        <div className='station-card'>
                                            <img src={DurationIcon} alt='duration_icon' />
                                            <span>
                                                Duration: {data.duration}

                                            </span>
                                        </div>
                                        <div className='station-card'>
                                            <img src={SpotIcon} alt='spot_icon' />
                                            <span>
                                                Number of Spot: {data.numberOfSpots}

                                            </span>
                                        </div>

                                        <div className='station-card'>
                                            <img src={LanguageIcon} alt='language_icon' />
                                            <span>
                                                Language: {data.language}

                                            </span>
                                        </div>
                                        <div className='station-card'>
                                            <img src={DaysIcon} alt='days_icon' />
                                            <span>
                                                Number of Days: {data.numberOfDays}

                                            </span>
                                        </div>

                                        <div className='station-card'>
                                            <img src={DollarIcon} alt='currency_icon' />
                                            <span>
                                                Total amount: #{data.totalAmount}

                                            </span>
                                        </div>
                                        <div className='station-card'>
                                            <img src={CardIcon} alt='card_icon' />
                                            <span>
                                                Payment Method: {data.paymentMethod}

                                            </span>
                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </div>
                </>}
            </div>
        </AdvertDashboardLayout>
    )
}

export default StationBooking;

