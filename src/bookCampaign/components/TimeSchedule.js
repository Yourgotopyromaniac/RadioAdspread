import React, { useState, useEffect } from "react";
import {
  useQuery
} from "@apollo/client";
import { TIME_SCHEDULE } from "../../components/GraphQL/Queries";
import "./css/time-schedule.css";

const TimeSchedule = ({ closeModal, stationId }) => {
  console.log(stationId, 'stationjkjk id')

  const [getDay, setGetDay] = useState(0)
  const [dayData, setDayData] = useState([])

  const timeSchedule = useQuery(TIME_SCHEDULE, {
    variables: {
      broadcasterId: stationId
    }
  })

  const timeScheduleWeekDays = timeSchedule.data?.guest.getBroadcasterTimeSchedule.map(({ weekDay }) => weekDay)

  useEffect(() => {
    setDayData(timeSchedule.data?.guest.getBroadcasterTimeSchedule.filter((dayData) => dayData.weekDay === timeScheduleWeekDays[0]))
  }, [timeSchedule])

  const selectedDay = (day, index) => {
    setGetDay(index)
    const dayInfo = timeSchedule.data?.guest.getBroadcasterTimeSchedule.filter((dayData) => dayData.weekDay === day)
    setDayData(dayInfo)
  }
  console.log(dayData)

  function tConvert(date) {
    const obj = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleTimeString("en-US", obj);
  }


  return (
    <div id="time-schedule">
      <div>
        <div className='cancel-icon-wrapper'
          onClick={() => { closeModal() }}
        >
          <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1558_2136)">
              <path d="M14.25 4.25L4.75 12.75" stroke="#0E0E2C" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4.75 4.25L14.25 12.75" stroke="#0E0E2C" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_1558_2136">
                <rect width="19" height="17" fill="white" />
              </clipPath>
            </defs>
          </svg>

        </div>
        <div id="time-btn">
          {[...new Set(timeScheduleWeekDays)]?.map((day, index) => {
            return <button
              onClick={() => selectedDay(day, index)}
              className={index === getDay ? "bg-color" : ""}
            >{day}</button>
          })}
        </div>
        <div className="table-body-container view-schedule hide-border">
          <table className="view-schedule-table  hide-border">
            <thead>
              <tr>
                <th>show</th>
                <th>time</th>
                <th>schedule</th>
              </tr>

            </thead>
            <tbody>
              {dayData?.map((data) => {
                return <tr>
                  <td>{data.show}</td>
                  <td>{tConvert(data.startTime)}-{tConvert(data.endTime)}</td>
                  <td>{data.sponsor}</td>
                </tr>
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;
