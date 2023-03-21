import React from "react";

const Register = () => {
  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center">
        <div className="bg-neutral-50 m-auto md:w-1/2 w-full h-[500px] mx-2 border border-4 border-red-700 rounded-lg mt-[70px]">
          <h1 className="text-center p-4 text-xl font-bold ">
            Registration
          </h1>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-9 md:ml-8">Username</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                className="w-3/4 m-auto bg-neutral-300 rounded-sm "
              />
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-9 md:ml-8">Password</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                className="w-3/4 m-auto bg-neutral-300 rounded-sm "
              />
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-9 md:ml-8">Confirm Password</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                className="w-3/4 m-auto bg-neutral-300 rounded-sm "
              />
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-9 md:ml-8">Email</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                className="w-3/4 m-auto bg-neutral-300 rounded-sm "
              />
            </div>
            <div className="flex">
              <div className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</div>
              <div className="text-xs mt-2 lg:ml-12 ml-9 md:ml-8">already have an account?</div>
              <div>
              <button className="mr-5 text-xs mt-2 underline-offset-0 underline button hover:text-sky-500 active:text-sky-800 ">
                Log in
              </button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="button bg-red-700 hover:bg-red-900 text-neutral-50 font-bold md:w-1/3 w-3/4 p-2 mt-4 rounded-lg mx-auto mb-4 active:translate-y-1 md:text-base text-sm">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
