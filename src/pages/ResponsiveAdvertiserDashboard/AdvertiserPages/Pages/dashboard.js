import React from 'react'
import { useQuery } from '@apollo/client'
import AdvertDashboardLayout from '../../ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout'
import CardImageOne from "../../assets/cardIcon1.svg"
import CardImageTwo from "../../assets/cardIcon2.svg"
import CardImageThree from "../../assets/cardIcon3.svg"
import { DASHBOARD_DATA } from '../../../../components/GraphQL/Mutation'
import "../css/dashboard.css"
import AdvertiserHomeDashboardLoader from '../../../../components/SkeletonLayoutLoader/AdvertiserHomeDashboard'




const Dashboard = () => {

    const { data, loading } = useQuery(DASHBOARD_DATA)

    return (
        <AdvertDashboardLayout>
            <div className='dashboard-home-container'>
                {loading ? <AdvertiserHomeDashboardLoader /> :
                    <>
                        <div className='dashboard-card-container'>
                            <div className='card-content-wrapper'>
                                <img src={CardImageOne}
                                    alt='campaign-icon'
                                />
                                <div>
                                    <span>{data?.advertiser.getDashboardData.activeCampaign}</span>
                                    <span>Active Campaigns</span>
                                </div>
                            </div>
                            <div className='card-content-wrapper'>
                                <img src={CardImageTwo}
                                    alt='total-campaign-icon'
                                />
                                <div>
                                    <span>{data?.advertiser.getDashboardData.totalCampaign
                                    }</span>
                                    <span>Total Campaigns</span>
                                </div>
                            </div>
                            <div className='card-content-wrapper'>
                                <img src={CardImageThree}
                                    alt='pending-campaign-icon'
                                />
                                <div>
                                    <span>{data?.advertiser.getDashboardData.pendingCampaign}</span>
                                    <span>Pending Campaigns</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className='dashboard-table-container'>
                            <h3>Most Recent Campaigns</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>campaign ID</th>
                                        <th>campaign details</th>
                                        <th>campaign status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.advertiser.getDashboardData.recentCampaigns.map((tableData, index) => {
                                        return <tr key={index}>
                                            <td>{tableData.id}</td>
                                            <td>{tableData.campaignDetails}</td>
                                            <td>{tableData.campaignStatus}</td>


                                        </tr>
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                }
            </div>
        </AdvertDashboardLayout>
    )
}

export default Dashboard;

