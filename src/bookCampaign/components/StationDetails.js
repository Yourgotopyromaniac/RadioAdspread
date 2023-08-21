import React, { useRef, useState, useEffect } from "react";
import "./css/station-details.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/station-details.css";
import moment from "moment";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import styled from "styled-components";


const StationDetails = ({
  title,
  tagline,
  isOpen,
  setMutatedBroadcasterData,
  mutatedbroadcasterData,
  broadcasterData,
  setLanguage,
  data
}) => {
  const { isOpen: isOpenChakra, onOpen, onClose } = useDisclosure();
  const [slotId] = useState(null);
  const [slotQuantity] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  const  timeSchedule = data?.data?.guest.getBroadcasterTimeSchedule;
  console.log("ddjgd", timeSchedule)
 
  const [bookingInfo, setBookingInfo] = useState({
    advertType: "",
    duration: "",
    language: "",
    slotId: slotId,
    slotQuantity: slotQuantity,
  });
  
  const handleChange = (e) => {
    setLanguage(e.target.value);
    const newbroadcasterData = mutatedbroadcasterData.map((broadcasterData) => {
      broadcasterData = { ...broadcasterData };
      if (broadcasterData["guest"].name === title) {
        broadcasterData["guest"]["language"] = e.target.value;
      }
      return broadcasterData;
    });
    setMutatedBroadcasterData(newbroadcasterData);
    setBookingInfo({
      ...bookingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const startDatePicker = useRef();
  const startDateView = useRef();
  const endDatePicker = useRef();
  const endDateView = useRef();

  const handleAdvertType = (e) => {
    const { value } = e.target;
    setBookingInfo({ ...bookingInfo, advertType: value });
    const newbroadcasterData = mutatedbroadcasterData.map((broadcasterData) => {
      const currDate = moment(new Date()).format("YYYY-MM-DD");
      broadcasterData = { ...broadcasterData };
      if (broadcasterData.guest.name === title) {
        broadcasterData["guest"]["advertType"] = value;
        broadcasterData["guest"]["startDate"] = new Date();
        broadcasterData["guest"]["endDate"] = new Date();
        broadcasterData["guest"]["dateRange"] = {};
        broadcasterData["guest"]["dateRange"][`${currDate}`] = {
          slotData: [
            ...broadcasterData?.guest?.getBroadcasterSlots.map((slot) => {
              slot = { ...slot };
              slot["date"] = currDate;
              slot["language"] = "";
              return slot;
            }),
          ],
          totalSlot: 0,
          totalPrice: 0,
        };

        broadcasterData["guest"]["totalDays"] = 1;
        broadcasterData["guest"]["totalSpots"] = 0;
        broadcasterData["guest"]["totalPrice"] = 0;
      }
      return broadcasterData;
    });
    setMutatedBroadcasterData(newbroadcasterData);
  };
  const handleAdvertDur = (e) => {
    const { value } = e.target;
    const currDate = moment(new Date()).format("YYYY-MM-DD");
    const newbroadcasterData = mutatedbroadcasterData.map((broadcasterData) => {
      broadcasterData = { ...broadcasterData };
      if (broadcasterData.guest.name === title) {
        broadcasterData["guest"]["duration"] = value;
        broadcasterData["guest"]["startDate"] = new Date();
        broadcasterData["guest"]["endDate"] = new Date();
        broadcasterData["guest"]["dateRange"] = {};
        broadcasterData["guest"]["dateRange"][`${currDate}`] = {
          slotData: [
            ...broadcasterData?.guest?.getBroadcasterSlots.map((slot) => {
              slot = { ...slot };
              slot["date"] = currDate;
              return slot;
            }),
          ],
          totalSlot: 0,
          totalPrice: 0,
        };

        broadcasterData["guest"]["totalDays"] = 1;
        broadcasterData["guest"]["totalSpots"] = 0;
        broadcasterData["guest"]["totalPrice"] = 0;
      }
      return broadcasterData;
    });
    setMutatedBroadcasterData([...newbroadcasterData]);
    setBookingInfo({ ...bookingInfo, duration: value });
  };

  function getDates(startDate, stopDate) {
    let dateArray = [];
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }

    const formattedStopDate = moment(stopDate).format("YYYY-MM-DD");

    const containsStopDate = dateArray.some(
      (date) => date === formattedStopDate
    );
    if (containsStopDate) {
      return dateArray;
    }

    dateArray = [...dateArray, formattedStopDate];
    return dateArray;
  }

  const [slotDataList, setSlotDataList] = useState([]);
  console.log('slotDataList--', slotDataList)
  const getAdvertType = () => {
    if (broadcasterData.advertType === "Jingle") {
      if (broadcasterData.duration === "15Sec") {
        return "Jingle15Sec";
      }
      if (broadcasterData.duration === "30Sec") {
        return "Jingle30Sec";
      }
      if (broadcasterData.duration === "45Sec") {
        return "Jingle45Sec";
      }
      if (broadcasterData.duration === "60Sec") {
        return "Jingle60Sec";
      }
    }
    if (broadcasterData.advertType === "paidAdvertisements") {
      if (broadcasterData.duration === "50Words") {
        return "Ann50Words";
      }
      if (broadcasterData.duration === "75Words") {
        return "Ann75Words";
      }
      if (broadcasterData.duration === "100Words") {
        return "Ann100Words";
      }
    }
    return "";
  };

  const onChangeDateHandler = (e, date) => {
    const currentDate = new Date(e.target.value);
    let currentBroadcasterData = { ...broadcasterData?.dateRange };
    let dateRangeList;

    if (date === "start") {
      dateRangeList = getDates(currentDate, new Date(broadcasterData.endDate));
    }

    if (date === "end") {
      dateRangeList = getDates(
        new Date(broadcasterData.startDate),
        currentDate
      );
    }

    dateRangeList.forEach((date) => {
      if (!currentBroadcasterData[`${date}`]) {
        currentBroadcasterData[`${date}`] = {
          slotData: [
            ...broadcasterData?.getBroadcasterSlots.map((slot) => {
              slot = { ...slot };
              slot["date"] = date;
              slot["advertType"] = getAdvertType();
              slot["slotNumber"] = 0;
              slot["language"] = broadcasterData?.language;
              return slot;
            }),
          ],
          totalSlot: 0,
          totalPrice: 0,
          date,
        };
      }
    });

    const newbroadcasterData = mutatedbroadcasterData.map((broadcasterData) => {
      broadcasterData = { ...broadcasterData };
      if (broadcasterData.guest.name === title) {
        broadcasterData["guest"].totalDays =
          dateRangeList && dateRangeList.length;
        if (date === "start") {
          broadcasterData["guest"].startDate = currentDate;
          broadcasterData["guest"].dateRange = { ...currentBroadcasterData };
        }
        if (date === "end") {
          broadcasterData["guest"].endDate = currentDate;
          broadcasterData["guest"].dateRange = { ...currentBroadcasterData };
        }
      }
      return broadcasterData;
    });

    setMutatedBroadcasterData(newbroadcasterData);
  };
  const [currentDate, setCurrentDate] = useState("");
  console.log("currentDate", currentDate);

  const currentDateList =
    broadcasterData?.dateRange[`${currentDate}`]?.slotData;
  const slotInputChangeHandler = (e, { id }) => {
    const castedNumberVal = Number(e.target.value);
    const numberCheck = isNaN(castedNumberVal);
    const mutatedDataList = slotDataList?.slotData.map((slot) => {
      slot = { ...slot };
      if (slot?.id === id) {
        slot["slotNumber"] = !numberCheck ? castedNumberVal : slot?.slotNumber;
        const currNum = !numberCheck ? castedNumberVal : slot?.slotNumber;

        if (broadcasterData.advertType === "Jingle") {
          if (broadcasterData.duration === "15Sec") {
            slot["cost"] = slot["Jingle15SecPrice"] * currNum;
          }
          if (broadcasterData.duration === "30Sec") {
            slot["cost"] = slot["Jingle30SecPrice"] * currNum;
          }
          if (broadcasterData.duration === "45Sec") {
            slot["cost"] = slot["Jingle45SecPrice"] * currNum;
          }
          if (broadcasterData.duration === "60Sec") {
            slot["cost"] = slot["Jingle60SecPrice"] * currNum;
          }
        }
        if (broadcasterData.advertType === "paidAdvertisements") {
          if (broadcasterData.duration === "50Words") {
            slot["cost"] = slot["Ann50WordsPrice"] * Number(e.target.value);
          }
          if (broadcasterData.duration === "75Words") {
            slot["cost"] = slot["Ann75WordsPrice"] * Number(e.target.value);
          }
          if (broadcasterData.duration === "100Words") {
            slot["cost"] = slot["Ann100WordsPrice"] * Number(e.target.value);
          }
        }
      }
      return slot;
    });
    const current = mutatedDataList.find((slot) => slot.id === id);
    let currTotalSlot = !numberCheck ? castedNumberVal : current?.slotNumber;
    const currTotalSlotList =
      currentDateList && currentDateList.filter((slot) => slot?.id !== id);

    for (let index = 0; index < currTotalSlotList.length; index++) {
      const element = currTotalSlotList[index];
      currTotalSlot += element?.slotNumber ?? 0;
    }

    let currTotalPrice = 0;

    for (let index = 0; index < mutatedDataList.length; index++) {
      const element = mutatedDataList[index];
      currTotalPrice += element?.cost ?? 0;
    }

    let newData = { ...broadcasterData };
    newData["dateRange"][`${currentDate}`]["slotData"] = [...mutatedDataList];
    newData["dateRange"][`${currentDate}`]["totalSlot"] = currTotalSlot;
    newData["dateRange"][`${currentDate}`]["totalPrice"] = currTotalPrice;

    const newBroadcaster = mutatedbroadcasterData.map((broadcaster) => {
      broadcaster = { ...broadcaster };
      if (broadcaster.name === title) {
        broadcaster.dateRange = { ...newData?.dateRange };
      }
      return broadcaster;
    });

    setMutatedBroadcasterData(newBroadcaster);
  };

  const saveHandler = () => {
    const allSlots = Object.values(broadcasterData.dateRange).reduce(
      (acc, curr) => acc + curr.totalSlot,
      0
    );
    const allCosts = Object.values(broadcasterData.dateRange).reduce(
      (acc, curr) => acc + curr.totalPrice,
      0
    );

    const allSlotsData = Object.values(broadcasterData.dateRange)
      .map((slot) => {
        return [...slot.slotData];
      })
      .flat()
      .filter((slotData) => !!slotData.slotNumber)
      .map((slot) => {
        slot = { ...slot };
        slot["advertType"] = getAdvertType();
        slot["language"] = broadcasterData?.language;

        return slot;
      });

    const newbroadcasterData = mutatedbroadcasterData.map((broadcasterData) => {
      broadcasterData = { ...broadcasterData };
      if (broadcasterData["guest"].name === title) {
        broadcasterData["guest"].totalSpots = allSlots;
        broadcasterData["guest"].totalPrice = allCosts;
        broadcasterData["guest"].allSlots = [...allSlotsData];
      }
      return broadcasterData;
    });

    setMutatedBroadcasterData(newbroadcasterData);

    onClose();
  };

  // useEffect(() => {
  //  const filterDataByDate = async (slotDataList, currentDate)  => {
  //  await slotDataList.filter((data) => {
  //       return setFilteredData(data?.slotData?.date === currentDate);
  //     });
  //   }

  //   filterDataByDate();
  // }, [currentDate]);

  const currentNumberofDays =
    broadcasterData && Object.values(broadcasterData?.dateRange).length;

  return (
    <div id="station-detail-cnt">
      <div id="station-title">
        <div>
          <h2>{title}</h2>
          <h3>{tagline}</h3>
        </div>
        <button onClick={isOpen}>View Time Schedule</button>
      </div>
      <div id="select-advert-details">
        <div>
          <label htmlFor="advert-type">Advert Type</label>
          <div>
            <select
              value={broadcasterData?.advertType}
              name="advertType"
              onChange={(e) => handleAdvertType(e)}
            >
              <option value="">select advert type</option>
              {broadcasterData?.advertTypeData?.map((type, index) => (
                <option value={type.value} key={index}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <p>Check Time Schedule for shows in your selected time slots.</p>
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <div>
            <select
              name="duration"
              onChange={(e) => handleAdvertDur(e)}
              defaultValue="select advert duration"
              value={broadcasterData?.duration}
            >
              <option value="">select advert duration</option>
              {broadcasterData?.advertTypeData &&
                broadcasterData?.advertTypeData
                  .find((dur) => dur.value === broadcasterData?.advertType)
                  ?.advertTypeDuration?.map((durationType) => (
                    <option value={durationType.val}>{durationType.dur}</option>
                  ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="language">
            Select your preferred language for this campaign
          </label>
          <div>
            <select
              name="language"
              onChange={handleChange}
              value={broadcasterData?.language ?? ""}
            >
              <option value="">select language</option>
              <option value="English">English</option>
              <option value="Pidgin">Pidgin</option>
              <option value="Yoruba">Yoruba</option>
              <option value="Igbo">Igbo</option>
              <option value="Hausa">Hausa</option>
            </select>
          </div>
        </div>
      </div>
      <div id="select-advert-time">
        <h2>
          You have selected {currentNumberofDays} Day
          {currentNumberofDays > 1 ? "s" : ""}
        </h2>
        <div id="select-date">
          <div>
            <label htmlFor="start-date">Start Date</label>
            <div>
              <input
                id="start-date"
                type="date"
                // min={minDate}
                ref={startDatePicker}
                disabled={
                  !broadcasterData?.language || !broadcasterData?.duration
                }
                value={broadcasterData?.startDate}
                onChange={(e) => onChangeDateHandler(e, "start")}
              />
              <input
                ref={startDateView}
                className="formatted-date"
                type="text"
                placeholder={`${moment(broadcasterData?.startDate).format(
                  "MMM Do YY"
                )}`}
                readOnly
              />
            </div>
          </div>
          <div>
            <label htmlFor="end-date">End Date</label>
            <div>
              <input
                id="end-date"
                type="date"
                ref={endDatePicker}
                disabled={
                  !broadcasterData?.language || !broadcasterData?.duration
                }
                value={broadcasterData?.endDate}
                onChange={(e) => onChangeDateHandler(e, "end")}
              />
              <input
                ref={endDateView}
                className="formatted-date"
                type="text"
                placeholder={`${moment(broadcasterData?.endDate).format(
                  "MMM Do YY"
                )}`}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div id="set-time-slot">
        <h2>Click on dates to input spots.</h2>
        <>
          <Modal isOpen={isOpenChakra} onClose={onClose} size={"3xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalHeaderText>
                  Input Slot Numbers for {`${moment(currentDate).format("LL")}`}
                </ModalHeaderText>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SlotContainer>
                  {slotDataList &&
                    slotDataList?.slotData?.map(
                      ({ slotNumber = 0, startTime, endTime, id }) => {
                        

                        return (
                          <InputContainer>
                            <InputLeft>
                              <SlotDataTimeText>{`${moment(startTime).format(
                                "LT"
                              )}- ${moment(endTime).format(
                                "LT"
                              )} `}</SlotDataTimeText>
                            </InputLeft>
                            <Input
                              // placeholder="Basic usage"
                              w={79}
                              border={"none"}
                              borderRadius={"none"}
                              h="43px"
                              value={slotNumber}
                              onChange={(e) =>
                                slotInputChangeHandler(e, {
                                  id,
                                })
                              }
                            />
                          </InputContainer>
                        );
                      }
                    )}
                </SlotContainer>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={saveHandler}>
                  Save and Continue
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
        <DatePicker
          selected={broadcasterData?.startDate}
          startDate={broadcasterData?.startDate}
          endDate={broadcasterData?.endDate}
          maxDate={broadcasterData?.endDate}
          minDate={broadcasterData?.startDate}
          onSelect={(date) => {
            let currDate = moment(date).format("YYYY-MM-DD");

            const currSlotDataList = broadcasterData?.dateRange[`${currDate}`];
            setCurrentDate(currDate);
            setSlotDataList(currSlotDataList);
            onOpen();
          }}
          selectsRange
          inline
          selectsDisabledDaysInRange
          excludeDates={
            (!broadcasterData?.duration || !broadcasterData?.language) && [
              broadcasterData?.startDate,
              broadcasterData?.endDate,
            ]
          }
        />
      </div>
    </div>
  );
};
export default StationDetails;
const SlotContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
  row-gap: 30px;
  height: 270px;
  overflow-y: scroll;
`;

const InputContainer = styled.div`
  width: 213px;
  height: 44px;
  border: 0.8px solid #aba8a8;
  border-radius: 2px;
  display: flex;
`;

const InputLeft = styled.div`
  width: 134px;
  height: 44px;
  background: #d9d9d9;
  border-radius: 2px 0px 0px 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlotDataTimeText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  color: #0e0e2c;
`;

const ModalHeaderText = styled.h2`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;

  color: #004643;
`;
