import { Link } from "react-router-dom";
import "./style.css";

const SignupModal = ({ closeModal }) => {
  return (
    <div className="signup-modal-container">
      <div>
        <div className="signup-modal-content">
          <div
            className="signup-modal-header"
            onClick={() => {
              closeModal(false);
            }}
          >
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1558_2136)">
                <path
                  d="M14.25 4.25L4.75 12.75"
                  stroke="#0E0E2C"
                  stroke-width="1.375"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.75 4.25L14.25 12.75"
                  stroke="#0E0E2C"
                  stroke-width="1.375"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1558_2136">
                  <rect width="19" height="17" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="signup-modal-body">
            <div className="signup-type">
              <div>
                <div className="first-type-container">
                  <div className="signup-type-info">
                    <img
                      src="https://olawalecoder.github.io/radioadspread/img/radio_ad.png"
                      alt="radio analytics"
                    />
                    <h5>as an advertiser </h5>
                    <p>
                      Reach millions of listeners on radio stations at a go.
                    </p>
                    <Link to="/signup">
                      <button className="signup-modal-btn">Get Started</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="first-type-container">
                  <div className="signup-type-info">
                    <img
                      src="https://olawalecoder.github.io/radioadspread/img/radio.png"
                      alt="radio analytics"
                    />
                    <h5>as a radio station </h5>
                    <p>
                      Reach millions of listeners on radio stations at a go.
                    </p>
                    <Link to="/signup/vendor">
                      <button className="signup-modal-btn">Get Started</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
