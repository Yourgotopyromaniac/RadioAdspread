import React from 'react'
import AdvertiserDashboardayout from '../../components/DashboardLayout/AdvertiserDashboardayout'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import "./css/advertiser-reset-password.css"

const ResetProfilePassword = () => {
  return (
    <AdvertiserDashboardayout
    header="Agnes Hassan"
    >
<div className='profile-page-container'>
        <div className='profile-page-header'>
            <h4>profile</h4>
        </div>
        <h4>change password</h4>
        <div 
        className='profile-reset-password-container'>
            <div>
            <fieldset className='reset-password-input'>
                <legend>Current password</legend>
                <input type="password" placeholder='*******'/>
            </fieldset>
            </div>
            <div>
            <fieldset className='reset-password-input'>
                <legend>New password</legend>
                <input type="password" placeholder='*******'/>
            </fieldset>
            </div>
            <div>
            <fieldset className='reset-password-input'>
                <legend>Confirm new password</legend>
                <input type="password" placeholder='*******'/>
            </fieldset>
            </div>
        </div>
        {/* <div className='update-btn-container'> */}
            <button className='reset-password-btn'>update</button>
        {/* </div> */}
    </div>
    </AdvertiserDashboardayout>
  )
}

export default ResetProfilePassword;