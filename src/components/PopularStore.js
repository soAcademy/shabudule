import React, { useContext } from "react";
import { BranchContext } from "../App";
import { Link } from "react-router-dom";

export const PopularStore = ({ shops }) => {
  const { setBranchId } = useContext(BranchContext);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledShops = shuffleArray(shops);
  console.log("shuffleArrayShops", shuffleArray(shops));

  let combinations = [];

  for (let i = 0; i < shuffledShops.length; i++) {
    let shop = shuffledShops[i];
    for (let j = 0; j < shop.shabuShopBranchs.length; j++) {
      let branch = shop.shabuShopBranchs[j];
      combinations.push({
        name: shop.name,
        branchName: branch.branchName,
      });
    }
  }
  // Shuffle the array
  shuffleArray(combinations);
  console.log("shuffleArrayComm", shuffleArray(combinations));
  console.log("combinations", combinations);

  return (
    <>
      <div className="flex overflow-x-auto overflow-y-hidden m-2">
        {combinations.map((combination) => {
          let shop = shops.find((shop) => shop.name === combination.name);
          let branch = shop.shabuShopBranchs.find(
            (branch) => branch.branchName === combination.branchName
          );

          return (
            <Link to="/shabu/shopBranch">
              <div
                key={`${shop.id}-${branch.id}`}
                className="bg-neutral-200 h-56 w-44 rounded-lg m-2"
                onClick={() => {setBranchId(branch.id);  console.log(branch.id);}}
              >
                <img
                  src={shop.shopImage}
                  alt="branch"
                  className=" w-full rounded-lg h-1/2 "
                />
                <div className="h-full">
                  <div className="m-2 font-bold md:text-sm text-center h-1/4">
                    {shop.name} {branch.branchName}
                  </div>
                  <div className="">
                    <button className="text-xs font-bold ml-1 button hover:text-[#B1454A] active:text-[#c95f64] h-1/3 mt-4">
                      see more details
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
