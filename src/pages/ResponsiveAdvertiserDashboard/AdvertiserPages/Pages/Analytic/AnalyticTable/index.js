import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Table, Thead, Tbody, Th, Td } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

//Mutation Query
import { GET_ADVERTISER_PORTFOLIOS } from "../../../../../../components/GraphQL/Queries";

import { TableSpinner } from "../../../../../../components/Spinner";
import { EmptyState } from "../../../../../../components/Modal/ScheduleModal";

const AnalyticTable = () => {
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_ADVERTISER_PORTFOLIOS);

  return (
    <>
      {data?.advertiser.getAllPortfolio.length === 0 && (
        <EmptyState
          title="You do not have an analytics portfolio"
          text="Create a new portfolio in order to view your campaign analytics"
          btnText="Create Analytics Portfolio"
          route="create-portfolio"
        />
      )}
      {loading ? (
        <TableSpinner />
      ) : (
        data?.advertiser.getAllPortfolio.length && (
          <TableContainer>
            <ButtonContainer>
              <Button onClick={() => navigate("/analytics/create-portfolio")}>
                New Portfolio
              </Button>
            </ButtonContainer>
            <TableWrapper>
              <Table>
                <Thead>
                  <TableHeaderRow>
                    <Th>PORTFOLIO</Th>
                    <Th>PROPERTY ID</Th>
                    <Th>METRIC</Th>
                  </TableHeaderRow>
                </Thead>
                <Tbody>
                  {data?.advertiser.getAllPortfolio.map(
                    ({ propertyId, metric, title, id }) => {
                      return (
                        <TableBodyRow>
                          <Link to={`/analytics/portfolio/${id}`}>
                            <Td color="#F99B28">{title}</Td>
                          </Link>
                          <Td>{propertyId}</Td>
                          <Td>{metric}</Td>
                        </TableBodyRow>
                      );
                    }
                  )}
                </Tbody>
              </Table>
            </TableWrapper>
          </TableContainer>
        )
      )}
    </>
  );
};

export default AnalyticTable;

const TableContainer = styled.div`
  padding-top: 50px;
  padding-left: 65px;
  padding-right: 30px;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 25px;
  margin-bottom: 50px;
`;
const Button = styled.button`
  width: 180px;
  height: 40px;
  background: #f99b28;
  opacity: 0.9;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  border-radius: 1.50209px;
  &:hover {
    opacity: 1;
  }
`;
const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: scroll;
  border: 1px solid #e8e8e8;
`;
const TableHeaderRow = styled.tr`
  background: #eff6f4;
  color: #004643;
  white-space: nowrap;
  & > th {
    letter-spacing: 0.05em;
    line-height: 20px;
    font-size: 14px;
    font-weight: 700;
    font-style: normal;
  }
`;
const TableBodyRow = styled.tr`
  color: #004643;
  white-space: nowrap;
  & > td {
    letter-spacing: 0.05em;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    & span {
      background: #dff9dc;
      border-radius: 15px;
      padding: 5px 20px;
    }
  }
`;
