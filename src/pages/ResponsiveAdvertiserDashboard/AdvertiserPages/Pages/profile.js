import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdvertDashboardLayout from '../../ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout'
import "../css/profile.css"

const Profile = () => {
    const navigate = useNavigate();
  return (
    <AdvertDashboardLayout>
        <div className='profile-page-container'>
        <div className='profile-page-header'>
            <h4>profile</h4>
            <div>
                <button
                onClick={()=> navigate('/profile/reset-password')}
                >
                change password
                </button>
                </div>
        </div>
        <h4>billing information</h4>
        <div className='profile-input-container'>
            <div>
            <fieldset className='profile-input'>
                <legend>First name</legend>
                <input type="text" placeholder='Hassan'/>
            </fieldset>
            </div>
            <div>
            <fieldset className='profile-input'>
                <legend>Last name</legend>
                <input type="text" placeholder='Agnes'/>
            </fieldset>
            </div>
            <div>
            <fieldset className='profile-input'>
                <legend>Country</legend>
                <input type="text" placeholder='Nigeria'/>
            </fieldset>
            </div>
            <div>
            <fieldset className='profile-input'>
                <legend>City</legend>
                <input type="text" placeholder='Lagos'/>
            </fieldset>
            </div>
            <div>
            <fieldset className='profile-input'>
                <legend>Address</legend>
                <input type="text" placeholder='2B Montgomery Yaba'/>
            </fieldset>
            </div>
            <div>
            <fieldset className='profile-input'>
                <legend>Postal code</legend>
                <input type="text" placeholder='102929'/>
            </fieldset>
            </div>
        </div>
        <div className='update-btn-container'>
            <button>update</button>
        </div>
    </div>
    </AdvertDashboardLayout>
  )
}

export default Profile