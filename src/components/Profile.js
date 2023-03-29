import React, { useState } from "react";

export const Profile = () => {
  const [searchToggle, setSearchToggle] = useState(false);

  return (
    <div>
      <div className="bg-white flex w-full p-2 rounded-md">
        <div>
          <img
            src="https://images.unsplash.com/photo-1584043720379-b56cd9199c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="picProfile"
            className="w-[75px] h-[75px] rounded-full"
          />
        </div>
        <div className="pl-5 pt-2 flex flex-col">
          <p className="text-2xl font-semibold">Username</p>
          <div className="flex justify-between space-x-2 text-sm mt-2">
            <p>EditProfile</p>
            <p>History</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button
          className="bg-[#B1454A] text-white rounded-md p-1"
          onClick={() => setSearchToggle(true)}
        >
          สร้างปาร์ตี้ !
        </button>
      </div>

      {searchToggle && (
        <div className="w-full h-screen left-0 top-0 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-[#F4F4F4] p-5 w-4/5 rounded-md">
            <div className="mb-4 flex justify-between">
              <p className="font-bold">Search Store</p>
              <button
                className="cursor-pointer hover:font-bold"
                onClick={() => setSearchToggle(false)}
              >
                Close
              </button>
            </div>
            <input className="w-full rounded-md p-1" />
          </div>
        </div>
      )}
    </div>
  );
};
