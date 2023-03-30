import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export const Carousel = ({ promotion, auto, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("Banner Length", promotion?.length);
  console.log("current index", currentIndex);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? promotion?.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === promotion?.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    let intervalId;
    if (auto === true) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === promotion?.length - 1 ? 0 : prev + 1
        );
      }, interval);
    }
    return () => clearInterval(intervalId);
  }, [auto, interval, promotion?.length]);

  return (
    <div className="max-w-[1200px] h-[350px] md:h-[500px] w-full m-auto py-16 px-4 relative group">
      {currentIndex >= 0 && (
        <div
          style={{
            backgroundImage: `url(${promotion?.[currentIndex]?.image})`,
            transition: "background-image 0.5s ease-in-out",
          }}
          className="w-full h-full rounded-2xl bg-center bg-cover transition-transform duration-500 ease-in-out"
        ></div>
      )}

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="absolute top-[70%] md:top-[80%] right-0 left-0">
        <div className="flex top-4 justify-center py-2">
          {promotion?.map((r, idx) => (
            <div
              key={idx}
              onClick={() => goToSlide(idx)}
              className="text-2xl cursor-pointer text-white"
            >
              {idx === currentIndex ? (
                <RxDotFilled className=" text-black/40 animate-pulse" />
              ) : (
                <RxDotFilled />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
