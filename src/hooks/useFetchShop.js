import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchShop = () => {
  const [shops, setShops] = useState([]);

  const getShops = async () => {
    const result = await axios.post(
      "https://shabudule-webapp-api.vercel.app/function/getShopShabudule"
    );
    // console.log("result", result);
    setShops(result.data);
  };

  useEffect(() => {
    getShops();
  }, []); //empty dependency [] as only render once

  return { shops };
};
