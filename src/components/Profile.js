import React  from "react";

export const Profile = ({ user }) => {
  return (
    <div>
      <div className="bg-white flex w-full p-2 rounded-md">
        <div>
          <img
            src={user[0]?.profileImage}
            alt="picProfile"
            className="w-[75px] h-[75px] rounded-full"
          />
        </div>
        <div className="pl-5 pt-2 flex flex-col">
          <p className="text-2xl font-semibold">{user[0]?.name}</p>
          <div className="flex justify-between space-x-2 text-sm mt-2">
            <p>EditProfile</p>
            <p>History</p>
          </div>
        </div>
      </div>
    </div>
  );
};
