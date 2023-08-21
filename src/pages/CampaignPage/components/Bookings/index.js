import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  VStack,
  Button,
  useToast,
  HStack,
  Link,
} from "@chakra-ui/react";
import styled from "styled-components";
import { GET_CAMPAIGN_DETAILS } from "../../../../components/GraphQL/Queries";
import OrderIcon from "../../../../assets/advertiserDashboardIcon/order.svg";
import StatusIcon from "../../../../assets/advertiserDashboardIcon/status.svg";
import StartDateIcon from "../../../../assets/advertiserDashboardIcon/startDate.svg";
import EndDateIcon from "../../../../assets/advertiserDashboardIcon/endDate.svg";
import AdvertTypeIcon from "../../../../assets/advertiserDashboardIcon/advertType.svg";
import DurationIcon from "../../../../assets/advertiserDashboardIcon/durationIcon.svg";
import LanguageIcon from "../../../../assets/advertiserDashboardIcon/languageIcon.svg";
import DaysIcon from "../../../../assets/advertiserDashboardIcon/daysIcon.svg";
import SpotIcon from "../../../../assets/advertiserDashboardIcon/spotIcon.svg";
import DollarIcon from "../../../../assets/advertiserDashboardIcon/dollarIcon.svg";
import { fmtCurrency } from "../../../../utils/functions";

import { UPDATE_CAMPAIGN_STATUS } from "../../../../components/GraphQL/Mutation";
import { TableSpinner } from "../../../../components/Spinner";

const CampaignBookings = () => {
  const { id } = useParams();
  const {
    data: {
      broadcaster: {
        getCampaignDetails: {
          id: OrderId = "",
          status = "",
          startDate = "",
          endDate = "",
          advertType = "",
          duration,
          language,
          numberOfDays,
          numberOfSpots,
          totalAmount,
          links = "",
          campaignDocument = [],
        } = {},
      } = {},
    } = {},
  } = useQuery(GET_CAMPAIGN_DETAILS, {
    variables: {
      campaignId: id,
    },
  });

  const [update, { loading }] = useMutation(UPDATE_CAMPAIGN_STATUS, {
    refetchQueries: [
      { query: GET_CAMPAIGN_DETAILS, variables: { campaignId: id } }, // DocumentNode object parsed with gql
      "CampaignDocument", // Query name
    ],
  });
  const navigate = useNavigate();
  const toast = useToast();
  const statusColor =
    status === "Cancelled"
      ? "#FB2730"
      : status === "Approved"
      ? "#004643"
      : status === "Pending"
      ? "#8A5806"
      : "";
  const viewBookedSlotHandler = () => {
    navigate(`/dashboard/vendor/campaign-page/booked-slots/${OrderId}`);
  };
  const statusUpdateHandler = (status) => {
    update({
      variables: {
        campaignId: id,
        campaignStatus: status,
      },
      onCompleted: () => {
        toast({
          title: "Status Updated",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: ({ networkError }) => {
        toast({
          title: "Status Update Error",
          description: networkError.result.errors[0].message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <div className="advertiser-booking-container">
      <div>
        <h4>{`#${OrderId}`}</h4>
        <HStack alignItems={"center"} mt="18px">
          <DownloadDocumentContainer>
            <CampaignDocumentHeaderText>
              Campaign Document
            </CampaignDocumentHeaderText>
            {campaignDocument
              .map((campaign, i) => {
                let mutatedCampaign = { ...campaign };
                if (i === 0) {
                  mutatedCampaign["name"] = "Jingle Audio";
                }
                if (i === 1) {
                  mutatedCampaign["name"] = "Paid Announcement Script";
                }
                if (i === 2) {
                  mutatedCampaign["name"] = "APCON Certificate";
                }
                return mutatedCampaign;
              })
              .map(({ name = "", url = "" }) => {
                return (
                  <HStack mt="18px">
                    <DownloadContainer>
                      <BookingHeaderText>{name}</BookingHeaderText>
                    </DownloadContainer>
                    <Link href={url} target="_blank" isExternal>
                      <DownloadIcon />
                    </Link>
                  </HStack>
                );
              })}
          </DownloadDocumentContainer>
          <DownloadDocumentContainer>
            <CampaignDocumentHeaderText>Other Files</CampaignDocumentHeaderText>
            <HStack>
              <DownloadContainer>
                <BookingHeaderText>
                  <Link href={links} target="_blank" isExternal>
                    Files <ExternalLinkIcon mx="2px" />
                  </Link>
                </BookingHeaderText>
              </DownloadContainer>
            </HStack>
          </DownloadDocumentContainer>
        </HStack>
      </div>

      <div className="station-info-wrapper">
        <div className="station-header-info">
          <div>
            <img src={OrderIcon} alt="Order Icon" />
            <BookingHeaderText>Order ID: {OrderId}</BookingHeaderText>
          </div>
          <div>
            <img src={StatusIcon} alt="Status Icon" />
            <BookingHeaderText> Status:</BookingHeaderText>

            <BookingHeaderText style={{ color: `${statusColor}` }}>
              {status}
            </BookingHeaderText>
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Box>
                  <ChevronDown />
                </Box>
              </PopoverTrigger>
              <PopoverContent
                border="0.5px solid #868686"
                w="95px"
                h="116px"
                p="16px 16px"
              >
                {!loading ? (
                  <VStack spacing="8px">
                    <DropDownButton
                      status="Pending"
                      onClick={() => statusUpdateHandler("Pending")}
                    />
                    <DropDownButton
                      status="Approved"
                      onClick={() => statusUpdateHandler("Approved")}
                    />
                    <DropDownButton
                      status="Cancelled"
                      onClick={() => statusUpdateHandler("Cancelled")}
                    />
                  </VStack>
                ) : (
                  <TableSpinner />
                )}
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <img src={StartDateIcon} alt="StartDate Icon" />
            <BookingHeaderText>
              Start Date:{moment(startDate).format("MMM Do YYYY")}
            </BookingHeaderText>
          </div>
          <div>
            <img src={EndDateIcon} alt="EndDate Icon" />
            <BookingHeaderText>
              End Date: {moment(endDate).format("MMM Do YYYY")}
            </BookingHeaderText>
          </div>
          <ViewSlotContainer onClick={viewBookedSlotHandler}>
            <ViewSlotText>View Booked Slots</ViewSlotText>
            <ChevronRight />
          </ViewSlotContainer>
        </div>
        <div className="station-cards-container">
          <div className="station-card">
            <img src={AdvertTypeIcon} alt="AdvertType Icon" />
            <BookingHeaderText> Advert Type: {advertType}</BookingHeaderText>
          </div>
          <div className="station-card">
            <img src={DurationIcon} alt="Duration Icon" />
            <BookingHeaderText>Duration: {duration}</BookingHeaderText>
          </div>
          <div className="station-card">
            <img src={LanguageIcon} alt="Language Icon" />
            <BookingHeaderText>Language:{language}</BookingHeaderText>
          </div>
          <div className="station-card">
            <img src={DaysIcon} alt="Days Icon" />
            <BookingHeaderText>
              Number of Days: {numberOfDays}
            </BookingHeaderText>
          </div>
          <div className="station-card">
            <img src={SpotIcon} alt="Spot Icon" />
            <BookingHeaderText>
              Number of Spot: {numberOfSpots}
            </BookingHeaderText>
          </div>
          <div className="station-card">
            <img src={DollarIcon} alt="Dollar Icon" />
            <BookingHeaderText>
              Total amount: {fmtCurrency(totalAmount)}
            </BookingHeaderText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBookings;

const DropDownButton = ({ status, onClick }) => {
  return (
    <Button p={0} m={0} h="100%" colorScheme="" onClick={onClick}>
      <BookingHeaderText>{status}</BookingHeaderText>
    </Button>
  );
};

const ViewSlotContainer = styled.div`
  width: 169px;
  height: 38px;
  border: 1px solid #f99b28;
  border-radius: 1.50209px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ViewSlotText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */
  color: #004643;
`;

const BookingHeaderText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #004643;
`;

const ChevronRight = () => {
  return (
    <svg
      width="6"
      height="12"
      viewBox="0 0 6 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 10.5L5.25 6L0.75 1.5"
        stroke="#004643"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const ChevronDown = () => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 0.75L5 5.25L9.5 0.75"
        stroke="#0E0E2C"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const DownloadIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25"
        stroke="#F99B28"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.25 7.5L9 11.25L12.75 7.5"
        stroke="#F99B28"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 11.25V2.25"
        stroke="#F99B28"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const DownloadDocumentContainer = styled.div`
  width: 318px;
  min-height: 106px;
  border: 0.8px dashed #aba8a8;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  padding: 18px 18px 25px 18px;
`;

const CampaignDocumentHeaderText = styled.h1`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  color: #004643;
`;

const DownloadContainer = styled.div`
  width: 248px;
  height: 29px;
  background: #ffffff;
  border: 0.21px solid #3b3950;
  border-radius: 2px;
  padding: 0px 19px;
  display: flex;
  align-items: center;
`;
