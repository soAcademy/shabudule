import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export const Carousel = ({ slides, auto, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let intervalId;
    if (auto === true) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, interval);
    }
    return () => clearInterval(intervalId);
  }, [auto, interval, slides.length]);

  return (
    <div className="max-w-[1200px] h-[300px] w-full m-auto py-16 px-4 relative group">
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
          transition: "background-image 0.5s ease-in-out",
        }}
        className="w-full h-full rounded-2xl bg-center bg-cover transition-transform duration-500 ease-in-out"
      ></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] left-5 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={20} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] right-5 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={20} />
      </div>
      <div className="absolute top-[70%] right-0 left-0">
        <div className="flex top-4 justify-center py-2">
          {slides.map((r, idx) => (
            <div
              key={idx}
              onClick={() => goToSlide(idx)}
              className="text-2xl cursor-pointer text-white"
            >
              {idx === currentIndex ? (
                <RxDotFilled className=" text-black/40 animate-pulse" size={15}/>
              ) : (
                <RxDotFilled size={15}/>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
