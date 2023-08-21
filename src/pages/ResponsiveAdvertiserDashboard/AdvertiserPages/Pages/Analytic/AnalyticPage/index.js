import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Box,
  HStack,
  Text,
  Card,
  CardBody,
  Select,
  Stack,
  Skeleton,
  Flex,
  Input,
  useToast,
} from "@chakra-ui/react";
import styled from "styled-components";
import { InfoIcon } from "@chakra-ui/icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@apollo/client";
import {
  GET_RADIOSTATION_FOR_PORTFOLIO,
  GET_PORTFOLIO_METRICS,
} from "../../../../../../components/GraphQL/Queries";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  const [radioStationName, setRadioStationName] = useState("");
  const [radioStationId, setRadioStationId] = useState("");
  const [duration, setDuration] = useState(null);

  const {
    data: { advertiser: { getRadioStationsForPortfolio = [] } = {} } = {},
  } = useQuery(GET_RADIOSTATION_FOR_PORTFOLIO, {
    variables: {
      portfolioId: id,
    },
  });
  const {
    data: { advertiser: { getPortfolioMetrics = {} } = {} } = {},
    loading,
    error,
  } = useQuery(GET_PORTFOLIO_METRICS, {
    skip: !radioStationId && !duration,
    variables: {
      portfolioId: id,
      duration: parseInt(duration),
      radioStationId: radioStationId,
    },
    onError(err) {
console.log(err.message)
      toast({
        title: `${err?.message}`,
        status: "error",
        position: "top-right",
        duration: 6000,
        isClosable: true,
      });
    }
  });


  const data1 = {
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "9pm", ""],
    datasets: [
      {
        labels: "Visits",
        data: ["0", "1000", "1600", "1800", "2500", "4000"],
        borderColor: "#EF4136",
        backgroundColor: "#EF4136",
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const handleOptionChange = (event) => {
    const selectedCampaign = event.target.value;
    setRadioStationName(selectedCampaign);
    setRadioStationId(getradioStationId(selectedCampaign));
  };

  const getradioStationId = (selectedCampaign) => {
    const campaignOption = getRadioStationsForPortfolio.find(
      (campaign) => campaign.radioStationName === selectedCampaign
    );
    return campaignOption ? campaignOption.radioStationId : "";
  };

  return (
    <CamapaignAnalyticsContainer>
      <Box mb="100px">
        <Button
          leftIcon={<ArrowBackIcon />}
          color="#ff9b28"
          bgColor="transparent
                        "
          onClick={() => navigate(-1)}
          _hover={{ bgColor: "#ff9b28", color: "#fff" }}
        >
          Back
        </Button>
        <HStack
          fontSize="16px"
          lineHeight="19px"
          letterSpacing="0.05em"
          pt="20px"
        >
          <Text fontWeight="700">Sample Portfolio</Text>
          <Text fontWeight="400" fontStyle="italic">
            Property ID
          </Text>
        </HStack>
        <HStack
          mt="50px"
          fontSize="12px"
          lineHeight="14px"
          fontWeight="700"
          flexWrap={["wrap", "wrap", "wrap", "wrap", "nowrap"]}
          justifyContent={[
            "center",
            "center",
            "center",
            "center",
            "flex-start",
          ]}
          gap="30px"
        >
          {loading ? (
            <CardSkeleton />
          ) : (
            <>
              <Card
                w="full"
                maxW="240px"
                bgColor="#004648"
                color="#fff"
                h="100px"
                whiteSpace="nowrap
                     "
              >
                <CardBody
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <HStack justifyContent="space-between">
                    <Text>ACTIVE LISTENER</Text>
                    <InfoIcon color="#fff" />
                  </HStack>
                  <Text fontSize="24px" lineHeight="29px" fontWeight="400">
                    {getPortfolioMetrics.activeListiners}
                  </Text>
                </CardBody>
              </Card>
              <Card
                w="full"
                maxW="240px"
                bgColor="#004648"
                color="#fff"
                h="100px"
              >
                <CardBody
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <HStack justifyContent="space-between">
                    <Text>SPOT PLAYED</Text>
                    <InfoIcon color="#fff" />
                  </HStack>
                  <Text fontSize="24px" lineHeight="29px" fontWeight="400">
                    {getPortfolioMetrics.sportPlays}
                  </Text>
                </CardBody>
              </Card>
            </>
          )}
        </HStack>
      </Box>
      <Stack spacing="30px">
        <HStack w="380px">
          <Input
            fontSize="16px"
            fontWeight="400"
            lineHeight="16px"
            placeholder="Select Metric"
            _placeholder={{
              color: "#FA9B00",
              fontStyle: "italic",
            }}
            outline="none"
            border="none"
            readOnly
          />
          <Select
            fontSize="13px"
            fontWeight="400"
            lineHeight="16px"
            placeholder="Select Radio Station"
            outline="none"
            name="campaignNaame"
            value={radioStationName}
            onChange={handleOptionChange}
          >
            {getRadioStationsForPortfolio.map((station) => (
              <option
                key={radioStationId}
                value={station.radioStationName}
              >
                {station.radioStationName}
              </option>
            ))}
          </Select>
        </HStack>
        <Box
          padding="30px 50px"
          bgColor="#fff"
          border="1px solid #E6E6E6"
          boxShadow="0px 10px 20px rgba(89, 84, 84, 0.1)"
          borderRadius="8px"
          position="relative"
          overflowX="scroll"
          minW="500px"
        >
          <Box display="flex" justifyContent="flex-end" paddingBottom="30px">
            <Input
              w="200px"
              fontSize="14px"
              fontWeight="400"
              lineHeight="17px"
              letterSpacing="0.05em"
              placeholder="Enter number of days"
              color="#FA9B00"
              border="1px solid #FA9B00"
              borderRadius="4px"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Box>
          <Box
            position="relative"
            fontSize="12px"
            lineHeight="14px"
            fontWeight="400"
            letterSpacing="0.05em"
            color="#004643"
          >
            <Line data={data1} options={options}></Line>
          </Box>
          <Text
            position="absolute"
            left="15px"
            top="50%"
            transform="rotate(90deg)"
            fontSize="14px"
            lineHeight="17px"
            fontWeight="400"
            letterSpacing="0.05em"
          >
            Visits
          </Text>
        </Box>
      </Stack>
    </CamapaignAnalyticsContainer>
  );
};

export default AnalyticPage;

const CamapaignAnalyticsContainer = styled.div`
  padding-top: 50px;
  padding-left: 70px;
  padding-right: 55px;
  padding-bottom: 70px;
`;

const CardSkeleton = () => {
  return (
    <Flex gap={8}>
      <Box
        borderWidth="1px"
        borderRadius="md"
        p={4}
        width="300px"
        height="200px"
        flexDirection={{base: "column", lg: "row"}}
      >
        <Skeleton height="100%" width="100%" borderRadius="md" />
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="md"
        p={4}
        width="300px"
        height="200px"
      >
        <Skeleton height="100%" width="100%" borderRadius="md" />
      </Box>
    </Flex>
  );
};
