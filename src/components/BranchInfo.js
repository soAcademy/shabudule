import React from "react";

export const BranchInfo = ({ branch }) => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-4/12">
          <img src={branch?.shabuShop.shopImage} alt="brandLogo" className="" />
        </div>
        <div className="w-8/12 mt-4 pl-6">
          <p className="">{branch?.shabuShop.name} </p>
          <p>สาขา {branch?.branchName}</p>
        </div>
      </div>
      <div className="flex w-full mt-10">
        <p>Email: {branch?.shopDetail}</p>
        <p className="pl-4">Tel: {branch?.tel}</p>
      </div>
      <div className="mt-2">
        <p>Address: {branch?.address}</p>
      </div>
    </div>
  );
};
