import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BranchContext } from "../App";

export const useFetchBranch = () => {
  const { branchId } = useContext(BranchContext);
  const [branch, setBranch] = useState();

  // console.log("branchId", branchId);

  useEffect(() => {
    const getBranch = async () => {
      const result = await axios.post(
        "https://shabudule-webapp-api.vercel.app/function/getBranchShabudule",
        { branchId: branchId }
      );
      // console.log("getBranch", result.data);
      setBranch(result.data);
    };
    getBranch();
  }, [branchId]);

  return { branch };
};
