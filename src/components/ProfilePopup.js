import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";

const ProfilePopup = (props) => {
  const { toggleProfilePopup } = props;

  return (
    <>
      {toggleProfilePopup && (
        <div className="absolute md:right-1 mt-12 w-full bg-white rounded-lg md:w-40 shadow-lg py-2 z-10">
          <button className="text-base font-bold text-neutral-800 hover:bg-red-700 button w-full hover:text-neutral-50 active:bg-red-900 px-4 py-2 flex items-center justify-center">
            <div className="mr-2 font-bold text-xl">
              <CgProfile />
            </div>
            <div>Edit Profile</div>
          </button>
          <button className="text-base font-bold text-neutral-800 hover:bg-red-700 button w-full hover:text-neutral-50 active:bg-red-900 py-2 flex items-center justify-center">
            <div className="mr-2 font-bold  text-xl">
              <MdOutlineLogout />
            </div>
            <div>Log Out</div>
          </button>
        </div>
      )}
    </>
  );
};

export default ProfilePopup;