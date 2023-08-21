import React from 'react'
import { Outlet } from 'react-router-dom';

import AdvertDashboardLayout from '../../../ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout';

const AdvertiserAnalytics = () => {

    return (
        <AdvertDashboardLayout>
            <Outlet />
        </AdvertDashboardLayout>
    )
}

export default AdvertiserAnalytics