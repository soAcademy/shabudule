import React, { useState } from "react";
import { FaCrown } from "react-icons/fa";

export const MyParty = ({ myParty, setStatus, setMemberId, setPartyId }) => {
  const [partyToggle, setPartyToggle] = useState(
    [...Array(myParty?.length)].map(() => false)
  );
  const [delToggle, setDelToggle] = useState(false);
  const [memToggle, setMemToggle] = useState(
    [...Array(myParty?.map((r) => r.partyMembers)?.length)].map(() => false)
  );

  console.log("array :", myParty?.map((r) => r.partyMembers)?.length);
  console.log("party map false", partyToggle);
  console.log("memTog map false", memToggle);

  const openToggleParty = (idx) => {
    const newToggles = [...partyToggle];
    newToggles[idx] = !newToggles[idx];
    setPartyToggle(newToggles);
  };

  const memberToggleByParty = async (id) => {
    const newToggle = [...memToggle];
    newToggle[id] = !newToggle[id];
    setMemToggle(newToggle);
  };

  return (
    <div>
      {delToggle && (
        <div className="w-full h-screen left-0 top-0 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-[#F4F4F4] p-5 w-4/5 rounded-md">
            <div className="mb-4 flex justify-between">
              <p className="font-bold">Delete Party</p>
              <button
                className="cursor-pointer"
                onClick={() => setDelToggle(false)}
              >
                Close
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setDelToggle(false);
                }}
                className="px-4 py-2 bg-[#B1454A] active:bg-[#c95f64] rounded-md w-full font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-md w-full pb-2">
        <h1 className="text-center text-lg font-semibold py-5">My Party</h1>
        <div className="bg-white rounded-md w-full px-2 pb-2 overflow-y-auto h-80">
          {myParty?.map((r, idx) => (
            <div>
              <div
                className={`flex w-full ${
                  partyToggle[idx] ? "bg-[#B1454A]" : "bg-[#F4F4F4]"
                } rounded-md p-2 mb-2 space-x-1 cursor-pointer`}
                onClick={() => {
                  openToggleParty(idx);
                }}
                key={idx}
              >
                <div className="flex w-3/12 items-center justify-center">
                  <img
                    src={r.table.branch.shabuShop.shopImage}
                    alt="picParty"
                    className="w-[70px] h-[70px] rounded-md"
                  />
                </div>
                <div className="flex flex-col w-8/12 space-y-1">
                  <p className="font-semibold">{r.name}</p>
                  <div className="bg-white rounded-md font-medium pl-2 text-xs">
                    {r.table.branch.shabuShop.name} :{" "}
                    {r.table.branch.branchName}
                  </div>
                  <div className="bg-white rounded-md font-medium pl-2 text-xs">
                    {r.startDateTime.slice(0, 10)},{" "}
                    {r.startDateTime.slice(11, 16)} -{" "}
                    {r.endDateTime.slice(11, 16)}
                  </div>
                </div>

                {r.isFull === false ? (
                  <div className="flex w-1/12 items-center justify-center">
                    <p className="font-bold">
                      {
                        r.partyMembers.filter((r) => r.status === "accept")
                          .length
                      }
                      /{r.table.seatPerDesk}
                    </p>
                  </div>
                ) : (
                  r.isFull === true && (
                    <div className="flex w-1/12 items-center justify-center">
                      <p className="font-bold">Full</p>
                    </div>
                  )
                )}
              </div>

              {partyToggle[idx] && (
                <div className="flex w-full -mt-2 rounded-b-md p-2 border-b-2 border-x-2 mb-2">
                  <div className="w-9/12">
                    <p className="indent-5 text-sm">{r.partyDetail}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-3/12 space-y-3">
                    <button
                      className="bg-[#B1454A] text-white text-xs rounded-md p-1"
                      onClick={() => setDelToggle(true)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-[#B1454A] text-white text-xs rounded-md p-1"
                      key={idx}
                      onClick={() => memberToggleByParty(r.id)}
                    >
                      Members
                    </button>
                  </div>
                </div>
              )}

              {memToggle[r.id] && (
                <div className="w-full h-screen left-0 top-0 fixed flex bg-gray-500/30 backdrop-blur-sm">
                  <div className="flex flex-col m-auto bg-[#F4F4F4] p-5 w-4/5 rounded-md">
                    <div className="mb-4 flex justify-between">
                      <p className="font-bold">Member</p>
                      <button
                        className="cursor-pointer"
                        onClick={() => memberToggleByParty(r.id)}
                      >
                        Close
                      </button>
                    </div>

                    <div>
                      {r.partyMembers
                        .filter((k) => k.status === "accept")
                        .map((j, idx) => (
                          <div
                            className="flex bg-white rounded-md p-3 mb-5"
                            key={idx}
                          >
                            <div className="w-7/12">
                              <p key={idx}>{j.userFirebase.user.name}</p>
                            </div>
                            <div className="flex w-5/12 justify-end">
                              {r.createByUserFirebaseEmail.email ===
                                j.userFirebaseEmail && (
                                <div>
                                  <p className=" text-primary font-semibold">
                                    <FaCrown />
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    {r.isFull === false && (
                      <div>
                        <div>
                          <p className="font-bold mb-4">Pending member</p>
                        </div>

                        <div>
                          {r.partyMembers
                            .filter((k) => k.status === "request")
                            .map((j, idx) => (
                              <div className="flex bg-white rounded-md p-3 mb-5">
                                <div className="w-7/12">
                                  <p key={idx}>{j.userFirebase.user.name}</p>
                                </div>
                                <div className="flex w-5/12 justify-end">
                                  <button
                                    className="bg-[#B1454A] text-white text-xs rounded-md p-1 mr-2"
                                    onClick={() => {
                                      setMemberId(j.id);
                                      setStatus("accept");
                                      memberToggleByParty(idx);
                                      setPartyId(r.id);
                                    }}
                                  >
                                    accept
                                  </button>
                                  <button
                                    className="bg-[#B1454A] text-white text-xs rounded-md p-1"
                                    onClick={() => {
                                      memberToggleByParty(idx);
                                      setMemberId(j.id);
                                      setStatus("decline");
                                    }}
                                  >
                                    decline
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
