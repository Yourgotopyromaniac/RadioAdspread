import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALLSLOT, GET_DISCOUNT } from "../components/GraphQL/Queries";
import {
  CREATE_VOLUME_DISCOUNT,
  UPDATE_BROADCASTER_SLOT,
} from "../components/GraphQL/Mutation";
import "./css/dashboard-station.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Center,
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";

import VendorDashbaordLayout from "./ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/vendorDashboard/VendorDashbaordLayout";
import styled from "styled-components";
import {
  TableHeaderText,
  ButtonText,
  TableTimeText,
} from "../components/TextCompnents";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";

const DashboardStation = () => {
  const stationHeader = [
    "Discounts Rates",
    "Jingles Rates",
    "Paid Announcement Rates",
  ];
  const [pageIndex, setPageIndex] = useState(0);
  const { data: slotData, loading } = useQuery(GET_ALLSLOT);

  const [inventoryValues, setInventoryValues] = useState([]);
  const [updateSlot, { loading: updateSlotLoading }] = useMutation(
    UPDATE_BROADCASTER_SLOT,
    {
      refetchQueries: [
        { query: GET_ALLSLOT }, // DocumentNode object parsed with gql
        "GetAllSlot", // Query name
      ],
    }
  );
  const toast = useToast();

  useEffect(() => {
    const allSlotData = slotData?.broadcaster?.getAllSlot ?? [];
    const newSlotData =
      allSlotData.length &&
      allSlotData.map((slot) => {
        const newSlot = { ...slot };
        delete newSlot.broadcasterId;
        delete newSlot.endTime;
        delete newSlot.startTime;
        delete newSlot.__typename;
        return { ...newSlot };
      });
    setInventoryValues(newSlotData);
  }, [slotData]);

  function tConvert(date) {
    const obj = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleTimeString("en-US", obj);
  }

  const submitSlot = () => {
    updateSlot({
      variables: {
        input: [...inventoryValues],
      },
      onCompleted: () => {
        toast({
          title: `Update Successful`,
          status: "success",
          isClosable: true,
          position: "top",
        });
      },
      onError: () => {
        toast({
          title: `An Error Occurred during update`,
          status: "error",
          isClosable: true,
          position: "top",
        });
      },
    });
  };
  const handleChange = (e, id, time) => {
    const inputValue = Number(e.target.value);
    const newInventoryState = inventoryValues.map((slot) => {
      if (slot.id === id) {
        switch (time) {
          case 15:
            slot.Jingle15SecPrice = inputValue;
            break;
          case 30:
            slot.Jingle30SecPrice = inputValue;
            break;
          case 45:
            slot.Jingle45SecPrice = inputValue;
            break;
          case 60:
            slot.Jingle60SecPrice = inputValue;
            break;
          default:
            break;
        }
      }
      return { ...slot };
    });
    setInventoryValues([...newInventoryState]);
  };
  const handleChangeWords = (e, id, words) => {
    const inputValue = Number(e.target.value);
    const newInventoryState = inventoryValues.map((slot) => {
      if (slot.id === id) {
        switch (words) {
          case 50:
            slot.Ann50WordsPrice = inputValue;
            break;
          case 75:
            slot.Ann75WordsPrice = inputValue;
            break;
          case 100:
            slot.Ann100WordsPrice = inputValue;
            break;
          default:
            break;
        }
      }
      return { ...slot };
    });
    setInventoryValues([...newInventoryState]);
  };
  const [createDiscount, { loading: volDiscountLoad }] = useMutation(
    CREATE_VOLUME_DISCOUNT,
    {
      refetchQueries: [
        { query: GET_DISCOUNT }, // DocumentNode object parsed with gql
        "GetDiscount", // Query name
      ],
    }
  );

  const {
    data: {
      broadcaster: { getDiscount: { listOfDiscount = [] } = {} } = {},
    } = {},
    loading: getDiscountLoad,
  } = useQuery(GET_DISCOUNT);
  const {
    handleSubmit,
    handleChange: handleChangeFormik,
    values,
  } = useFormik({
    initialValues: {
      discount: 0,
      fromSpot: 0,
      toSpot: 0,
    },
    onSubmit: (values, { resetForm }) => {
      createDiscount({
        variables: {
          input: values,
        },
        onCompleted: () => {
          toast({
            title: "Discount created.",
            description: "We've created your discount for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        },
        onError: ({ networkError }) => {
          toast({
            title: "Error creating Discount.",
            description: `${networkError?.result?.errors[0]?.message}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      });
      resetForm();
    },
  });

  return (
    <VendorDashbaordLayout>
      <h4 className="station-header">edit advert prices</h4>

      <div className="station-container">
        <div className="btn-option-wrapper">
          {stationHeader.map((btn, index) => {
            return (
              <button
                onClick={() => setPageIndex(index)}
                className={index === pageIndex ? "bg-color" : ""}
              >
                {btn}
              </button>
            );
          })}
        </div>
        {pageIndex === 0 && (
          <>
            <div className="station-input-wrapper">
              <Accordion allowMultiple>
                <AccordionItem maxW="666px">
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        h="52px"
                        bg="#E4F0ED"
                        _hover={{ background: "#E4F0ED" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          <VolDiscountText>
                            Add Volume Discounts
                          </VolDiscountText>
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" />
                        ) : (
                          <AddIcon fontSize="12px" />
                        )}
                      </AccordionButton>

                      <AccordionPanel pb={4}>
                        <form onSubmit={handleSubmit}>
                          <VStack>
                            <div className="station-second-wrapper">
                              <div className="station-select-wrapper">
                                <div className="select-wrapper">
                                  <label htmlFor="fromSpot">
                                    <SpotAccordionText>
                                      from spot
                                    </SpotAccordionText>
                                  </label>
                                  <Input
                                    type="number"
                                    mt="20px"
                                    id="fromSpot"
                                    name="fromSpot"
                                    onChange={handleChangeFormik}
                                    value={values.fromSpot}
                                  />
                                </div>
                                <div className="select-wrapper">
                                  <label htmlFor="starting-spot">
                                    <SpotAccordionText>
                                      to spot
                                    </SpotAccordionText>
                                  </label>
                                  <Input
                                    type="number"
                                    mt="20px"
                                    id="toSpot"
                                    name="toSpot"
                                    onChange={handleChangeFormik}
                                    value={values.toSpot}
                                  />
                                </div>
                              </div>
                              <div>
                                <label>
                                  {" "}
                                  <SpotAccordionText>
                                    Discount in %{" "}
                                  </SpotAccordionText>
                                </label>
                                <Input
                                  type="number"
                                  mt="20px"
                                  id="discount"
                                  name="discount"
                                  onChange={handleChangeFormik}
                                  value={values.discount}
                                />
                              </div>
                            </div>
                            <Center>
                              <Button
                                bg="#f99b28"
                                borderRadius="2px 2px 0px 0px"
                                h="44px"
                                w="210px"
                                color="white"
                                isLoading={volDiscountLoad}
                                loadingText="Creating ..."
                                _hover={{ bg: "" }}
                                type="submit"
                                isDisabled={
                                  !values.discount ||
                                  !values.toSpot ||
                                  !values.fromSpot
                                }
                              >
                                Add
                              </Button>
                            </Center>
                          </VStack>
                        </form>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </div>
            <div className="table-container">
              <ListDiscountText>list of discounts</ListDiscountText>

              <TableContainer>
                {!getDiscountLoad ? (
                  <Table variant="striped" colorScheme="brand" mt={10}>
                    <Thead>
                      <Tr>
                        <Th w="14px"></Th>
                        <Th>Spot</Th>
                        <Th>Discount %</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {listOfDiscount.map(({ spot = "", discount = "" }) => {
                        return (
                          <Tr>
                            <Td w="14px"></Td>
                            <Td>{spot}</Td>
                            <Td>{discount}</Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                ) : (
                  <Center>
                    <TableSpinner />
                  </Center>
                )}
              </TableContainer>
            </div>
          </>
        )}
      </div>

      {pageIndex === 1 && (
        <div className="selectAdvertType-container">
          <InventoryContainer>
            <div>
              <TableContainer overflowY="scroll">
                {!loading ? (
                  <Table>
                    <Thead>
                      <Tr>
                        <Th> </Th>
                        <Th>
                          <TableHeaderText>15 Seconds</TableHeaderText>
                        </Th>
                        <Th>
                          <TableHeaderText>30 Seconds</TableHeaderText>
                        </Th>
                        <Th>
                          <TableHeaderText>45 Seconds</TableHeaderText>
                        </Th>
                        <Th>
                          <TableHeaderText>60 Seconds</TableHeaderText>
                        </Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {slotData?.broadcaster.getAllSlot.map((slot) => {
                        return (
                          <Tr key={slot.id}>
                            {/* <div className="price-field-wrapper"> */}
                            <td>
                              <Box
                                bg={{ sm: "#004643" }}
                                p={{ sm: "16px 5px" }}
                              >
                                <TableTimeText>
                                  {tConvert(slot.startTime)}-
                                  {tConvert(slot.endTime)}
                                </TableTimeText>
                              </Box>
                            </td>
                            <td>
                              <TableInput
                                type="number"
                                className="price-input-field"
                                name="Jingle15SecPrice"
                                onChange={(e) => handleChange(e, slot.id, 15)}
                                defaultValue={slot.Jingle15SecPrice}
                                // value={slot.Jingle15SecPrice || 0}
                              />
                            </td>
                            <td>
                              <TableInput
                                type="text"
                                className="price-input-field"
                                name="Jingle30SecPrice"
                                onChange={(e) => handleChange(e, slot.id, 30)}
                                defaultValue={slot.Jingle30SecPrice}
                              />
                            </td>
                            <td>
                              <TableInput
                                type="text"
                                className="price-input-field"
                                name="Jingle45SecPrice"
                                onChange={(e) => handleChange(e, slot.id, 45)}
                                defaultValue={slot.Jingle45SecPrice}
                              />
                            </td>
                            <td>
                              <TableInput
                                type="text"
                                className="price-input-field"
                                name="Jingle60SecPrice"
                                onChange={(e) => handleChange(e, slot.id, 60)}
                                defaultValue={slot.Jingle60SecPrice}
                              />
                            </td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                ) : (
                  <TableSpinner />
                )}
              </TableContainer>
            </div>
            <div className="save-btn jingles-btn" onClick={() => submitSlot()}>
              <SubmitButtonComponent updateSlotLoading={updateSlotLoading} />
            </div>
          </InventoryContainer>
        </div>
      )}
      {pageIndex === 2 && (
        <div className="selectAdvertType-container">
          <InventoryContainer>
            <div>
              <TableContainer overflowY="scroll">
                {!loading ? (
                  <Table>
                    <Thead>
                      <Tr>
                        <Th> </Th>
                        <Th>
                          <TableHeaderText>50 Words</TableHeaderText>
                        </Th>
                        <Th>
                          <TableHeaderText>75 Words</TableHeaderText>
                        </Th>
                        <Th>
                          <TableHeaderText>100 Words</TableHeaderText>
                        </Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {slotData?.broadcaster.getAllSlot.map((slot) => {
                        return (
                          <Tr key={slot.id}>
                            {/* <div className="price-field-wrapper"> */}
                            <Td w="180px">
                              <Center
                                h="44px"
                                // w="180px"
                                bg={{ sm: "#004643" }}
                              >
                                <TableTimeText>
                                  {tConvert(slot.startTime)}-
                                  {tConvert(slot.endTime)}
                                </TableTimeText>
                              </Center>
                            </Td>
                            <Td w="182px">
                              <TableInput
                                type="text"
                                className="price-input-field"
                                name="Ann50WordsPrice"
                                onChange={(e) =>
                                  handleChangeWords(e, slot.id, 50)
                                }
                                defaultValue={slot.Ann50WordsPrice}
                                // value={slot.Jingle15SecPrice || 0}
                              />
                            </Td>
                            <Td w="182px">
                              <TableInput
                                type="text"
                                className="price-input-field"
                                name="Ann75WordsPrice"
                                onChange={(e) =>
                                  handleChangeWords(e, slot.id, 75)
                                }
                                defaultValue={slot.Ann75WordsPrice}
                              />
                            </Td>
                            <Td w="182px">
                              <TableInput
                                type="text"
                                className="price-input-field"
                                name="Ann100WordsPrice"
                                onChange={(e) =>
                                  handleChangeWords(e, slot.id, 100)
                                }
                                defaultValue={slot.Ann100WordsPrice}
                              />
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                ) : (
                  <TableSpinner />
                )}
              </TableContainer>
            </div>

            <div className="save-btn jingles-btn" onClick={() => submitSlot()}>
              <SubmitButtonComponent updateSlotLoading={updateSlotLoading} />
            </div>
          </InventoryContainer>
        </div>
      )}
    </VendorDashbaordLayout>
  );
};

export default DashboardStation;

const TableInput = styled.input`
  width: 182px;
  height: 44px;
  border: 0.8px solid rgba(0, 70, 67, 0.7);
  border-radius: 0px 2px 2px 0px;
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
`;

const SubmitButton = styled.button`
  width: 210px;
  height: 44px;
  background: #f99b28;
  border-radius: 2px 2px 0px 0px;
`;

const InventoryContainer = styled.div`
  min-width: 359px;
  height: 542px;
  overflow-x: scroll;
  background: #ffffff;
  border: 0.8px solid #abd1c6;

  @media (min-width: 960px) {
    max-width: 1124px;
    height: 703px;
  }
`;

const TableSpinner = () => {
  return (
    <Center h={542} w="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#004643"
        size="xl"
      />
    </Center>
  );
};
const SubmitButtonComponent = ({ updateSlotLoading }) => {
  return (
    <SubmitButton>
      {!updateSlotLoading ? (
        <ButtonText>Save</ButtonText>
      ) : (
        <Spinner size="xs" color="white" />
      )}
    </SubmitButton>
  );
};

const ListDiscountText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #004643;
`;

const VolDiscountText = styled.h2`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;

  color: #004643;
`;

const SpotAccordionText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #004643;
`;
