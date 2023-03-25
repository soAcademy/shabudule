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
        {parties?.map((party) => (
          <div key={party.id}>
            <div
              className="bg-neutral-200 h-44 w-44 rounded-lg button m-2 "
              onClick={() => handlePartyClick(party)}
            >
              <img
                src="/shabu.jpg"
                alt="party"
                className="h-1/2 w-full rounded-lg"
              />
              <div className="flex">
                <div className="font-bold">Mo-Mo Paradise: Central Rama 3</div>
                <div className="m-1 font-bold">
                  {" "}
                  {acceptedMembersCount(party)}/{party.partyMembers?.length}
                </div>
              </div>
              <div className="text-xs font-bold m-1">
                Date: {party.startDateTime}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
