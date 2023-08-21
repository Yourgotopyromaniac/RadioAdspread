import { DashboardHomeIcon, CampaignsIcon, DraftsIcon, WalletIcon, AnalyticsIcon, ProfileIcon, StatesIcon, OrdersIcon, FeesIcon, AdvertiserIcon, BlogIcon, RolesIcon, TransactionsIcon, SettingsIcon } from "../pages/ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/components";

export const menuList = [
    {
      Icon: DashboardHomeIcon,
      text: "Advertiser Dashboard",
      link: "/dashboard",
    },
    {
      Icon: CampaignsIcon,
      text: "Campaigns",
      link: "/dashboard/station",
    },
    {
      Icon: DraftsIcon,
      text: "Drafts",
      link: "/dashboard/draft",
    },
    {
      Icon: WalletIcon,
      text: "Wallet",
      link: "/dashboard/wallet",
    },
    {
      Icon: AnalyticsIcon,
      text: "Analytics",
      link: "/analytics",
    },
    {
      Icon: ProfileIcon,
      text: "Profile",
      link: "/dashboard/profile",
    },
  ];

  export const AdminMenuList = [
      {
        Icon: DashboardHomeIcon,
        text: "Dashboard",
        link: "",
        active: false
      },
      {
        Icon: RolesIcon,
        text: "Roles",
        link: "",
        active: false
      },
      {
        Icon: DraftsIcon,
        text: "Vendor",
        link: "/admin/verification-portal",
        active: true
      },
      {
        Icon: AdvertiserIcon,
        text: "Advertiser",
        link: "",
        active: false
      },
      {
        Icon: TransactionsIcon,
        text: "Transactions",
        link: "",
        active: false
      },
      {
        Icon: BlogIcon,
        text: "Blog",
        link: "",
        active: false
      },
      {
        Icon: StatesIcon,
        text: "States",
        link: "",
        active: false
      },
      {
        Icon: OrdersIcon,
        text: "Orders",
        link: "",
        active: false
      },
      {
        Icon: SettingsIcon,
        text: "Page Settings",
        link: "",
        active: false
      },
      {
        Icon: FeesIcon,
        text: "Platform Fees",
        link: "",
        active: false
      },
    ];