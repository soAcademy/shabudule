import React from "react";

export const BranchInfo = ({ branch }) => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-4/12 my-auto">
          <img src={branch?.shabuShop.shopImage} alt="brandLogo" className="" />
        </div>
        <div className="w-8/12 font-bold text-xl ml-6 my-auto md:text-2xl text-center">
          <p className="">{branch?.shabuShop.name} </p>
          <p>สาขา {branch?.branchName}</p>
        </div>
      </div>
      <div className="w-full mt-6">
        <p className="">shopDetail : {branch?.shopDetail}</p>
        <p className="mt-2">Tel: {branch?.tel}</p>
      </div>
      <div className="mt-2">
        <p>Address: {branch?.address}</p>
      </div>
    </div>
  );
};
