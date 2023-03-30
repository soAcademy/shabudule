import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel } from "../components/Carousel";
import { ToggleParty } from "../components/ToggleParty";
import { PopularParty } from "../components/PopularParty";
import { Search } from "../components/Search";
import { PopularStore } from "../components/PopularStore";
import Button from "@mui/material/Button";

// const restaurants = [
//   { image: "/momo_logo.jpg" },
//   { image: "/mk_logo.jpg" },
//   { image: "/shabushi_logo.jpg" },
//   { image: "/momo_logo.jpg" },
// ];

// const parties = [
//   {
//     branch: "Mo-Mo Paradise: Central Rama 3",
//     time: " 23/03/2023 12:00PM",
//     amount: "3/4",
//     image: "/shabu.jpg",
//     partyName: "Hello",
//     detail: "dfvbdfbdfbdfvdfdf",
//     type: "public",
//     createdBy: "Teak",
//   },
//   {
//     branch: "Mo-Mo Paradise: Central Rama 3",
//     time: " 23/03/2023 12:00PM",
//     amount: "3/4",
//     image: "/shabu.jpg",
//     partyName: "Hi World",
//     detail: "dfvbdfbdfbdfvdfdf",
//     type: "public",
//     createdBy: "Teak",
//   },
//   {
//     branch: "Mo-Mo Paradise: Central Rama 3",
//     time: " 23/03/2023 12:00PM",
//     amount: "3/4",
//     image: "/shabu.jpg",
//     partyName: "hihi",
//     detail: "dfvbdfbdfbdfvdfdf",
//     type: "public",
//     createdBy: "Teak",
//   },
//   {
//     branch: "Mo-Mo Paradise: Central Rama 3",
//     time: " 23/03/2023 12:00PM",
//     amount: "3/4",
//     image: "/shabu.jpg",
//     partyName: "good morning",
//     detail: "dfvbdfbdfbdfvdfdf",
//     type: "public",
//     createdBy: "Teak",
//   },
//   {
//     branch: "Mo-Mo Paradise: Central Rama 3",
//     time: " 23/03/2023 12:00PM",
//     amount: "3/4",
//     image: "/shabu.jpg",
//     partyName: "good afternoon",
//     detail: "dfvbdfbdfbdfvdfdf",
//     type: "public",
//     createdBy: "Teak",
//   },
// ];

// const restaurantBranches = [
//   {
//     shopName: "Mo-Mo Paradise",
//     branchNames: [
//       {
//         branch: "Central World",
//       },
//       {
//         branch: "central Rama-3",
//       },
//       {
//         branch: "CDC",
//       },
//     ],
//   },
//   {
//     shopName: "MK Restaurant",
//     branchNames: [
//       {
//         branch: "Central World",
//       },
//       {
//         branch: "Siam Paragon",
//       },
//       {
//         branch: "Emquatier",
//       },
//     ],
//   },
// ];

const Home = () => {
  const [togglePartyPopUp, setTogglePartyPopup] = useState(false);
  const [currentParty, setCurrentParty] = useState(null);
  const [parties, setParties] = useState([]);
  const [promotion, setPromotion] = useState();
  const [search, setSearch] = useState();
  const [searchDatas, setSearchDatas] = useState([]);
  const [shops, setShops] = useState([]);

  const getParties = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getPartyShabudule"
    );
    console.log("result", result);
    setParties(result.data);
  };

  useEffect(() => {
    getParties();
  }, []); //empty dependency [] as only render once

  const getShops = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getShopShabudule"
    );
    console.log("result", result);
    setShops(result.data);
  };

  useEffect(() => {
    getShops();
  }, []); //empty dependency [] as only render once

  console.log("test", promotion?.length);

  const getPromotion = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getPromotionShabudule"
    );
    console.log("Promotion Api", result.data);
    setPromotion(result.data);
  };
  useEffect(() => {
    getPromotion();
  }, []);

  return (
    <>
      <ToggleParty
        togglePartyPopUp={togglePartyPopUp}
        setTogglePartyPopup={setTogglePartyPopup}
        currentParty={currentParty}
        setCurrentParty={setCurrentParty}
      />
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto">
        <div className="bg-[#F5F5F5] m-auto w-full h-full mx-2 border border-4 border-[#B1454A] rounded-lg mt-[70px] overflow-auto">
          <Search
            search={search}
            setSearch={setSearch}
            searchDatas={searchDatas}
            setSearchDatas={setSearchDatas}
            shops={shops}
          />
          <div className="text-[#B1454A] text-4xl text-center m-2 font-bold">
            สร้างปาร์ตี้ชาบูกินกับเพื่อนได้แล้ววันนี้! ที่ SHABUDULE
          </div>
          <div className="w-full md:h-22">
            <Carousel promotion={promotion} auto={true} interval={3000} />
          </div>
          <div className="text-center text-[#B1454A] font-bold md:text-4xl">
            กว่า 100 ร้านชาบูที่ร่วมกับเรา
          </div>
          <div className="flex p-2 justify-center">
            {shops?.map((shop) => (
              <img
                src={shop?.shopImage}
                alt="restaurant logos"
                className="w-16 h-16 md:w-28 md:h-28 m-2 md:m-4 rounded-lg"
              />
            ))}
          </div>
          <div className="text-center text-[#B1454A] font-bold my-2 md:text-2xl">
            จอง/สร้าง Party ตอนนี้
          </div>
          <Link to="/shabu/register">
            <div className="justify-center flex">
              <Button className="text-center bg-[#B1454A] text-[#F5F5F5] w-1/3 p-2 rounded-lg button font-bold hover:bg-[#c95f64]" variant="contained">
                เริ่มต้นใช้งานฟรี
              </Button>
            </div>
          </Link>
          <div className="m-2 font-bold text-[#B1454A] text-xl md:text-2xl">
            popular party
          </div>
          <PopularParty
            parties={parties}
            setTogglePartyPopup={setTogglePartyPopup}
            setCurrentParty={setCurrentParty}
          />
          <div className="m-2 font-bold text-[#B1454A] text-xl md:text-2xl">
            popular Store
          </div>
          <PopularStore shops={shops} />
        </div>
      </div>
    </>
  );
};

export default Home;
