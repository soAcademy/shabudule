import React from "react";

export const PopularStore = ({shops}) => {
  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  return (
    <>
      <div className="flex overflow-x-auto overflow-y-hidden m-2">
        {shuffle(shops)?.map((shop) => (
          <div key={shop.id} className="flex">
            {shuffle(shop?.shabuShopBranchs)?.map((branch) => (
              <div
                key={branch.id}
                className="bg-neutral-200 h-56 w-44 rounded-lg m-2"
              >
                <img
                  src={shop.shopImage}
                  alt="branch"
                  className=" w-full rounded-lg h-1/2 "
                />
                <div className="h-full">
                  <div className="m-1 font-bold text-center h-1/4">
                    {shop.name} {branch.branchName}
                  </div>
                  <div className="">
                    <button className="text-xs font-bold ml-1 button hover:text-red-500 active:text-red-700 h-1/3 mt-4">
                      see more details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
