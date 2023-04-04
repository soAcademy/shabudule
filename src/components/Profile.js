import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Profile = ({ user }) => {
  return (
    <div>
      <div className="bg-white flex w-full p-2 rounded-md border-4 border-primary">
        <div className="mx-8 md:w-2/12">
          <img
            src={user[0]?.profileImage}
            alt="picProfile"
            className="w-[75px] h-[75px] rounded-full"
          />
        </div>
        <div className="pt-2 flex flex-col mx-auto md:w-10/12">
          <p className="text-2xl font-semibold">{user[0]?.name}</p>
          <Link to="/shabu/edituserprofile">
            <div className="flex space-x-2 text-sm mt-2">
              <div className="font-bold text-xl">
                <AiFillEdit />
              </div>
              <p className="md:text-sm hover:text-base">Edit Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
