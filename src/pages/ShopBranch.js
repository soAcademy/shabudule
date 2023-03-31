import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { Calendar, BranchInfo, MapLocation } from "../components";
import { BranchContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Locales
import "dayjs/locale/pt";
import localeDe from "dayjs/locale/de"; // With a custom alias for the locale object

const ShopBranch = () => {
  // const mockStore = [
  //   {
  //     logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
  //     longitude: 100.56,
  //     latitude: 13.82,
  //     name: "MK Restaurant",
  //     branch: "เซ็นทรัล พลาซา ลาดพร้าว",
  //     email: "mkrestaurant@gmail.com",
  //     tel: "02-222-2222",
  //     address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
  //   },
  //   {
  //     logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
  //     longitude: 100.4832,
  //     latitude: 13.768,
  //     name: "MK Restaurant",
  //     branch: " ยูเนี่ยนมอลล์ ลาดพร้าว ชั้น 2",
  //     email: "mkrestaurant@gmail.com",
  //     tel: "02-222-2222",
  //     address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
  //   },
  //   {
  //     logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
  //     longitude: 100.510294,
  //     latitude: 13.7268226,
  //     name: "MK Restaurant",
  //     branch: "บิ๊กซี เอ็กซ์ตร้า ลาดพร้าว",
  //     email: "mkrestaurant@gmail.com",
  //     tel: "02-222-2222",
  //     address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
  //   },
  //   {
  //     logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
  //     longitude: 100.6184404,
  //     latitude: 13.9889524,
  //     name: "MK Restaurant",
  //     branch: "MK Delco (โชคชัยร่วมมิตร)",
  //     email: "mkrestaurant@gmail.com",
  //     tel: "02-222-2222",
  //     address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
  //   },
  //   {
  //     logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
  //     longitude: 99.68039,
  //     latitude: 8.16453,
  //     name: "MK Restaurant",
  //     branch: "samyan mirtown",
  //     email: "mkrestaurant@gmail.com",
  //     tel: "02-222-2222",
  //     address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
  //   },
  // ];

  const currentDate = dayjs();
  console.log("cd", currentDate);
  console.log("format cd", dayjs().locale(localeDe).format());

  const { branchId } = useContext(BranchContext);
  const { setCreatePartyByDate } = useContext(BranchContext);
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [branch, setBranch] = useState();

  console.log("branchId", branchId);

  const navigate = useNavigate();


  useEffect(() => {
    const getBranch = async () => {
      const result = await axios.post(
        "https://shabudule-api.vercel.app/function/getBranchShabudule",
        { branchId: branchId }
      );
      console.log("getBranch", result.data);
      setBranch(result.data);
    };
    getBranch();
  }, [branchId]);

  const savedToken = localStorage.getItem("SavedToken");

  const createParty = () => {
    if (savedToken) {
      setCreatePartyByDate(selectDate.locale(localeDe).format())
      navigate("/shabu/reservation");
    } else {
      navigate("/shabu/register");
    }
  };

  return (
    <div className="bg-background">
      <div className="p-3">
        <div className="border-b-2 pb-3">
          <BranchInfo branch={branch} />
        </div>
        <div className="flex w-full justify-end mt-3">
          <button
            className="bg-primary text-white rounded-md p-2 font-semibold text-sm"
            onClick={createParty}
          >
            สร้างปาร์ตี้ !
          </button>
        </div>
        <div className="lg:flex lg:justify-between lg:w-full lg:space-x-2">
          <div className="mt-10 lg:w-6/12">
            <Calendar
              today={today}
              setToday={setToday}
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              currentDate={currentDate}
            />
          </div>
          <div className="mt-10 lg:w-6/12">
            <MapLocation branch={branch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBranch;
