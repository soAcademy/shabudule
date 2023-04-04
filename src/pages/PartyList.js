// import { Disclosure, Transition } from "@headlessui/react";
import React, { useState, useContext } from "react";
// import { BsChevronUp } from "react-icons/bs";
import axios from "axios";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFetchParties, useFetchUserProfile } from "../hooks";
import { BranchContext } from "../App";

const PartyList = () => {
  const { parties } = useFetchParties();
  const {} = useFetchUserProfile();
  const { token } = useContext(BranchContext);
  const [toggleConfirmationPopup, setToggleConfirmationPopup] = useState(false);
  const [currentParty, setCurrentParty] = useState(null);
  const navigate = useNavigate();

  const handlePartyClick = (party) => {
    setCurrentParty(party);
    setToggleConfirmationPopup(true);
  };

  const savedToken = localStorage.getItem("SavedToken");
  // console.log("savedToken", savedToken);
  const addPartyMember = async (token, partyId, savedToken) => {
    // console.log("partyId", partyId);

    const result = await axios
      .post(
        "https://shabudule-webapp-api.vercel.app/function/addPartyMemberAuthShabudule",
        {
          idToken: token ?? savedToken,
          partyId: partyId,
        }
      )
      .catch((error) =>
        console.log("Error adding party member:", error.message)
      );

    // console.log("result:", result);
  };

  const joinParty = () => {
    if (savedToken ?? token) {
      addPartyMember(savedToken, currentParty.id);
    } else {
      navigate("/shabu/register");
    }
  };

  const acceptedMembersCount = (party) =>
    party?.partyMembers?.filter((member) => member.status === "accept").length;

  // console.log("acceptedMembersCount", acceptedMembersCount);

  const [toggles, setToggles] = useState(
    [...Array(parties.length)].map(() => false)
  );
  const updateToggleIndex = (index) => {
    // console.log("toggles", toggles);
    const newToggles = [...toggles];
    // console.log("newToggles1", newToggles);
    //copy existing toggle
    // console.log("index", index);
    newToggles[index] = !newToggles[index];
    //set toggle to opposite state: if opened:close, if closed: open
    // console.log("newToggles2", newToggles);
    setToggles(newToggles);
    //update current toggle state as determined by line 71
  };

  return (
    <>
      {toggleConfirmationPopup && currentParty && (
        <Fade in={toggleConfirmationPopup}>
          <div className="w-full h-screen fixed flex bg-gray-500/30 backdrop-blur-sm z-50">
            <div className="bg-neutral-200 rounded-lg w-80 h-84 m-auto px-4 py-4 items-center">
              <div className="text-base mb-1 text-[#B1454A] text-center font-bold flex-auto my-auto">
                Confirmation
              </div>
              <div
                className="text-[#B1454A] font-bold ml-1 p-2"
                key={currentParty.id}
              >
                Join "{currentParty.name}"?
              </div>
              <form
                onSubmit={() => {
                  setToggleConfirmationPopup(false);
                }}
                className="flex flex-col m-auto"
              >
                <div className="flex">
                  <Button
                    type="submit"
                    className="px-4 py-2 mx-2 mt-2 mb-1 bg-[#B1454A] w-1/2 rounded text-white "
                    onClick={joinParty}
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
        <div className="bg-[#F5F5F5] m-auto  w-full  mx-2  border-4 border-[#B1454A] rounded-lg mt-20 overflow-auto">
          <div className=" p-2 font-bold text-xl text-[#B1454A]">
            ONGOING PARTIES
          </div>
          {parties?.map((party, index) => (
            <div className="cursor-pointer">
              <div
                className="m-2 py-2 px-2 flex bg-[#B1454A] pointer-cursor border border-3 font-bold text-[#F5F5F5] rounded-lg md:relative z-0 justify-between md:justify-evenly"
                key={index}
                onClick={() => updateToggleIndex(index)}
              >
                <img
                  src={party.table.branch.shabuShop.shopImage}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg my-auto ml-2"
                  alt="restaurant logo"
                />
                <div className="md:flex md:w-4/5">
                  <div className="pb-1 text-center md:w-1/3 md:my-auto md:text-xl">
                    {party.name}
                  </div>
                  <div className="text-xs text-[#B1454A] bg-[#F5F5F5] rounded mx-2 p-2 flex justify-center items-center text-center md:w-1/3 md:text-lg">
                    {party.table.branch.shabuShop.name}{" "}
                    {party.table.branch.branchName}
                  </div>
                  <div className="p-2 text-xs text-white text-center rounded flex justify-center items-center md:w-1/3 md:text-lg">
                    Party Start : {party.startDateTime.slice(9, 10)}/
                    {party.startDateTime.slice(6, 7)}/
                    {party.startDateTime.slice(2, 4)},{" "}
                    {party.startDateTime.slice(11, 16)}
                  </div>
                </div>
                <div className="p-2 text-center bg-yellow-600 mx-2 h-1/3 w-10 my-auto rounded-md">
                  {acceptedMembersCount(party)}/{party.table.seatPerDesk}
                </div>
              </div>
              {toggles[index] && (
                <Fade in={toggles}>
                  <div className="z-10">
                    <div className="p-2 m-2 bg-neutral-300 rounded-lg">
                      <div className="flex">
                        <img
                          src={party.table.branch.shabuShop.shopImage}
                          alt="restaurant logo"
                          className="md:block hidden md:w-28 md:h-28 rounded-lg mx-auto my-auto"
                        />
                        <div className="md:w-5/6 md:ml-6 bg-[#F5F5F5] font-bold text-[#B1454A] p-2 w-full">
                          <div className="flex">
                            <div className="w-1/3">Party Name :</div>
                            <div className="w-2/3">{party.name}</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3">Detail :</div>
                            <div className="w-2/3">{party.partyDetail}</div>
                          </div>

                          <div className="flex">
                            <div className="w-1/3">Shabu Branch :</div>
                            <div className="w-2/3">
                              {party.table.branch.shabuShop.name}{" "}
                              {party.table.branch.branchName}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3">Date&Time:</div>
                            <div className="w-2/3">
                              {party.startDateTime.slice(9, 10)}/
                              {party.startDateTime.slice(6, 7)}/
                              {party.startDateTime.slice(2, 4)},{" "}
                              {party.startDateTime.slice(11, 16)}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3">Created By :</div>
                            <div className="w-2/3">
                              {party.createByUserFirebaseEmail.user.name}
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="text-center">
                              <Button
                                className="button bg-[#B1454A] hover:bg-[#c95f64] text-[#F5F5F5] font-bold w-32 p-2 rounded-full mx-auto"
                                onClick={() => handlePartyClick(party)}
                                variant="contained"
                              >
                                Join
                              </Button>
                            </div>
                          </div>
                        </div>
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
                <div className="p-2 m-2 flex bg-[#B1454A] pointer-cursor border border-3 font-bold text-[#F5F5F5] rounded-lg"
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
                  <div className="text-xs text-[#B1454A] bg-[#F5F5F5] text-center rounded-full">
                    {party.branch}
                  </div>
                  <div className="text-xs text-[#B1454A] bg-[#F5F5F5] text-center rounded-full mt-2">
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
//               <button className="button bg-[#B1454A] hover:bg-[#c95f64]  text-[#F5F5F5] font-bold md:w-1/3 w-3/4 p-3 mt-4 rounded-full mx-auto mb-2 md:text-base">
//                 Join
//               </button>
//             </div>
//           </Disclosure.Panel>
//           </Transition>
//         {/* )} */}
//       </Disclosure>
//       </div> */}
