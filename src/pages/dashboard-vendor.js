import React from "react";

import CardImageOne from "./ResponsiveAdvertiserDashboard/assets/cardIcon1.svg";
import CardImageTwo from "./ResponsiveAdvertiserDashboard/assets/cardIcon1.svg";
import CardImageThree from "./ResponsiveAdvertiserDashboard/assets/cardIcon1.svg";
import "./ResponsiveAdvertiserDashboard/AdvertiserPages/css/dashboard.css";
import VendorDashbaordLayout from "./ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/vendorDashboard/VendorDashbaordLayout";
import { useQuery } from "@apollo/client";
import { BROADCASTER_DASHBOARD_DATA } from "../components/GraphQL/Queries";

const DashboardVendor = () => {
  const { data } = useQuery(BROADCASTER_DASHBOARD_DATA);
  return (
    <VendorDashbaordLayout>
      <div className="dashboard-home-container">
        <div className="dashboard-card-container">
          <div className="card-content-wrapper">
            <img src={CardImageOne} alt="campaign-icon" />
            <div>
              <span>{data?.broadcaster.getDashboardData.activeCampaign}</span>
              <span>Active Campaigns</span>
            </div>
          </div>
          <div className="card-content-wrapper">
            <img src={CardImageTwo} alt="total-campaign-icon" />
            <div>
              <span>{data?.broadcaster.getDashboardData.totalCampaign}</span>
              <span>Total Campaigns</span>
            </div>
          </div>
          <div className="card-content-wrapper">
            <img src={CardImageThree} alt="pending-campaign-icon" />
            <div>
              <span>{data?.broadcaster.getDashboardData.pendingCampaign}</span>
              <span>Pending Campaigns</span>
            </div>
          </div>
        </div>
        <div className="dashboard-table-container">
          <h3>Most Recent Campaigns</h3>
          <table>
            <thead>
              <tr>
                <th>campaign ID</th>
                <th>campaign details</th>
                <th>campaign status</th>
              </tr>
            </thead>
            <tbody>
              {data?.broadcaster.getDashboardData.recentCampaigns.map(
                (data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.id}</td>
                      <td>{data.campaignDetails}</td>
                      <td>{data.campaignStatus}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </VendorDashbaordLayout>
  );
};

export default DashboardVendor;
