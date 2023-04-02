import React, { useState, useContext } from "react";
import { MyParty, JoinParty, Profile } from "../components";
import { BranchContext } from "../App";
import { useFetchUserProfile } from "../hooks";
import { Link } from "react-router-dom";

export const UserProfile = () => {
  const [searchToggle, setSearchToggle] = useState(false);
  const { user, token } = useContext(BranchContext);
  const { myParty, joinParty, setMemberId, setStatus, setPartyId } =
    useFetchUserProfile({ token });

  console.log("token userProfile:", token);
  console.log("user :", user);

  return (
    <div className=" bg-[#F5F5F5] w-full p-5 mt-14">
      <div className="mb-5">
        <Profile user={user} />
      </div>
      <div className="my-5 flex justify-end">
        <button
          className="bg-[#B1454A] text-white rounded-md p-1"
          onClick={() => setSearchToggle(true)}
        >
          <Link to="/shabu/store"> สร้างปาร์ตี้ !</Link>
        </button>
      </div>
      <div className="space-y-5 md:flex justify-between md:space-x-5 md:space-y-0">
        <div className="md:w-6/12">
          <MyParty
            myParty={myParty}
            setMemberId={setMemberId}
            setStatus={setStatus}
            setPartyId={setPartyId}
          />
        </div>
        <div className="md:w-6/12">
          <JoinParty joinParty={joinParty} user={user} />
        </div>
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

export default UserProfile;
