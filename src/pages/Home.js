import React, { useState, useEffect } from "react";
import { Carousel } from "../components/Carousel";
import axios from "axios";

export const Home = () => {

  const [promotion, setPromotion] = useState();

  const getPromotion = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getPromotionShabudule"
    );
    console.log("Promotion Api", result.data);
    setPromotion(result.data);
  };
  useEffect(() => {
    getPromotion();
  }, []);

  return (
    <div>
      <Carousel
        promotion={promotion}
        auto={true}
        interval={3000}
      />
    </div>
  );
};
