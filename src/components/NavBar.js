import { GiHamburgerMenu } from "react-icons/gi";
// import { MdOutlineFoodBank } from "react-icons/md";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const routes = [
    { name: "Home", url: "shabu/home" },
    { name: "Restaurant", url: "shabu/store" },
    { name: "Party", url: "shabu/party" },
    { name: "Register", url: "shabu/register" },
    { name: "Log In", url: "shabu/login" },
  ];

  const handleClick = () => {
    setTimeout(() => {
      setToggle(false);
    }, 500); // delay in milliseconds
  };
  return (
    <>
      <div className="w-full fixed top-0 z-50">
        <nav className="bg-[#B1454A] shadow-lg md:flex md:items-center md:justify-between p-1">
          <Link to="shabu/home">
            <h1 className="align-left font-bold text-[#F5F5F5] hidden md:block text-2xl ml-10">
              SHABUDULE
            </h1>
          </Link>

          <div>
            <div className="flex">
              <IconButton
                className="text-3xl cursor-pointer  md:hidden text-[#F5F5F5]"
                onClick={() => setToggle(!toggle)}
              >
                <GiHamburgerMenu />
              </IconButton>

              <div className="flex">
                <h1 className="ml-1 mt-1 font-bold text-[#F5F5F5] p-2 md:hidden text-xl">
                  SHABUDULE
                </h1>
              </div>
            </div>
            {toggle && (
              <div>
                {routes?.map((route, idx) => (
                  <Link to={route.url} onClick={handleClick}>
                    <Fade in={toggle}>
                      <MenuItem
                        key={idx}
                        className=" font-bold text-[#F5F5F5] pl-6 md:hidden hover:bg-[#c95f64] z-50"
                      >
                        {route.name}
                      </MenuItem>
                    </Fade>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Box className=" md:flex md:items-center">
            {routes.map((route, idx) => (
              <Link to={route.url}>
                <Button
                  key={idx}
                  className="text-base font-bold text-[#F5F5F5]  md:mx-6  hidden md:block  hover:bg-[#c95f64] rounded-lg p-3"
                >
                  {route.name}
                </Button>
              </Link>
            ))}
          </Box>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
