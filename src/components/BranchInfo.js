import React from "react";

export const BranchInfo = ({ mockStore }) => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-4/12">
          <img src={mockStore[0].logo} alt="brandLogo" className="" />
        </div>
        <div className="w-8/12 mt-4 pl-6">
          <p className="">{mockStore[0].name} </p>
          <p>สาขา {mockStore[0].branch}</p>
        </div>
      </div>
      <div className="flex w-full mt-10">
        <p>Email: {mockStore[0].email}</p>
        <p className="pl-4">Tel: {mockStore[0].tel}</p>
      </div>
      <div className="mt-2">
        <p>Address: {mockStore[0].address}</p>
      </div>
    </div>
  );
};
