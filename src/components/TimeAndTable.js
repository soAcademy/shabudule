import React, { useState } from "react";

export const TimeAndTable = ({ selectDate }) => {
  const mockData = [
    {
      username: "Soma Yukihira",
      partyName: "หาเพื่อนมาช่วยหาร โปร มา 4 จ่าย 3 !!",
      description:
        "หาเพื่อนไปกิน Mo-mo สาขา พระราม 3 ขอสายเนื้อจะดีมาก โปร 599 เจอกันที่ starbucks ชั้น 1 หน้าทางเข้านะครับ",
      storeName: "Mo-mo Paradise",
      branch: "Central RAMA III",
      type: "Public",
      date: selectDate,
      time: "01 : 00 PM - 2:30 PM",
      table: 4,
    },
  ];
  
  const [confirmToggle, setConfirmToggle] = useState(false);

  return (
    <div>
      {confirmToggle && (
        <div className="w-full h-screen left-0 top-0 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-background p-5 w-4/5 rounded-md">
            <div className="mb-4 text-center">
              <p className="font-bold">CONFIRMATION</p>
              <div className="text-left text-sm mt-5 space-y-2">
                <p>party : {mockData[0]?.partyName}</p>
                <p>description : {mockData[0]?.description}</p>
                <p>ประเภท : {mockData[0]?.type}</p>
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
            <div className="flex flex-col space-y-3 mt-3 bg-background rounded-md">
              <button className="p-3" onClick={() => setConfirmToggle(true)}>
                01 : 00 PM - 2:30 PM
              </button>
            </div>
          </div>
          <div>
            <p className="mt-5">โต๊ะ 2 ที่นั่ง</p>
            <div className="flex  flex-col  space-y-3 mt-3 bg-background rounded-md">
              <button className="p-3" onClick={() => setConfirmToggle(true)}>
                01 : 00 PM - 2:30 PM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
