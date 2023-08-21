import React, { useState, useEffect } from "react";
import EditIcon from "../assets/dashboardIcons/editIcon.svg";
import DeleteIcon from "../assets/dashboardIcons/deleteIcon.svg";
import "./css/program-schedule.css";
import VendorDashbaordLayout from "./ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/vendorDashboard/VendorDashbaordLayout";
import { useMutation, useQuery } from "@apollo/client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  Select,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";

import { GET_ALL_PROGRAM_SCHEDULE } from "../components/GraphQL/Queries";
import { TableHeaderText } from "../components/TextCompnents";
import moment from "moment";

import { useFormik } from "formik";
import {
  ADD_PROGRAMME_SCHEDULE,
  DELETE_PROGRAMME_SCHEDULE,
  UPDATE_PROGRAMME_SCHEDULE,
} from "../components/GraphQL/Mutation";
import {
  EmptyState,
  ScheduleModal,
  DeleteModal,
} from "../components/Modal/ScheduleModal";

const ProgramSchedulePage = () => {
  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const toast = useToast();
  const { data: { broadcaster: { getAllProgramSchedule = [] } = {} } = {} } =
    useQuery(GET_ALL_PROGRAM_SCHEDULE);

  const [addProgramSchedule, { loading }] = useMutation(
    ADD_PROGRAMME_SCHEDULE,
    {
      refetchQueries: [
        { query: GET_ALL_PROGRAM_SCHEDULE }, // DocumentNode object parsed with gql
        "GetAllProgramSchedule", // Query name
      ],
    }
  );
  const [updateProgramSchedule, { loading: updateProgLoading }] = useMutation(
    UPDATE_PROGRAMME_SCHEDULE,
    {
      refetchQueries: [
        { query: GET_ALL_PROGRAM_SCHEDULE }, // DocumentNode object parsed with gql
        "GetAllProgramSchedule", // Query name
      ],
    }
  );

  const [deleteProgramSchedule, { loading: deleteProgLoading }] = useMutation(
    DELETE_PROGRAMME_SCHEDULE,
    {
      refetchQueries: [
        { query: GET_ALL_PROGRAM_SCHEDULE }, // DocumentNode object parsed with gql
        "GetAllProgramSchedule", // Query name
      ],
    }
  );

  const [currentProgram, setCurrentProgram] = useState({});
  console.log(currentProgram, "current..");
  const [day, setDay] = useState("Sunday");
  const [programList, setProgramList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const handleChangeAllCheckBox = () => {
    const newProgList = programList.map((program) => {
      if (program.weekDay === day && allChecked === false) {
        program.selected = true;
        setAllChecked(true);
      }
      if (program.weekDay === day && allChecked === true) {
        program.selected = false;
        setAllChecked(false);
      }
      return program;
    });
    setProgramList([...newProgList]);
  };

  const handleChangeCheckBox = ({ id, weekDay }) => {
    const newProgList = programList.map((program) => {
      if (program.weekDay === weekDay && program.id === id) {
        program.selected = !program.selected;
      }
      return program;
    });

    setProgramList([...newProgList]);
    setAllChecked(false);
  };
  useEffect(() => {
    const mutatedProgramSchedule = getAllProgramSchedule.map((program) => {
      program = { ...program };
      program["selected"] = false;
      program["isDisabled"] = true;
      return program;
    });
    setProgramList(mutatedProgramSchedule);
  }, [getAllProgramSchedule]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      show: "",
      sponsor: "",
      startTime: "",
      status: "Available",
    },
    onSubmit: (data, { resetForm }) => {
      data = { ...data };
      if (data.status === "Available") {
        data.status = true;
      }
      if (data.status !== "Available") {
        data.status = false;
      }
      data.startTime = new Date(new Date().getDay() + " " + data.startTime);
      data.endTime = new Date(new Date().getDay() + " " + data.endTime);
      console.log(data);
      addProgramSchedule({
        variables: { input: { weekDay: day, ...data } },
        onCompleted: () => {
          resetForm();
          onClose();
          toast({
            title: "Program Schedule Added",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        },
        onError: () => {
          toast({
            title: "Error Adding Program Schedule, Try Again",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      });
    },
  });
  const {
    handleSubmit: handleSubmitEdit,
    handleChange: handleChangeEdit,
    values: valuesEdit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      show: currentProgram.show,
      sponsor: currentProgram.sponsor,
      startTime: moment(new Date(currentProgram.startTime)).format("HH:mm"),
      endTime: moment(new Date(currentProgram.endTime)).format("HH:mm"),
      status: currentProgram.status,
    },
    onSubmit: (data, { resetForm }) => {
      data = { ...data };
      if (data.status === "Available") {
        data.status = true;
      }
      if (data.status !== "Available") {
        data.status = false;
      }
      data.startTime = new Date(new Date().getDay() + " " + data.startTime);
      data.endTime = new Date(new Date().getDay() + " " + data.endTime);
      data["id"] = currentProgram.id;
      console.log(data);
      updateProgramSchedule({
        variables: { input: { weekDay: day, ...data } },
        onCompleted: () => {
          resetForm();
          onCloseEdit();
          toast({
            title: "Program Schedule Edited",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        },
        onError: () => {
          toast({
            title: "Error Editing Program Schedule, Try Again",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      });
    },
  });
  const handleDelete = () => {
    deleteProgramSchedule({
      variables: {
        deleteProgramScheduleId: currentProgram.id,
      },
      onCompleted: () => {
        onCloseDelete();
        toast({
          title: "Program Schedule Deleted",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Error Deleting Program Schedule, Try Again",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };
  return (
    <>
      <VendorDashbaordLayout>
        <ScheduleModal
          isOpen={isOpen}
          onClose={onClose}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          loading={loading}
          buttonText={"Add Schedule"}
        />
        <ScheduleModal
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          handleSubmit={handleSubmitEdit}
          handleChange={handleChangeEdit}
          values={valuesEdit}
          loading={updateProgLoading}
          buttonText={"Edit Schedule"}
        />
        <DeleteModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDelete}
          deleteProgLoading={deleteProgLoading}
        />
        <section className="program-schedule-container">
          <h4>program schedule</h4>

          <div id="day-btn">
            {daysOfTheWeek.map((weekDay, index) => {
              return (
                <button
                  onClick={() => {
                    setDay(weekDay);
                    setAllChecked(false);
                  }}
                  className={weekDay === day ? "bg-color" : ""}
                >
                  {weekDay}
                </button>
              );
            })}
          </div>
          <section className="program-schedule-table-container">
            <div className="schedule-button-wrapper">
              <button onClick={onOpen}>Add Schedule</button>
            </div>
            {programList.filter(({ weekDay }) => weekDay === day).length >=
            1 ? (
              <div className="panel-body table-body-container">
                <TableContainer minH="370px">
                  <Table variant="striped" colorScheme="teal">
                    <Thead>
                      <Tr>
                        <Th>
                          <Checkbox
                            isChecked={allChecked}
                            // isIndeterminate={isIndeterminate}
                            onChange={handleChangeAllCheckBox}
                          />
                        </Th>
                        <Th>
                          <TableHeaderText>show</TableHeaderText>
                        </Th>
                        <Th>
                          <TableHeaderText>time</TableHeaderText>
                        </Th>
                        <Th>
                          <TableHeaderText>sponsor</TableHeaderText>
                        </Th>
                        <Th>
                          <TableHeaderText>status</TableHeaderText>
                        </Th>
                        <Th></Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {programList
                        .filter(({ weekDay }) => weekDay === day)
                        .map(
                          ({
                            show,
                            startTime,
                            endTime,
                            sponsor,
                            selected,
                            id,
                            weekDay: weekDayCurrent,
                            isDisabled,
                            status,
                          }) => {
                            return (
                              <Tr>
                                <Td>
                                  <Checkbox
                                    isChecked={selected}
                                    onChange={() =>
                                      handleChangeCheckBox({
                                        id,
                                        weekDay: weekDayCurrent,
                                      })
                                    }
                                  />
                                </Td>
                                <Td>{show}</Td>
                                <Td>
                                  {moment(new Date(startTime)).format("LT")} -{" "}
                                  {moment(new Date(endTime)).format("LT")}{" "}
                                </Td>
                                <Td>{sponsor}</Td>
                                <Td>
                                  <Select
                                    size="lg"
                                    w="150px"
                                    border="0.8px solid #ABA8A8"
                                    isDisabled={isDisabled}
                                    value={
                                      status ? "Available" : "Not Availabler"
                                    }
                                  >
                                    <option>Available</option>
                                    <option>Not Available</option>
                                  </Select>
                                </Td>
                                <Td>
                                  <Button
                                    leftIcon={
                                      <img src={EditIcon} alt="edit-icon" />
                                    }
                                    colorScheme="none"
                                    variant="outline"
                                    onClick={() => {
                                      setCurrentProgram({
                                        show,
                                        sponsor,
                                        id,
                                        startTime,
                                        endTime,
                                        status: status
                                          ? "Available"
                                          : "Not Available",
                                      });
                                      onOpenEdit();
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </Td>
                                <Td>
                                  <Button
                                    leftIcon={
                                      <img src={DeleteIcon} alt="delete-icon" />
                                    }
                                    colorScheme="none"
                                    variant="outline"
                                    onClick={() => {
                                      setCurrentProgram({
                                        show,
                                        sponsor,
                                        id,
                                        startTime,
                                        endTime,
                                        status: status
                                          ? "Available"
                                          : "Not Available",
                                      });
                                      onOpenDelete();
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </Td>
                              </Tr>
                            );
                          }
                        )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <EmptyState
                onOpen={onOpen}
                title="Your program schedule is currently empty"
                text="Create a schedule to enable advertisers view available shows"
                btnText="Add a New Schedule"
              />
            )}
          </section>
        </section>
      </VendorDashbaordLayout>
    </>
  );
};

export default ProgramSchedulePage;
