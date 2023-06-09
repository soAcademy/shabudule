import React, { useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
// import { MdOutlineFoodBank } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
// import { AiOutlineBell } from "react-icons/ai";
import { HiBell } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { LoggedInNavBarContext, BranchContext } from "../App";
// import ProfilePopup from "../components/ProfilePopup";
import { useFetchUserProfile } from "../hooks";

const NavBarLoggedIn = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleProfilePopup, setToggleProfilePopup] = useState(false);
  const [toggleBellPopup, setToggleBellPopup] = useState(false);
  const { setLoggedIn } = useContext(LoggedInNavBarContext);
  const { user } = useContext(BranchContext);
  // const savedToken = localStorage.getItem("SavedToken");
  const {} = useFetchUserProfile();

  // console.log("token nav login :", token);
  // console.log("user nav login :", user);

  const routes = [
    { name: "Home", url: "shabu/home" },
    { name: "Profile", url: "shabu/userprofile" },
    { name: "Store", url: "shabu/store" },
    { name: "Party", url: "shabu/party" },
  ];

  const loggedOut = () => {
    localStorage.removeItem("SavedToken");
    setLoggedIn(false);
  };

  const handleClick = () => {
    setTimeout(() => {
      setToggle(false);
    }, 500); // delay in milliseconds
  };

  return (
    <>
      {toggleBellPopup && (
        <div className="absolute md:right-28 right-2 mt-12 bg-white rounded-lg w-48 shadow-lg py-2 z-10">
          <button className="text-sm  text-neutral-800 hover:bg-[#B1454A] button w-full hover:text-[#F5F5F5] px-4 py-2">
            <div className="flex">
              <div className="mt-1">
                <HiBell />
              </div>
              <div className="text-justify ml-2">
                :โต๊ะที่คุณจองไว้ที่ MK Restaurant มีจำนวณสมาชิกครบแล้ว
              </div>
            </div>
          </button>
          <button className="text-sm  text-neutral-800 hoverbg-[#B1454A] button w-full hover:text-[#F5F5F5] px-4 py-2">
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
      <div className="w-full fixed top-0 z-50">
        <nav className="bg-[#B1454A] shadow-lg md:flex md:items-center md:justify-between p-1">
          <div className="md:flex">
            <Link to="/shabu/home">
              <div className="align-left font-bold text-[#F5F5F5] hidden md:block text-2xl ml-10">
                SHABUDULE
              </div>
            </Link>
            <div>
              <div className="flex">
                <IconButton
                  className="text-3xl cursor-pointer  md:hidden text-[#F5F5F5]"
                  onClick={() => {
                    setToggle(!toggle);
                    setToggleProfilePopup(false);
                    setToggleBellPopup(false);
                  }}
                >
                  <GiHamburgerMenu />
                </IconButton>
                {/* <div className="flex"> */}
                <Link to="/shabu/home">
                  <h1 className="ml-1 mt-1 font-bold text-[#F5F5F5] p-2 md:hidden text-xl">
                    SHABUDULE
                  </h1>
                </Link>
                {/* </div> */}

                {/* <button
                  className=" text-[#F5F5F5]  md:mx-6  md:hidden bg-[#B1454A] hover:bg-[#c95f64]  cursor-pointer rounded-lg  md:flex md:items-center p-2 font-bold text-2xl absolute right-12"
                  onClick={() => {
                    setToggleBellPopup(!toggleBellPopup);
                    setToggleProfilePopup(false);
                    setToggle(false);
                  }}
                >
                  <AiOutlineBell />
                </button> */}

                <Button
                  className=" text-3xl font-bold p-2 text-[#F5F5F5] button  md:mx-6 md:hidden bg-[#B1454A] hover:bg-[#c95f64]  cursor-pointer rounded-lg right-2 absolute mb-1"
                  onClick={() => {
                    setToggleProfilePopup(!toggleProfilePopup);
                    setToggle(false);
                  }}
                >
                  <CgProfile />
                </Button>
              </div>
            </div>

            {toggleProfilePopup && (
              <Fade in={toggleProfilePopup}>
                <div className="absolute w-full bg-white rounded-b-md md:w-1/3 shadow-lg py-2 z-10 right-0 md:mt-12 md:mx-6 md:px-10">
                  <Link to="/shabu/userprofile">
                    <Button
                      className="text-base font-bold text-neutral-800 hover:bg-[#B1454A] button w-full hover:text-[#F5F5F5]  px-4 py-2 flex items-center justify-center"
                      onClick={() => setToggleProfilePopup(false)}
                    >
                      <div className="mr-2 ml-1 font-bold text-xl">
                        <CgProfile />
                      </div>
                      <div className="">Profile</div>
                    </Button>
                  </Link>
                  <Link to="/shabu/Home">
                    <Button
                      className="text-base font-bold text-neutral-800 hover:bg-[#B1454A] button w-full hover:text-[#F5F5F5]  py-2 flex items-center justify-center"
                      onClick={loggedOut}
                    >
                      <div className=" md:ml-3 font-bold  text-xl">
                        <MdOutlineLogout />
                      </div>
                      <div className="">Log Out</div>
                    </Button>
                  </Link>
                </div>
              </Fade>
            )}

            {toggle && (
              <div>
                {routes.map((route) => (
                  <Fade in={toggle}>
                    <Link to={route.url} onClick={handleClick}>
                      <MenuItem className="font-semibold text-[#F5F5F5] pl-6 md:hidden hover:bg-[#c95f64] z-50">
                        {route.name}
                      </MenuItem>
                    </Link>
                  </Fade>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className=" md:flex md:justify-end md:items-center">
              {routes.map((route) => (
                <Link to={route.url}>
                  <Button className="font-semibold text-[#F5F5F5]  md:mx-6  hidden md:block hover:bg-[#c95f64]  rounded-lg p-3">
                    {route.name}
                  </Button>
                </Link>
              ))}
              {/* <div
                className=" text-[#F5F5F5] md:mx-1 hidden md:block bg-[#B1454A] hover:bg-[#c95f64] cursor-pointer rounded-lg md:flex md:items-center"
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
                className=" text-[#F5F5F5]  md:mx-6 hidden md:block bg-[#B1454A] hover:bg-[#c95f64]  cursor-pointer rounded-lg  md:flex md:items-center"
                onClick={() => {
                  setToggleProfilePopup(!toggleProfilePopup);
                }}
              >
                <div className="text-2xl font-bold p-2">
                  <CgProfile />
                </div>
                <div className=" font-semibold p-2 md:text-xs lg:text-base">
                  {user[0]?.name}
                </div>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBarLoggedIn;
