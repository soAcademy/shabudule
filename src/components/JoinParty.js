import React, { useState } from "react";

export const JoinParty = () => {
  const mockData2 = [
    {
      partyName: "หาเพื่อนมาช่วยหาร โปร มา 4 จ่าย 3 !!",
      location: "Mo-mo Paradise : Central World",
      date: new Date().toLocaleString(),
      member: "3/4",
      image:
        "https://images.unsplash.com/photo-1585417791023-a5a6164b2646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=814&q=80",
      description:
        "หาเพื่อนไปกิน Mo-mo สาขา พระราม 3 ขอสายเนื้อจะดีมาก โปร 599 เจอกันที่ starbucks ชั้น 1 หน้าทางเข้านะครับ",
    },
    {
      partyName: "หาเพื่อน กิน Mk",
      location: "MK Restaurant : เอกมัย",
      date: new Date().toLocaleString(),
      member: "2/2",
      image:
        "https://www.mkrestaurant.com/public/assets/img/general/pic-menu.png?v=1564672144",
      description:
        "หาเพื่อนไปกิน Mo-mo สาขา พระราม 3 ขอสายเนื้อจะดีมาก โปร 599 เจอกันที่ starbucks ชั้น 1 หน้าทางเข้านะครับ",
    },
    {
      partyName: "ไม่อยากกิน บุฟเฟ่คนเดียว TT",
      location: "Mo-mo Paradise : Central RAMA III",
      date: new Date().toLocaleString(),
      member: "2/4",
      image:
        "https://images.unsplash.com/photo-1625540002162-00320b5c6b63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=802&q=80",
      description:
        "หาเพื่อนไปกิน Mo-mo สาขา พระราม 3 ขอสายเนื้อจะดีมาก โปร 599 เจอกันที่ starbucks ชั้น 1 หน้าทางเข้านะครับ",
    },
    {
      partyName: "หาเพื่อน กิน Mk",
      location: "MK Restaurant : เอกมัย",
      date: new Date().toLocaleString(),
      member: "2/2",
      image:
        "https://www.mkrestaurant.com/public/assets/img/general/pic-menu.png?v=1564672144",
      description:
        "หาเพื่อนไปกิน Mo-mo สาขา พระราม 3 ขอสายเนื้อจะดีมาก โปร 599 เจอกันที่ starbucks ชั้น 1 หน้าทางเข้านะครับ",
    },
    {
      partyName: "ไม่อยากกิน บุฟเฟ่คนเดียว TT",
      location: "Mo-mo Paradise : Central RAMA III",
      date: new Date().toLocaleString(),
      member: "2/4",
      image:
        "https://images.unsplash.com/photo-1625540002162-00320b5c6b63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=802&q=80",
      description:
        "หาเพื่อนไปกิน Mo-mo สาขา พระราม 3 ขอสายเนื้อจะดีมาก โปร 599 เจอกันที่ starbucks ชั้น 1 หน้าทางเข้านะครับ",
    },
  ];

  const [partyToggle, setPartyToggle] = useState(
    [...Array(mockData2.length)].map(() => false)
  );
  const [delToggle, setDelToggle] = useState(false);
  const [memToggle, setMemToggle] = useState(false);

  const openToggleParty = (idx) => {
    const newToggles = [...partyToggle];
    newToggles[idx] = !newToggles[idx];
    setPartyToggle(newToggles);
  };

  return (
    <div>
      {delToggle && (
        <div className="w-full h-screen left-0 top-0 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-white p-5 w-4/5 rounded-md">
            <div className="mb-4 flex justify-between">
              <p className="font-bold flex-auto">Delete Party</p>
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

      {memToggle && (
        <div className="w-full h-screen left-0 top-0 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-[#F4F4F4] p-5 w-4/5 rounded-md">
            <div className="mb-4 flex justify-between">
              <p className="font-bold">Member</p>
              <button
                className="cursor-pointer"
                onClick={() => setMemToggle(false)}
              >
                Close
              </button>
            </div>
            <div className="bg-white rounded-md p-3 mb-5">
              <p className="pl-2">username 1</p>
            </div>
            <div>
              <p className="font-bold mb-4">Pending member</p>
            </div>
            <div className="flex bg-white rounded-md p-3 mb-5">
              <div className="w-7/12">
                <p className="pl-2">username 4</p>
              </div>
              <div className="flex w-5/12 justify-end">
                <button
                  className="bg-[#B1454A] text-white text-xs rounded-md p-1 mr-2"
                  onClick={() => setMemToggle(false)}
                >
                  accept
                </button>
                <button
                  className="bg-[#B1454A] text-white text-xs rounded-md p-1"
                  onClick={() => setMemToggle(false)}
                >
                  decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-md w-full pb-2">
        <h1 className="text-center text-lg font-semibold py-5">Join Party</h1>
        <div className="bg-white rounded-md w-full px-2 pb-2 overflow-y-auto h-80">
          {mockData2.map((r, idx) => (
            <div>
              <div
                className={`flex w-full ${
                  partyToggle[idx] ? "bg-[#B1454A]" : "bg-[#F4F4F4]"
                } rounded-md p-2 mb-2 space-x-1 cursor-pointer`}
                onClick={() => openToggleParty(idx)}
              >
                <div className="flex w-3/12 items-center justify-center">
                  <img
                    src={r.image}
                    alt="picParty"
                    className="w-[70px] h-[70px] rounded-md"
                  />
                </div>
                <div className="flex flex-col w-8/12 space-y-1">
                  <p className="font-semibold">{r.partyName}</p>
                  <div className="bg-white rounded-md font-medium pl-2 text-xs">
                    {r.location}
                  </div>
                  <div className="bg-white rounded-md font-medium pl-2 text-xs">
                    {r.date}
                  </div>
                </div>
                <div className="flex w-1/12 items-center justify-center ">
                  <p className="font-bold">{r.member}</p>
                </div>
              </div>
              {partyToggle[idx] && (
                <div className="flex w-full -mt-2 rounded-b-md p-2 border-b-2 border-x-2 mb-2">
                  <div className="w-9/12">
                    <p className="indent-5 text-sm">{r.description}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-3/12 space-y-3">
                    <button
                      className="bg-[#B1454A] text-white text-xs rounded-md p-1"
                      onClick={() => setDelToggle(true)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-[#B1454A] text-white text-xs rounded-md p-1"
                      onClick={() => setMemToggle(true)}
                    >
                      Members
                    </button>
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
