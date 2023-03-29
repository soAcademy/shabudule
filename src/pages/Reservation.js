import React, { useState, useContext, useEffect, useMemo } from "react";
import { Calendar, TimeAndTable } from "../components";
import dayjs from "dayjs";
import { BranchContext } from "../App";
import axios from "axios";

export const Reservation = () => {
  const currentDate = dayjs();

  const { branchId } = useContext(BranchContext);
  const { createPartyByDate } = useContext(BranchContext);
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [tableAndTime, setTableAndTime] = useState();

  const memoizedBranchId = useMemo(() => branchId, [branchId]);

  console.log("Mem Branch ID", memoizedBranchId);
  console.log("createParty By Date", createPartyByDate);
  console.log("select date", selectDate);

  useEffect(() => {
    const getTimeAndTable = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-api.vercel.app/function/getAvailableSlotsShabudule",
          {
            branchId: memoizedBranchId,
            date: createPartyByDate ?? selectDate,
          }
        );
        console.log("get time and table :", result.data);
        setTableAndTime(result.data);
      } catch (error) {
        console.log("Error fetching time and table:", error);
      }
    };
    getTimeAndTable();
  }, [memoizedBranchId, selectDate]);

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
          <TimeAndTable
            createPartyByDate={createPartyByDate}
            selectDate={selectDate}
            branchId={memoizedBranchId}
            tableAndTime={tableAndTime}
          />
        </div>
      </div>
    </div>
  );
};
