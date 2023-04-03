import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BranchContext } from "../App";
import { Link } from "react-router-dom";
const StoreList = () => {
  const [shops, setShops] = useState([]);
  const { setBranchId } = useContext(BranchContext);

  const getShops = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getShopShabudule"
    );
    console.log("result", result);
    setShops(result.data);
  };

  useEffect(() => {
    getShops();
  }, []); //empty dependency [] as only render once

  const [toggles, setToggles] = useState(
    [...Array(shops.length)].map(() => false)
  );
  const updateToggleIndex = (index) => {
    console.log("toggles", toggles);
    const newToggles = [...toggles];
    console.log("newToggles1", newToggles);
    //copy existing toggle
    console.log("index", index);
    newToggles[index] = !newToggles[index];
    //set toggle to opposite state: if opened:close, if closed: open
    console.log("newToggles2", newToggles);
    setToggles(newToggles);
    //update current toggle state as determined by line 71
  };

  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto">
        <div className="bg-neutral-50 m-auto w-full h-full mx-2 border-4 border-primary rounded-lg mt-20 overflow-auto">
          <div className=" p-2 font-bold text-xl text-primary">
            SHABU RESTAURANT
          </div>
          {shops?.map((shop, index) => (
            <div className="cursor-pointer">
              <div
                className="p-2 m-2 flex bg-primary pointer-cursor border border-3 font-bold text-neutral-50 rounded-lg"
                key={index}
                onClick={() => updateToggleIndex(index)}
              >
                <img
                  src={shop.shopImage}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg my-auto ml-2"
                  alt="restaurant logo"
                />
                <div className="p-2 md:text-xl my-auto md:ml-8">
                  {shop.name}
                </div>
              </div>
              {toggles[index] && (
                <div>
                  {shop?.shabuShopBranchs?.map((branch, i) => (
                    <Link to="/shabu/shopBranch">
                      <div
                        className="p-2 my-2 mx-6 bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 font-bold button rounded-lg flex"
                        onClick={() => setBranchId(branch.id)}
                      >
                        <img
                          src={shop.shopImage}
                          alt="restaurant logo"
                          className="w-14 h-14 md:w-18 md:h-18 rounded-lg my-auto ml-2"
                        />
                        <div className="p-2 md:text-xl my-auto md:ml-8" key={i}>
                          สาขา : {branch.branchName}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StoreList;
