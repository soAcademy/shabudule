// import { Disclosure, Transition } from "@headlessui/react";
import React, { useState } from "react";
// import { BsChevronUp } from "react-icons/bs";
import axios from "axios";

const PartyList = () => {
  const parties = [
    {
      title: <>หาเพื่อนมาช่วยหาร โปร มา 4 จ่าย 3</>,
      branch: "Mo-Mo Paradise: Central Rama 3",
      time: new Date().toLocaleString("GB"),
      amount: "3/4",
      image: "/shabu.jpg",
      info: "dafdfdfbdfbdfbdfbdfbdfrgergeggrger rgwrgergvergvre dsfgsdgsdgsgergergergergrreg",
    },
    {
      title: <>หาเพื่อนกิน MK</>,
      branch: "MK Restautant: Major Ratchayothin",
      time: new Date().toLocaleString("GB"),
      amount: "3/4",
      image: "/shabu.jpg",
      info: "dbdfbdfbdf dfbdfbdfb dfbdfbf gfbgfbgfbgf gfbgfb sdsfaefew",
    },
  ];

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
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto">
        <div className="bg-neutral-50 m-auto  w-full  mx-2 border border-4 border-red-700 rounded-lg mt-[70px] overflow-auto">
          <div className=" p-2 font-bold text-xl text-red-700">PARTY LIST</div>
          {parties?.map((party, index) => (
            <div>
              <div
                className="p-2 m-2 flex bg-red-700 pointer-cursor border border-3 font-bold text-neutral-50 rounded-lg "
                key={index}
                onClick={() => updateToggleIndex(index)}
              >
                <img
                  src={party.image}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg m-2 mt-4"
                  alt="restaurant logo"
                />
                <div className="md:flex">
                  <div className="p-2 md:text-2xl md:items-center md:flex">
                    {party.title}
                  </div>
                  <div className="md:items-center md:flex">
                    <div className="text-xs text-red-700 bg-neutral-50  rounded-full md:h-12 md:w-60 p-2 flex justify-center items-center ">
                      {party.branch}
                    </div>
                  </div>
                  <div className="md:items-center md:flex">
                  <div className="text-xs text-red-700 bg-neutral-50 text-center rounded-full mt-2 md:mt-0 md:mx-8 md:h-12 md:w-60 flex justify-center items-center ">
                    {party.time}
                  </div>
                  </div>
                </div>
                <div className="p-2 text-center bg-yellow-600 my-8 rounded-lg ml-1">
                  {party.amount}
                </div>
              </div>
              {toggles[index] && (
                <div className="z-10 transition-opacity duration-5000 ease-in-out opacity-0 opacity-100">
                  <div className="p-2 mx-2 mb-2 mt-0  bg-neutral-300 rounded-lg ">
                    <div className=" flex">
                      <img
                        src={party.image}
                        alt="restaurant logo"
                        className="w-20 h-20 rounded-lg mt-2"
                      />
                      <div
                        className="pl-2 pt-2 w-full text-xs text-justify font-bold mx-2"
                        style={{ wordWrap: "break-word" }}
                      >
                        {party.info}
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        className="button bg-red-700 hover:bg-red-900 text-neutral-50 font-bold md:w-1/3 w-3/4 p-3 mt-4 rounded-full mx-auto mb-2 md:text-base"
                        onClick={() => addPartyMember(2, 3)}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
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
