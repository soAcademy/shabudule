import React from "react";
import { MyParty, JoinParty, Profile } from "../components";

export const UserProfile = () => {
  return (
    <div className=" bg-[#F5F5F5] w-full px-5 pt-5">
      <div className="mb-5">
        <Profile />
      </div>
      <div className="space-y-5 md:flex justify-between md:space-x-5 md:space-y-0">
        <div className="md:w-6/12">
          <MyParty />
        </div>
        <div className="md:w-6/12">
          <JoinParty />
        </div>
      </div>
    </div>
  );
};
