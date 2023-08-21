import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import Balance from "../../assets/dashboardIcons/balance.svg"
import Notification from "../../assets/dashboardIcons/notification.svg"
import Person from "../../assets/dashboardIcons/person.svg"
import DashHomeIcon from "../../assets/dashboardIcons/dashHomeIcon.svg"
import StationIcon from "../../assets/dashboardIcons/stationIcon.svg"
import DashCampaignIcon from "../../assets/dashboardIcons/dashCampaignIcon.svg"
import ReportIcon from "../../assets/dashboardIcons/reportIcon.svg"
import PaymentIcon from "../../assets/dashboardIcons/paymentIcon.svg"
import AnalyticsIcon from "../../assets/dashboardIcons/analyticsIcon.svg"
import ScheduleIcon from "../../assets/dashboardIcons/scheduleIcon.svg"
import "./style.css"

const DashboardLayout = ({header, sidebarItem, children}) => {
   const sidebarArr = [
    {
        img: DashHomeIcon,
        name: "Radio station Dashboard",
        href: "/dashboard"
    },
    {
        img: StationIcon,
        name: "Radio Station",
        href:'/dashboard/station'
    },
    {
        img: DashCampaignIcon,
        name: "Campaigns",
        href: "/dashboard/campaign-page"
    },
    {
        img: ReportIcon,
        name: "Reports",
        href: "/dashboard/reports"
    },
    {
        img: PaymentIcon,
        name: "Payment",
        href: "/dashboard/payment"
    },
    {
        img: AnalyticsIcon,
        name: "Analytics",
        href: ""
    },
    {
        img: ScheduleIcon,
        name: "Program Schedule",
        href: "/dashboard/program-schedule"
    },
   ]
  
    return (
        <div className='dashboard-layout-container'>
            <div className='dashboard-layout-wrapper'>
                <div>
                    <Logo
                        textColor="#FFFFFE"
                        favColor="#FC9732"
                    />
                </div>
                <div className='layout-list'>
                    {sidebarArr.map((item) => {
                        return (
                            
                        <dl><a href={item.href} className='sidebar-link'>
                            <img src={item.img} />{item.svg}{item.name}</a></dl>
                        )
                    })}
                </div>

            </div>
            <div className='dashboard-main'>
            <div className='dashboard-layout-header'>
                <h4>{header}</h4>
                <div className='dashboard-layout-header-icons'>
                    <img src={Balance} alt="" />
                    <img src={Notification} alt="" />
                    <img src={Person} alt="" />
                </div>
            </div>
            {children}
            </div>

            
        </div>
    )
}

export default DashboardLayout