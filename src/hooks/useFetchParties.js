import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchParties = () => {
  const [parties, setParties] = useState([]);

  const getParties = async () => {
    const result = await axios.post(
      "https://shabudule-webapp-api.vercel.app/function/getPartyShabudule"
    );
    // console.log("result", result);
    setParties(result.data);
  };

  useEffect(() => {
    getParties();
  }, []); //empty dependency [] as only render once

  return { parties };
};
