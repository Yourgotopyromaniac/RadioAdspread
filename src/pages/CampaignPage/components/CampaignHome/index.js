import { GET_CAMPAIGNNS } from "../../../../components/GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { TableSpinner } from "../../../../components/Spinner";
import { fmtCurrency } from "../../../../utils/functions";
import moment from "moment";
import styled from "styled-components";
import { TableHeaderText } from "../../../../components/TextCompnents";
import { Link } from "react-router-dom";
export const CampaignPageHome = () => {
  const { data: { broadcaster: { getCampaigns = [] } = {} } = {}, loading } =
    useQuery(GET_CAMPAIGNNS);
  return (
    <div className="campaign-dashboard-container">
      <CampaignHeaderText>campaigns</CampaignHeaderText>
      <>
        {/* TODO: Uncomment once pagination on backend has been finalized */}
        {/* <DashboardTable /> */}
        <div class="panel-body table-body-container">
          {!loading ? (
            <table>
              <thead>
                <tr>
                  <th>
                    <input name="select_all" value="1" type="checkbox" />
                  </th>
                  <th>
                    <TableHeaderText>campaign id</TableHeaderText>
                  </th>

                  <th>
                    <TableHeaderText>total amount spent</TableHeaderText>
                  </th>
                  <th>
                    <TableHeaderText>total earnings</TableHeaderText>
                  </th>
                  <th>
                    <TableHeaderText>date</TableHeaderText>
                  </th>
                  <th>
                    <TableHeaderText>status</TableHeaderText>
                  </th>
                </tr>
              </thead>
              <tbody>
                {getCampaigns.map(
                  ({ id, totalAmountSpent, totalEarnings, status, date }) => {
                    return (
                      <tr>
                        <td>
                          <input type="checkbox" name="name1" />
                        </td>
                        <td className="campaign-id">
                          <Link to={`bookings/${id}`}>
                            <TableBodyText
                              style={{ color: "#F99B28" }}
                            >{`#${id}`}</TableBodyText>
                          </Link>
                        </td>
                        <td>
                          <TableBodyText>
                            {fmtCurrency(totalAmountSpent)}
                          </TableBodyText>
                        </td>
                        <td>
                          <TableBodyText>
                            {fmtCurrency(totalEarnings)}
                          </TableBodyText>
                        </td>
                        <td>
                          {" "}
                          <TableBodyText>
                            {moment(new Date(date)).format("MMM Do YYYY")}
                          </TableBodyText>
                        </td>
                        <td>
                          <TableBodyText>{status}</TableBodyText>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          ) : (
            <TableSpinner />
          )}
        </div>
        {/* TODO: Add Pagination once backend is ready */}
        {/* <section className="pagination-section">
        <div>Showing 1 to 3 of 3 entries</div>
      </section> */}
      </>
    </div>
  );
};

const CampaignHeaderText = styled.h2`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #004643;
  margin-bottom: 20px;
`;

const TableBodyText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: 0.05em;

  color: #004643;
`;
