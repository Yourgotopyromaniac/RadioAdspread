import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BROADCASTER_REGISTER } from "../../components/GraphQL/Mutation";
import { useMutation } from "@apollo/client";
import "../css/signup-vendor.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import { AUTH_TOKEN } from "../../constant";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { VendorRegistrationLayout } from "../../components/VendorRegistrationLayout";
import { useLoginModalState } from "../../hook";
import Login from "../login";
import { BroadcasterSignupSchema } from "../../utils/validations";

const SignupVendor = () => {
  const { loginModal, setLoginModal } = useLoginModalState();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmAgreement, setConfirmAgreement] = useState(true);
  const [broadcasterSignup, { loading }] = useMutation(BROADCASTER_REGISTER);
  const [states, setStates] = useState([]);
  const [frequencyType, setFrequencyType] = useState("FM");

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
    setFieldValue("country", value);
  };
  const handleState = (e) => {
    const { value } = e.target;
    setCountryStateName({ ...countrystatename, stateName: value });
    setFieldValue("state", value);
  };

  const navigate = useNavigate();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      fullname: "",
      address: "",
      country: "",
      state: "",
      city: "",
      email: "",
      phoneNumber: "",
      radioStationWebsite: "",
      radioStationDigitalStreaUrl: "",
      radioStationCategory: "",
      positionHeld: "",
      zipcode: "",
      password: "",
      confirmPassword: "",
      frequency: "",
    },
    validationSchema: BroadcasterSignupSchema,
    onSubmit: (values) => {
      broadcasterSignup({
        variables: {
          name: values.name,
          fullname: values.fullname,
          address: values.address,
          country: values.country,
          state: values.state,
          city: values.city,
          email: values.email,
          phoneNumber: values.phoneNumber,
          zipcode: values.zipcode,
          password: values.password,
          confirmPassword: values.confirmPassword,
          radioStationWebsite: values.radioStationWebsite,
          radioStationDigitalStreaUrl: values.radioStationDigitalStreaUrl,
          radioStationCategory: values.radioStationCategory,
          positionHeld: values.positionHeld,
          frequency: values.frequency + " " + frequencyType,
        },
        onCompleted: (data) => {
          localStorage.setItem(AUTH_TOKEN, data.auth.broadcasterRegister.token);
          toast(
            "Sign Up Successful, A Verification Code Has been sent to your email"
          );
          navigate("/signup/verify-account/Broadcaster");
        },
        onError: (err) => {
          toast(err?.networkError?.result?.errors[0]?.message);
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
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div id="input-container">
                <div className="form-input-wrapper">
                  {errors.name && touched.name && <span> {errors.name}</span>}
                  <div className="full-length input-cont">
                    <label htmlFor="radio-station">Name of Radio Station</label>
                    <input
                      id="radio-station"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="name"
                      placeholder="Beat FM"
                      required
                    />
                  </div>
                </div>
                <div className="full-length">
                  <div className="form-input-wrapper">
                    {errors.fullname && touched.fullname && (
                      <span> {errors.fullname}</span>
                    )}
                    <div className="input-cont half-length">
                      <label htmlFor="login-username">Fullname</label>
                      <input
                        id="login-username"
                        type="text"
                        name="fullname"
                        value={values.fullname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-input-wrapper">
                    <div className="input-cont half-length">
                      {errors.positionHeld && touched.positionHeld && (
                        <span> {errors.positionHeld}</span>
                      )}

                      <label htmlFor="position-held">Position Held</label>
                      <input
                        id="position-held"
                        type="text"
                        value={values.positionHeld}
                        onChange={handleChange}
                        name="positionHeld"
                        placeholder="Marketer"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-input-wrapper">
                  {errors.address && touched.address && (
                    <span> {errors.address}</span>
                  )}
                  <div className="full-length input-cont">
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      type="text"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="address"
                      placeholder="2B, Montgomery Yaba, Lagos State."
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
                  <div className="form-input-wrapper">
                    {errors.city && touched.city && <span> {errors.city}</span>}
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
                  </div>
                  <div className="input-cont half-length">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      id="zipcode"
                      type="text"
                      name="zipcode"
                      value={values.zipcode}
                      onChange={handleChange}
                      placeholder="1001022"
                    />
                  </div>
                </div>
                <div className="full-length">
                  <div className="form-input-wrapper">
                    {errors.radioStationWebsite &&
                      touched.radioStationWebsite && (
                        <span> {errors.radioStationWebsite}</span>
                      )}
                    <div className="input-cont half-length">
                      <label htmlFor="station-website">
                        Radio Station Website
                      </label>
                      <input
                        id="station-website"
                        type="url"
                        name="radioStationWebsite"
                        value={values.radioStationWebsite}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Https://"
                        required
                      />
                    </div>
                  </div>
                  <div className="input-cont half-length">
                    <label htmlFor="station-category">
                      Radio Station Category
                    </label>
                    <input
                      id="station-category"
                      type="text"
                      name="radioStationCategory"
                      value={values.radioStationCategory}
                      onChange={handleChange}
                      placeholder="Entertainment"
                      required
                    />
                  </div>
                </div>
                <div className="full-length input-cont">
                  <label htmlFor="stream-url">
                    Radio Station Digital Stream URL
                  </label>
                  <input
                    id="stream-url"
                    type="url"
                    name="radioStationDigitalStreaUrl"
                    value={values.radioStationDigitalStreaUrl}
                    onChange={handleChange}
                    placeholder="https://"
                    required
                  />
                </div>
                <div className="full-length input-cont">
                  <label htmlFor="frequency">Radio Station Frequency</label>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                      padding: "0 11px",
                    }}
                  >
                    <input
                      id="frequency"
                      type="number"
                      name="frequency"
                      value={values.frequency}
                      onChange={handleChange}
                      placeholder="82.5"
                      required
                      style={{ width: "80%" }}
                    />
                    <select onChange={(e) => setFrequencyType(e.target.value)}>
                      <option value="FM">FM</option>
                      <option value="AM">AM</option>
                    </select>
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
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        placeholder="+234"
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
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your email address"
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
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your Password"
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
                        id="login-password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your Password"
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
              </div>

              <div id="tac-pp">
                <input
                  type="checkbox"
                  onClick={() => setConfirmAgreement(!confirmAgreement)}
                />
                <p>
                  I acknowledge that I have read and accept the{" "}
                  <a href="gg">Terms and Conditions</a> and{" "}
                  <a href="fff">Privacy Policy</a>
                </p>
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
        </div>
      </VendorRegistrationLayout>
    </>
  );
};

export default SignupVendor;
