import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineFoodBank } from "react-icons/md";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const routes = [
    { name: "Home", url: "shabu/home" },
    { name: "Store", url: "shabu/store" },
    { name: "Group List", url: "shabu/party" },
    { name: "Register", url: "shabu/register" },
    { name: "Log In", url: "shabu/login" },
  ];

  const handleClick = () => {
    setTimeout(() => {
      setToggle(false);
    }, 100); // delay in milliseconds
  }
  return (
    <>
      <div className="w-full fixed top-0">
        <nav className="bg-red-700 shadow-lg md:flex md:items-center md:justify-between p-4">
          <div className="md:flex">
            <h1 className="text-neutral-50 text-3xl -mt-1 float-left font-bold hidden md:block">
              <MdOutlineFoodBank />
            </h1>
            <h1 className="align-left font-bold text-neutral-50 hidden md:block">
              SHABUDULE
            </h1>
          </div>

          <div>
            <div className="flex">
              <button
                className="text-3xl cursor-pointer  md:hidden text-neutral-50"
                onClick={() => setToggle(!toggle)}
              >
                <GiHamburgerMenu />
              </button>
              <div className="flex">
                <h1 className="text-neutral-50 text-4xl -mt-1 float-left ml-2 font-bold md:hidden">
                  <MdOutlineFoodBank />
                </h1>
                <h1 className="ml-1 font-bold text-xl mt-1 text-neutral-50 md:hidden">
                  SHABUDULE
                </h1>
              </div>
            </div>
            {toggle && (
              <div>
                {routes.map((route) => (
                  <Link to={route.url} onClick={handleClick}>
                    <div className="text-2xl font-bold text-neutral-50 p-6 md:hidden hover:bg-red-800 active:bg-red-500 rounded-full" >
                      {route.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className=" md:flex md:items-center">
            {routes.map((route) => (
              <Link to={route.url}  >
                <div className="text-base font-bold text-neutral-50  md:mx-6 hidden md:block hover:bg-red-800 active:bg-red-900 rounded-lg p-1" >
                  {route.name}
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
