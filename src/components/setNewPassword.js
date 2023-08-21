import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Logo from './Logo';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from './GraphQL/Mutation';
import { SetPasswordContainer, NewPasswordContainer, NewPasswordWrapper, LogoWrappper, ButtonContainer, ResetPasswordModal, ResetPasswordWrapper } from './reset-password-style'
import { toast } from 'react-toastify';




const SetNewPassword = () => {

    const [showModal, setShowModal] = useState(false)

    const [resetPassword, { loading }] = useMutation(RESET_PASSWORD)

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const getToken = searchParams.get("token")
    const userId = searchParams.get("id")

    const validate = (values) => {
        const errors = {}
        if (!values.password) {
            errors.password = "password is required"
        } else if (values.password.length < 8) {
            errors.password = 'Minimum of 8 characters long'
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required'
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Confirm password must be the same as password'
        }
        return errors;
    }

    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate,
        onSubmit: (values) => {

            resetPassword({
                variables: {
                    "input": {
                        password: values.password,
                        confirmPassword: values.confirmPassword,
                        token: getToken,
                        userId: parseInt(userId)
                    }
                },
                onCompleted: () => {
                    setShowModal(true)
                },
                onError: (err) => {
                    toast.error(err?.networkError?.result?.errors[0]?.message);
                }
            })
        }
    })
    return (
        <SetPasswordContainer>
            <NewPasswordContainer showModal={showModal}>
                <NewPasswordWrapper>
                    <Link to='/'>
                        <LogoWrappper>
                            <Logo
                                textColor="#FFFFFE"
                                favColor="#FC9732"
                            />
                        </LogoWrappper>
                    </Link>

                    <div>
                        <h2><span>s</span>et new password</h2>
                        <form onSubmit={handleSubmit}
                        >
                            <div className="form-input-wrap">
                                {errors.password && touched.password && (
                                    <span> {errors.password}</span>
                                )}
                                <label>New Password</label>
                                <input type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    required
                                />
                            </div>
                            <div className="form-input-wrap">
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <span> {errors.confirmPassword}</span>
                                )}
                                <label>Confirm New Password</label>
                                <input type="password"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    required
                                />
                            </div>
                            <ButtonContainer>
                                <button type='submit' >{loading ? <i class="fa fa-circle-o-notch fa-spin"></i> : "Reset Password"}</button>
                            </ButtonContainer>
                        </form>
                    </div>
                </NewPasswordWrapper>
            </NewPasswordContainer>
            {showModal && <ResetPasswordModal>
                <ResetPasswordWrapper>
                    <div>
                        <i class="fa fa-check-circle"></i>
                        <h2>password reset</h2>
                        <p>your password has been reset successfully</p>
                        <button onClick={() => navigate('/')}>continue</button>
                    </div>
                </ResetPasswordWrapper>
            </ResetPasswordModal>}
        </SetPasswordContainer>

    )
}

export default SetNewPassword;

