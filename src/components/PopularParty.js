import React from "react";

export const PopularParty = ({
  parties,
  setCurrentParty,
  setTogglePartyPopup,
}) => {
  const handlePartyClick = (party) => {
    setCurrentParty(party);
    setTogglePartyPopup(true);
  };

  const acceptedMembersCount = (party) =>
    party?.partyMembers?.filter((member) => member.status === "accept").length;

  return (
    <>
      <div className="flex m-2 overflow-auto cursor-pointer">
        {parties
          ?.sort((a, b) => b.partyMembers - a.partyMembers)
          .slice(0, 10)
          .map((party) => {
            // console.log("party.name", party.name);
            return (
              <div key={party.id}>
                <div
                  className="bg-neutral-200 h-52 w-44 rounded-lg button m-2 relative "
                  onClick={() => handlePartyClick(party)}
                >
                  <img
                    src={party.table.branch.shabuShop.shopImage}
                    alt="party"
                    className="h-3/5 w-full rounded-lg"
                  />
                  <div className="flex w-full">
                    <div>
                      <div className=" m-1 font-bold md:text-sm w-5/6 pt-2">
                        {party.name}
                      </div>
                      <div className="text-xs m-1">
                        Date:{" "}
                        {new Date(party.startDateTime).toLocaleString("en-US", {
                          dateStyle: "short",
                          timeStyle: "short",
                          hour12: true,
                        })}
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
