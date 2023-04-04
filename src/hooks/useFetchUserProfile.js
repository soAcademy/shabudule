import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BranchContext } from "../App";

export const useFetchUserProfile = ({ token }) => {
  const [myParty, setMyParty] = useState();
  const [joinParty, setJoinParty] = useState();
  const [memberId, setMemberId] = useState();
  const [status, setStatus] = useState("");
  const [partyId, setPartyId] = useState();
  const [confirmDel, setConfirmDel] = useState(false);

  console.log("status :", status);
  console.log("memId :", memberId);
  console.log("partyId :", partyId);

  const { setUser } = useContext(BranchContext);

  const savedToken = localStorage.getItem("SavedToken");

  const idToken = savedToken;

  console.log("idToken :", idToken);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-api.vercel.app/function/getUserProfileAuthShabudule",
          {
            idToken: idToken,
          }
        );
        console.log("user:", result.data);
        setUser(result.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const getMyParty = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-api.vercel.app/function/getMyPartyAuthShabudule",
          {
            idToken: idToken,
          }
        );
        console.log("getMyParty", result.data);
        setMyParty(result.data);
      } catch (error) {
        console.error("Failed to fetch my party:", error);
      }
    };

    const getJoinParty = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-api.vercel.app/function/getMyJoinedPartyAuthShabudule",
          {
            idToken: idToken,
          }
        );
        console.log("getJoinParty", result.data);
        setJoinParty(result.data);
      } catch (error) {
        console.error("Failed to fetch joined party:", error);
      }
    };

    const updateStatusMembers = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-api.vercel.app/function/updatePartyMemberStatusAuthShabudule",
          {
            idToken: idToken,
            partyMemberId: memberId,
            status: status,
          }
        );
        console.log("update party :", result.data);

        const checkIsFull = await axios.post(
          "https://shabudule-api.vercel.app/function/checkIsFullShabudule",
          {
            partyId: partyId,
          }
        );
        console.log("check Is Full :", checkIsFull.data);
        // Call getMyParty after updating the member status
        setMyParty(getMyParty);
      } catch (error) {
        console.log("Error updating party member status", error);
      }
    };

    const updateStatusParty = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-api.vercel.app/function/updatePartyStatusAuthShabudule",
          {
            idToken: idToken,
            partyId: partyId,
          }
        );
        console.log("update party status:", result.data);
      } catch (err) {
        console.error("Failed to update status party:", err);
      }
    };

    getUserProfile();
    getJoinParty();
    getMyParty();
    if (memberId && status && partyId) {
      updateStatusMembers();
      getMyParty();
    }
    if (confirmDel === true) {
      updateStatusParty();
      setConfirmDel(false);
      getMyParty();
    }
  }, [idToken, memberId, status, partyId, setUser, confirmDel]);

  return {
    myParty,
    joinParty,
    setMemberId,
    setStatus,
    setPartyId,
    setConfirmDel,
  };
};
