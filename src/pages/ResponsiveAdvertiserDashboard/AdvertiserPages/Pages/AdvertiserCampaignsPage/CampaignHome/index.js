import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery } from "@apollo/client";

import { GET_ADVERTISER_CAMPAIGNS } from "../../../../../../components/GraphQL/Queries";

import AdvertiserCampaignsLoader from "../../../../../../components/SkeletonLayoutLoader/AdvertiserCampaignsPage";
import { EmptyState } from "../../../../../../components/Modal/ScheduleModal";

import styled from "styled-components";



// import "../../../css/station-dashboard.css"

const AdvertiserCampaignsHomepage = () => {
  const { data, loading } = useQuery(GET_ADVERTISER_CAMPAIGNS);


  const [firststation, setFirstStation] = useState("");
  const [stationLength, setStationLength] = useState(0);

  useEffect(() => {
    const firstStation = () => {
      if (data?.advertiser.getCampaigns.length) {
        setFirstStation(data?.advertiser.getCampaigns[0].radioStation[0].name);
        setStationLength(
          data?.advertiser.getCampaigns[0].radioStation.slice(1).length
        );
      }
    };
    firstStation();
  }, [firststation, stationLength, data]);


  return (
    <>
      <div className="station-dashboard-container">
        {/* <DashboardTable title="campaigns" /> */}
        {data?.advertiser.getCampaigns.length === 0 && (
          <EmptyState
            title="You do not have a campaign"
            text="Create a new campaign in order to view your booked campaigns"
            btnText="Create new campaign"
            route="/book-campaign/"
          />
        )}

        {loading ? (
          <AdvertiserCampaignsLoader />
        ) : (
          data?.advertiser.getCampaigns.length > 0 && (
            <>
              <CampaignHeaderText>campaigns</CampaignHeaderText>
              <div className="station-table-container">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input name="select_all" value="1" type="checkbox" />
                      </th>
                      <th>Invoice No.</th>
                      <th>Campaign Name</th>
                      <th>Company Name</th>
                      <th>Industry</th>
                      <th>Date</th>
                      <th>Radio Station</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.advertiser.getCampaigns.map((tableinfo, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              name="select_all"
                              value="1"
                              type="checkbox"
                            />
                          </td>
                          <td className="campaign-id">
                            <Link
                              to={`/dashboard/station/booking/${tableinfo.id}`}
                            >
                              <span style={{ color: "#F99B28" }}>
                                {`#${tableinfo.invoice}`}
                              </span>
                            </Link>
                          </td>
                          <td>{tableinfo.campaignName}</td>
                          <td>{tableinfo.companyName}</td>
                          <td>{tableinfo.industryName}</td>

                          <td>
                            {moment(new Date(tableinfo.date)).format(
                              "MMM Do YYYY"
                            )}
                          </td>
                          <td className="station-last-column">
                            <p>{tableinfo.radioStation[0].name}</p>
                            {tableinfo.radioStation.length > 1 && (
                              <span>+ {stationLength}</span>
                            )}
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
    </>
  );
};

export default AdvertiserCampaignsHomepage;

const CampaignHeaderText = styled.h2`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #004643;
  margin-bottom: 20px;
`;
