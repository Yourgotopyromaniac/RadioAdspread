import { useQuery } from "@apollo/client";
import {
  Box,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ADVERTISER_CAMPAIGN_DETAILS } from "../../../../../../components/GraphQL/Queries";

import { TableSpinner } from "../../../../../../components/Spinner";


const AdvertiserBookedSlotsDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const {
    data: {
      advertiser: {
        getCampaignDetails: {
          startDate = "",
          endDate = "",
          radioStationDetails = [],
        } = {},
      } = {},
    } = {},

    loading

  } = useQuery(ADVERTISER_CAMPAIGN_DETAILS, {
    variables: {
      campaignId: id,
    }
  })



  const [slotDates, setSlotDates] = useState({});
  const [currentDateSlots, setCurrentDateSlots] = useState([]);

  const getSlotArray = (radioStationDetails && radioStationDetails.map(({ bookedSlots }) => bookedSlots.slots)).flat()
  const hello = radioStationDetails && radioStationDetails?.map(({ bookedSlots }) => bookedSlots.bookingDetails)
  console.log(getSlotArray)
  console.log(hello)


  useEffect(() => {
    let tempSlotDates = {};
    getSlotArray && [...new Set(getSlotArray.map((slot) => slot.date))].forEach((date) => {
      tempSlotDates[`${getDateFormat(date)}`] = []
    })
    getSlotArray.forEach((slot) => {
      const currentDate = getDateFormat(slot.date)
      if (tempSlotDates[`${currentDate}`]) {
        let currDateArr = tempSlotDates[`${currentDate}`];
        tempSlotDates[`${currentDate}`] = currDateArr.concat(slot);
      }
    });
    setSlotDates({ ...tempSlotDates });
    setCurrentDateSlots(
      startDate && [...tempSlotDates[`${getDateFormat(startDate)}`]]
    );
  }, [startDate]);
  console.log(slotDates)
  console.log(currentDateSlots)

  const getTimeFormat = (time) => {
    return moment(new Date(time)).format("LT");
  };
  const getDateFormat = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  return (

    <Container>

      {loading ? <TableSpinner /> :
        <>
          <HStack mb="60px">
            <BackContainer onClick={() => navigate(-1)}>
              <ChevronLeft />
              <GoBackText>Back</GoBackText>
            </BackContainer>

            <CampaignIDText>#{id}</CampaignIDText>
          </HStack>

          <BookedSlotsHeaderText>Selected Spots</BookedSlotsHeaderText>

          <Box mt="24px" mb="52px">
            <DatePicker
              selected={startDate && new Date(startDate)}
              onChange={(date) => {
                const currDate = getDateFormat(new Date(date));
                if (slotDates[`${currDate}`]) {
                  setCurrentDateSlots([...slotDates[`${currDate}`]]);
                  return;
                }
                setCurrentDateSlots([]);
              }}
              startDate={startDate && new Date(startDate)}
              endDate={endDate && new Date(endDate)}
              selectsRange
              inline
            />
          </Box>

          <BookedSlotsHeaderText>Selected Slots</BookedSlotsHeaderText>

          <SpotContainer>
            <TableContainer w="377px">
              <Table variant="simple">
                <Thead height="60px" bg=" #eff6f4">
                  <Tr>
                    <Td>
                      <SpotHeaderText>Time</SpotHeaderText>
                    </Td>
                    <Td>
                      <SpotHeaderText>No of Spots</SpotHeaderText>
                    </Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentDateSlots &&
                    currentDateSlots
                      .slice(0, 12)
                      .map(({ startTime = "", endTime = "", quantity = "" }) => {
                        return (
                          <Tr>
                            <Td>
                              <SpotBodyText>
                                {`${getTimeFormat(
                                  startTime && startTime
                                )} - ${getTimeFormat(endTime && endTime)} `}
                              </SpotBodyText>
                            </Td>
                            <Td>
                              <SpotBodyText>{quantity}</SpotBodyText>
                            </Td>
                          </Tr>
                        );
                      })}
                </Tbody>
              </Table>
            </TableContainer>
            {currentDateSlots.length > 12 && (
              <TableContainer w="377px">
                <Table variant="simple">
                  <Thead height="60px" bg=" #eff6f4">
                    <Tr>
                      <Td>
                        <SpotHeaderText>Time</SpotHeaderText>
                      </Td>
                      <Td>
                        <SpotHeaderText>No of Spots</SpotHeaderText>
                      </Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentDateSlots
                      .slice(12)
                      .map(({ startTime = "", endTime = "", quantity = "" }) => {
                        return (
                          <Tr>
                            <Td>
                              <SpotBodyText>
                                {`${getTimeFormat(
                                  startTime && startTime
                                )} - ${getTimeFormat(endTime && endTime)} `}
                              </SpotBodyText>
                            </Td>
                            <Td>
                              <SpotBodyText>{quantity}</SpotBodyText>
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </SpotContainer>
          <BookedSlotsHeaderText>Booking Details</BookedSlotsHeaderText>
          <HStack mt="22px" spacing={20} mb={326}>
            <BookingDetailsContainer>
              <BookDetailsText>Total no of Days:</BookDetailsText>
              <BookDetailsValue>{hello[0]?.totalNoOfDays}</BookDetailsValue>
            </BookingDetailsContainer>
            <BookingDetailsContainer>
              <BookDetailsText>Total no of Spots:</BookDetailsText>
              <BookDetailsValue>{hello[0]?.totalNoOfSpots}</BookDetailsValue>
            </BookingDetailsContainer>
            <BookingDetailsContainer>
              <BookDetailsText>Total no of Slots:</BookDetailsText>
              <BookDetailsValue>{hello[0]?.totalNoOfSlots}</BookDetailsValue>
            </BookingDetailsContainer>
          </HStack>
        </>
      }

    </Container>
  );
};

export default AdvertiserBookedSlotsDetails;

const BookingDetailsContainer = styled.div`
  width: 136px;
  height: 19px;
  display: flex;
  justify-content: space-between;
`;

const BookDetailsText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #004643;
`;

const BookDetailsValue = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #004643;
`;

const SpotContainer = styled.div`
  width: 751px;
  margin-top: 36px;
  margin-bottom: 47px;
  background: #ffffff;
  display: flex;
`;

const SpotHeaderText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: #004643;
`;
const SpotBodyText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  color: #0e0e2c;
`;

const BookedSlotsHeaderText = styled.h1`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  color: #004643;
`;
const Container = styled.div`
  padding: 16px 70px;
`;

const BackContainer = styled.div`
  width: 41.5px;
  height: 12px;
  margin-right: 65.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
const ChevronLeft = () => {
  return (
    <svg
      width="6"
      height="11"
      viewBox="0 0 6 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 10L1 5.5L5.5 1"
        stroke="#F99B28"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const GoBackText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #f99b28;
`;

const CampaignIDText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  /* identical to box height, or 100% */

  letter-spacing: 0.05em;

  color: #f99b28;
`;
