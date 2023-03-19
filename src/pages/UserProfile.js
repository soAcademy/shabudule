import React from "react";
import { MyParty, JoinParty } from "../components";

export const UserProfile = () => {
  return (
    <div className=" bg-[#F5F5F5] w-full h-screen p-10">
      <div className="flex w-full space-x-5">
        <div className="w-6/12">
          <MyParty />
        </div>
        <div className="w-6/12">
          <JoinParty />
        </div>
      </div>
    </div>
  );
};
