import React, { useRef, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "./GraphQL/Mutation";
import "../css/reset-password.css";
import ResetPasswordSuccess from "./Modal/resetPasswordSuccess";

const ResetPassword = ({ visibility }) => {
  const resetPassword = useRef();

  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD,
    {
      onCompleted: () => {
        setEmailSent(true)
      },

    }
  )
  useEffect(() => {
    if (visibility) {
      resetPassword.current.style.display = "flex";
    } else {
      resetPassword.current.style.display = "none";
    }
  }, [visibility]);

  const handleSubmit = (e) => {
    e.preventDefault()
    forgotPassword({
      variables: {
        "input": {
          email: email
        }
      }
    })
  }

  return (
    <>
      {emailSent && <ResetPasswordSuccess mailAddress={email} closeModal={setEmailSent} />}
      <form id="reset-password"
        ref={resetPassword}
        onSubmit={handleSubmit}
        className={emailSent && "hide"}
      >
        <div>
          <h2>Reset Password</h2>
          <div>
            <label htmlFor="reset-email">Email</label>
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1663 14V12.6667C14.1663 11.9594 13.8678 11.2811 13.3365 10.781C12.8051 10.281 12.0845 10 11.333 10H5.66634C4.91489 10 4.19422 10.281 3.66287 10.781C3.13152 11.2811 2.83301 11.9594 2.83301 12.6667V14"
                stroke="#7A7979"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.50033 7.33333C10.0651 7.33333 11.3337 6.13943 11.3337 4.66667C11.3337 3.19391 10.0651 2 8.50033 2C6.93552 2 5.66699 3.19391 5.66699 4.66667C5.66699 6.13943 6.93552 7.33333 8.50033 7.33333Z"
                stroke="#7A7979"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              id="reset-email"
              type="email"
              placeholder="Enter your email address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button>{loading ? <i class="fa fa-circle-o-notch fa-spin"></i> : "Reset Password"}</button>
        </div>
      </form>
    </>

  );
};
export default ResetPassword;
