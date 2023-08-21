import React, { useEffect, useState, useRef } from "react";
import Slot from "../../components/Modal/Slot";
import "./css/calender.css";

const Calender = ({
  broadcasterId,
  start,
  end,
  getDay,
  dateLength,
  slotArr,
  quantity,
  advertType,
  setSelectedDate,
  slotID,
  slotQty,
  slotData,
  setStatusState,
}) => {
  let calenderMap = [
    { month: "January", daysNo: 31 },
    { month: "February", daysNo: 28, daysNoL: 29 },
    { month: "March", daysNo: 31 },
    { month: "April", daysNo: 30 },
    { month: "May", daysNo: 31 },
    { month: "June", daysNo: 30 },
    { month: "July", daysNo: 31 },
    { month: "August", daysNo: 31 },
    { month: "September", daysNo: 30 },
    { month: "October", daysNo: 31 },
    { month: "November", daysNo: 30 },
    { month: "December", daysNo: 31 },
  ];
  const [monthArr] = useState(calenderMap);
  const [prevDayBtn, setPrevDayBtn] = useState(0);
  const [startDay, setStartDay] = useState(0);
  const [starter, setStarter] = useState({
    day: 0,
    date: 1,
    month: 0,
    year: 2000,
  });
  const [stopper, setStopper] = useState({
    day: 5,
    date: 6,
    month: 0,
    year: 2000,
  });
  const [listOfDates, setlistOfDates] = useState([]);

  const dateBegin = new Date(
      `${starter.year}-${starter.month}- ${starter.date}`
    ),
    dateEnd = new Date(`${stopper.year}-${stopper.month}- ${stopper.date}`),
    diff = (dateEnd - dateBegin) / 864e5,
    dates = Array.from({ length: diff + 1 }, (_, i) => {
      const date = new Date();
      date.setDate(dateBegin.getDate() + i);
      return date;
    });
  // console.log(dates)
  localStorage.setItem("selectedDates", dates);
  // setNewDateArr(dates)

  const [days, setDay] = useState({
    year: start.getFullYear(),
    month: start.getMonth() + 1,
    day: start.getDay(),
    monthName: monthArr[start.getMonth()].month,
  });

  setSelectedDate(days);
  // let filterDatesList;
  const timeTrack = useRef();
  const dateBtn = useRef();

  const filterDateArr = listOfDates.filter((el) => {
    return el !== "";
  });

  dateLength(filterDateArr.length);

  const handleHoursArr = (data) => {
    slotArr(data);
  };

  useEffect(() => {
    let startData, endsData;
    if (start !== undefined) {
      startData = `${getDay(start.getDay())} ${start.getDate()} ${
        monthArr[start.getMonth()].month
      }, ${start.getFullYear()}`;

      setStarter({
        day: start.getDay(),
        date: start.getDate(),
        month: start.getMonth() + 1,
        year: start.getFullYear(),
      });
    }
    if (end !== undefined) {
      endsData = `${getDay(end.getDay())} ${end.getDate()} ${
        monthArr[end.getMonth()].month
      }, ${end.getFullYear()}`;

      setStopper({
        day: end.getDay(),
        date: end.getDate(),
        month: end.getMonth() + 1,
        year: end.getFullYear(),
      });
    }
    timeTrack.current.innerHTML = `${startData} - ${endsData}`;
  }, [start, end, getDay, monthArr]);

  useEffect(() => {
    if (starter && stopper) {
      setlistOfDates([]);
      // set the day it starts on
      setStartDay(starter.day);
      for (let i = 0; i < startDay; i++) {
        setlistOfDates((prev) => [...prev, ""]);
      }
      if (stopper.year - starter.year < 1) {
        // when the difference between the starting and ending year is less than 1
        let monthDiff = stopper.month - starter.month;

        // if it is in the same month
        if (monthDiff < 1) {
          for (let i = starter.date; i <= stopper.date; i++) {
            setlistOfDates((prev) => [...prev, i]);
          }
        }
        // if it is in different months
        else {
          let startMonth = starter.month + 1,
            stopMonth = stopper.month,
            monthRange = [];
          console.log(starter.year);
          for (let i = startMonth; i < stopMonth; i++) {
            monthRange.push(i);
          }
          if (
            (!(starter.year % 4) &&
              starter.year % 100 &&
              starter.month === 1) ||
            (!(starter.year % 400) && starter.month === 1)
          ) {
            for (
              let i = starter.date;
              i <= monthArr[starter.month].daysNoL;
              i++
            ) {
              setlistOfDates((prev) => [...prev, i]);
            }
          } else {
            for (
              let i = starter.date;
              i <= monthArr[starter.month].daysNo;
              i++
            ) {
              setlistOfDates((prev) => [...prev, i]);
            }
            console.log(listOfDates);
          }
          for (let i = 0; i < monthRange.length; i++) {
            if (
              (!(starter.year % 4) && starter.year % 100 && i === 1) ||
              (!(starter.year % 400) && i === 1)
            ) {
              for (let j = 1; j <= monthArr[monthRange[i]].daysNoL; j++) {
                setlistOfDates((prev) => [...prev, j]);
              }
            } else {
              for (let j = 1; j <= monthArr[monthRange[i]].daysNo; j++) {
                setlistOfDates((prev) => [...prev, j]);
              }
            }
          }
          for (let i = 1; i <= stopper.date; i++) {
            setlistOfDates((prev) => [...prev, i]);
          }
        }
      } else {
        let yearRange = [];
        for (let y = starter.year + 1; y < stopper.year; y++) {
          yearRange.push(y);
        }
        // set the dates for the starting year
        //sets the date of the starting month
        if (
          (!(starter.year % 4) && starter.year % 100 && starter.month === 1) ||
          (!(starter.year % 400) && starter.month === 1)
        ) {
          for (
            let i = starter.date;
            i <= monthArr[starter.month].daysNoL;
            i++
          ) {
            setlistOfDates((prev) => [...prev, i]);
          }
        } else {
          for (let i = starter.date; i <= monthArr[starter.month].daysNo; i++) {
            setlistOfDates((prev) => [...prev, i]);
          }
        }
        // sets the date of the other months in the year
        for (let i = starter.month + 1; i < monthArr.length; i++) {
          if (
            (!(starter.year % 4) && starter.year % 100 && i === 1) ||
            (!(starter.year % 400) && i === 1)
          ) {
            for (let j = 1; j <= monthArr[i].daysNoL; j++) {
              setlistOfDates((prev) => [...prev, j]);
            }
          } else {
            for (let j = 1; j <= monthArr[i].daysNo; j++) {
              setlistOfDates((prev) => [...prev, j]);
            }
          }
        }
        // for other subsequent years
        for (let y = 0; y < yearRange.length; y++) {
          for (let sym = 0; sym < monthArr.length; sym++) {
            if (
              (!(yearRange[y] % 4) && yearRange[y] % 100 && sym === 1) ||
              (!(yearRange[y] % 400) && sym === 1)
            ) {
              for (let i = 1; i <= monthArr[sym].daysNoL; i++) {
                setlistOfDates((prev) => [...prev, i]);
              }
            } else {
              for (let i = 1; i <= monthArr[sym].daysNo; i++) {
                setlistOfDates((prev) => [...prev, i]);
              }
            }
          }
        }
        // sets the date of the other months in the year
        for (let oem = 0; oem < stopper.month; oem++) {
          if (
            (!(stopper.year % 4) && stopper.year % 100 && oem === 1) ||
            (!(stopper.year % 400) && oem === 1)
          ) {
            for (let moem = 1; moem <= monthArr[oem].daysNoL; moem++) {
              setlistOfDates((prev) => [...prev, moem]);
            }
          } else {
            for (let moem = 1; moem <= monthArr[oem].daysNo; moem++) {
              setlistOfDates((prev) => [...prev, moem]);
            }
          }
        }
        // sets for the last month of the stopper year
        for (let i = 1; i <= stopper.date; i++) {
          setlistOfDates((prev) => [...prev, i]);
        }
        // sets the date of the stopping month
        // if (!(starter.year % 4) && starter.month === 1) {
        //   for (
        //     let i = starter.date;
        //     i <= monthArr[starter.month].daysNoL;
        //     i++
        //   ) {
        //     setlistOfDates((prev) => [...prev, i]);
        //   }
        // } else {
        //   for (let i = starter.date; i <= monthArr[starter.month].daysNo; i++) {
        //     setlistOfDates((prev) => [...prev, i]);
        //   }
        // }
      }
    }
  }, [starter, stopper, startDay, monthArr]);

  /*
   * this listens to any update on the prevDayBtn and listOfDates array for any updates
   * any array item of the divBtnList that does not have a value is disabled
   * it assigns the empty-cal-day class to the divBtnList array items that have no value
   * it assigns the active-cal-day class to the divBtnList array items that have a value
   */
  useEffect(() => {
    if (dateBtn.current) {
      let divBtnList = dateBtn.current.querySelectorAll("div > button");
      let divList = dateBtn.current.querySelectorAll("div");
      divBtnList.forEach((element, index) => {
        divList[index].className = "";
        if (element.innerHTML === "") {
          element.disabled = true;
          divList[index].className = "empty-cal-day";
        } else {
          if (index === prevDayBtn) {
            divList[prevDayBtn].className = "active-cal-day";
          }
        }
      });
    }
  }, [prevDayBtn, listOfDates]);
  const [isModal, setIsModal] = useState(false);
  const [slotId, setSlotId] = useState(0);
  const [slotQuantity, setSlotQuantity] = useState(0);

  slotID(slotId);
  slotQty(slotQuantity);

  const getSlotInfo = (data) => {
    setSlotId(data);
  };
  const getSlotQuantity = (data) => {
    setSlotQuantity(data);
  };
  const getInputSlotData = (data) => {
    slotData(data);
  };
  const getCheckStatus = (status) => {
    setStatusState(status);
  };

  console.log(listOfDates);

  return (
    <>
      {isModal && (
        <Slot
          hoursArr={handleHoursArr}
          closeModal={setIsModal}
          broadcasterId={broadcasterId}
          quantity={quantity}
          date={days}
          advertType={advertType}
          inputSlotData={getInputSlotData}
          a={getSlotInfo}
          b={getSlotQuantity}
          checkStatus={getCheckStatus}
        />
      )}
      <div id="calender">
        <h3 ref={timeTrack}>none</h3>

        <div>
          <div>
            <div>
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            <div>
              <div ref={dateBtn}>
                {listOfDates.map((date, index) => {
                  return (
                    <div key={index}>
                      <button
                        onClick={() => {
                          setPrevDayBtn(index);
                          setIsModal(true);
                          setDay({ ...days, day: date });
                        }}
                      >
                        {date}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
