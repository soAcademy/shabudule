import React from "react";

const restaurants = [
  { image: "/momo_logo.jpg" },
  { image: "/mk_logo.jpg" },
  { image: "/shabushi_logo.jpg" },
  { image: "/momo_logo.jpg" },
];

const parties = [
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
  },
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
  },
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
  },
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
  },
  {
    branch: "Mo-Mo Paradise: Central Rama 3",
    time: " 23/03/2023 12:00PM",
    amount: "3/4",
    image: "/shabu.jpg",
  },
];

const Home = () => {
  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center">
        <div className="bg-neutral-50 m-auto w-full h-full mx-2 border border-4 border-red-700 rounded-lg mt-[70px] overflow-auto">
          <div className="text-center">
            <input
              type="text"
              className="w-1/2 m-auto bg-neutral-200 rounded-lg my-2"
            />
          </div>
          <div className="text-red-700 text-4xl text-center m-2 font-bold">
            สร้างปาร์ตี้ชาบูกินกับเพื่อนได้แล้ววันนี้! ที่ SHABUDULE
          </div>
          <img
            src="/shabu.jpg"
            className="w-full h-32 rounded-lg p-2 mt-4"
            alt="promotion band"
          />
          <div className="text-center text-red-700 font-bold">
            กว่า 100 ร้านชาบูที่ร่วมกับเรา
          </div>
          <div className="flex p-2 justify-center">
            {restaurants?.map((restaurant) => (
              <img
                src={restaurant.image}
                alt="restaurant logos"
                className="w-16 h-16 m-2 rounded-lg"
              />
            ))}
          </div>
          <div className="text-center text-red-700 font-bold my-2">
            จอง/สร้าง Party ตอนนี้
          </div>
          <div className="justify-center flex">
            <div className="text-center bg-red-700 text-neutral-50 w-1/3 p-2 rounded-lg button">
              เริ่มต้นใช้งานฟรี
            </div>
          </div>
          <div className="m-2 font-bold text-red-700 text-xl">
            popular party
          </div>
          <div className="flex m-2 overflow-auto">
            {parties?.map((party) => (
              <div>
                <div className="bg-neutral-200 h-44 w-44 rounded-lg m-2 ">
                  <img
                    src={party.image}
                    alt="party"
                    className="h-1/2 w-full rounded-lg"
                  />
                  <div className="flex">
                    <div className="m-1 font-bold">{party.branch}</div>
                    <div className="m-1 font-bold">3/4</div>
                  </div>
                  <div className="text-xs font-bold m-1">
                    Date: {party.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
