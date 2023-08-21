import React from 'react'
import { Outlet } from 'react-router'
import AdvertDashboardLayout from '../../../ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout'
import "../../css/station-dashboard.css"

const AdvertiserCampaignPage = () => {
    return (
        <AdvertDashboardLayout>
            <Outlet />
        </AdvertDashboardLayout>
    )
}

export default AdvertiserCampaignPage