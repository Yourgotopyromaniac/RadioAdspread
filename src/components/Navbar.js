import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import Logo from "./Logo";
import { ReactComponent as Menu } from "../assets/icons/menu.svg";
import { ReactComponent as ArrowUp } from "../assets/icons/chevron-top.svg";
import SignupModal from "./Modal/signup/SignupModal";
import Login from "../pages/login";
import styled from "styled-components";
import { ExistingLoginUser, isTokenValid } from "../utils/functions";
import { useLoginModalState } from "../hook";

const Navbar = ({ bgClass, navTextColor, navFavColor, userType }) => {
  const mbMenu = useRef();
  const dropdown = useRef();
  const navigate = useNavigate();
  const { loginModal, setLoginModal } = useLoginModalState();

  const [openModal, setOpenModal] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);

  const ref = useRef();

  const tokenFromLocalStorage = localStorage.getItem("token");

  const tokenStillValid = isTokenValid(tokenFromLocalStorage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setLoginDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [loginDropdown]);

  const navigateUserType = () => {
    const advertType = ExistingLoginUser(tokenFromLocalStorage);
    if (advertType === "Broadcaster") {
      return navigate("/dashboard/vendor");
    }
    if (advertType === "Advertiser") {
      return navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  const modalHandler = () => {
    setOpenModal(true);
  };

  return (
    <>
      {openModal && <SignupModal closeModal={setOpenModal} />}
      {loginModal && <Login closeModal={setLoginModal} />}
      <nav id="nav-menu" className={bgClass} ref={ref}>
        <div>
          <Link to="/">
            <Logo
              textColor={navTextColor}
              favColor={navFavColor} /*  , hr - background: #ABD1C61A; */
            />
          </Link>

          <hr className="header-line-one" />
          <div id="lg-nav-links">
            <ul>
              <li>
                <NavLink to="/">
                  <NavText textColor={navTextColor}>Advertisers</NavText>
                </NavLink>
              </li>
              <li>
                <NavLink to="/radio-station">
                  <NavText textColor={navTextColor}>Radio Stations</NavText>
                </NavLink>
              </li>
              <li>
                <a href="https://more.radioadspread.com/knowledgebase/">
                  <NavText textColor={navTextColor}>Knowledge Base</NavText>
                </a>
              </li>
              <li>
                <a href="https://more.radioadspread.com/blog/">
                  <NavText textColor={navTextColor}>Blog</NavText>
                </a>
              </li>
            </ul>
            <div className={bgClass}>
              {tokenStillValid ? (
                <div className="nav-item">
                  <button
                    className={
                      userType === "advertiser" ? "signup text-color" : "signup"
                    }
                    onClick={() => navigateUserType()}
                  >
                    Dashboard
                  </button>
                </div>
              ) : (
                <>
                  <ul className="navbar-nav ms-auto">
                    <li className=" px-3 dropdown">
                      <button
                        className={
                          userType === "advertiser"
                            ? "text-color login-text"
                            : "login-text"
                        }
                        onClick={() => setLoginModal(!loginModal)}
                        style={{ fontSize: "90%" }}
                      >
                        Log in
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={
                          userType === "advertiser"
                            ? "text-color signup"
                            : "signup"
                        }
                        onClick={modalHandler}
                      >
                        Sign Up
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
          <button
            id="menu-btn"
            ref={mbMenu}
            onClick={() => {
              dropdown.current.style.height = "238px";
            }}
          >
            <Menu />
          </button>
          <div id="mb-nav-links" ref={dropdown}>
            <ul>
              <li>
                <Link to="/">Advertisers</Link>
              </li>
              <li>
                <Link to="/broadcaster">Broadcasters</Link>
              </li>
              <li>
                <a href="https://more.radioadspread.com/knowledgebase/">
                  Knowledge Base
                </a>
              </li>
              <li>
                <a href="https://more.radioadspread.com/blog/">Blog</a>
              </li>
            </ul>
            {tokenStillValid ? (
              <div
                className="nav-item"
                style={{ justifyContent: "flex-start" }}
              >
                <button
                  className="signup"
                  style={{ margin: "0px" }}
                  onClick={() => navigateUserType()}
                >
                  Dashboard
                </button>
              </div>
            ) : (
              <div>
                <p onClick={() => setLoginModal(!loginModal)}>Log In</p>
                <p onClick={modalHandler}>Sign Up</p>
              </div>
            )}
            <button
              className="dd-arrow-top"
              onClick={() => {
                dropdown.current.style.height = "0px";
              }}
            >
              <ArrowUp />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

const NavText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ textColor }) => (textColor ? textColor : `#ffffff`)};
  &:hover {
    color: #f99b28;
  }
  &.active {
    color: #f99b28;
  }
`;

// const LoginText = styled.p`
//   font-family: "Adobe Clean";
//   font-style: normal;
//   font-weight: 700;
//   font-size: 16px;
//   line-height: 19px;
//   color: #f99b28;
//   cursor: pointer;
// `;
const NavLink = styled(Link)`
  &:hover,
  &:active {
    color: #f99b28;
  }
`;
