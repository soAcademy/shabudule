import React, { useState } from "react";
import { Calendar, TimeAndTable } from "../components";
import dayjs from "dayjs";

export const Reservation = () => {
  const currentDate = dayjs();

  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  console.log("setSelectDate", selectDate);

  return (
    <div className=" bg-background h-screen">
      <div className="p-4">
        <p>Booking</p>
        <div className="mt-10">
          <Calendar
            today={today}
            setToday={setToday}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            currentDate={currentDate}
          />
        </div>
        <div className="mt-10">
          <TimeAndTable  selectDate={selectDate}/>
        </div>
      </div>
    </div>
  );
};
