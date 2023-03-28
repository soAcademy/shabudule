import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineFoodBank } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
// import { AiOutlineBell } from "react-icons/ai";
import { HiBell } from "react-icons/hi";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { LoggedInNavBarContext } from "../App";
// import ProfilePopup from "../components/ProfilePopup";

const NavBarLoggedIn = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleProfilePopup, setToggleProfilePopup] = useState(false);
  const [toggleBellPopup, setToggleBellPopup] = useState(false);
  const { setLoggedIn } = useContext(LoggedInNavBarContext);
  const routes = [
    { name: "Home", url: "shabu/home" },
    { name: "Store", url: "shabu/store" },
    { name: "Group List", url: "shabu/party" },
  ];
  return (
    <>
      {toggleProfilePopup && (
        <Fade in={toggleProfilePopup}>
          <div className="absolute md:right-7 mt-14 w-full bg-white rounded-lg md:w-40 shadow-lg py-2 z-10">
            <Button className="text-base font-bold text-neutral-800 hover:bg-red-700 button w-full hover:text-neutral-50 active:bg-red-900 px-4 py-2 flex items-center justify-center">
              <div className="mr-2 md:w-1/4 font-bold text-xl">
                <CgProfile />
              </div>
              <div className="md:w-3/4">Edit Profile</div>
            </Button>
            <Link to="/shabu/Home">
              <Button
                className="text-base font-bold text-neutral-800 hover:bg-red-700 button w-full hover:text-neutral-50 active:bg-red-900 py-2 flex items-center justify-center"
                onClick={() => setLoggedIn(false)}
              >
                <div className=" md:ml-3 md:w-1/4 font-bold  text-xl">
                  <MdOutlineLogout />
                </div>
                <div className="md:w-3/4">Log Out</div>
              </Button>
            </Link>
          </div>
        </Fade>
      )}
      {toggleBellPopup && (
        <div className="absolute md:right-28 right-2 mt-12 bg-white rounded-lg w-48 shadow-lg py-2 z-10">
          <button className="text-sm  text-neutral-800 hover:bg-red-700 button w-full hover:text-neutral-50 px-4 py-2">
            <div className="flex">
              <div className="mt-1">
                <HiBell />
              </div>
              <div className="text-justify ml-2">
                :โต๊ะที่คุณจองไว้ที่ MK Restaurant มีจำนวณสมาชิกครบแล้ว
              </div>
            </div>
          </button>
          <button className="text-sm  text-neutral-800 hover:bg-red-700 button w-full hover:text-neutral-50 px-4 py-2">
            <div className="flex">
              <div className="mt-1">
                <HiBell />
              </div>
              <div className="text-justify ml-2">
                :อีกหนึ่งชั่วโมงจะถึงเวลานัด...........
              </div>
            </div>
          </button>
        </div>
      )}
      <div className="w-full fixed top-0">
        <nav className="bg-red-700 shadow-lg md:flex md:items-center md:justify-between p-1">
          <div className="md:flex">
            <div className="text-neutral-50 text-3xl -mt-1 float-left font-bold hidden md:block">
              <MdOutlineFoodBank />
            </div>
            <div className="align-left font-bold text-neutral-50 hidden md:block">
              SHABUDULE
            </div>

            <div>
              <div className="flex">
                <IconButton
                  className="text-xl cursor-pointer justify-right md:hidden text-neutral-50"
                  onClick={() => {
                    setToggle(!toggle);
                    setToggleProfilePopup(false);
                    setToggleBellPopup(false);
                  }}
                >
                  <GiHamburgerMenu />
                </IconButton>
                {/* <div className="flex"> */}
                <h1 className="text-neutral-50 text-3xl mt-1 float-left ml-2 font-bold md:hidden">
                  <MdOutlineFoodBank />
                </h1>
                <h1 className="ml-1 font-bold text-neutral-50 p-2 md:hidden">
                  SHABUDULE
                </h1>
                {/* </div> */}

                {/* <button
                  className=" text-neutral-50  md:mx-6  md:hidden bg-red-700 hover:bg-red-800 active:bg-red-900 cursor-pointer rounded-lg  md:flex md:items-center p-2 font-bold text-2xl absolute right-12"
                  onClick={() => {
                    setToggleBellPopup(!toggleBellPopup);
                    setToggleProfilePopup(false);
                    setToggle(false);
                  }}
                >
                  <AiOutlineBell />
                </button> */}

                <button
                  className=" text-2xl font-bold p-2 text-neutral-50 button  md:mx-6 md:hidden bg-red-700 hover:bg-red-800 active:bg-red-900 cursor-pointer rounded-lg right-2 absolute mb-1"
                  onClick={() => {
                    setToggleProfilePopup(!toggleProfilePopup);
                    setToggle(false);
                  }}
                >
                  <CgProfile />
                </button>
              </div>
            </div>
            {toggle && (
              <div>
                {routes.map((route) => (
                  <Fade in={toggle}>
                    <Link to={route.url}>
                      <MenuItem className="text-base font-bold md:hidden text-neutral-50 hover:bg-red-800 active:bg-red-900">
                        {route.name}
                      </MenuItem>
                    </Link>
                  </Fade>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className=" md:flex md:items-center">
              {routes.map((route) => (
                <Link to={route.url}>
                  <Button className="text-base font-bold text-neutral-50  md:mx-6  hidden md:block hover:bg-red-800 active:bg-red-900 rounded-lg p-3">
                    {route.name}
                  </Button>
                </Link>
              ))}
              {/* <div
                className=" text-neutral-50  md:mx-1 hidden md:block bg-red-700 hover:bg-red-800 active:bg-red-900 cursor-pointer rounded-lg md:flex md:items-center"
                onClick={() => {
                  setToggleBellPopup(!toggleBellPopup);
                  setToggleProfilePopup(false);
                }}
              >
                <div className="text-2xl font-bold p-2">
                  <AiOutlineBell />
                </div>
              </div> */}
              <Button
                className=" text-neutral-50  md:mx-6 hidden md:block bg-red-700 hover:bg-red-800 active:bg-red-900  cursor-pointer rounded-lg  md:flex md:items-center"
                onClick={() => {
                  setToggleProfilePopup(!toggleProfilePopup);
                }}
              >
                <div className="text-2xl font-bold p-2">
                  <CgProfile />
                </div>
                <div className="text-base font-bold p-2">John Doe</div>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBarLoggedIn;
