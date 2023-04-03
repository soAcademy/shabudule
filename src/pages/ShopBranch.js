import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import { Calendar, BranchInfo, MapLocation } from "../components";
import { BranchContext } from "../App";
// Locales
import "dayjs/locale/pt";
import localeDe from "dayjs/locale/de"; // With a custom alias for the locale object
import { useFetchBranch } from "../hooks";
import { useNavigate } from "react-router-dom";

const ShopBranch = () => {
  const currentDate = dayjs();
  // console.log("cd", currentDate);
  // console.log("format cd", dayjs().toISOString());

  const { setCreatePartyByDate } = useContext(BranchContext);
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const { branch } = useFetchBranch();

  const savedToken = localStorage.getItem("SavedToken");
  const navigate = useNavigate();

  const createParty = () => {
    if (savedToken) {
      setCreatePartyByDate(selectDate.locale(localeDe).format());
      navigate("/shabu/reservation");
    } else {
      navigate("/shabu/login");
    }
  };

  return (
    <div className="bg-background pt-20">
      <div className="p-3">
        <div className="border-b-2 pb-3">
          <BranchInfo branch={branch} />
        </div>

        <div className="lg:flex lg:justify-evenly lg:w-full">
          <div className="lg:w-1/2">
            <div className="mt-10 lg:w-full">
              <Calendar
                today={today}
                setToday={setToday}
                selectDate={selectDate}
                setSelectDate={setSelectDate}
                currentDate={currentDate}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-primary text-white rounded-md p-2 font-semibold text-sm mt-4 mr-4 md:text-xl"
                onClick={() => {
                  createParty();
                }}
              >
                สร้างปาร์ตี้ !
              </button>
            </div>
          </div>
          <div className="mt-10 lg:w-1/2 lg:mx-4">
            <MapLocation branch={branch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBranch;
