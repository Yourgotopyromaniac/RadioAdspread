import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../../components/Logo";
import Hamburger from "./../../assets/hamburger.svg";
import Notification from "../../assets/notification.svg";
import UserIcon from "../../assets/user.svg";
import BalanceIcon from "../../assets/balance.svg";
import DashHomeIcon from "../../../../assets/dashboardIcons/dashHomeIcon.svg";
import StationIcon from "../../../../assets/dashboardIcons/stationIcon.svg";
import DashCampaignIcon from "../../../../assets/dashboardIcons/dashCampaignIcon.svg";
import ReportIcon from "../../../../assets/dashboardIcons/reportIcon.svg";
import PaymentIcon from "../../../../assets/dashboardIcons/paymentIcon.svg";
import AnalyticsIcon from "../../../../assets/dashboardIcons/analyticsIcon.svg";
import ScheduleIcon from "../../../../assets/dashboardIcons/scheduleIcon.svg";
import { useQuery } from "@apollo/client";
import "./style.css";
import { USER_INFO } from "../../../../components/GraphQL/Queries";
import { Center, ChakraProvider, HStack, VStack } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import NotVerified from "./components/NotVerified";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Container,
  ProfileIcon,
  PopoverText,
  LogOutIcon,
} from "../components/index";
import { handleLogOut } from "../utils";
import { TableSpinner } from "../../../../components/Spinner";
import Logout from "../../../../components/Modal/Logout/Logout";

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};
const colors = {
  brand: {
    50: "rgba(228, 240, 237, 0.6)",
    100: "rgba(228, 240, 237, 0.6)",
    500: "rgba(228, 240, 237, 0.6)", // you need this
  },
};

const components = {
  Form: {
    variants: {
      floating: {
        container: {
          label: {
            top: -5,
            left: 0,
            zIndex: 2,
            position: "absolute",
            backgroundColor: "white",
            pointerEvents: "none",
            mx: 3,
            px: 1,
            my: 2,
          },
        },
      },
    },
  },
};

const theme = extendTheme({ breakpoints, colors, components });

const VendorDashbaordLayout = ({ name, children }) => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuData = [
    {
      img: DashHomeIcon,
      name: "Radio station Dashboard",
      href: "/dashboard/vendor",
    },
    {
      img: StationIcon,
      name: "Radio Station",
      href: "/dashboard/vendor/station",
    },
    {
      img: DashCampaignIcon,
      name: "Campaigns",
      href: "/dashboard/vendor/campaign-page",
    },
    {
      img: ReportIcon,
      name: "Reports",
      href: "/dashboard/vendor/reports",
    },
    {
      img: PaymentIcon,
      name: "Payment",
      href: "/dashboard/vendor/payment",
    },
    {
      img: AnalyticsIcon,
      name: "Analytics",
      href: "",
    },
    {
      img: ScheduleIcon,
      name: "Program Schedule",
      href: "/dashboard/vendor/program-schedule",
    },
  ];

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { data, loading } = useQuery(USER_INFO);
  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <TableSpinner />
        </Center>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider theme={theme}>
      {isOpen && <Logout isOpen={isOpen} onClose={onClose} />}
      {!data?.auth?.me?.isApproved ? (
        <NotVerified />
      ) : (
        <>
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

                <div className="advertiser-name">{name}</div>
              </div>
              {openMobileMenu && (
                <div className="mobile-show-nav-menu-container">
                  <div className="mobile-sidebar-wrapper">
                    <div>
                      <Logo textColor="#FFFFFE" favColor="#FC9732" />
                    </div>
                    <div className="mobile-icon-wrapper">
                      <img src={Notification} alt="notification_icon" />
                      <Popover placement="bottom-start">
                        <PopoverTrigger>
                          <img
                            src={UserIcon}
                            alt="user_icon"
                            // onClick={() => setOpenProfile(!openProfile)}
                          />
                        </PopoverTrigger>
                        {/* {openProfile && ( */}
                          <PopoverContent
                            w="158px"
                            h="89px"
                            bg="#ffffff"
                            border="0.5px solid #aba8a8"
                            borderRadius="2px"
                            p="15px 0px"
                          >
                            <VStack>
                              <Container
                                onClick={() =>
                                  navigate("/dashboard/vendor/profile")
                                }
                              >
                                <HStack>
                                  <ProfileIcon />
                                  <PopoverText>Profile</PopoverText>
                                </HStack>
                              </Container>
                              <Container onClick={onOpen}>
                                <HStack>
                                  <LogOutIcon />
                                  <PopoverText>Logout</PopoverText>
                                </HStack>
                              </Container>
                            </VStack>
                          </PopoverContent>
                        {/* )} */}
                      </Popover>
                    </div>
                  </div>
                  <div className="mobile-sidebar-menu">
                    {menuData.map((data, index) => {
                      return (
                        <Link to={data.href}>
                          <div className="mobile-sidebat-item" key={index}>
                            <img src={data.img} alt={data.name} />
                            <span>{data.name}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setOpenMobileMenu(!openMobileMenu)}
                    className="dashboard-campaign-btn vendor-cancel-btn"
                  >
                    <CloseIcon />
                  </button>
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
                {menuData.map((item, index) => {
                  return (
                    <>
                      <Link to={item.href}>
                        <div className="sidebar-menu-item" key={index}>
                          <img src={item.img} alt={item.name} />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="dashboard-nav-body-container">
              <nav>
                <div>{data?.auth.me.name}</div>
                <div className="nav-icon-wrapper">
                  <img
                    src={BalanceIcon}
                    alt="balance_icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/dashboard/vendor/payment")}
                  />

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
                        <Container
                          onClick={() => navigate("/dashboard/vendor/profile")}
                        >
                          <HStack>
                            <ProfileIcon />
                            <PopoverText>Profile</PopoverText>
                          </HStack>
                        </Container>
                        <Container onClick={onOpen}>
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
        </>
      )}
    </ChakraProvider>
  );
};

export default VendorDashbaordLayout;
