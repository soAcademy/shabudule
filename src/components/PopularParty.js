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
      <div className="flex m-2 overflow-auto">
        {parties?.map((party) => {
          console.log("party.name", party.name);
          return (
            <div key={party.id}>
              <div
                className="bg-neutral-200 h-56 w-44 rounded-lg button m-2 relative "
                onClick={() => handlePartyClick(party)}
              >
                <img
                  src={party.table.branch.shabuShop.shopImage}
                  alt="party"
                  className="h-1/2 w-full rounded-lg"
                />
                <div className="flex w-full">
                  <div className=" ml-1 font-bold md:text-sm w-5/6">{party.name}</div>
                  <div className="mr-2 ml-1 font-bold w-1/6">
                    {" "}
                    {acceptedMembersCount(party)}/{party.partyMembers?.length}
                  </div>
                </div>
                <div className="text-xs font-bold m-1 absolute bottom-1">
                  Date: {new Date(party.startDateTime).toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short', hour12: true})}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
