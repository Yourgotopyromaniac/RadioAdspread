import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import moment from 'moment'
import { ADVERTISER_CAMPAIGN_DETAILS } from '../../../../../../components/GraphQL/Queries'
import OrderIcon from "../../../../assets/order.svg"
import StatusIcon from "../../../../assets/status.svg"
import StartDateIcon from "../../../../assets/calendar.svg"
import EndDateIcon from "../../../../assets/endDateCalendar.svg"
import AdvertTypeIcon from "../../../../assets/advertType.svg"
import DurationIcon from "../../../../assets/time.svg"
import SpotIcon from "../../../../assets/spot.svg"
import LanguageIcon from "../../../../assets/language.svg"
import DaysIcon from "../../../../assets/duration.svg"
import DollarIcon from "../../../../assets/currency.svg"
import CardIcon from "../../../../assets/card.svg"
import "../../../css/station-booking.css"
import { TableSpinner } from '../../../../../../components/Spinner'
import { fmtCurrency } from '../../../../../../utils/functions'


const AdertiserBookingDetails = () => {
    const navigate = useNavigate()
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
    const viewBookedSlotHandler = () => {
        navigate(`/dashboard/station/booked-slots/${data?.advertiser.getCampaignDetails.id}`);
    };

    return (
        <>
            <div className='advertiser-booking-container'>
                {loading ? <TableSpinner /> : <>
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
                                <BookingHeaderText>Order ID: {data?.advertiser.getCampaignDetails.id}</BookingHeaderText>
                            </div>
                            <div>
                                <img src={StatusIcon} alt='status_icon' />
                                Status: <span className='campaign_status'>{campaignDetails[0]?.status}</span>
                            </div>
                            <div>
                                <img src={StartDateIcon} alt='start-date_icon' />
                                <BookingHeaderText>Start Date: {moment(new Date(data?.advertiser.getCampaignDetails.startDate)).format("MMM Do YYYY")}</BookingHeaderText>
                            </div>
                            <div>
                                <img src={EndDateIcon} alt='end-date_icon' />
                                <BookingHeaderText>End Date: {moment(new Date(data?.advertiser.getCampaignDetails.endDate)).format("MMM Do YYYY")}</BookingHeaderText>
                            </div>
                            <ViewSlotContainer onClick={viewBookedSlotHandler}>
                                <ViewSlotText>View Booked Slots</ViewSlotText>
                                <ChevronRight />
                            </ViewSlotContainer>
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
                                                Total amount:{fmtCurrency(data.totalAmount)}

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
        </>
    )
}

export default AdertiserBookingDetails

const ViewSlotContainer = styled.div`
  width: 169px;
  height: 38px;
  border: 1px solid #f99b28;
  border-radius: 1.50209px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ViewSlotText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */
  color: #004643;
`;

const BookingHeaderText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #004643;
`;

const ChevronRight = () => {
    return (
        <svg
            width="6"
            height="12"
            viewBox="0 0 6 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.75 10.5L5.25 6L0.75 1.5"
                stroke="#004643"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};