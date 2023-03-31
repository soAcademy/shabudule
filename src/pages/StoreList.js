import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BranchContext } from "../App";
import { Link } from "react-router-dom";
const StoreList = () => {
  // const mockShops = [
  //   {
  //     name: <>MoMo Paradise</>,
  //     shopImage: "/momo_logo.jpg",
  //     shabuShopBranchs: [
  //       {branchImage: "/momo_logo.jpg", branchName: "Mo-Mo Paradise: CDC" },
  //       {
  //         branchImage: "/momo_logo.jpg",
  //         branchName: "Mo-Mo Paradise: Central World",
  //       },
  //       { branchImage: "/momo_logo.jpg", branchName: "Mo-Mo Paradise: Icon Siam" },
  //     ],
  //   },
  //   {
  //     name: <>MK Restaurant</>,
  //     shopImage: "/mk_logo.jpg",
  //     shabuShopBranchs: [
  //       { branchImage: "/mk_logo.jpg",branchName: "MK Restaurant: Ekkamai" },
  //       { branchImage: "/mk_logo.jpg", branchName: "MK Restaurant: Emquartier" },
  //       { branchImage: "/mk_logo.jpg", branchName: "Mo-Mo Paradise: Terminal 21" },
  //     ],
  //   },
  //   {
  //     name: <>Shabu Shi</>,
  //     shopImage: "/shabushi_logo.jpg",
  //     shabuShopBranchs: [
  //       {
  //         branchImage: "/shabushi_logo.jpg",
  //         branchName: "Shabu Shi: Gateway: Ekkamai",
  //       },
  //       {
  //         branchImage: "/shabushi_logo.jpg",
  //         branchName: "Shabu Shi: Central World",
  //       },
  //       { branchImage: "/shabushi_logo.jpg", branchName: "Shabu Shi: Thong Lo 18" },
  //     ],
  //   },
  // ];

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
        <div className="bg-neutral-50 m-auto w-full h-full mx-2 border border-4 border-red-700 rounded-lg mt-[70px] overflow-auto">
          <div className=" p-2 font-bold text-xl text-red-700">STORE LIST</div>
          {shops?.map((shop, index) => (
            <div>
              <div
                className="p-2 m-2 flex bg-red-700 pointer-cursor border border-3 font-bold text-neutral-50 rounded-lg"
                key={index}
                onClick={() => updateToggleIndex(index)}
              >
                <img
                  src={shop.shopImage}
                  className="w-10 h-10 rounded-lg"
                  alt="restaurant logo"
                />
                <div className="p-2">{shop.name}</div>
              </div>
              {toggles[index] && (
                <div>
                  {shop?.shabuShopBranchs?.map((branch, i) => (
                    <Link to="/shabu/shopBranch">
                    <div className="p-2 my-2 mx-6  bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 font-bold button rounded-lg flex" onClick={() => setBranchId(branch.id)}>
                      <img
                        src={shop.shopImage}
                        alt="restaurant logo"
                        className="w-10 h-10 rounded-lg"
                      />
                      <div className="p-2" key={i}>
                        {branch.branchName}
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
