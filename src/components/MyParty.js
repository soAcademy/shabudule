import React from "react";

export const MyParty = () => {
  return (
    <div>
      <div className="flex w-full justify-between">
        <div className="bg-white rounded-md w-full">
          <h1 className="text-center text-2xl font-semibold py-5">My Party</h1>
          <div className="flex justify-center p-5">
            <div className="bg-[#F5F5F5] w-full flex rounded-md">
              <div className="w-8/12 m-5">
                <p className=" font-semibold text-xl">
                  หาเพื่อนมาช่วยหาร โปร มา 4 จ่าย 3 !!!!!!!!!
                </p>
                <p className=" font-semibold text-lg">
                  Momo Paradise : Central World
                </p>
                <p className="font-semibold text-md">
                  Start at Mon 13 Mar 14.00 Member: 2/4
                </p>
              </div>
              <div className="w-4/12 flex items-stretch justify-end p-5">
                <button className="bg-white p-2 rounded-md self-end hover:text-white hover:bg-[#B1454A]">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
