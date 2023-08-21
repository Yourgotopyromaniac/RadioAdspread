import React from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import OrderIcon from "../../assets/advertiserDashboardIcon/order.svg"
import StatusIcon from "../../assets/advertiserDashboardIcon/status.svg"
import StartDateIcon from "../../assets/advertiserDashboardIcon/startDate.svg"
import EndDateIcon from "../../assets/advertiserDashboardIcon/endDate.svg"
import AdvertTypeIcon from "../../assets/advertiserDashboardIcon/advertType.svg"
import DurationIcon from "../../assets/advertiserDashboardIcon/durationIcon.svg"
import LanguageIcon from "../../assets/advertiserDashboardIcon/languageIcon.svg"
import DaysIcon from "../../assets/advertiserDashboardIcon/daysIcon.svg"
import SpotIcon from "../../assets/advertiserDashboardIcon/spotIcon.svg"
import DollarIcon from "../../assets/advertiserDashboardIcon/dollarIcon.svg"
import CardIcon from "../../assets/advertiserDashboardIcon/cardIcon.svg"
import "./css/advertiser-booking.css"
import AdvertiserDashboardayout from '../../components/DashboardLayout/AdvertiserDashboardayout'
import { useQuery } from '@apollo/client'
import { GET_DRAFT } from '../../components/GraphQL/Queries'
import moment from 'moment'

const AdvertiserBooking = () => {
    const { id } = useParams()



    const { data } = useQuery(GET_DRAFT, {
        variables: {
            getDraftId: id
        }
    })

    console.log(data)
    const radioButton = ["beat fm", "classic fm", "naija fm"]
    return (
        <AdvertiserDashboardayout
            header="Hassan Agnes">
            <div className='advertiser-booking-container'>
                <div>
                    <h4>#467666</h4>
                    <div className='booking-document-wrapper'>
                        <label>Campaign Document</label>
                        <select>
                            <option>Freshyo Jingle</option>
                            <option>Freshyo Jingle</option>
                        </select>
                    </div>
                </div>
                <div className='station-btn'>
                    {radioButton.map((btn) => {
                        return <button>{btn}</button>
                    })}
                </div>
                <div className='station-info-wrapper'>
                    <div className='station-header-info'>
                        <div>
                            <img src={OrderIcon} />
                            <span>Order ID: 467666</span>
                        </div>
                        <div>
                            <img src={StatusIcon} />
                            <span>Status: Approved</span>
                        </div>
                        <div>
                            <img src={StartDateIcon} />
                            <span>Start Date: {moment(new Date(data?.advertiser.getDraft.booking[2])).format("MMM Do YYYY")}</span>
                        </div>
                        <div>
                            <img src={EndDateIcon} />
                            <span>End Date: Jun 25th 2022</span>
                        </div>
                    </div>
                    {data?.advertiser.getDraft.booking.map((draft) => {

                        return <div className='station-cards-container'>
                            <div className='station-card'>
                                <img src={AdvertTypeIcon} />
                                Advert Type: {draft.advertType}
                            </div>
                            <div className='station-card'>
                                <img src={DurationIcon} />
                                Duration: 2 weeks
                            </div>
                            <div className='station-card'>
                                <img src={LanguageIcon} />
                                Language: {draft.language}
                            </div>
                            <div className='station-card'>
                                <img src={DaysIcon} />
                                Number of Days: 28
                            </div>
                            <div className='station-card'>
                                <img src={SpotIcon} />
                                Number of Spot: {draft.quantity}
                            </div>
                            <div className='station-card'>
                                <img src={DollarIcon} />
                                Total amount: #{data?.advertiser.getDraft.subTotal}
                            </div>
                            <div className='station-card'>
                                <img src={CardIcon} />
                                Payment Method: Paystack
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </AdvertiserDashboardayout>
    )
}

export default AdvertiserBooking