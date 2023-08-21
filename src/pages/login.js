import "./css/login.css";
import { useAtom } from "jotai";
import { ReactComponent as CheckIcon } from "../assets/icons/check-icon.svg";
import { useCreateDraftFromBookings } from "../hook";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADVERTISER_LOGIN } from "../components/GraphQL/Mutation";
import { useEffect, useRef, useState } from "react";
import { isBookingState } from "../atom/advertiserModal";
import { AUTH_TOKEN } from "../constant";
import { toast } from "react-toastify";
import Logo from "../components/Logo";
import { CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import ResetPassword from "../components/resetPassword";

const Login = ({
  navTextColor = "#004643",
  navFavColor = "#FC9732",
  closeModal,
}) => {
  const [isBooking] = useAtom(isBookingState);
  const { loading: createDraftLoading, createDraft } =
    useCreateDraftFromBookings();

  const navigate = useNavigate();

  const [login, { loading }] = useMutation(ADVERTISER_LOGIN);

  const [reset, setReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkMark = useRef();
  const Modal = useRef();

  useEffect(() => {
    checkMark.current.style.display = "none";
  }, [checkMark]);

  useEffect(() => {
    if (reset) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
      Modal.current.style.display = "flex";
    } else {
      document.body.style.height = "100%";
      document.body.style.overflow = "auto";
      Modal.current.style.display = "none";
    }
  }, [reset]);

  function handleRemmeberMe() {
    if (checkMark.current.style.display === "none") {
      checkMark.current.style.display = "block";
    } else {
      checkMark.current.style.display = "none";
    }
  }

  function handleResetPassword(e) {
    const child = Modal.current.querySelector("#reset-password");
    if (!child.contains(e.target)) {
      setReset(false);
    }
  }

  function handleLogin(values) {
    login({
      variables: {
        email: values.email,
        password: values.password,
      },
      onCompleted: handleLoginComplete,
      onError(err) {
        toast.error(err.networkError.result.errors[0].message);
      },
    });
  }

  function handleLoginComplete(data) {
    // save jwt token
    localStorage.setItem(AUTH_TOKEN, data.auth.login.token);

    const isVerified = data.auth.login.isVerified;
    const userGroup = data.auth.login.group;

    if (!isVerified) {
      return setTimeout(() => {
        navigate(`/signup/verify-account/${userGroup}`);

        closeModal(false);
        toast.success("Login successful");
      }, 1000);
    }

    if (userGroup.toLowerCase() === "advertiser") {
      // Advertiser
      if (isBooking) {
        // if user is booking a campaign before the login prompt return back to booking
        return createDraft(JSON.parse(localStorage.getItem("booking")));
      } else {
        setTimeout(navigate("/book-campaign"), 1000);
      }
    } else {
      // Broadcaster
      setTimeout(navigate("/dashboard/vendor"), 1000);
    }

    closeModal(false);
    toast.success("Login successful");
  }

  return (
    <section id="login">
      <div>
        <header>
          <nav>
            <Link to="/">
              <Logo textColor={navTextColor} favColor={navFavColor} />
            </Link>
          </nav>
        </header>
        <div>
          <div className="login-modal-header" onClick={() => closeModal(false)}>
            <CloseIcon />
          </div>
          <main>
            <div>
              <div>
                <h5>Login</h5>
                <p>Log in to your dashboard</p>
              </div>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={handleLogin}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-container">
                      <div>
                        <label className="login-label" htmlFor="login-username">
                          Email
                        </label>
                        <input
                          id="login-username"
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="login-label" htmlFor="login-password">
                          Password
                        </label>
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
                      <div id="login-option">
                        <div>
                          <button type="button" onClick={handleRemmeberMe}>
                            <CheckIcon ref={checkMark} />
                          </button>
                          <span>Remember Me</span>
                        </div>
                        <button
                          type="button"
                          id="forgot-password"
                          onClick={() => setReset(true)}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <button id="login-button" type="submit">
                        {loading || createDraftLoading ? (
                          <i class="fa fa-circle-o-notch fa-spin"></i>
                        ) : (
                          "Log in"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
              {/* <p className="signup-option">
                <span
                  style={{ cursor: "pointer", color: "#ff9b28" }}
                  onClick={() => showBroadcasterModal(true)}
                >
                  Click here
                </span>{" "}
                to Sign in as Radio station
              </p> */}
              <p className="signup-other-option">
                Don't have an account? Sign up as an
                <Link
                  to="/signup"
                  id="go-to-signup"
                  onClick={() => closeModal(false)}
                >
                  {" "}
                  Advertiser
                </Link>{" "}
                or as a
                <Link
                  to="/signup/vendor"
                  id="go-to-signup"
                  onClick={() => closeModal(false)}
                >
                  {" "}
                  Radio station
                </Link>
              </p>
            </div>
          </main>
        </div>
        <aside ref={Modal} onClick={handleResetPassword}>
          <ResetPassword visibility={reset} />
        </aside>
      </div>
    </section>
  );
};

export default Login;
