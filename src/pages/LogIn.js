import React from "react";

const LogIn = () => {
  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center">
        <div className="bg-neutral-50 m-auto md:w-1/2 w-full h-[300px] mx-2 border border-4 border-red-700 rounded-lg mt-[70px]">
          <h1 className="text-center p-4 text-xl font-bold">Log In</h1>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-8 md:ml-8">Username</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                className="w-3/4  m-auto bg-neutral-300 rounded-sm "
              />
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-8 md:ml-8">Password</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                className="w-3/4  m-auto bg-neutral-300 rounded-sm "
              />
            </div>
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <button className="lg:ml-12 ml-4 md:ml-8 text-xs mt-2 underline-offset-0 underline button hover:text-sky-500 active:text-sky-800 ">
                Forgot Password?
              </button>
            </div>
          </div>
          <div className="text-center">
            <button className="button bg-red-700 hover:bg-red-900 text-neutral-50 font-bold md:w-1/3 w-3/4 p-2 mt-4 rounded-lg mx-auto mb-4 active:translate-y-1 md:text-base text-sm">
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
