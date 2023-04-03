import React, { useState, useContext, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Calendar, TimeAndTable } from "../components";
import { BranchContext } from "../App";
import { useFetchBranch } from "../hooks";

export const Reservation = () => {
  const currentDate = dayjs();

  const { branchId, createPartyByDate, user, token } =
    useContext(BranchContext);
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(new Date());
  const [tableAndTime, setTableAndTime] = useState();
  const { branch } = useFetchBranch();
  const [partyName, setPartyName] = useState("");
  const [desc, setDesc] = useState("");
  const [partyType, setPartyType] = useState("public");
  const [tableId, setTableId] = useState();
  const [time, setTime] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [partyId, setPartyId] = useState();

  console.log("Branch ID", branchId);
  console.log("createParty By Date", createPartyByDate);
  console.log("select date", selectDate.toISOString());
  console.log("test1 :", tableAndTime);
  console.log("userToken :", token);

  const startDate = useCallback(() => {
    const current = selectDate.toISOString();
    const send = `${current.slice(0, 11)}${time}:00:00`;
    return send;
  }, [selectDate, time]);

  const endDate = useCallback(() => {
    const current = selectDate.toISOString();
    const send = `${current.slice(0, 11)}${parseInt(time) + 1}:00:00`;
    return send;
  }, [selectDate, time]);
  console.log("startDate :", startDate());
  console.log("endDate :", endDate());

  useEffect(() => {
    const getTimeAndTable = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-api.vercel.app/function/getAvailableSlotsShabudule",
          {
            branchId: branchId,
            date: createPartyByDate ?? selectDate.toISOString(),
          }
        );
        console.log("get time and table :", result.data);
        setTableAndTime(result.data);
      } catch (error) {
        console.log("Error fetching time and table:", error);
      }
    };
    getTimeAndTable();
  }, [branchId, createPartyByDate, selectDate]);

  useEffect(() => {
    if (buttonClicked) {
      const createParty = async () => {
        try {
          const result = await axios.post(
            "https://shabudule-api.vercel.app/function/createPartyAuthShabudule",
            {
              idToken: token,
              name: partyName,
              shabuShopTableId: tableId,
              startDateTime: startDate(),
              endDateTime: endDate(),
              partyDetail: desc,
              type: partyType,
            }
          );
          console.log("created party:", result.data);
          setButtonClicked(false);
          setPartyId(result.data.id);
        } catch (e) {
          console.log("Error create party:", e);
        }
      };
      createParty();
    }
  }, [
    buttonClicked,
    token,
    partyName,
    tableId,
    startDate,
    endDate,
    desc,
    partyType,
    time,
  ]);

  useEffect(() => {
    if (partyId > 0) {
      const addOwnerParty = async () => {
        try {
          const result = await axios.post(
            "https://shabudule-api.vercel.app/function/addPartyMemberAuthShabudule",
            {
              idToken: token,
              status: "accept",
              partyId: partyId,
            }
          );
          console.log("addOwner :", result.data);
        } catch (e) {
          console.log("Error add owner to party:", e);
        }
      };
      addOwnerParty();
    }
  }, [partyId, token]);

  return (
    <div className=" bg-background">
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
            branchId={branchId}
            tableAndTime={tableAndTime}
            branch={branch}
            user={user}
            partyName={partyName}
            setPartyName={setPartyName}
            desc={desc}
            setDesc={setDesc}
            partyType={partyType}
            setPartyType={setPartyType}
            tableId={tableId}
            setTableId={setTableId}
            time={time}
            setTime={setTime}
            setButtonClicked={setButtonClicked}
          />
        </div>
      </div>
    </div>
  );
};
