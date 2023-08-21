import React, { useState } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import SalesIcon from "../assets/dashboardIcons/salesIcon.svg";
import PendingIcon from "../assets/dashboardIcons/pendingIcon.svg";
import CommissionIcon from "../assets/dashboardIcons/commission.svg";
import EarningIcon from "../assets/dashboardIcons/earningIcon.svg";
import CampaignIcon from "../assets/dashboardIcons/campaignImg.svg";
import "./css/dashboard-report.css";
import DashboardTable from "../components/DashboardLayout/DashboardTable";
import VendorDashbaordLayout from "./ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/vendorDashboard/VendorDashbaordLayout";
import { TableSpinner } from "../components/Spinner";
import { GET_PAYMENT_HISTORY } from "../components/GraphQL/Queries";

const DashboardReport = () => {
  const routeButton = ["Overview", "Statement", "Payment History"];
  const {
    data: { broadcaster: { getPaymentHistory = [] } = {} } = {},
    loading,
  } = useQuery(GET_PAYMENT_HISTORY);
  const overViewCard = [
    {
      img: SalesIcon,
      value: "0.00",
      purpose: "sales",
    },
    {
      img: PendingIcon,
      value: "10105",
      purpose: "Pending",
    },
    {
      img: CommissionIcon,
      value: "0.00",
      purpose: "Commission",
    },
    {
      img: EarningIcon,
      value: "0.00",
      purpose: "Total Earnings",
    },
    {
      img: CampaignIcon,
      value: "3",
      purpose: "Campaigns",
    },
  ];
  const data = [
    {
      date: "Mar 28th 2022",
      orderId: "#472356",
      type: "Jingle",
      sales: "₦ 3,225.00",
      commission: "₦483.75",
      earnings: "₦2,741.25",
      amount: "₦2,741.25",
      status: "pending",
      paymentMethod: "flutterwave",
    },
    {
      date: "Mar 28th 2022",
      orderId: "#472356",
      type: "Jingle",
      sales: "₦ 3,225.00",
      commission: "₦483.75",
      earnings: "₦2,741.25",
      amount: "₦2,741.25",
      status: "pending",
      paymentMethod: "flutterwave",
    },
    {
      date: "Mar 28th 2022",
      orderId: "#472356",
      type: "Jingle",
      sales: "₦ 3,225.00",
      commission: "₦483.75",
      earnings: "₦2,741.25",
      amount: "₦2,741.25",
      status: "pending",
      paymentMethod: "flutterwave",
    },
    {
      date: "Mar 28th 2022",
      orderId: "#472356",
      type: "Jingle",
      sales: "₦ 3,225.00",
      commission: "₦483.75",
      earnings: "₦2,741.25",
      amount: "₦2,741.25",
      status: "pending",
      paymentMethod: "flutterwave",
    },
  ];
  const [showIndex, setShowIndex] = useState(0);

  return (
    <VendorDashbaordLayout>
      <div className="report-container">
        <h2>Reports</h2>
        <div className="report-route-btn">
          {routeButton.map((route, index) => {
            return (
              <button
                onClick={() => {
                  setShowIndex(index);
                }}
                className={index === showIndex ? "active-border" : ""}
              >
                {route}
              </button>
            );
          })}
        </div>
        {showIndex === 0 && (
          <div className="overview-container">
            {overViewCard.map((card) => {
              return (
                <div className="card-content">
                  <img src={card.img} alt="sale-img" />
                  <div className="card-text">
                    <span>{card.value}</span>
                    <span>{card.purpose}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {showIndex === 1 && (
          <div className="statement-container">
            <div className="date-wrapper">
              <div className="start-date-wrapper">
                From: <input type="date" />
              </div>
              <div className="end-date-wrapper">
                To: <input type="date" />
              </div>
              <button>show</button>
            </div>
            <DashboardTable />
            <div class="panel-body table-body-container">
              <table
                id="data-table"
                class="table table-striped table-bordered nowrap"
                width="100%"
              >
                <thead>
                  <tr>
                    <th>
                      <input name="select_all" value="1" type="checkbox" />
                    </th>
                    <th>transaction date</th>
                    <th>order ID</th>
                    <th>type</th>
                    <th>sales</th>
                    <th>commission</th>
                    <th>earning</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((info) => {
                    return (
                      <tr class="odd gradeX">
                        <td>
                          <input type="checkbox" name="name1" />
                        </td>
                        <td>{info.date}</td>
                        <td>{info.orderId}</td>
                        <td>{info.type}</td>
                        <td>{info.sales}</td>
                        <td>{info.commission}</td>
                        <td>{info.earnings}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <section className="pagination-section">
              <div>showing 1 to 3 of 3 entries</div>
            </section>
          </div>
        )}
        {showIndex === 2 && (
          <div className="payment-history-container">
            {/* <DashboardTable /> */}
            <div class="panel-body table-body-container">
              {!loading ? (
                <table>
                  <thead>
                    <tr>
                      <th>transaction date</th>
                      <th>amount</th>
                      <th>status</th>
                      <th>payment method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaymentHistory.map((info) => {
                      return (
                        <tr>
                          <td>
                            {moment(new Date(info.transactionDate)).format(
                              "MMM Do YYYY"
                            )}
                          </td>
                          <td>{info.amount}</td>
                          <td>{info.status}</td>
                          <td>{info.paymentMethod}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <TableSpinner />
              )}
            </div>

            <section className="pagination-section">
              {/* <div>Showing 1 to 3 of 3 entries</div> */}
            </section>
          </div>
        )}
      </div>
    </VendorDashbaordLayout>
  );
};

export default DashboardReport;
