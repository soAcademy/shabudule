import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Profile = ({ user }) => {
  return (
    <div>
      <div className="bg-white flex w-full p-2 rounded-md">
        <div className="mx-8">
          <img
            src={user[0]?.profileImage}
            alt="picProfile"
            className="w-[75px] h-[75px] rounded-full"
          />
        </div>
        <div className="pl-5 pt-2 flex flex-col mx-auto">
          <p className="text-2xl font-semibold">{user[0]?.name}</p>
          <Link to="/shabu/edituserprofile">
            <div className="flex justify-between space-x-2 text-sm mt-2">
              <div className="font-bold text-xl">
                <AiFillEdit />
              </div>
              <p>Edit Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
