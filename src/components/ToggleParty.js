import React from "react";
import axios from "axios";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";


export const ToggleParty = ({
  togglePartyPopUp,
  setTogglePartyPopup,
  currentParty,
  setCurrentParty,
}) => {
  const addPartyMember = async (userId, partyId) => {
    console.log("userId", userId);
    console.log("partyId", partyId);
    const result = await axios
      .post(
        "https://shabudule-api.vercel.app/function/addPartyMemberShabudule",
        {
          userId: userId,
          partyId: partyId,
        }
      )
      .catch((error) => console.log(error));
    console.log("result.data:", result.data);
  };

  return (
    <>
      {togglePartyPopUp && currentParty && (
        <Fade in={togglePartyPopUp}>
        <div className="w-full z-10 h-screen fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="bg-neutral-200 rounded-lg w-80 h-84 m-auto px-4 py-4 items-center md:mt-16">
            <div className="text-base mb-1 text-[#B1454A] text-center font-bold flex-auto my-auto">
              Confirmation
            </div>

            <div>
              <div className="flex text-[#B1454A]font-bold ml-1 m-2 bg-[#F5F5F5] p-2 rounded-lg">
                <div className="w-1/3">Name:</div>
                <div className="w-2/3">{currentParty.name}</div>
              </div>
              <div className="flex text-[#B1454A] font-bold ml-1 m-2 bg-[#F5F5F5] p-2 rounded-lg">
                <div className="w-1/3">detail:</div>
                <div className="w-2/3">{currentParty.partyDetail}</div>
              </div>
              <div className="flex text-[#B1454A] font-bold ml-1 m-2 bg-[#F5F5F5] p-2 rounded-lg">
                <div className="w-1/3">type:</div>
                <div className="w-2/3">{currentParty.type}</div>
              </div>
              <div className="flex text-[#B1454A] font-bold ml-1 m-2 bg-[#F5F5F5] p-2 rounded-lg">
                <div className="w-1/3">branch:</div>
                <div className="w-2/3">{currentParty.table.branch.shabuShop.name} {currentParty.table.branch.branchName}</div>
              </div>
              <div className="flex text-[#B1454A] font-bold ml-1 m-2 bg-[#F5F5F5] p-2 rounded-lg">
                <div className="w-1/3">time:</div>
                <div className="w-2/3">{currentParty.startDateTime}</div>
              </div>
              <div className="flex text-[#B1454A] font-bold ml-1 m-2 bg-[#F5F5F5] p-2 rounded-lg">
                <div className="w-1/3">createdBy:</div>
                <div className="w-2/3">{currentParty.createByUserId.name}</div>
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
                  onClick={() => addPartyMember(4, 5)}
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
