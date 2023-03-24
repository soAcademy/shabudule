import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "../components/Carousel";
import { ToggleParty } from "../components/ToggleParty";

const restaurants = [
  { image: "/momo_logo.jpg" },
  { image: "/mk_logo.jpg" },
  { image: "/shabushi_logo.jpg" },
  { image: "/momo_logo.jpg" },
];

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

const Home = () => {
  const [togglePartyPopUp, setTogglePartyPopup] = useState(false);
  const [currentParty, setCurrentParty] = useState(null);

  const [parties, setParties] = useState([]);

  const handlePartyClick = (party) => {
    setCurrentParty(party);
    setTogglePartyPopup(true);
  };

  const getParties = async (userId) => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getMyPartyShabudule",
      {
        userId: userId,
      }
    );
    console.log("result", result);
    setParties(result.data);
  };

  useEffect(() => {
    getParties(1);
  }, []); //empty dependency [] as only render once

 

  const [shops, setShops] = useState([]);

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

  

  const [promotion, setPromotion] = useState();
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

  console.log("currentParty", currentParty);

  const acceptedMembersCount = (party) =>
  party?.partyMembers?.filter((member) => member.status === "accept").length;

console.log("acceptedMembersCount", acceptedMembersCount);

  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  
  return (
    <>
      <ToggleParty togglePartyPopUp={togglePartyPopUp} setTogglePartyPopup={setTogglePartyPopup} currentParty={currentParty} setCurrentParty={setCurrentParty} />
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto">
        <div className="bg-neutral-50 m-auto w-full h-full mx-2 border border-4 border-red-700 rounded-lg mt-[70px] overflow-auto">
          <div className="text-center">
            <input
              type="text"
              className="w-1/2 m-auto bg-neutral-200 rounded-lg my-2 text-center"
              placeholder="search here"
            />
          </div>
          <div className="text-red-700 text-4xl text-center m-2 font-bold">
            สร้างปาร์ตี้ชาบูกินกับเพื่อนได้แล้ววันนี้! ที่ SHABUDULE
          </div>
          <div>
            <Carousel promotion={promotion} auto={true} interval={3000} />
          </div>
          <div className="text-center text-red-700 font-bold md:text-4xl">
            กว่า 100 ร้านชาบูที่ร่วมกับเรา
          </div>
          <div className="flex p-2 justify-center">
            {restaurants?.map((restaurant) => (
              <img
                src={restaurant.image}
                alt="restaurant logos"
                className="w-16 h-16 md:w-28 md:h-28 m-2 md:m-4 rounded-lg"
              />
            ))}
          </div>
          <div className="text-center text-red-700 font-bold my-2 md:text-2xl">
            จอง/สร้าง Party ตอนนี้
          </div>
          <div className="justify-center flex">
            <div className="text-center bg-red-700 text-neutral-50 w-1/3 p-2 rounded-lg button font-bold">
              เริ่มต้นใช้งานฟรี
            </div>
          </div>
          <div className="m-2 font-bold text-red-700 text-xl md:text-2xl">
            popular party
          </div>
          <div className="flex m-2 overflow-auto">
            {parties?.map((party) => (
              <div key={party.id}>
                <div
                  className="bg-neutral-200 h-44 w-44 rounded-lg button m-2 "
                  onClick={() => handlePartyClick(party)}
                >
                  <img
                    src="/shabu.jpg"
                    alt="party"
                    className="h-1/2 w-full rounded-lg"
                  />
                  <div className="flex">
                    <div className="font-bold">
                      Mo-Mo Paradise: Central Rama 3
                    </div>
                    <div className="m-1 font-bold">
                      {" "}
                      {acceptedMembersCount(party)}/{party.partyMembers?.length}
                    </div>
                  </div>
                  <div className="text-xs font-bold m-1">
                    Date: {party.startDateTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 font-bold text-red-700 text-xl md:text-2xl">
            popular Store
          </div>
          <div className="flex overflow-x-auto overflow-y-hidden m-2">
            {shuffle(shops)?.map((shop) => (
              <div key={shop.id} className="flex">
                {shuffle(shop?.shabuShopBranchs)?.map((branch) => (
                  <div
                    key={branch.id}
                    className="bg-neutral-200 h-44 w-44 rounded-lg m-2"
                  >
                    <img
                      src={shop.shopImage}
                      alt="branch"
                      className=" w-full rounded-lg h-1/2 "
                    />
                    <div className="h-full">
                      <div className="m-1 font-bold text-center h-1/4">
                        {shop.name} {branch.branchName}
                      </div>
                      <div className="">
                        <button className="text-xs font-bold ml-1 button hover:text-red-500 active:text-red-700 h-1/3 mt-2">
                          see more details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
