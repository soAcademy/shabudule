import React, { useState } from "react";

export const TimeAndTable = ({
  tableAndTime,
  user,
  branch,
  partyName,
  setPartyName,
  desc,
  setDesc,
  partyType,
  setPartyType,
  tableId,
  setTableId,
  time,
  setTime,
  setButtonClicked,
  fillOutToggle,
  setFillOutToggle,
  createParty,
}) => {
  // console.log("test2 :", tableAndTime);

  const [confirmToggle, setConfirmToggle] = useState(false);
  const [selectTime4Toggle, setSelectTime4Toggle] = useState(
    [...Array(tableAndTime?.length)].map(() => false)
  );
  const [selectTime2Toggle, setSelectTime2Toggle] = useState(
    [...Array(tableAndTime?.length)].map(() => false)
  );
  const [quantityTables, setQuantityTables] = useState();

  // console.log("party name :", partyName);
  // console.log("desc :", desc);
  // console.log("type :", partyType);
  console.log("tableId :", tableId);
  // console.log("Time Toggle :", selectTimeToggle);
  console.log("Time :", time);
  console.log("branch :", branch);
  console.log("user :", user);

  const table4 = tableAndTime?.filter((r) => r.seatPerDesk === 4);
  const table2 = tableAndTime?.filter((r) => r.seatPerDesk === 2);

  console.log("table4", table4);
  console.log("table2", table2);

  const openToggleTime4Table = (idx) => {
    const newToggles = [...selectTime4Toggle];
    newToggles[idx] = !newToggles[idx];
    setSelectTime4Toggle(newToggles);
  };

  const openToggleTime2Table = (idx) => {
    const newToggles = [...selectTime2Toggle];
    newToggles[idx] = !newToggles[idx];
    setSelectTime2Toggle(newToggles);
  };

  return (
    <div>
      {fillOutToggle && (
        <div className="w-full h-screen left-0 top-0 z-50 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-background p-5 w-4/5 rounded-md">
            <div className="mb-4 text-center">
              <p className="font-bold text-xl">กรุณากรอกรายละเอียด</p>
              <div className="text-left text-lg mt-5">
                <form className="space-y-2">
                  <p className="font-bold">Party Name : </p>
                  <input
                    type="text"
                    placeholder="Party name..."
                    name="party"
                    maxLength="30"
                    className="border-2 placeholder:text-slate-400 bg-white rounded-md pl-2 w-full py-2"
                    onChange={(e) => setPartyName(e.target.value)}
                  />
                  <p className="font-bold">Details : </p>
                  <textarea
                    name="description"
                    placeholder="Description..."
                    className="border-2 placeholder:text-slate-400 bg-white rounded-md pl-2 w-full py-2"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <p className="font-bold">Type : </p>
                  <div className="flex">
                    <div className="w-6/12 flex space-x-2 justify-center">
                      <input
                        type="radio"
                        name="type"
                        id="public"
                        value="public"
                        checked={partyType === "public"}
                        onChange={(e) => setPartyType(e.target.value)}
                      />
                      <label htmlFor="public">Public Party</label>
                    </div>
                    <div className="w-6/12 flex space-x-2 justify-center">
                      <input
                        type="radio"
                        name="type"
                        id="private"
                        value="private"
                        checked={partyType === "private"}
                        onChange={(e) => setPartyType(e.target.value)}
                      />
                      <label htmlFor="private">Private Party</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex justify-center space-x-6">
              <button
                className="bg-[#B1454A] text-white rounded-md p-1 mr-2 w-3/12 md:w-2/12"
                onClick={() => setFillOutToggle(false)}
              >
                Decline
              </button>
              <button
                className="bg-[#B1454A] text-white rounded-md p-1  w-3/12 md:w-2/12"
                onClick={() => {
                  setFillOutToggle(false);
                  setConfirmToggle(true);
                  createParty();
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmToggle && (
        <div className="w-full h-screen left-0 top-0 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-background p-5 w-4/5 rounded-md">
            <div className="mb-4 text-center">
              <p className="font-bold text-xl">CONFIRMATION</p>
              <div className="text-left text-lg mt-5 space-y-2">
                <p>Party Name : {partyName}</p>
                <p>Details : {desc}</p>
                <p>Type : {partyType}</p>
                <p>
                  Shabu Branch : {branch?.shabuShop.name} : {branch?.branchName}
                </p>
                <p>
                  Date&Time : {time}:00 - {time + 1}:00 จำนวน {quantityTables}{" "}
                  ที่นั่ง
                </p>
                <p>Create By : {user[0]?.name} </p>
              </div>
            </div>
            <div className="flex justify-center space-x-6">
              <button
                className="bg-[#B1454A] text-white rounded-md p-1 mr-2 w-3/12 md:w-2/12"
                onClick={() => setConfirmToggle(false)}
              >
                decline
              </button>
              <button
                className="bg-[#B1454A] text-white rounded-md p-1 mr-2 w-3/12 md:w-2/12"
                onClick={() => {
                  setConfirmToggle(false);
                  setButtonClicked(true);
                }}
              >
                accept
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-md">
        <div className="p-3">
          <p className="font-bold text-xl">AVAILABLE TIME</p>

          <div className="mt-10">
            <p>โต๊ะ 4 ที่นั่ง</p>
            {table4?.map((r, idx) => (
              <div className="grid grid-cols-1 space-y-3 mt-3">
                <div>
                  <button
                    className={`p-3 border-2 ${
                      selectTime4Toggle[idx] ? "bg-[#B1454A]" : " bg-background"
                    } rounded-md w-full`}
                    onClick={() => {
                      setTableId(r.tableId);
                      openToggleTime4Table(idx);
                      setQuantityTables(r.seatPerDesk);
                    }}
                    key={idx}
                  >
                    Table {idx + 1}
                  </button>

                  {selectTime4Toggle[idx] && (
                    <div className="-mt-1 py-2 grid grid-cols-1 space-y-2 border-2 rounded-md">
                      {r.availableSlot.map((slot, i) => (
                        <button
                          key={i}
                          className="border mx-5 py-1 shadow-sm"
                          onClick={() => {
                            setTime(slot);
                          }}
                        >
                          {slot} : 00 - {slot + 1} : 00
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="mt-5">โต๊ะ 2 ที่นั่ง</p>
            {table2?.map((r, idx) => (
              <div className="grid grid-cols-1 space-y-3 mt-3">
                <div>
                  <button
                    className={`p-3 border-2 ${
                      selectTime2Toggle[idx] ? "bg-[#B1454A]" : " bg-background"
                    } rounded-md w-full`}
                    onClick={() => {
                      setTableId(r.tableId);
                      openToggleTime2Table(idx);
                      setQuantityTables(r.seatPerDesk);
                    }}
                    key={idx}
                  >
                    Table {idx + 1}
                  </button>

                  {selectTime2Toggle[idx] && (
                    <div className="-mt-1 py-2 grid grid-cols-1 space-y-2 border-2 rounded-md">
                      {r.availableSlot.map((slot, i) => (
                        <button
                          key={i}
                          className="border mx-5 py-1 shadow-sm"
                          onClick={() => {
                            setFillOutToggle(true);
                            setTime(slot);
                          }}
                        >
                          {slot} : 00 - {slot + 1} : 00
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
