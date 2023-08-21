import React from "react";
import "../css/campaign.css";

import VendorDashbaordLayout from "../ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/vendorDashboard/VendorDashbaordLayout";

import { Outlet } from "react-router-dom";

const CampaignPage = () => {
  return (
    <VendorDashbaordLayout>
      <Outlet />
    </VendorDashbaordLayout>
  );
};

export default CampaignPage;
