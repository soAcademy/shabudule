import React, { useState } from "react";

export const TimeAndTable = ({
  tableAndTime,
  createPartyByDate,
  selectDate,
}) => {
  const mockData = [
    {
      username: "Soma Yukihira",
      partyName: "หาเพื่อนมาช่วยหาร โปร มา 4 จ่าย 3 !!",
      description:
        "หาเพื่อนไปกิน Mo-mo สาขา พระราม 3 ขอสายเนื้อจะดีมาก โปร 599 เจอกันที่ starbucks ชั้น 1 หน้าทางเข้านะครับ",
      storeName: "Mo-mo Paradise",
      branch: "Central RAMA III",
      type: "Public",
      date: selectDate ?? createPartyByDate,
      time: "01 : 00 PM - 2:30 PM",
      table: 4,
    },
  ];

  const [confirmToggle, setConfirmToggle] = useState(false);
  const [fillOutToggle, setFillOutToggle] = useState(false);
  const [partyName, setPartyName] = useState("");
  const [desc, setDesc] = useState("");
  const [partyType, setPartyType] = useState("public");
  const [tableId, setTableId] = useState();

  // console.log("party name :", partyName);
  // console.log("desc :", desc);
  // console.log("type :", partyType);
  console.log("tableId :", tableId);

  const table4 = tableAndTime?.filter((r) => r.seatPerDesk === 4);
  const table2 = tableAndTime?.filter((r) => r.seatPerDesk === 2);
  const sortedTableAndTime = [...tableAndTime]?.sort(
    (a, b) => a.tableId - b.tableId
  );
  const tableAndTimeUniqueSlots = sortedTableAndTime.map((table) => {
    return {
      ...table,
      availableSlot: [...new Set(table.availableSlot)],
    };
  });

  console.log("test 1", sortedTableAndTime);
  console.log("test 2", tableAndTimeUniqueSlots);
  console.log("table4", table4);
  console.log("table2", table2);

  return (
    <div>
      {fillOutToggle && (
        <div className="w-full h-screen left-0 top-0 z-50 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-background p-5 w-4/5 rounded-md">
            <div className="mb-4 text-center">
              <p className="font-bold">กรอกข้อมูลสำหรับสร้าง Party!</p>
              <div className="text-left text-sm mt-5">
                <form className="space-y-2">
                  <p>ชื่อ Party : </p>
                  <input
                    type="text"
                    placeholder="party name..."
                    name="party"
                    maxlength="30"
                    className="border-2 placeholder:text-slate-400 bg-white rounded-md pl-2 w-full"
                    onChange={(e) => setPartyName(e.target.value)}
                  />
                  <p>description : </p>
                  <textarea
                    name="description"
                    placeholder="description..."
                    className="border-2 placeholder:text-slate-400 bg-white rounded-md pl-2 w-full"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <p>ประเภท : </p>
                  <div className="flex justify-between">
                    <div className="w-6/12 flex space-x-2">
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
                    <div className="w-6/12 flex space-x-2">
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
            <div className="flex justify-between ">
              <button
                className="bg-[#B1454A] text-white text-xs rounded-md p-1 mr-2"
                onClick={() => setFillOutToggle(false)}
              >
                decline
              </button>
              <button
                className="bg-[#B1454A] text-white text-xs rounded-md p-1"
                onClick={() => {
                  setFillOutToggle(false);
                  setConfirmToggle(true);
                }}
              >
                accept
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmToggle && (
        <div className="w-full h-screen left-0 top-0 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-background p-5 w-4/5 rounded-md">
            <div className="mb-4 text-center">
              <p className="font-bold">CONFIRMATION</p>
              <div className="text-left text-sm mt-5 space-y-2">
                <p>party : {partyName}</p>
                <p>description : {desc}</p>
                <p>ประเภท : {partyType}</p>
                <p>
                  ร้าน : {mockData[0]?.storeName} : {mockData[0]?.branch}
                </p>
                <p>
                  เวลา : {mockData[0]?.time} จำนวน {mockData[0]?.table} ที่นั่ง
                </p>
                <p>สร้างโดย : {mockData[0]?.username}</p>
              </div>
            </div>
            <div className="flex justify-between ">
              <button
                className="bg-[#B1454A] text-white text-xs rounded-md p-1 mr-2"
                onClick={() => setConfirmToggle(false)}
              >
                decline
              </button>
              <button
                className="bg-[#B1454A] text-white text-xs rounded-md p-1"
                onClick={() => setConfirmToggle(false)}
              >
                accept
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-md">
        <div className="p-3">
          <p>AVAILALE TIME</p>

          <div className="mt-10">
            <p>โต๊ะ 4 ที่นั่ง</p>
            {/* {table4?.map((r, idx) => (
              <div className="grid grid-cols-1 space-y-3 mt-3" key={idx}>
                {r.availableSlot.map((j, i) => (
                  <button
                    className="p-3 border-2 bg-background rounded-md"
                    onClick={() => {
                      setFillOutToggle(true);
                      setTableId(r.tableId);
                    }}
                    key={i}
                  >
                    {j} : 00 - {j + 1} : 00
                  </button>
                ))}
              </div>
            ))} */}

            {table4?.map((r, idx) => (
              <div className="grid grid-cols-1 space-y-3 mt-3" key={idx}>
                {r.availableSlot.map((j, i) => {
                  const currentItem = tableAndTimeUniqueSlots.find(
                    (item) =>
                      item.seatPerDesk === r.seatPerDesk &&
                      item.availableSlot.includes(j)
                  );
                  const previousItem =
                    tableAndTimeUniqueSlots[
                      tableAndTimeUniqueSlots.indexOf(currentItem) - 1
                    ];
                  const tableIdToDisplay =
                    previousItem &&
                    previousItem.availableSlot.join() ===
                      currentItem.availableSlot.join()
                      ? previousItem.tableId
                      : currentItem.tableId;

                  return (
                    <button
                      className="p-3 border-2 bg-background rounded-md"
                      onClick={() => {
                        setFillOutToggle(true);
                        setTableId(tableIdToDisplay);
                      }}
                      key={i}
                    >
                      {j} : 00 - {j + 1} : 00
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div>
            <p className="mt-5">โต๊ะ 2 ที่นั่ง</p>
            {table2?.map((r, idx) => (
              <div className="grid grid-cols-1 space-y-3 mt-3" key={idx}>
                {r.availableSlot.map((j, i) => (
                  <button
                    className="p-3 border-2 bg-background rounded-md"
                    onClick={() => {
                      setFillOutToggle(true);
                      setTableId(r.tableId);
                    }}
                    key={i}
                  >
                    {j} : 00 - {j + 1} : 00
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};