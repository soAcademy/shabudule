import React, { useState } from "react";

const StoreList = () => {
  const stores = [
    {
      restaurant: <>MoMo Paradise</>,
      image: "/momo_logo.jpg",
      branches: [
        { branchImage: "/momo_logo.jpg", branch: "Mo-Mo Paradise: CDC" },
        {
          branchImage: "/momo_logo.jpg",
          branch: "Mo-Mo Paradise: Central World",
        },
        { branchImage: "/momo_logo.jpg", branch: "Mo-Mo Paradise: Icon Siam" },
      ],
    },
    {
      restaurant: <>MK Restaurant</>,
      image: "/mk_logo.jpg",
      branches: [
        { branchImage: "/mk_logo.jpg", branch: "MK Restaurant: Ekkamai" },
        { branchImage: "/mk_logo.jpg", branch: "MK Restaurant: Emquartier" },
        { branchImage: "/mk_logo.jpg", branch: "Mo-Mo Paradise: Terminal 21" },
      ],
    },
    {
      restaurant: <>Shabu Shi</>,
      image: "/shabushi_logo.jpg",
      branches: [
        {
          branchImage: "/shabushi_logo.jpg",
          branch: "Shabu Shi: Gateway: Ekkamai",
        },
        {
          branchImage: "/shabushi_logo.jpg",
          branch: "Shabu Shi: Central World",
        },
        { branchImage: "/shabushi_logo.jpg", branch: "Shabu Shi: Thong Lo 18" },
      ],
    },
  ];

  const [toggles, setToggles] = useState(
    [...Array(stores.length)].map(() => false)
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
      
      <div className="bg-neutral-300 h-screen flex justify-center">

        <div className="bg-neutral-50 m-auto md:w-1/2 w-full  mx-2 border border-4 border-red-700 rounded-lg mt-[70px] overflow-auto">
          <div className=" p-2 font-bold text-xl text-red-700">STORE LIST</div>
          {stores?.map((store, index) => (
            <div>
              <div
                className="p-2 m-2 flex bg-red-700 pointer-cursor border border-3 font-bold text-neutral-50 rounded-lg"
                key={index}
                onClick={() => updateToggleIndex(index)}
              >
                <img src={store.image} className="w-10 h-10 rounded-full" alt="restaurant logo" />
                <div className="p-2">{store.restaurant}</div>
              </div>
              {toggles[index] && (
                <div>
                  {store?.branches?.map((branch, i) => (
                    <div className="p-2 my-2 mx-6  bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 font-bold button rounded-lg flex">
                      <img
                        src={branch.branchImage} alt="restaurant logo"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="p-2" key={i}>
                        {branch.branch}
                      </div>
                    </div>
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
