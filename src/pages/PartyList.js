// import { Disclosure, Transition } from "@headlessui/react";
import React, { useState, useEffect } from "react";
// import { BsChevronUp } from "react-icons/bs";
import axios from "axios";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

const PartyList = () => {
  // const mockParties = [
  //   {
  //     title: <>หาเพื่อนมาช่วยหาร โปร มา 4 จ่าย 3</>,
  //     branch: "Mo-Mo Paradise: Central Rama 3",
  //     time: new Date().toLocaleString("GB"),
  //     amount: "3/4",
  //     image: "/shabu.jpg",
  //     info: "dafdfdfbdfbdfbdfbdfbdfrgergeggrger rgwrgergvergvre dsfgsdgsdgsgergergergergrreg",
  //   },
  //   {
  //     title: <>หาเพื่อนกิน MK</>,
  //     branch: "MK Restautant: Major Ratchayothin",
  //     time: new Date().toLocaleString("GB"),
  //     amount: "3/4",
  //     image: "/shabu.jpg",
  //     info: "dbdfbdfbdf dfbdfbdfb dfbdfbf gfbgfbgfbgf gfbgfb sdsfaefew",
  //   },
  // ];

  const [parties, setParties] = useState([]);
  const [toggleConfirmationPopup, setToggleConfirmationPopup] = useState(false);
  const [currentParty, setCurrentParty] = useState(null);

  const handlePartyClick = (party) => {
    setCurrentParty(party);
    setToggleConfirmationPopup(true);
  };

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

  const acceptedMembersCount = (party) =>
    party?.partyMembers?.filter((member) => member.status === "accept").length;

  console.log("acceptedMembersCount", acceptedMembersCount);

  const [toggles, setToggles] = useState(
    [...Array(parties.length)].map(() => false)
  );
  const updateToggleIndex = (index) => {
    console.log("toggles", toggles);
    const newToggles = [...toggles];
    console.log("newToggles1", newToggles);
    //copy existing toggle
    console.log("index", index);
    newToggles[index] = !newToggles[index];
    //set toggle to opposite state: if opened:close, if closed: open
    console.log("newToggles2", newToggles);
    setToggles(newToggles);
    //update current toggle state as determined by line 71
  };

  return (
    <>
      {toggleConfirmationPopup && currentParty && (
        <Fade in={toggleConfirmationPopup}>
        <div className="w-full h-screen fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="bg-neutral-200 rounded-lg w-80 h-84 m-auto px-4 py-4 items-center">
            <div className="text-base mb-1 text-red-700 text-center font-bold flex-auto my-auto">
              Confirmation
            </div>
            <div className="text-red-700 font-bold ml-1 p-2"key={currentParty.id}>Join "{currentParty.name}"?</div>
            <form
              onSubmit={() => {
                setToggleConfirmationPopup(false);
              }}
              className="flex flex-col m-auto"
            >
              <div className="flex">
                <Button
                  type="submit"
                  className="px-4 py-2 mx-2 mt-2 mb-1 bg-red-700 w-1/2 rounded text-white "
                  onClick={() => addPartyMember(4, currentParty.id)}
                  variant="contained"
                >
                  confirm
                </Button>
                <Button
                  className="px-4 py-2 mx-2 mt-2 mb-1 bg-neutral-800 rounded text-white w-1/2 "
                  onClick={() => {
                    setCurrentParty(null);
                    setToggleConfirmationPopup(false);
                  }}
                  variant="contained"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
        </Fade>
      )}
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto">
        <div className="bg-neutral-50 m-auto  w-full  mx-2 border border-4 border-red-700 rounded-lg mt-[70px] overflow-auto">
          <div className=" p-2 font-bold text-xl text-red-700">PARTY LIST</div>
          {parties?.map((party, index) => (
            <div>
              <div
                className="p-2 m-2 flex bg-red-700 pointer-cursor border border-3 font-bold text-neutral-50 rounded-lg md:relative z-0 "
                key={index}
                onClick={() => updateToggleIndex(index)}
              >
                <img
                  src={party.table.branch.shabuShop.shopImage}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg m-2 mt-4"
                  alt="restaurant logo"
                />
                <div className="md:flex">
                  <div className="p-2 md:text-2xl md:items-center md:flex">
                    {party.name}
                  </div>
                  <div className="md:items-center md:flex ">
                    <div className="text-xs text-red-700 bg-neutral-50  rounded-full md:h-12 md:w-60 p-2 flex justify-center items-center text-center  md:mx-2 md:right-96 md:absolute ">
                    {party.table.branch.shabuShop.name} {party.table.branch.branchName}
                    </div>
                  </div>
                  <div className="md:items-center md:flex">
                    <div className="text-xs text-red-700 bg-neutral-50 text-center rounded-full mt-2 md:mt-0 md:mx-8 md:h-12 md:w-60 flex justify-center items-center md:mx-2 md:right-28 md:absolute ">
                      {party.startDateTime}
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center bg-yellow-600 md:my-8 my-9 rounded-lg ml-1 md:mx-2 md:right-10 md:absolute">
                  {acceptedMembersCount(party)}/{party.partyMembers?.length}
                </div>
              </div>
              {toggles[index] && (
                <Fade in={toggles}>
                <div className="z-10">
                  <div className="p-2 mx-2 mb-2 mt-0  bg-neutral-300 rounded-lg ">
                    <div className=" flex">
                      <img
                        src={party.table.branch.shabuShop.shopImage}
                        alt="restaurant logo"
                        className="md:block hidden md:w-28 md:h-28 rounded-lg mt-2"
                      />

                      <div className="md:w-5/6 md:ml-12">
                        <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                          <div className="w-1/3">Name:</div>
                          <div className="w-2/3">{party.name}</div>
                        </div>
                        <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                          <div className="w-1/3">detail:</div>
                          <div className="w-2/3">{party.partyDetail}</div>
                        </div>
                        <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                          <div className="w-1/3">type:</div>
                          <div className="w-2/3">{party.type}</div>
                        </div>
                        <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                          <div className="w-1/3">branch:</div>
                          <div className="w-2/3">
                            {party.table.branch.shabuShop.name}{" "}
                            {party.table.branch.branchName}
                          </div>
                        </div>
                        <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                          <div className="w-1/3">time:</div>
                          <div className="w-2/3">{party.startDateTime}</div>
                        </div>
                        <div className="flex text-red-700 font-bold ml-1 m-2 bg-neutral-50 p-2 rounded-lg">
                          <div className="w-1/3">createdBy:</div>
                          <div className="w-2/3">{party.createByUserId.name}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <Button
                        className="button bg-red-700 hover:bg-red-900 text-neutral-50 font-bold md:w-1/3 w-3/4 p-3 mt-4 rounded-full mx-auto mb-2 md:text-base"
                        onClick={() => handlePartyClick(party)}
                        variant="contained"
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
                </Fade>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PartyList;

/* <div>
            <Disclosure>
              <Disclosure.Button>
                <div className="p-2 m-2 flex bg-red-700 pointer-cursor border border-3 font-bold text-neutral-50 rounded-lg"
                key={index}
                // onClick={() => updateToggleIndex(index)}
              >
                <img
                  src={party.image}
                  className="w-16 h-16 rounded-lg m-2 mt-4"
                  alt="restaurant logo"
                />
                <div>
                  <div className="p-2">{party.title}</div>
                  <div className="text-xs text-red-700 bg-neutral-50 text-center rounded-full">
                    {party.branch}
                  </div>
                  <div className="text-xs text-red-700 bg-neutral-50 text-center rounded-full mt-2">
                    {party.time}
                  </div>
                </div>
                <div>
                  <div >
                    <BsChevronUp className="ui-open:rotate-90 ui-open:transform" />
                  </div>
                  <div className="p-2 text-center bg-yellow-600 my-8 rounded-lg ml-1">
                    {party.amount}
                  </div>
                </div>
                </div>
              </Disclosure.Button>
              {/* {toggles[index] && ( */
//         <Transition
//   enter="transition duration-100 ease-out"
//   enterFrom="transform scale-95 opacity-0"
//   enterTo="transform scale-100 opacity-100"
//   leave="transition duration-75 ease-out"
//   leaveFrom="transform scale-100 opacity-100"
//   leaveTo="transform scale-95 opacity-0"
// >
//           <Disclosure.Panel className="p-2 mx-2 mb-2 mt-0  bg-neutral-300 rounded-lg">
//             <div className=" flex">
//               <img
//                 src={party.image}
//                 alt="restaurant logo"
//                 className="w-20 h-20 rounded-lg mt-2"
//               />
//               <div
//                 className="pl-2 pt-2 w-full text-xs text-justify font-bold mx-2"
//                 style={{ wordWrap: "break-word" }}
//               >
//                 {party.info}
//               </div>
//             </div>
//             <div className="text-center">
//               <button className="button bg-red-700 hover:bg-red-900 text-neutral-50 font-bold md:w-1/3 w-3/4 p-3 mt-4 rounded-full mx-auto mb-2 md:text-base">
//                 Join
//               </button>
//             </div>
//           </Disclosure.Panel>
//           </Transition>
//         {/* )} */}
//       </Disclosure>
//       </div> */}
