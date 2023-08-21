import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import AdvertDashboardLayout from "../../ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout";
import {
  WALLET_BALANCE,
  TRANSAACTION_HISTORY,
} from "../../../../components/GraphQL/Queries";
import CardTwo from "../../assets/paymentCardTwo.svg";
import CardThree from "../../assets/paymentCardThree.svg";
import "../css/wallet.css";
import moment from "moment";
import DashboardTable from "../../../../components/DashboardLayout/DashboardTable";
import { REFRESH_TRANSACTION } from "../../../../components/GraphQL/Mutation";
import { toast } from "react-toastify";
import { TableSpinner } from "../../../../components/Spinner";

const RefreshButton = ({ status, transactionId, updateTransactionStatus }) => {
  const [refreshTransaction, { loading }] = useMutation(REFRESH_TRANSACTION, {
    context: {
      headers: {
        "apollo-require-preflight": true,
      },
    },
    async onCompleted(data) {
      updateTransactionStatus(transactionId);
      toast.success("Payment Confirmed");
    },
    onError: (error) => {
      toast.error(error?.networkError?.result?.errors[0]?.message);
    },
  });

  function handleRefresh(e) {
    e.preventDefault();

    refreshTransaction({
      variables: {
        transactionId,
      },
    });
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={status === "Approved" ? true : false}
    >
      {loading ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Refresh"}
    </button>
  );
};

const Wallet = () => {
  const [transactions, setTransactions] = useState([]);

  const walletBalance = useQuery(WALLET_BALANCE);
  const [transactionDetails, { loading, data }] =
    useLazyQuery(TRANSAACTION_HISTORY);

  /**
   * Updates the status of a transaction with the given ID to "Approved".
   *
   * @param {number} id - The ID of the transaction to update.
   */
  function updateTransactionStatus(id) {
    // Find the transaction with the given ID.
    let temp = transactions.filter((trnx) => trnx.id === id)[0];

    if (temp) {
      // Update the status of the transaction to "Approved".
      temp = {
        ...temp,
        status: "Approved",
      };

      // Replace the old transaction with the updated one and sort the array by transaction date.
      setTransactions(
        [...transactions.filter((trnx) => trnx.id !== id), temp].sort(
          (a, b) => {
            return new Date(b.transactionDate) - new Date(a.transactionDate);
          }
        )
      );
    }
  }

  useEffect(() => {
    transactionDetails();

    if (data) setTransactions(data.advertiser.getTransactionHistory);
  }, [data]);

  return (
    <AdvertDashboardLayout>
      <div className="wallet-container">
        <div>
          <div className="wallet-header">
            <h4>wallet</h4>
            <div>
              <div>
                current balance:{" "}
                <span>
                  ₦
                  {
                    walletBalance.data?.advertiser.getWalletBalance
                      .currentBalance
                  }
                </span>
              </div>
              <div>
                pending amount:{" "}
                <span>
                  ₦
                  {
                    walletBalance.data?.advertiser.getWalletBalance
                      .pendingBalance
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="campaign-form-card-wrapper">
            {/* <h4>Select your preffered payment method</h4> */}
            <div className="payment-card-wrapper">
              <div>
                <div className="active-payment-method">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1708_1641)">
                        <path
                          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          stroke="#F99B28"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 12L11 14L15 10"
                          stroke="#F99B28"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1708_1641">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <img src={CardTwo} alt="paystack" />
                </div>
                <span> Pay with Paystack</span>
              </div>
              {/* <div>
                                <div>
                                    <img src={CardThree} alt='flutter-card' />

                                </div>
                                <span>Pay with Flutterwave</span>

                            </div> */}
            </div>
            <div className="amount_input_wrap">
              <label htmlFor="campaign_name">Amount:</label>
              <input type="text" placeholder="Enter an amount" />
            </div>
            <button>proceed</button>
          </div>
        </div>
        {/* <FilterLayout /> */}

        <div className="station-table-container">
          {!loading ? (
            <>
              {" "}
              <DashboardTable />
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input name="select_all" value="1" type="checkbox" />
                      </th>
                      <th>Transaction Date</th>
                      <th>Transaction ID</th>
                      <th>Amount</th>
                      <th>paymentMethod</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((trnx) => {
                      return (
                        <tr>
                          <td>
                            <input type="checkbox" name="name1" />
                          </td>
                          <td>
                            {moment(trnx.transactionDate).format("MMM Do YYYY")}
                          </td>
                          <td>{trnx.transactionId}</td>
                          <td>₦{trnx.amount.toLocaleString("en-US")}</td>
                          <td>{trnx.paymentMethod}</td>
                          <td>{trnx.status}</td>
                          <td>
                            <RefreshButton
                              key={trnx.id}
                              status={trnx.status}
                              transactionId={trnx.id}
                              updateTransactionStatus={updateTransactionStatus}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>{" "}
            </>
          ) : (
            <TableSpinner />
          )}
        </div>
      </div>
    </AdvertDashboardLayout>
  );
};

export default Wallet;
