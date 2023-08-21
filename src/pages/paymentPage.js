import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_PAYMENT_HISTORY,
  GET_WALLET_BALANCE,
} from "../components/GraphQL/Queries";
// import DashboardTable from "../components/DashboardLayout/DashboardTable";
import "./css/payment.css";
import VendorDashbaordLayout from "./ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/vendorDashboard/VendorDashbaordLayout";
import moment from "moment";
import styled from "styled-components";
import { fmtCurrency } from "../utils/functions";
import { TableSpinner } from "../components/Spinner";
import { BROADCASTER_WITHDRAW } from "../components/GraphQL/Mutation";
import { useFormik } from "formik";
import {
  Button,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";

const PaymentPage = () => {
  const toast = useToast();
  const {
    data: {
      broadcaster: { getPaymentHistory: { transactions = [] } = {} } = {},
    } = {},
    loading,
  } = useQuery(GET_PAYMENT_HISTORY, {
    variables: {
      page: 0,
      itemsPerPage: -1,
    },
  });
  const {
    data: {
      broadcaster: {
        getWalletBalance: { currentBalance = 0, pendingBalance = 0 } = {},
      } = {},
    } = {},
    loading: walletLoading,
  } = useQuery(GET_WALLET_BALANCE);

  const [broadcasterWithdraw, { loading: withdrawalLoading }] = useMutation(
    BROADCASTER_WITHDRAW,
    {
      refetchQueries: [
        {
          query: GET_PAYMENT_HISTORY,
          variables: {
            page: 0,
            itemsPerPage: -1,
          },
        },
        { query: GET_WALLET_BALANCE },
      ],
    }
  );

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: ({ amount }) => {
      broadcasterWithdraw({
        variables: {
          input: { amount: Number(amount) },
        },
        onCompleted: () => {
          toast({
            title: "Withdrawal Request Successful",
            description: "Withdrawal Request Successful",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        },
        onError: ({ networkError }) => {
          toast({
            title: "Withdrawal Request Error",
            description: networkError.result.errors[0].message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        },
      });
    },
  });

  return (
    <VendorDashbaordLayout>
      <div className="payment-conatiner">
        <form onSubmit={handleSubmit}>
          <section className="input-payment-section">
            <div className="payment-heading">
              <h2>Payments</h2>
              <div className="amount-wrapper">
                <div className="current-balance">
                  current balance{" "}
                  <span>{!walletLoading && fmtCurrency(currentBalance)} </span>
                </div>
                <div className="pending-balance">
                  pending amount{" "}
                  <span>{!walletLoading && fmtCurrency(pendingBalance)}</span>
                </div>
              </div>
            </div>
            <div className="payment-input">
              <div className="amount-input">
                <label>Withdrawal Amount: </label>
                <NumberInput>
                  <NumberInputField
                    name="amount"
                    placeholder="Enter Amount"
                    value={values.amount}
                    onChange={handleChange}
                  />
                </NumberInput>

                <span>Withdrawal Request (Within 24hrs)</span>
              </div>
              <div className="amount-input">
                <label>Payment Method: </label>
                <select>
                  <option>Bank Transfer</option>
                </select>
              </div>
            </div>

            <Button
              bg={"#F99B28"}
              borderRadius={"2px 2px 0px 0px"}
              type="submit"
              _hover={{ background: "#F99B28" }}
              isLoading={withdrawalLoading}
              isDisabled={!Number(values.amount)}
            >
              Submit Request
            </Button>
          </section>
        </form>
        <section className="payment-table">
          <TableTitleHeader>payment history</TableTitleHeader>
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
                  {transactions.map((info) => {
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
        </section>
      </div>
    </VendorDashbaordLayout>
  );
};

export default PaymentPage;

const TableTitleHeader = styled.h2`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #004643;
  margin-bottom: 20px;
`;
