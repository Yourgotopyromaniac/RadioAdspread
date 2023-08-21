import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import StationDetails from "../components/StationDetails.js";
import MainFooterSect from "../../components/MainFooterSect.js";
import TimeSchedule from "../components/TimeSchedule";
import { GET_BROADCASTERS } from "../../components/GraphQL/Queries";
import "./css/page-two.css";
import { Button, Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { AdvertTypeData } from "../../constant.js";
import moment from "moment";
import { fmtCurrency } from "../../utils/functions";
import { request } from "graphql-request";
import { BROADCASTER_SLOTS_GQL } from "../../components/GraphQL/Queries";
import { URL } from "../../config/url";
import { useAtom } from "jotai";
import { loginModalAtom, isBookingState } from "../../atom/advertiserModal";
import { AUTH_TOKEN } from "../../constant.js";
import { TIME_SCHEDULE } from "../../components/GraphQL/Queries";
import { useCreateDraftFromBookings } from "../../hook.js";

const PageTwo = () => {
  const { loading, createDraft } = useCreateDraftFromBookings();

  // login modal
  const [, setLoginModal] = useAtom(loginModalAtom);
  const [, setIsbooking] = useAtom(isBookingState);

  const getSelectedStations = localStorage
    .getItem("selectedStations")
    .split(",");
  const noOfSelectedStation = getSelectedStations.length;

  const [broadcasterId, setBroadcasterId] = useState(null);
  const [title, setTitle] = useState("");
  const [activeStation, setActiveStation] = useState(0);
  const [getPrice, setGetPrice] = useState(0);
  const [loadingState, setLoadingState] = useState("idle");

  //timeschedule modal state
  const [isModal, setIsModal] = useState(false);

  //get all available rado statons
  const { data } = useQuery(GET_BROADCASTERS, {
    variables: {
      page: 1,
      itemsPerPage: 1000,
    },
  });

  //return selected radio stations
  const filterData = data?.guest.getBroadcasters.broadcasters.filter((item) => {
    return getSelectedStations.includes(item.id);
  });

  const [mutatedbroadcasterData, setMutatedBroadcasterData] = useState([]);

  useEffect(() => {
    setLoadingState("loading");

    const getSelectedStations = localStorage
      .getItem("selectedStations")
      .split(",");

    const filterData = data?.guest.getBroadcasters.broadcasters.filter(
      (item) => {
        return getSelectedStations.includes(item.id);
      }
    );

    filterData &&
      Promise.all([
        ...filterData?.map((broadcaster) => {
          return request({
            url: URL,
            document: BROADCASTER_SLOTS_GQL,
            variables: { broadcasterId: broadcaster?.id },
          });
        }),
      ])
        .then((data) => {
          const currDate = moment(new Date()).format("YYYY-MM-DD");

          let mutatedSlotData = [...data].map((broadcaster, i) => {
            broadcaster = { ...broadcaster };
            broadcaster["guest"]["id"] = filterData[i]["id"];
            broadcaster["guest"]["name"] = filterData[i]["name"];
            broadcaster["guest"]["language"] = "";
            broadcaster["guest"]["duration"] = "";
            broadcaster["guest"]["advertType"] = "";
            broadcaster["guest"]["advertTypeData"] = [...AdvertTypeData];
            broadcaster["guest"]["startDate"] = new Date();
            broadcaster["guest"]["endDate"] = new Date();
            broadcaster["guest"]["dateRange"] = {};
            broadcaster["guest"]["dateRange"][`${currDate}`] = {
              slotData: [
                ...broadcaster?.guest?.getBroadcasterSlots.map((slot) => {
                  slot = { ...slot };
                  slot["date"] = currDate;
                  slot["adverType"] = null;
                  slot["slotNumber"] = 0;
                  slot["language"] = "";
                  return slot;
                }),
              ],
              totalSlot: 0,
              totalPrice: 0,
            };

            broadcaster["guest"]["totalDays"] = 1;
            broadcaster["guest"]["totalSpots"] = 0;
            broadcaster["guest"]["totalPrice"] = 0;
            broadcaster["guest"]["allSlots"] = [];
            return broadcaster;
          });
          setLoadingState("completed");

          setMutatedBroadcasterData(mutatedSlotData);
        })
        .catch((err) => console.log(err));
  }, [data]);

  const [language, setLanguage] = useState("");

  const currentBroadcasterData =
    mutatedbroadcasterData &&
    mutatedbroadcasterData.find((broadcaster) => {
      return broadcaster?.guest?.name === title;
    })?.guest;

  useEffect(() => {
    //prefilleed states with data from array first object
    const getSelectedStations = localStorage
      .getItem("selectedStations")
      .split(",");

    setTitle(
      data?.guest.getBroadcasters.broadcasters.filter((a) => {
        return getSelectedStations.includes(a.id);
      })[0]?.name
    );

    setBroadcasterId(
      data?.guest.getBroadcasters.broadcasters.filter((a) => {
        return getSelectedStations.includes(a.id);
      })[0]?.id
    );

    setGetPrice(
      data?.guest.getBroadcasters.broadcasters.filter((a) => {
        return getSelectedStations.includes(a.id);
      })[0]?.startingPrice
    );
  }, [data]);

  //timeschedule modal function
  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const allSlotData =
    mutatedbroadcasterData &&
    mutatedbroadcasterData
      .map((broadcaster) => {
        return [...broadcaster.guest.allSlots];
      })
      .flat()
      .filter(
        (slotData) =>
          slotData?.jingleType !== null || slotData?.slotNumber !== 0
      )
      .map(({ id, slotNumber, date, broadcasterId, advertType }) => {
        return {
          slotId: id,
          quantity: slotNumber,
          language: language,
          date: new Date(date),
          broadcasterId: broadcasterId,
          advertType: advertType,
        };
      });

  const handleSubmit = () => {
    const token = localStorage.getItem(AUTH_TOKEN);

    // save booking to localstorage
    localStorage.setItem("booking", JSON.stringify(allSlotData));

    if (!token) {
      // set true that a guest a booking a campaign
      setIsbooking(true);

      return setLoginModal(true);
    }

    createDraft([...allSlotData]);
  };

  const timeSchedule = useQuery(TIME_SCHEDULE, {
    variables: {
      broadcasterId
    }
  })

  return (
    <>
      {isModal && (
        <TimeSchedule closeModal={closeModal} stationId={broadcasterId} />
      )}
      <div>
        <main>
          <section id="station-detail">
            <div>
              <div id="station-detail-btn">
                {filterData?.map((station, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setTitle(station.name);
                        setActiveStation(index);
                        setGetPrice(station.startingPrice);
                        setBroadcasterId(station.id);
                      }}
                      className={
                        index === activeStation ? "active-station-btn" : ""
                      }
                    >
                      {station.name}
                    </button>
                  );
                })}
              </div>

              <ChakraProvider>
                {loadingState === "loading" || loadingState === "idle" ? (
                  <Center h="50vh">
                    <Spinner size="xl" />
                  </Center>
                ) : (
                  <>
                    <StationDetails
                      title={title}
                      tagline=""
                      totalStation={noOfSelectedStation}
                      totalPrice={getPrice}
                      id={broadcasterId}
                      isOpen={openModal}
                      stationNo={filterData?.length}
                      broadcasterData={currentBroadcasterData}
                      setMutatedBroadcasterData={setMutatedBroadcasterData}
                      mutatedbroadcasterData={mutatedbroadcasterData}
                      setLanguage={setLanguage}
                      data={timeSchedule}
                    />
                    <dl id="booking-details">
                      <h2>Booking Details</h2>
                      <div>
                        <dt>Radio Stations:</dt>
                        <dd>{filterData?.length || 0}</dd>
                      </div>
                      <div>
                        <dt>Total no of Days:</dt>
                        <dd>
                          {mutatedbroadcasterData &&
                            mutatedbroadcasterData.reduce((acc, curr) => {
                              return acc + curr?.guest?.totalDays;
                            }, 0)}
                        </dd>
                      </div>
                      <div>
                        <dt>Total no of Spots:</dt>
                        <dd>
                          {" "}
                          {mutatedbroadcasterData &&
                            mutatedbroadcasterData.reduce((acc, curr) => {
                              return acc + curr?.guest?.totalSpots;
                            }, 0)}
                        </dd>
                      </div>
                      <div>
                        <dt>Total Amount: </dt>
                        <dd>
                          {fmtCurrency(
                            mutatedbroadcasterData &&
                              mutatedbroadcasterData.reduce((acc, curr) => {
                                return acc + curr?.guest?.totalPrice;
                              }, 0)
                          )}
                        </dd>
                      </div>
                    </dl>
                    <Button
                      isLoading={loading}
                      loadingText="Loading"
                      spinnerPlacement="start"
                      h="44px"
                      borderRadius={2}
                      background="#F99B28"
                      colorScheme="#F99B28"
                      maxW={210}
                      color="white"
                      isDisabled={!allSlotData.length}
                      onClick={handleSubmit}
                    >
                      Proceed to Checkout
                    </Button>
                  </>
                )}
              </ChakraProvider>
            </div>
          </section>
        </main>
        <footer style={{ boxSizing: "content-box" }}>
          <MainFooterSect />
        </footer>
      </div>
    </>
  );
};

export default PageTwo;
