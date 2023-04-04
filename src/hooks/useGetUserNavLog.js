import { useEffect, useContext } from "react";
import axios from "axios";
import { BranchContext } from "../App";

export const useGetUserNavLog = () => {
  const { token, setUser } = useContext(BranchContext);

  const savedToken = localStorage.getItem("SavedToken");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-webapp-api.vercel.app/function/getUserProfileAuthShabudule",
          {
            idToken: token ?? savedToken,
          }
        );
        // console.log("user:", result.data);
        setUser(result.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    getUserProfile();
  }, [token]);

  return {};
};
