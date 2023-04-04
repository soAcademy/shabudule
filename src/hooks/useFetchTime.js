import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BranchContext } from "../App";
import "dayjs/locale/pt";
import localeDe from "dayjs/locale/de"; // With a custom alias for the locale object

export const useFetchTime = ({ selectDate }) => {
  const { branchId, createPartyByDate } = useContext(BranchContext);
  const [tableAndTime, setTableAndTime] = useState();

  useEffect(() => {
    const getTimeAndTable = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-webapp-api.vercel.app/function/getAvailableSlotsShabudule",
          {
            branchId: branchId,
            date: createPartyByDate ?? selectDate.locale(localeDe).format(),
          }
        );
        // console.log("get time and table :", result.data);
        setTableAndTime(result.data);
      } catch (error) {
        console.log("Error fetching time and table:", error);
      }
    };
    getTimeAndTable();
  }, [branchId, createPartyByDate, selectDate]);

  return { tableAndTime };
};
