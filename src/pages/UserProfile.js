import React, { useState, useContext } from "react";
import { MyParty, JoinParty, Profile, Search } from "../components";
import { BranchContext } from "../App";
import { useFetchUserProfile, useFetchShop } from "../hooks";

export const UserProfile = () => {
  const [searchToggle, setSearchToggle] = useState(false);
  const { user, token } = useContext(BranchContext);
  const {
    myParty,
    joinParty,
    setMemberId,
    setStatus,
    setPartyId,
    setConfirmDel,
  } = useFetchUserProfile({ token });
  const [search, setSearch] = useState();
  const [searchDatas, setSearchDatas] = useState([]);
  const { shops } = useFetchShop();

  // console.log("token userProfile:", token);
  // console.log("user :", user);
  // console.log("test :", myParty);

  return (
    <div className=" bg-background md:h-screen lg:h-auto w-full p-5 mt-14">
      <div className="mb-5">
        <Profile user={user} />
      </div>
      <div className="my-4 flex justify-end">
        <button
          className="bg-[#B1454A] text-white rounded-full p-3"
          onClick={() => setSearchToggle(true)}
        >
          สร้างปาร์ตี้ !
        </button>
      </div>
      <div className="space-y-5 md:flex justify-between md:space-x-5 md:space-y-0">
        <div className="md:w-6/12">
          <MyParty
            myParty={myParty}
            setMemberId={setMemberId}
            setStatus={setStatus}
            setPartyId={setPartyId}
            setConfirmDel={setConfirmDel}
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
            <div>
              <Search
                search={search}
                setSearch={setSearch}
                searchDatas={searchDatas}
                setSearchDatas={setSearchDatas}
                shops={shops}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
