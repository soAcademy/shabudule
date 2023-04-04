import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchPromotion = () => {
  const [promotion, setPromotion] = useState();

  const getPromotion = async () => {
    const result = await axios.post(
      "https://shabudule-webapp-api.vercel.app/function/getPromotionShabudule"
    );
    // console.log("Promotion Api", result.data);
    setPromotion(result.data);
  };
  useEffect(() => {
    getPromotion();
  }, []);

  return { promotion };
};
