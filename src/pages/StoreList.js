import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BranchContext } from "../App";

export const StoreList = () => {
  // const stores = [
  //   {
  //     restaurant: <>MoMo Paradise</>,
  //     image: "/momo_logo.jpg",
  //     branches: [
  //       { branchImage: "/momo_logo.jpg", branch: "Mo-Mo Paradise: CDC" },
  //       {
  //         branchImage: "/momo_logo.jpg",
  //         branch: "Mo-Mo Paradise: Central World",
  //       },
  //       { branchImage: "/momo_logo.jpg", branch: "Mo-Mo Paradise: Icon Siam" },
  //     ],
  //   },
  //   {
  //     restaurant: <>MK Restaurant</>,
  //     image: "/mk_logo.jpg",
  //     branches: [
  //       { branchImage: "/mk_logo.jpg", branch: "MK Restaurant: Ekkamai" },
  //       { branchImage: "/mk_logo.jpg", branch: "MK Restaurant: Emquartier" },
  //       { branchImage: "/mk_logo.jpg", branch: "Mo-Mo Paradise: Terminal 21" },
  //     ],
  //   },
  //   {
  //     restaurant: <>Shabu Shi</>,
  //     image: "/shabushi_logo.jpg",
  //     branches: [
  //       {
  //         branchImage: "/shabushi_logo.jpg",
  //         branch: "Shabu Shi: Gateway: Ekkamai",
  //       },
  //       {
  //         branchImage: "/shabushi_logo.jpg",
  //         branch: "Shabu Shi: Central World",
  //       },
  //       { branchImage: "/shabushi_logo.jpg", branch: "Shabu Shi: Thong Lo 18" },
  //     ],
  //   },
  // ];

  const [shops, setShops] = useState([]);
  const [toggles, setToggles] = useState([]);
  const { setBranchId } = useContext(BranchContext);

  useEffect(() => {
    const getShops = async () => {
      const result = await axios.post(
        "https://shabudule-api.vercel.app/function/getShopShabudule"
      );
      console.log("getShop", result.data);
      setShops(result.data);
      const tempArr = [...Array(result.data?.length)];
      const updatedAccordion = tempArr.map(() => false);
      console.log("Map false in arr", updatedAccordion);
      setToggles(updatedAccordion);
    };
    getShops();
  }, []);

  const updateToggleIndex = (index) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);

    console.log("newToggles1", newToggles);
    console.log("index", index);
    console.log("toggles", toggles);
    console.log("newToggles2", newToggles);
  };

  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center">
        <div className="bg-neutral-50 m-auto md:w-1/2 w-full  mx-2 border-4 border-red-700 rounded-lg mt-[70px] overflow-auto">
          <div className=" p-2 font-bold text-xl text-red-700">STORE LIST</div>
          {shops?.map((r, index) => (
            <div>
              <div
                className="p-2 m-2 flex bg-red-700 pointer-cursor border border-3 font-bold text-neutral-50 rounded-lg"
                key={index}
                onClick={() => updateToggleIndex(index)}
              >
                <img
                  src={r.shopImage}
                  className="w-10 h-10 rounded-full"
                  alt="restaurant logo"
                />
                <div className="p-2">{r.name}</div>
              </div>
              {toggles[index] && (
                <div>
                  {r?.shabuShopBranchs?.map((j, idx) => (
                    <Link to="/shopBranch">
                      <div
                        key={idx}
                        className="p-2 my-2 mx-6  bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 font-bold button rounded-lg flex"
                        onClick={() => setBranchId(j.id)}
                      >
                        <img
                          src={r.shopImage}
                          alt="restaurant logo"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="p-2" key={idx}>
                          {j.branchName}
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
