import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import moment from "moment";

import AdvertDashboardLayout from "../../ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout";
import { ADVERTISER_DRAFTS } from "../../../../components/GraphQL/Queries";
import AdvertiserDraftsLoader from "../../../../components/SkeletonLayoutLoader/AdvertiserDrafts";
import { EmptyState } from "../../../../components/Modal/ScheduleModal";

import styled from "styled-components";
import "../css/draft.css";

const Draft = () => {
  const { data, loading } = useQuery(ADVERTISER_DRAFTS);

  const [firststation, setFirstStation] = useState("");
  const [stationLength, setStationLength] = useState(0);

  useEffect(() => {
    const firstStation = () => {
      if (data?.advertiser.getAllDraft.length) {
        setFirstStation(data?.advertiser.getAllDraft[0].vendors[0].name);
        setStationLength(
          data?.advertiser.getAllDraft[0].vendors.slice(1).length
        );
      }
    };
    firstStation();
  }, [firststation, stationLength, data]);

  return (
    <AdvertDashboardLayout>
      <div className="draft-dashboard-container">
        {/* <DashboardTable title="drafts" /> */}
        {data?.advertiser.getAllDraft.length === 0 && (
          <EmptyState
            title="You do not have a campaign"
            text="Create a new campaign in order to view your booked campaigns"
            btnText="Create new campaign"
            route="/book-campaign/"
          />
        )}

        {loading ? (
          <AdvertiserDraftsLoader />
        ) : (
          data?.advertiser.getAllDraft.length > 0 && (
            <>
              <DraftHeaderText>Draft</DraftHeaderText>
              <div className="advert-station-table-container">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input name="select_all" value="1" type="checkbox" />
                      </th>
                      <th>date</th>
                      <th>radio stations</th>
                      <th>type</th>
                      <th>language</th>
                      <th>duration</th>
                      <th>slots</th>
                      <th>subtotals</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.advertiser.getAllDraft.map((tableInfo, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              name="select_all"
                              value="1"
                              type="checkbox"
                            />
                          </td>
                          <td>
                            {moment(new Date(tableInfo.date)).format(
                              "MMM Do YYYY"
                            )}
                          </td>
                          <td className="station-last-column">
                            {tableInfo.vendors[0]}
                            {tableInfo.vendors.length > 1 && (
                              <span>+{stationLength}</span>
                            )}
                          </td>
                          <td>{tableInfo.type}</td>
                          <td>{tableInfo.language}</td>
                          <td>{tableInfo.duration}</td>
                          <td>{tableInfo.slots}</td>
                          <td>{tableInfo.subtotal}</td>
                          <td>
                            <Link
                              to={`/book-campaign/checkout/${tableInfo.id}`}
                              className="checkout-link"
                            >
                              proceed to checkout
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )
        )}
      </div>
    </AdvertDashboardLayout>
  );
};

export default Draft;

const DraftHeaderText = styled.h2`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #004643;
  margin-bottom: 20px;
`;
