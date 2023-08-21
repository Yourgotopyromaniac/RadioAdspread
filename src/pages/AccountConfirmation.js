import styled from "styled-components";
import OtpInput from "react-otp-input";
import MesageGif from "../assets/gifs/confirm-account.gif";
import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { OTP_CONFIRMATION } from "../components/GraphQL/Mutation";
import { toast } from "react-toastify";
import { RESEND_VERIFICATION } from "../components/GraphQL/Queries";
import { useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN } from "../constant";
import { useAtom } from "jotai";
import { isBookingState } from "../atom/advertiserModal";
import { useCreateDraftFromBookings } from "../hook";

export const AccountConfirmation = () => {
  const [isBooking] = useAtom(isBookingState);
  const { loading: createDraftLoading, createDraft } =
    useCreateDraftFromBookings();

  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { usergroup } = useParams();

  const handleChange = (code) => setCode(code);

  const [otpConfirmation, { loading }] = useMutation(OTP_CONFIRMATION);
  const [resendVerification] = useLazyQuery(RESEND_VERIFICATION, {
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      toast.error(error?.networkError?.result?.errors[0]?.message);
      navigate("/login");
    },
    onCompleted: (data) => {
      data.auth.resendEmailVerificationCode &&
        toast.success("email sent successfully");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (code.length === 0) return toast.error("Verification code is required");

    otpConfirmation({
      variables: {
        verificationCode: code,
      },
      onCompleted: (data) => {
        localStorage.setItem(AUTH_TOKEN, data?.auth.verifyEmail.token);

        toast.success(
          data?.auth.verifyEmail.isVerified && "Verification Successful"
        );

        if (usergroup.toLowerCase() === "advertiser") {
          // check if user is currently booking a campaign
          setTimeout(() => {
            isBooking
              ? createDraft(JSON.parse(localStorage.getItem("booking")))
              : navigate("/dashboard");
          }, 1000);
        } else {
          navigate("/dashboard/vendor");
        }
      },
      onError: (err) => {
        toast.error(err?.networkError?.result?.errors[0]?.message);
      },
    });
  };

  const resendVerificationHandler = (e) => {
    e.preventDefault();
    resendVerification();
  };
  return (
    <Container>
      <MessageGifContainer src={MesageGif} alt="message gif" />

      <HeaderText>
        Just one more step! <br /> Lets verify your account
      </HeaderText>
      <BodyText>
        We already sent a code to your email please check your inbox and enter
        the code to verify your new account.
      </BodyText>
      <form onSubmit={handleSubmit}>
        <OtpContainer>
          <OtpInput
            value={code}
            onChange={handleChange}
            numInputs={6}
            separator={<span style={{ width: "8px" }}></span>}
            isInputNum={true}
            shouldAutoFocus={true}
            inputStyle={{
              border: " 0.8px solid #004643",
              borderRadius: "2px",
              width: "33px",
              height: "45px",
            }}
            focusStyle={{
              border: "1px solid #CFD3DB",
              outline: "none",
            }}
            style={{ justifyContent: "center" }}
          />
        </OtpContainer>

        <Button>
          <ButtonText>
            {loading || createDraftLoading ? (
              <i class="fa fa-circle-o-notch fa-spin"></i>
            ) : (
              "Verify and Proceed"
            )}
          </ButtonText>
        </Button>
      </form>

      <BodyText style={{ marginTop: "10px" }}>
        Didn't Get an Email ?
        <a href="/" onClick={resendVerificationHandler}>
          {" "}
          <span style={{ color: "#F99B28" }}>click Here</span>{" "}
        </a>
        to resend verification code
      </BodyText>
    </Container>
  );
};

const OtpContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MessageGifContainer = styled.img`
  width: 128px;
  height: 128px;
`;

const Container = styled.div`
  width: 100%;
  // padding: 62px 122px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  /* or 60% */

  display: flex;
  align-items: center;
  text-align: center;
  margin: 70px 0px 24px 0px;
  color: #0e0e2c;
`;

const BodyText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  /* or 133% */

  text-align: center;
  margin-bottom: 58px;
  color: #3b3950;
`;

const Button = styled.button`
  width: 310px;
  height: 44px;
  background: #f99b28;
  border-radius: 2px;
  margin-top: 64px;
`;

const ButtonText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
`;
