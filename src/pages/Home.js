import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "../components/Carousel";

const restaurants = [
  { image: "/momo_logo.jpg" },
  { image: "/mk_logo.jpg" },
  { image: "/shabushi_logo.jpg" },
  { image: "/momo_logo.jpg" },
];

const parties = [
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
    partyName: "Hello",
    detail: "dfvbdfbdfbdfvdfdf",
    type: "public",
    createdBy: "Teak",
  },
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
    partyName: "Hi World",
    detail: "dfvbdfbdfbdfvdfdf",
    type: "public",
    createdBy: "Teak",
  },
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
    partyName: "hihi",
    detail: "dfvbdfbdfbdfvdfdf",
    type: "public",
    createdBy: "Teak",
  },
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
    partyName: "good morning",
    detail: "dfvbdfbdfbdfvdfdf",
    type: "public",
    createdBy: "Teak",
  },
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
    partyName: "good afternoon",
    detail: "dfvbdfbdfbdfvdfdf",
    type: "public",
    createdBy: "Teak",
  },
];

const Home = () => {
  const [togglePartyPopUp, setTogglePartyPopup] = useState(false);
  const [currentParty, setCurrentParty] = useState(null);
  const handlePartyClick = (party) => {
    setCurrentParty(party);
    setTogglePartyPopup(true);
  };

  const addPartyMember = async (userId, partyId) => {
    console.log("userId", userId);
    console.log("partyId", partyId);
    const result = await axios
      .post(
        "https://shabudule-api.vercel.app/function/addPartyMemberShabudule",
        {
          userId: userId,
          partyId: partyId,
        }
      )
      .catch((error) => console.log(error));
    console.log("result.data:", result.data);
  };

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
  return (
    <>
      {togglePartyPopUp && currentParty && (
        <div className="w-full h-screen fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="bg-neutral-200 rounded-lg w-80 h-84 m-auto px-4 py-4 items-center">
            <div className="text-base mb-1 text-red-700 text-center font-bold flex-auto my-auto">
              Confirmation
            </div>

            <div>
              <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                <div className="w-1/3">ชื่อ:</div>
                <div className="w-2/3">{currentParty.partyName}</div>
              </div>
              <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                <div className="w-1/3">detail:</div>
                <div className="w-2/3">{currentParty.detail}</div>
              </div>
              <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                <div className="w-1/3">type:</div>
                <div className="w-2/3">{currentParty.type}</div>
              </div>
              <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                <div className="w-1/3">branch:</div>
                <div className="w-2/3">{currentParty.branch}</div>
              </div>
              <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                <div className="w-1/3">time:</div>
                <div className="w-2/3">{currentParty.time}</div>
              </div>
              <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                <div className="w-1/3">createdBy:</div>
                <div className="w-2/3">{currentParty.createdBy}</div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                setTogglePartyPopup(false);
              }}
              className="flex flex-col m-auto"
            >
              <div className="flex">
                <button
                  type="submit"
                  className="px-4 py-2 mx-2 mt-2 mb-1 bg-red-700 w-1/2 rounded text-white "
                  onClick={() => addPartyMember(4, 5)}
                >
                  Join
                </button>
                <button
                  className="px-4 py-2 mx-2 mt-2 mb-1 bg-neutral-800 rounded text-white w-1/2 "
                  onClick={() => {
                    setCurrentParty(null);
                    setTogglePartyPopup(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
                    src={party.image}
                    alt="party"
                    className="h-1/2 w-full rounded-lg"
                  />
                  <div className="flex">
                    <div className="m-1 font-bold">{party.branch}</div>
                    <div className="m-1 font-bold">3/4</div>
                  </div>
                  <div className="text-xs font-bold m-1">
                    Date: {party.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 font-bold text-red-700 text-xl md:text-2xl">
            popular Store
          </div>
          <div className="flex m-2 overflow-auto">
            {parties?.map((party) => (
              <div>
                <div className="bg-neutral-200 h-44 w-44 rounded-lg m-2 ">
                  <img
                    src={party.image}
                    alt="party"
                    className="h-1/2 w-full rounded-lg"
                  />
                  <div className="m-1 font-bold">{party.branch}</div>
                  <button className="text-xs font-bold m-1 button hover:text-red-500 active:text-red-700">
                    see more details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
