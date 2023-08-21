import React from 'react'
import CardOneImg from "../../assets/images/dashboard/cardImgOne.svg"
import AdvertiserDashboardayout from '../../components/DashboardLayout/AdvertiserDashboardayout';
import "./css/advertiser-dashboard.css"

const AdvertiserDashvendor = () => {
  return (
    <AdvertiserDashboardayout
    header="Agnes Hassan"
    >
         <div className='dashboard-container'>
            <div className='card-wrapper'>
            <div className='card-one'>
                        <img src={CardOneImg} alt="" />
                        <div>
                            <span>22</span>
                            <h4>Active Campaigns</h4>
                        </div>
                    </div>
                    <div className='card-one'>
                        <img src={CardOneImg} alt="" />
                        <div>
                            <span>135</span>
                            <h4>Total Campaigns</h4>
                        </div>

                    </div>
                    <div className='card-one'>
                        <img src={CardOneImg} alt="" />
                        <div>
                            <span>09</span>
                            <h4>Pending Campaigns</h4>
                        </div>
                    </div>
            </div>
            <div className='dashboard-table-wrapper'>
                    <h3>Most Recent Campaigns</h3>
                    <table className='table-wrapper'>
                        <tr>
                            <th className='l'>Campaign ID</th>
                            <th className='l'>Campaign Details</th>
                            <th className='l'>Campaign Status</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div> 
            </div>
    </AdvertiserDashboardayout>
  )
}

export default AdvertiserDashvendor;