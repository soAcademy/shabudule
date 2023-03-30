import React, { useState, useEffect } from "react";
import { MyParty, JoinParty, Profile } from "../components";
import axios from "axios";

export const UserProfile = () => {
  const [myParty, setMyParty] = useState();
  const [joinParty, setJoinParty] = useState();
  const [memberId, setMemberId] = useState();
  const [status, setStatus] = useState("");
  const [partyId, setPartyId] = useState();
  const [user, setUser] = useState("");
  const [searchToggle, setSearchToggle] = useState(false);

  console.log("memId :", memberId);
  console.log("status :", status);
  console.log("partyId :", partyId);

  const getUserProfile = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getUserProfileAuthShabudule",
      {
        idToken:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hhYnVkdWxlIiwiYXVkIjoic2hhYnVkdWxlIiwiYXV0aF90aW1lIjoxNjgwMTYyMDU2LCJ1c2VyX2lkIjoiZzFTMG91NlZKNmRLY2wzY1VGTVdpQkU1a2xxMiIsInN1YiI6ImcxUzBvdTZWSjZkS2NsM2NVRk1XaUJFNWtscTIiLCJpYXQiOjE2ODAxNjIwNTYsImV4cCI6MTY4MDE2NTY1NiwiZW1haWwiOiJlbWFpbDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImVtYWlsMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.PXU55vbSx__draJD9CsAnCbWJm0EccWoTRHK7wcO7b80jzOorhjY7cIqc65rgvJy10CqqSugKPK19QCbN-b-PEEnX8u5w0M2DNLmSLm0KeBzdR0-I-K4CWa7xaQyHx0_8flcXqYPQcxc4t3yCOgKcH1yvj2iKMsoBJnOJMBCsQCwOcx9UGSMTEPr6sRugHBWlT0QmZm5NYfVUw58rn7oXg5bXrzmfre2OzL6h8_o8b2vdb9Jma1KWoAUhl_SpqHWkfOxAbF1PFuBDpbBDUvkXehMiSfvN0P2KF_IMhtYVj7wRLcnEDTPeSUAudotaHuwfBjbJr1Cblr3JHlt_EzJYQ",
      }
    );
    console.log("user:", result.data);
    setUser(result.data);
  };

  const getMyParty = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getMyPartyAuthShabudule",
      {
        idToken:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hhYnVkdWxlIiwiYXVkIjoic2hhYnVkdWxlIiwiYXV0aF90aW1lIjoxNjgwMTYyMDU2LCJ1c2VyX2lkIjoiZzFTMG91NlZKNmRLY2wzY1VGTVdpQkU1a2xxMiIsInN1YiI6ImcxUzBvdTZWSjZkS2NsM2NVRk1XaUJFNWtscTIiLCJpYXQiOjE2ODAxNjIwNTYsImV4cCI6MTY4MDE2NTY1NiwiZW1haWwiOiJlbWFpbDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImVtYWlsMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.PXU55vbSx__draJD9CsAnCbWJm0EccWoTRHK7wcO7b80jzOorhjY7cIqc65rgvJy10CqqSugKPK19QCbN-b-PEEnX8u5w0M2DNLmSLm0KeBzdR0-I-K4CWa7xaQyHx0_8flcXqYPQcxc4t3yCOgKcH1yvj2iKMsoBJnOJMBCsQCwOcx9UGSMTEPr6sRugHBWlT0QmZm5NYfVUw58rn7oXg5bXrzmfre2OzL6h8_o8b2vdb9Jma1KWoAUhl_SpqHWkfOxAbF1PFuBDpbBDUvkXehMiSfvN0P2KF_IMhtYVj7wRLcnEDTPeSUAudotaHuwfBjbJr1Cblr3JHlt_EzJYQ",
      }
    );
    console.log("getMyParty", result.data);
    setMyParty(result.data);
  };

  const getJoinParty = async () => {
    const result = await axios.post(
      "https://shabudule-api.vercel.app/function/getMyJoinedPartyAuthShabudule",
      {
        idToken:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hhYnVkdWxlIiwiYXVkIjoic2hhYnVkdWxlIiwiYXV0aF90aW1lIjoxNjgwMTYyMDU2LCJ1c2VyX2lkIjoiZzFTMG91NlZKNmRLY2wzY1VGTVdpQkU1a2xxMiIsInN1YiI6ImcxUzBvdTZWSjZkS2NsM2NVRk1XaUJFNWtscTIiLCJpYXQiOjE2ODAxNjIwNTYsImV4cCI6MTY4MDE2NTY1NiwiZW1haWwiOiJlbWFpbDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImVtYWlsMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.PXU55vbSx__draJD9CsAnCbWJm0EccWoTRHK7wcO7b80jzOorhjY7cIqc65rgvJy10CqqSugKPK19QCbN-b-PEEnX8u5w0M2DNLmSLm0KeBzdR0-I-K4CWa7xaQyHx0_8flcXqYPQcxc4t3yCOgKcH1yvj2iKMsoBJnOJMBCsQCwOcx9UGSMTEPr6sRugHBWlT0QmZm5NYfVUw58rn7oXg5bXrzmfre2OzL6h8_o8b2vdb9Jma1KWoAUhl_SpqHWkfOxAbF1PFuBDpbBDUvkXehMiSfvN0P2KF_IMhtYVj7wRLcnEDTPeSUAudotaHuwfBjbJr1Cblr3JHlt_EzJYQ",
      }
    );
    console.log("getJoinParty", result.data);
    setJoinParty(result.data);
  };

  useEffect(() => {
    try {
      getUserProfile();
      getJoinParty();
      getMyParty();
    } catch (error) {
      console.log("Error fetching party data", error);
    }
  }, []);

  useEffect(() => {
    const updateStatusMembers = async () => {
      try {
        const result = await axios.post(
          "https://shabudule-api.vercel.app/function/updatePartyMemberStatusAuthShabudule",
          {
            idToken:
              "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hhYnVkdWxlIiwiYXVkIjoic2hhYnVkdWxlIiwiYXV0aF90aW1lIjoxNjgwMTQ3Njc2LCJ1c2VyX2lkIjoiUTJYY3BqVEFOZk9EczRUUW1iNTVyaXY3Nkk2MyIsInN1YiI6IlEyWGNwalRBTmZPRHM0VFFtYjU1cml2NzZJNjMiLCJpYXQiOjE2ODAxNDc2NzYsImV4cCI6MTY4MDE1MTI3NiwiZW1haWwiOiJ0ZXN0NEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDRAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.UfXjyTeuO22chFbiCMCg8yc4GVSwatCnJ1MerUM21NsrRZxzF3jt8eDh4A8ff6EYiSH_49wpJQJq5GuazRsRJPDMjtDvE1m0vOGNKCtb9pSurNnLfHAHo0T9FT5vewD0qXHdA7tkdNUnB8pX9joR2sQixSKnUjPq4v-RpK5cgUPAOnT4xg6aIIRJrglNMtuG0SSOxAyYWM4GOrZ_a1EIKGSTIeA_uD1G3CGguj6cJnYSP9C8tx0VqqtXfvzXSGeBxpHRDvUoNfK0hA8-UVqOHRiRtjK8nNXp1QuBvSPGR_cApHLT6SorIM7qUIvmdfeso8GbwPHw4yd6Txc2mGHvAQ",
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
        getMyParty();
      } catch (error) {
        console.log("Error updating party member status", error);
      }
    };
    updateStatusMembers();
  }, [memberId, status, partyId]);

  return (
    <div className=" bg-[#F5F5F5] w-full p-5">
      <div className="mb-5">
        <Profile user={user} />
      </div>
      <div className="my-5 flex justify-end">
        <button
          className="bg-[#B1454A] text-white rounded-md p-1"
          onClick={() => setSearchToggle(true)}
        >
          สร้างปาร์ตี้ !
        </button>
      </div>
      <div className="space-y-5 md:flex justify-between md:space-x-5 md:space-y-0">
        <div className="md:w-6/12">
          <MyParty
            myParty={myParty}
            setMemberId={setMemberId}
            setStatus={setStatus}
            setPartyId={setPartyId}
          />
        </div>
        <div className="md:w-6/12">
          <JoinParty joinParty={joinParty} user={user} />
        </div>
      </div>

      {searchToggle && (
        <div className="w-full h-screen left-0 top-0 fixed flex bg-gray-500/30 backdrop-blur-sm">
          <div className="flex flex-col m-auto bg-[#F4F4F4] p-5 w-4/5 rounded-md">
            <div className="mb-4 flex justify-between">
              <p className="font-bold">Search Store</p>
              <button
                className="cursor-pointer hover:font-bold"
                onClick={() => setSearchToggle(false)}
              >
                Close
              </button>
            </div>
            <input className="w-full rounded-md p-1" />
          </div>
        </div>
      )}
    </div>
  );
};
