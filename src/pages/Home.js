import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel } from "../components/Carousel";
import { ToggleParty } from "../components/ToggleParty";
import { PopularParty } from "../components/PopularParty";
import { Search } from "../components/Search";
import { PopularStore } from "../components/PopularStore";
import { LoggedInNavBarContext } from "../App";
import { BranchContext } from "../App";
import Button from "@mui/material/Button";

const Home = () => {
  const [togglePartyPopUp, setTogglePartyPopup] = useState(false);
  const [currentParty, setCurrentParty] = useState(null);
  const [parties, setParties] = useState([]);
  const [promotion, setPromotion] = useState();
  const [search, setSearch] = useState();
  const [searchDatas, setSearchDatas] = useState([]);
  const [shops, setShops] = useState([]);
  const { loggedIn } = useContext(LoggedInNavBarContext);
  const { token } = useContext(BranchContext);

  console.log("token home :", token);

  const getParties = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getPartyShabudule"
    );
    // console.log("result", result);
    setParties(result.data);
  };

  useEffect(() => {
    getParties();
  }, []); //empty dependency [] as only render once

  const getShops = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getShopShabudule"
    );
    // console.log("result", result);
    setShops(result.data);
  };

  useEffect(() => {
    getShops();
  }, []); //empty dependency [] as only render once

  // console.log("test", promotion?.length);

  const getPromotion = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getPromotionShabudule"
    );
    // console.log("Promotion Api", result.data);
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
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto mt-14">
        <div className="bg-[#F5F5F5] overflow-auto pb-14">
          <Search
            search={search}
            setSearch={setSearch}
            searchDatas={searchDatas}
            setSearchDatas={setSearchDatas}
            shops={shops}
          />
          <div className="text-[#B1454A] md:text-4xl text-center mb-2 font-bold text-2xl">
            สร้างปาร์ตี้และจองร้านชาบูกินกับเพื่อนได้แล้ววันนี้! ที่ SHABUDULE
          </div>
          <div className="w-full md:h-22">
            <Carousel promotion={promotion} auto={true} interval={3000} />
          </div>
          <div className="text-center text-[#B1454A] font-bold md:text-2xl">
            ร้านชาบูที่ร่วมกับเรา
          </div>
          <div className="grid grid-cols-3 p-2 justify-items-center lg:flex lg:justify-center">
            {shops?.map((shop) => (
              <img
                src={shop?.shopImage}
                alt="restaurant logos"
                className="w-16 h-16 md:w-28 md:h-28 m-2 md:m-4 rounded-lg"
              />
            ))}
          </div>
          {!loggedIn && (
            <>
              <div className="text-center text-[#B1454A] font-bold my-2 md:text-2xl">
                สร้างปาร์ตี้และจองร้านเลย
              </div>
              <Link to="/shabu/register">
                <div className="justify-center flex">
                  <Button
                    className="text-center bg-[#B1454A] text-[#F5F5F5] md:w-1/3 p-2 rounded-lg button font-bold hover:bg-[#c95f64] text-xl mb-8 w-2/3"
                    variant="contained"
                  >
                    เริ่มต้นใช้งานฟรี
                  </Button>
                </div>
              </Link>
            </>
          )}
          <div className="mx-6 font-bold text-[#B1454A] text-xl md:text-2xl">
            INCOMING PARTIES
          </div>
          <PopularParty
            parties={parties}
            setTogglePartyPopup={setTogglePartyPopup}
            setCurrentParty={setCurrentParty}
          />
          <div className="mx-6 font-bold text-[#B1454A] text-xl md:text-2xl mt-8">
            POPULAR SHABU RESTAURANTS
          </div>
          <PopularStore shops={shops} />
        </div>
      </div>
    </>
  );
};

export default Home;
