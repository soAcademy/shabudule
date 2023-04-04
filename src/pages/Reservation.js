import React, { useState, useContext, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Calendar, TimeAndTable } from "../components";
import { BranchContext } from "../App";
import { useFetchBranch } from "../hooks";
import "dayjs/locale/pt";
import localeDe from "dayjs/locale/de"; // With a custom alias for the locale object

export const Reservation = () => {
  const currentDate = dayjs();

  const { branchId, createPartyByDate, user } = useContext(BranchContext);
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [tableAndTime, setTableAndTime] = useState();
  const { branch } = useFetchBranch();
  const [partyName, setPartyName] = useState("");
  const [desc, setDesc] = useState("");
  const [partyType, setPartyType] = useState("public");
  const [tableId, setTableId] = useState();
  const [time, setTime] = useState();
  const [partyId, setPartyId] = useState();
  const [fillOutToggle, setFillOutToggle] = useState(false);
  const [warningToggle, setWarningToggle] = useState(false);
  const [bookingToggle, setBookingToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Branch ID", branchId);
  console.log("createParty By Date", createPartyByDate);
  console.log("select date", selectDate.locale(localeDe).format());
  // console.log("test1 :", tableAndTime);
  // console.log("userToken :", token);

  const savedToken = localStorage.getItem("SavedToken");

  const startDate = useCallback(() => {
    const current = selectDate.locale(localeDe).format();
    const send = `${current.slice(0, 11)}${time}:00:00`;
    return send;
  }, [selectDate, time]);

  const endDate = useCallback(() => {
    const current = selectDate.locale(localeDe).format();
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
            date: createPartyByDate ?? selectDate.locale(localeDe).format(),
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
    console.log("selected date", selectDate);
    axios({
      method: "post",
      url: "https://shabudule-api.vercel.app/function/getMyBookedTimeAuthShabudule",
      data: {
        idToken: savedToken,
        date: startDate(),
      },
    }).then((res) => {
      console.log("booked time slot", res.data);
      if (res.data.filter((r) => r === time).length > 0) {
        setWarningToggle(true);
      } else {
        setFillOutToggle(true);
      }
    });
  }, [time]);

  const createParty = () => {
    setIsLoading(true);
    axios({
      method: "post",
      url: "https://shabudule-api.vercel.app/function/createPartyAuthShabudule",
      data: {
        idToken: savedToken,
        name: partyName,
        shabuShopTableId: tableId,
        startDateTime: startDate(),
        endDateTime: endDate(),
        partyDetail: desc,
        type: partyType,
      },
    }).then((res) => {
      setPartyId(res.data.id);
      console.log("createParty resp", res.data);
    });
  };

  useEffect(() => {
    if (partyId > 0) {
      const addOwnerParty = async () => {
        try {
          const result = await axios.post(
            "https://shabudule-api.vercel.app/function/addPartyMemberAuthShabudule",
            {
              idToken: savedToken,
              status: "accept",
              partyId: partyId,
            }
          );
          console.log("addOwner :", result.data);
          setIsLoading(false);
        } catch (e) {
          console.log("Error add owner to party:", e);
        } finally {
          setBookingToggle(true);
          setTime();
        }
      };
      addOwnerParty();
    }
  }, [partyId, savedToken]);

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
            fillOutToggle={fillOutToggle}
            setFillOutToggle={setFillOutToggle}
            createParty={createParty}
            warningToggle={warningToggle}
            setWarningToggle={setWarningToggle}
            bookingToggle={bookingToggle}
            setBookingToggle={setBookingToggle}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
