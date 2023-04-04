import React, { useState, useContext } from "react";
import axios from "axios";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { BranchContext } from "../App";

export const ToggleParty = ({
  togglePartyPopUp,
  setTogglePartyPopup,
  currentParty,
  setCurrentParty,
}) => {
  const navigate = useNavigate();
  const savedToken = localStorage.getItem("SavedToken");
  const [toggleConfirmationPopup, setToggleConfirmationPopup] = useState(false);
  const { token } = useContext(BranchContext);
  
  // console.log("savedToken", savedToken);

  const addPartyMember = async (token, partyId, savedToken) => {
    // console.log("partyId", partyId);
    const result = await axios
      .post(
        "https://shabudule-webapp-api.vercel.app/function/addPartyMemberAuthShabudule",
        {
          idToken: token ?? savedToken,
          partyId: partyId,
        }
      )
      .catch((error) =>
        console.log("Error adding party member:", error.message)
      );

    // console.log("result:", result.data);
  };

  const joinParty = () => {
    if (savedToken ?? token) {
      addPartyMember(savedToken, currentParty.id);
      setToggleConfirmationPopup(true);
    } else {
      navigate("/shabu/register");
    }
  };

  return (
    <>
      {toggleConfirmationPopup && currentParty && (
        <Fade in={toggleConfirmationPopup}>
          <div className="w-full h-screen fixed flex bg-gray-500/30 backdrop-blur-sm z-50">
            <div className="bg-neutral-200 rounded-lg w-80 h-84 m-auto px-4 py-4 items-center">
              <div className="text-base mb-1 text-[#B1454A] text-center font-bold flex-auto my-auto">
                Confirmation
              </div>
              <div
                className="text-[#B1454A] font-bold ml-1 p-2"
                key={currentParty.id}
              >
                ทำการขอเข้าร่วม "{currentParty.name}" แล้ว
              </div>
              <form
                onClick={() => {
                  setToggleConfirmationPopup(false);
                  setCurrentParty(null);
                }}
                className="flex flex-col m-auto"
              >
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="px-4 py-2 mx-2 mt-2 mb-1 bg-[#B1454A] w-1/2 rounded text-white"
                    variant="contained"
                  >
                    OK
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      )}
      {togglePartyPopUp && currentParty && (
        <Fade in={togglePartyPopUp}>
          <div className="w-full z-10 h-screen fixed flex bg-gray-500/30 backdrop-blur-sm">
            <div className="bg-neutral-200 rounded-lg w-100 md:w-[700px] h-84 m-auto px-4 py-4 items-center md:mt-24">
              <div className="text-base mb-1 text-[#B1454A] text-center font-bold flex-auto my-auto">
                Confirmation
              </div>

              <div className="text-[#B1454A] font-bold ml-1 m-2 bg-[#F5F5F5] p-2 rounded-lg">
                <div className="flex">
                  <div className="w-1/3">Party Name : </div>
                  <div className="w-2/3">{currentParty.name}</div>
                </div>
                <div className="flex ">
                  <div className="w-1/3">Detail:</div>
                  <div className="w-2/3">{currentParty.partyDetail}</div>
                </div>
                <div className="flex">
                  <div className="w-1/3">Shabu Branch : </div>
                  <div className="w-2/3">
                    {currentParty.table.branch.shabuShop.name}{" "}
                    {currentParty.table.branch.branchName}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3">Date&Time:</div>
                  <div className="w-2/3">
                    {new Date(currentParty.startDateTime).toLocaleString(
                      "en-US",
                      { dateStyle: "short", timeStyle: "short", hour12: true }
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3">createdBy:</div>
                  <div className="w-2/3">
                    {currentParty.createByUserFirebaseEmail.user.name}
                  </div>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  setTogglePartyPopup(false);
                }}
                className="flex flex-col m-auto"
              >
                <div className="flex">
                  <Button
                    type="submit"
                    className="px-4 py-2 mx-2 mt-2 mb-1 bg-[#B1454A] w-1/2 rounded text-white"
                    onClick={joinParty}
                    variant="contained"
                  >
                    Join
                  </Button>
                  <Button
                    className="px-4 py-2 mx-2 mt-2 mb-1 bg-neutral-800 rounded text-white w-1/2 "
                    onClick={() => {
                      setCurrentParty(null);
                      setTogglePartyPopup(false);
                    }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      )}
    </>
  );
};
