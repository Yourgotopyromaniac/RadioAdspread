import React from "react";
import {
  ChakraProvider,
  extendTheme,
  useMediaQuery,
  useDisclosure,
  Box,
  Flex,
  IconButton,
  Text,
  CloseButton,
  Drawer,
  DrawerContent,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  VStack,
} from "@chakra-ui/react";

import { menuList, RadioStationMenuItems } from "../../utils/constant";

import { useQuery } from "@apollo/client";

import { HamburgerIcon } from "@chakra-ui/icons";
import AdvertiserCampaignPage from "../ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/AdvertiserCampaignsPage/campaignPage";
import { USER_INFO } from "../../components/GraphQL/Queries";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../components/Logo";
import { Container } from "../ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/components";
const theme = extendTheme({
  colors: {
    primary: " #004643",
    secondary: "#F99B28",
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "1000px",
    xl: "1400px",
  },
});

const menuData = [
  {
    //   img: DashboardIcon,
    text: "Advertiser Dashboard",
    link: "/dashboard",
  },
  {
    //   img: CampaignIcon,
    text: "Campaigns",
    link: "/dashboard/station",
  },
  {
    //   img: DraftIcon,
    text: "Drafts",
    link: "/dashboard/draft",
  },
  {
    //   img: WalletIcon,
    text: "Wallet",
    link: "/dashboard/wallet",
  },
  {
    //   img: AnalyticIcon,
    text: "Analytics",
    link: "/analytics",
  },
  {
    //   img: PersonIcon,
    text: "Profile",
    link: "/dashboard/profile",
  },
];

const vendorData = [
  {
    //   img: DashboardIcon,
    text: "Radio Station Dashboard",
    link: "/dashboard",
  },
  {
    //   img: CampaignIcon,
    text: "Vendor Campaigns",
    link: "/dashboard/station",
  },
  {
    //   img: DraftIcon,
    text: "Vendor Drafts",
    link: "/dashboard/draft",
  },
  {
    //   img: WalletIcon,
    text: "Vendor Wallet",
    link: "/dashboard/wallet",
  },
  {
    //   img: AnalyticIcon,
    text: "Analytics",
    link: "/analytics",
  },
  {
    //   img: PersonIcon,
    text: "Profile",
    link: "/dashboard/profile",
  },
];

const DashboardLayoutComponet = ({ children }) => {
  //   const { data: { auth: { me: { fullname = "" } = {} } = {} } = {}, loading } =
  //     useQuery(USER_INFO);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.100">
        <Sidebar
          onClose={() => onClose}
          display={{ base: "none", lg: "block" }}
          //   menuItems={menuData}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          returnFocusOnClose={onClose}
          size="full"
        >
          <DrawerContent>
            <Sidebar onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* <Header onOpen={onOpen} fullname="{fullname}" /> */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, lg: "250px" }} p="4">
          {children}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default DashboardLayoutComponet;

const Header = ({ onOpen, fullname }) => {
  return (
    <Flex
      ml={{ base: 0, lg: 60 }}
      px={4}
      position="sticky"
      top="0"
      height="20"
      zIndex="1"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: "space-between", lg: "flex-end" }}
    >
      <Text>kkkk</Text>
      <Box></Box>
      <IconButton
        display={{ base: "flex", lg: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />
    </Flex>
  );
};

const Sidebar = ({ onClose, menuItems, ...rest }) => {
  const { pathname } = useLocation();
  return (
    <Box
      transition="3s ease"
      bg="primary"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", lg: "250px" }}
      position="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="center" justifyContent="space-between" mx="4" h="20">
        <Logo textColor="#FFFFFE" favColor="#FC9732" />
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text> */}
        <Box display={{ base: "flex", lg: "none" }} alignItems="center" gap="3">
          <NotificationIcon />
          <CloseButton onClick={onClose} fontSize={18} />
        </Box>
      </Flex>
      {pathname === "/a" &&
        menuList.map((items, i) => <NavLink key={i} data={items} />)}
      {pathname === "/b" &&
        RadioStationMenuItems.map((items, i) => (
          <NavLink key={i} data={items} />
        ))}
    </Box>
  );
};

const NavLink = ({ data, ...rest }) => {
  const { text, Icon, link } = data;
  return (
    <Link to={link}>
      <Flex
        alignItems="center"
        p="4"
        color="#fff"
        gap="15"
        margin="20px 0"
        // mx="6"
        // borderRadius="lg"
        _hover={{
          bg: "rgba(171, 209, 198, 0.3)",
          color: "secondary",
        }}
        {...rest}
      >
        <Icon />
        <Text whiteSpace="nowrap" fontSize="16px">
          {text}
        </Text>
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, lg: 60 }}
      px={{ base: 4, lg: 16 }}
      height="20"
      alignItems="center"
      bg={{ base: "primary", lg: "white" }}
      borderBottomColor="gray.200"
      borderBottomWidth="1px"
      justifyContent={{ base: "space-between", lg: "space-between" }}
      {...rest}
    >
      <Text display={{ base: "none", lg: "block" }}>kkkk</Text>
      <Box display={{ base: "block", lg: "none" }}>
        <Logo textColor="#FFFFFE" favColor="#FC9732" />
      </Box>
      <Box display={{ base: "none", lg: "flex" }} gap="30">
        <WalletIcon />
        <NotificationIcon />
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <UserIcon />
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
  <Container></Container>
</VStack>
          </PopoverContent>
        </Popover>
      </Box>
      <IconButton
        display={{ base: "flex", lg: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />
    </Flex>
  );
};

const SidebarText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #ffffff;
`;

const WalletIcon = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6480_8174)">
        <path
          d="M19.5 5.41602H6.5C4.70507 5.41602 3.25 6.87109 3.25 8.66602V17.3327C3.25 19.1276 4.70507 20.5827 6.5 20.5827H19.5C21.2949 20.5827 22.75 19.1276 22.75 17.3327V8.66602C22.75 6.87109 21.2949 5.41602 19.5 5.41602Z"
          stroke="#F99B28"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.25 10.834H22.75"
          stroke="#F99B28"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.5835 16.25H7.5935"
          stroke="#F99B28"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.9165 16.25H14.0832"
          stroke="#F99B28"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6480_8174">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const NotificationIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
        stroke="#F99B28"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
        stroke="#F99B28"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const UserIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
        stroke="#F99B28"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
        stroke="#F99B28"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 11L19 13L23 9"
        stroke="#F99B28"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
