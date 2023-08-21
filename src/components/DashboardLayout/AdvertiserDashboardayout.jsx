import React from 'react'
import Logo from '../Logo'
import Balance from "../../assets/dashboardIcons/balance.svg"
import Notification from "../../assets/dashboardIcons/notification.svg"
import Person from "../../assets/dashboardIcons/person.svg"
import DashHomeIcon from "../../assets/dashboardIcons/dashHomeIcon.svg"
import DashCampaignIcon from "../../assets/dashboardIcons/dashCampaignIcon.svg"
import ReportIcon from "../../assets/dashboardIcons/reportIcon.svg"
import PaymentIcon from "../../assets/dashboardIcons/paymentIcon.svg"
import AnalyticsIcon from "../../assets/dashboardIcons/analyticsIcon.svg"
import ScheduleIcon from "../../assets/dashboardIcons/scheduleIcon.svg"
import "./style.css"

const AdvertiserDashboardayout = ({header, children}) => {
    const sidebarArr = [
        {
            img: DashHomeIcon,
            name: "Advertiser Dashboard",
            href: "/advertiser/dashboard"
        },
 
        {
            img: DashCampaignIcon,
            name: "Campaigns",
            href: "/advertiser/campaign"
        },
        {
            img: ReportIcon,
            name: "Drafts",
            href: "/advertiser/draft"
        },
        {
            img: PaymentIcon,
            name: "Wallet",
            href: "/advertiser/wallet"
        },
        {
            img: AnalyticsIcon,
            name: "Analytics",
            href: ""
        },
        {
            img: ScheduleIcon,
            name: "profile",
            href: "/advertiser/profile"
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
                                <img src={item.img} alt={item.name} />{item.svg}{item.name}</a></dl>
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

export default AdvertiserDashboardayout