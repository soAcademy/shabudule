import React, { useContext } from "react";
import { BranchContext } from "../App";

export const PopularParty = ({
  parties,
  setCurrentParty,
  setTogglePartyPopup,
}) => {
  const { user } = useContext(BranchContext);

  const handlePartyClick = (party) => {
    setCurrentParty(party);
    setTogglePartyPopup(true);
  };

  const mapMailUser = user?.map((r) => r.userFirebaseEmail);

  // console.log("user", user);
  // console.log("mail", mapMailUser);

  // console.log(
  //   "test",
  //   parties
  //     ?.filter((r) => r.isFull === false && r.active === true)
  //     .filter((k) => k.userFirebaseEmail !== mapMailUser[0])
  // );

  const acceptedMembersCount = (party) =>
    party?.partyMembers?.filter((member) => member.status === "accept").length;

  return (
    <>
      <div className="flex m-2 overflow-auto cursor-pointer">
        {parties
          ?.filter((r) => r.isFull === false && r.active === true)
          .filter((k) => k.userFirebaseEmail !== mapMailUser[0])
          .slice(0, 10)
          .map((party) => {
            // console.log("party.name", party.name);
            return (
              <div key={party.id}>
                <div
                  className="bg-neutral-200 h-52 w-44 rounded-lg p-2 button m-2 relative "
                  onClick={() => handlePartyClick(party)}
                >
                  <img
                    src={party.table.branch.shabuShop.shopImage}
                    alt="party"
                    className="h-3/5 w-full rounded-lg"
                  />
                  <div className="flex w-full">
                    <div>
                      <div className=" m-1 font-bold text-sm w-5/6 pt-2">
                        {party.name}
                      </div>
                      <div className="text-xs m-1">
                        Date: {party.startDateTime.slice(9, 10)}/
                        {party.startDateTime.slice(6, 7)}/
                        {party.startDateTime.slice(2, 4)},{" "}
                        {party.startDateTime.slice(11, 16)}
                      </div>
                    </div>
                    <div className="mx-1 font-bold my-auto bg-white rounded p-1">
                      {acceptedMembersCount(party)}/{party.table.seatPerDesk}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
