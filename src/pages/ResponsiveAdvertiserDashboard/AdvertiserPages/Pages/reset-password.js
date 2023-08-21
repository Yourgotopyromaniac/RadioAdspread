import React, { useState } from 'react'
import AdvertDashboardLayout from '../../ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout'
import { useMutation } from '@apollo/client'
import { UPDATE_PASSWORD } from '../../../../components/GraphQL/Mutation'
import "../css/reset-password.css"
import { toast } from 'react-toastify'
import VendorDashbaordLayout from '../../ResponsiveAdvertiserDashboardLayout/vendorDashboard/VendorDashbaordLayout'

const ResetPassword = () => {

    const [changePassword, { loading }] = useMutation(UPDATE_PASSWORD)

    const [updatePassword, setUpdatePassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const handleChange = (e) => {
        setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value })
    }

    const submitUpdatePassword = () => {
        changePassword({
            variables: {
                currentPassword: updatePassword.currentPassword,
                newPassword: updatePassword.newPassword,
                confirmNewPassword: updatePassword.confirmNewPassword
            },
            onCompleted: () => {
                toast.success("password updated successfully")
            },
            onError: (err) => {
                toast.error(err?.networkError?.result?.errors[0]?.message);
            }
        })
    }
    return (
        <AdvertDashboardLayout>
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
                            <input type="password" placeholder='*******'
                                name='currentPassword'
                                onChange={(e) => handleChange(e)}
                            />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className='reset-password-input'>
                            <legend>New password</legend>
                            <input type="password" placeholder='*******'
                                name='newPassword'
                                onChange={(e) => handleChange(e)}
                            />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className='reset-password-input'>
                            <legend>Confirm new password</legend>
                            <input type="password" placeholder='*******'
                                name='confirmNewPassword'
                                onChange={(e) => handleChange(e)}
                            />
                        </fieldset>
                    </div>
                </div>

                <button className='reset-password-btn' onClick={submitUpdatePassword}>{loading ? <i class="fa fa-circle-o-notch fa-spin"></i> : "update"}</button>

            </div>
        </AdvertDashboardLayout>
    )
}

export default ResetPassword;

export const ResetVendorPassword = () => {
    const [changePassword, { loading }] = useMutation(UPDATE_PASSWORD)

    const [updatePassword, setUpdatePassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const handleChange = (e) => {
        setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value })
    }

    const submitUpdatePassword = () => {
        changePassword({
            variables: {
                currentPassword: updatePassword.currentPassword,
                newPassword: updatePassword.newPassword,
                confirmNewPassword: updatePassword.confirmNewPassword
            },
            onCompleted: () => {
                toast.success("password updated successfully")
            },
            onError: (err) => {
                toast.error(err?.networkError?.result?.errors[0]?.message);
            }
        })
    }
    return (
        <VendorDashbaordLayout>
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
                            <input type="password" placeholder='*******'
                                name='currentPassword'
                                onChange={(e) => handleChange(e)}
                            />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className='reset-password-input'>
                            <legend>New password</legend>
                            <input type="password" placeholder='*******'
                                name='newPassword'
                                onChange={(e) => handleChange(e)}
                            />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className='reset-password-input'>
                            <legend>Confirm new password</legend>
                            <input type="password" placeholder='*******'
                                name='confirmNewPassword'
                                onChange={(e) => handleChange(e)}
                            />
                        </fieldset>
                    </div>
                </div>

                <button className='reset-password-btn' onClick={submitUpdatePassword}>{loading ? <i class="fa fa-circle-o-notch fa-spin"></i> : "update"}</button>

            </div>
        </VendorDashbaordLayout>
    )
}

