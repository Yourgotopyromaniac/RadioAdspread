import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_INFO } from "../../../components/GraphQL/Queries";
import Logo from "../../../components/Logo";
import Hamburger from "../assets/hamburger.svg";
import Notification from "../assets/notification.svg";
import UserIcon from "../assets/user.svg";
import PersonIcon from "../assets/person.svg";

import BalanceIcon from "../assets/balance.svg";
import PlusIcon from "../assets/plus.svg";
import { useQuery } from "@apollo/client";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  HStack,
  VStack,
  Skeleton,
} from "@chakra-ui/react";

import { Container, PopoverText, ProfileIcon, LogOutIcon } from "./components";
import "./style.css";
import { handleLogOut } from "./utils";
import { CloseIcon } from "@chakra-ui/icons";

import { menuList } from "../../../utils/constant";
import Logout from "../../../components/Modal/Logout/Logout";

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme({ breakpoints });

const AdvertDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()


  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const { data, loading } = useQuery(USER_INFO);

  return (
    <ChakraProvider theme={theme}>
      {isOpen && <Logout isOpen={isOpen} onClose={onClose}/>}
      <div className="advert-dashboard-layout">
        <nav>
          <div className="advert-dashboard-nav-container">
            <div className="nav-wrapper">
              <div>
                <Logo textColor="#FFFFFE" favColor="#FC9732" />
              </div>
              <div onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                <img src={Hamburger} alt="hamburger_icon" />
              </div>
            </div>

            <div className="advertiser-name">
              {loading ? (
                <Skeleton width="80px" height="20px" />
              ) : (
                data?.auth.me.fullname
              )}
            </div>
          </div>
          {openMobileMenu && (
            <div className="mobile-show-nav-menu-container">
              <div className="mobile-sidebar-wrapper">
                <div>
                  <Logo textColor="#FFFFFE" favColor="#FC9732" />
                </div>
                <div className="mobile-icon-wrapper">
                  <img src={Notification} alt="notification_icon" />
                  <div onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                    <CloseIcon />
                  </div>

                  {/* <img src={UserIcon} alt="user_icon" /> */}
                </div>
              </div>
              <div className="mobile-sidebar-menu">
                {menuList.map(({ text, Icon, link }) => {
                  return (
                    <Link to={link}>
                      <div className="mobile-sidebat-item">
  
                        <Icon />
                        <span>{text}</span>
                      </div>
                    </Link>
                  );
                })}
                <div onClick={() => handleLogOut(navigate)}>
                  <div className="mobile-sidebat-item">
                    <LogOutIcon />
                    <span className="logout-text">Logout</span>
                  </div>
                </div>
              </div>
              <Link to="/book-campaign">
                <button className="dashboard-campaign-btn">
                  <img src={PlusIcon} alt="" />
                  <span>new campaign</span>
                </button>
              </Link>
            </div>
          )}
        </nav>
        {children}
      </div>

      <div className="desktop-dashboard-layout">
        <div className="dashboard-sidebar-container">
          <div>
            <Logo textColor="#FFFFFE" favColor="#FC9732" />
          </div>

          <div className="dashboard-sidebar-menu-items">
            {menuList.map(({ text, Icon, link }) => {
              return (
                <Link to={link}>
                  <div className="sidebar-menu-item">
                    <Icon />
                    <span>{text}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to="/book-campaign">
            <button className="dashboard-campaign-btn">{onOpen}
              <img src={PlusIcon} alt="" />
              <span>new campaign</span>
            </button>
          </Link>
        </div>
        <div className="dashboard-nav-body-container">
          <nav>
            <div>
              {loading ? (
                <Skeleton width="80px" height="20px" />
              ) : (
                data?.auth.me.fullname
              )}
            </div>
            <div className="nav-icon-wrapper">
              <Link to="/dashboard/wallet">
                <img src={BalanceIcon} alt="balance_icon" />
              </Link>

              <img src={Notification} alt="notification" />

              <Popover placement="bottom-start">
                <PopoverTrigger>
                  <div style={{ cursor: "pointer" }}>
                    <img src={UserIcon} alt="user-icon" />
                  </div>
                </PopoverTrigger>

                <PopoverContent
                  w="158px"
                  h="89px"
                  bg="#ffffff"
                  border="0.5px solid #aba8a8"
                  borderRadius="2px"
                  p="15px 0px"
                >
                  <VStack>
                    <Container onClick={() => navigate("/dashboard/profile")}>
                      <HStack>
                        <ProfileIcon />
                        <PopoverText>Profile</PopoverText>
                      </HStack>
                    </Container>
                    <Container 
                    onClick={onOpen}
                    >
                      <HStack>
                        <LogOutIcon />
                        <PopoverText>Logout</PopoverText>
                      </HStack>
                    </Container>
                  </VStack>
                </PopoverContent>
              </Popover>
            </div>
          </nav>
          {children}
        </div>
      </div>
    </ChakraProvider>
  );
};

export default AdvertDashboardLayout;
