import React from "react";
import { Carousel } from "../components/Carousel";

export const Home = () => {
  const slides = [
    {
      url: "https://file.aimcontent.co/BrandAge/images/content/24400A0-624809E-067145F.jpg",
    },
    {
      url: "https://www.nobu-shabu.com/image/banner.png",
    },
    {
      url: "https://images.pexels.com/photos/3851289/pexels-photo-3851289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/13688385/pexels-photo-13688385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/sea/thailand/website/themes/tasty-thursday/own-thai-taste/ep8/tasty-thursday-ep8-1260-709.png",
    },
  ];

  return (
    <div>
      <Carousel slides={slides} auto={true} interval={4000} />
    </div>
  );
};
