import React from "react";

export const JoinParty = () => {
  return (
    <div>
      <div className="flex w-full justify-between">
        <div className="bg-white rounded-md w-full">
          <h1 className="text-center text-2xl font-semibold py-5">
            Join Party
          </h1>
          <div className="flex justify-center p-5">
            <div className="bg-[#F5F5F5] w-full flex rounded-md">
              <div className="w-8/12 m-5">
                <p className=" font-semibold text-xl">หาเพื่อน กิน Mk</p>
                <p className=" font-semibold text-lg">MK : Siam Paragon</p>
                <p className="font-semibold text-md">
                  Start at Mon 13 Mar 20.00 Member: 2/2
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
