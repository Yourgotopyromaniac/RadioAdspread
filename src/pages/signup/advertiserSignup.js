import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ADVERTISER_REGISTER } from "../../components/GraphQL/Mutation";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../../constant";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import "../css/signup-advertiser.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useLoginModalState } from "../../hook";
import { VendorRegistrationLayout } from "../../components/VendorRegistrationLayout";
import { AdvertiserSignupSchema } from "../../utils/validations";
import Login from "../login";

const AdvertiserSignup = () => {
  const navigate = useNavigate();

  const { loginModal, setLoginModal } = useLoginModalState();

  const [userType] = useState("Individual");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmAgreement, setConfirmAgreement] = useState(true);
  const [states, setStates] = useState([]);

  const [signup, { loading }] = useMutation(ADVERTISER_REGISTER);

  const [countrystatename, setCountryStateName] = useState({
    countryName: "",
    stateName: "",
    cityName: "",
  });
  const handleCountry = (e) => {
    const { value } = e.target;

    const getCountryCode = Country.getAllCountries().find(
      (country) => country.name === value
    ).isoCode;
    const getStates = State.getStatesOfCountry(getCountryCode);
    setStates(getStates);
    setCountryStateName({ ...countrystatename, countryName: value });
  };
  const handleState = (e) => {
    const { value } = e.target;
    setCountryStateName({ ...countrystatename, stateName: value });
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      fullname: "",
      industry: "",
      address: "",
      companyName: "",
      country: "",
      state: "",
      city: "",
      email: "",
      phoneNumber: "",
      zipcode: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
      accountType: userType,
    },
    validationSchema: AdvertiserSignupSchema,
    onSubmit() {
      signup({
        variables: {
          input: {
            fullname: values.fullname,
            industry: values.industry,
            address: values.address,
            companyName: values.companyName,
            country: countrystatename.countryName,
            state: countrystatename.stateName,
            city: values.city,
            email: values.email,
            phoneNumber: values.phoneNumber,
            zipcode: values.zipcode,
            password: values.password,
            confirmPassword: values.confirmPassword,
            referralCode: values.referralCode,
            accountType: values.accountType,
          },
        },
        onCompleted: (data) => {
          localStorage.setItem(AUTH_TOKEN, data.auth.advertiserRegister.token);
          setTimeout(navigate("/signup/verify-account/advertiser"), 50000);
          toast.success("account created");
        },
        onError(err) {
          toast.error(err.networkError.result.errors[0].message);
        },
      });
    },
  });

  return (
    <>
      {loginModal && <Login closeModal={setLoginModal} />}
      <VendorRegistrationLayout>
        <div>
          <div>
            <h2>Create Your Account</h2>
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setLoginModal(true)}
                style={{ color: "#ff9b28" }}
              >
                Log in
              </button>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <h4
              style={{
                marginTop: "20px",
                fontSize: "13.52px",
                fontWeight: 400,
              }}
            >
              Please select your prefered account type
            </h4>
            <div id="input-container" style={{ marginTop: "-25px" }}>
              <div className="advertiser-type-button">
                <button
                  type="button"
                  onClick={() => setFieldValue("accountType", "Individual")}
                  className={
                    values.accountType === "Individual"
                      ? "active-btn"
                      : "not-active"
                  }
                >
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setFieldValue("accountType", "company")}
                  className={
                    values.accountType === "company"
                      ? "active-btn"
                      : "not-active"
                  }
                >
                  company
                </button>
              </div>
              {values.accountType === "company" && (
                <div className="form-input-wrapper">
                  {errors.companyName && touched.companyName && (
                    <span> {errors.companyName}</span>
                  )}
                  <div className="full-length input-cont">
                    <label htmlFor="radio-station">Company name</label>
                    <input
                      // id="radio-station"
                      type="text"
                      placeholder="Space Universe"
                      name="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                </div>
              )}
              <div className="form-input-wrapper">
                {errors.fullname && touched.fullname && (
                  <span id="form-error"> {errors.fullname}</span>
                )}
                <div className="full-length input-cont">
                  <label htmlFor="radio-station">Full name</label>
                  <input
                    // id="radio-station"
                    type="text"
                    placeholder="John Doe"
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
              </div>
              <div className="full-length input-cont">
                <label htmlFor="radio-station">Industry</label>
                <input
                  // id="radio-station"
                  type="text"
                  placeholder="Beat FM"
                  name="industry"
                  value={values.industry}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                {errors.address && touched.address && (
                  <span> {errors.address}</span>
                )}
                <div className="full-length input-cont">
                  <label htmlFor="radio-station">Address </label>
                  <input
                    // id="radio-station"
                    type="text"
                    placeholder="2B, Montgomery Yaba, Lagos State."
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
              </div>
              <div className="full-length">
                <div className="input-cont half-length">
                  <label htmlFor="country">Country</label>
                  <select
                    id="countries"
                    className="country-dropdown"
                    onChange={(e) => handleCountry(e)}
                  >
                    <option selected disabled>
                      Select Country
                    </option>
                    {Country.getAllCountries().map((getcountry, index) => (
                      <option value={getcountry.name} key={index}>
                        {getcountry.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-cont half-length">
                  <label htmlFor="state">State</label>
                  <select
                    id="states"
                    className="state-dropdown"
                    onChange={(e) => handleState(e)}
                  >
                    <option selected disabled>
                      Select State
                    </option>
                    {states.map((getState, index) => (
                      <option value={getState.name} key={index}>
                        {getState.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="full-length">
                <div className="input-cont half-length">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Lagos"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-cont half-length">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input
                    id="zipcode"
                    type="text"
                    placeholder="1001022"
                    name="zipcode"
                    value={values.zipcode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="full-length">
                <div className="form-input-wrapper">
                  {errors.phoneNumber && touched.phoneNumber && (
                    <span> {errors.phoneNumber}</span>
                  )}
                  <div className="input-cont half-length">
                    <label htmlFor="phone-no">Phone Number</label>
                    <input
                      id="phone-no"
                      type="text"
                      placeholder="+234"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                </div>

                <div className="form-input-wrapper">
                  {errors.email && touched.email && (
                    <span> {errors.email}</span>
                  )}
                  <div className="input-cont half-length">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="full-length">
                <div className="form-input-wrapper">
                  {errors.password && touched.password && (
                    <span> {errors.password}</span>
                  )}
                  <div className="input-cont half-length">
                    <label htmlFor="login-password">Password</label>
                    <input
                      // id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <button
                      type="button"
                      id="show-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <ViewOffIcon boxSize={15} />
                      ) : (
                        <ViewIcon boxSize={15} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="form-input-wrapper">
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span> {errors.confirmPassword}</span>
                  )}
                  <div className="input-cont half-length">
                    <label htmlFor="login-password">confirmPassword</label>
                    <input
                      // id="login-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter your Password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <button
                      type="button"
                      id="show-password"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <ViewOffIcon boxSize={15} />
                      ) : (
                        <ViewIcon boxSize={15} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="full-length">
                <div className="input-cont half-length">
                  <label>Referral Code</label>
                  <input
                    type="text"
                    name="referralCode"
                    value={values.referralCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div id="tac-pp">
                <input
                  type="checkbox"
                  onClick={() => setConfirmAgreement(!confirmAgreement)}
                />
                <p>
                  I acknowledge that I have read and accept the{" "}
                  <a href="https://more.radioadspread.com/knowledgebase/terms-and-conditions/">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="https://more.radioadspread.com/knowledgebase/privacy-policy/">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
            <div id="login-button">
              <button
                type="submit"
                disabled={confirmAgreement}
                className={confirmAgreement ? "disable-btn" : "enable-btn"}
              >
                {loading ? (
                  <i class="fa fa-circle-o-notch fa-spin"></i>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </div>
        </form>
      </VendorRegistrationLayout>
    </>
  );
};

export default AdvertiserSignup;
