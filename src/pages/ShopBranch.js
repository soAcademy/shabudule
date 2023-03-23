import React, { useState } from "react";
import dayjs from "dayjs";
import { Calendar, BranchInfo, MapLocation } from "../components";
import { Link } from "react-router-dom";

// Locales
import "dayjs/locale/pt";
import localeDe from "dayjs/locale/de"; // With a custom alias for the locale object

export const ShopBranch = () => {
  const mockStore = [
    {
      logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
      longitude: 100.56,
      latitude: 13.82,
      name: "MK Restaurant",
      branch: "เซ็นทรัล พลาซา ลาดพร้าว",
      email: "mkrestaurant@gmail.com",
      tel: "02-222-2222",
      address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
    },
    {
      logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
      longitude: 100.4832,
      latitude: 13.768,
      name: "MK Restaurant",
      branch: " ยูเนี่ยนมอลล์ ลาดพร้าว ชั้น 2",
      email: "mkrestaurant@gmail.com",
      tel: "02-222-2222",
      address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
    },
    {
      logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
      longitude: 100.510294,
      latitude: 13.7268226,
      name: "MK Restaurant",
      branch: "บิ๊กซี เอ็กซ์ตร้า ลาดพร้าว",
      email: "mkrestaurant@gmail.com",
      tel: "02-222-2222",
      address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
    },
    {
      logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
      longitude: 100.6184404,
      latitude: 13.9889524,
      name: "MK Restaurant",
      branch: "MK Delco (โชคชัยร่วมมิตร)",
      email: "mkrestaurant@gmail.com",
      tel: "02-222-2222",
      address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
    },
    {
      logo: "https://www.mkrestaurant.com/public/assets/img/icon/logo__mk-2.png",
      longitude: 99.68039,
      latitude: 8.16453,
      name: "MK Restaurant",
      branch: "samyan mirtown",
      email: "mkrestaurant@gmail.com",
      tel: "02-222-2222",
      address: "1691/2 ถ. พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
    },
  ];

  const currentDate = dayjs();
  console.log(dayjs().locale(localeDe).format());

  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [createParty, setCreateParty] = useState();

  console.log("createParty By Date", createParty);
  return (
    <div className="bg-background">
      <div className="p-3">
        <div className="border-b-2 pb-3">
          <BranchInfo mockStore={mockStore} />
        </div>
        <div className="flex w-full justify-end mt-3">
          <button
            className="bg-primary text-white rounded-md p-2 font-semibold text-sm"
            onClick={() => setCreateParty(selectDate.locale(localeDe).format())}
          >
            <Link to="/reservation">สร้างปาร์ตี้ !</Link>
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
            <MapLocation mockStore={mockStore} createParty={createParty} />
          </div>
        </div>
      </div>
    </div>
  );
};
