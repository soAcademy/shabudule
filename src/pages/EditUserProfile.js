import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const EditUserProfile = () => {
  const [name, setName] = useState("");
  console.log("name", name);

  const navigate = useNavigate();

  const savedToken = localStorage.getItem("SavedToken");
  console.log("savedToken", savedToken);

  const updateUserName = async (idToken, name) => {
    try {
      const result = await axios.post(
        "https://shabudule-api.vercel.app/function/updateUserNameAuthShabudule",
        {
          idToken: idToken,
          name: name,
        },
        { headers: { Authorization: localStorage.getItem("SavedToken") } }
      );
      console.log("editUserDetail response:", result);
      navigate("/shabu/userprofile");
      if (result.status === 200) {
        console.log("result.data.editProfile:", result.data);
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto">
        <div className="bg-[#F5F5F5] m-auto md:w-9/12 w-full mx-2 border border-4 border-[#B1454A] rounded-lg mt-20">
          <h1 className="text-center p-4 text-xl font-bold ">
            Edit User Profile
          </h1>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-20 ml-9 md:ml-8">Change Name : </h1>
            </div>
            <div className="text-center mt-2">
              <input
                type="text"
                id="name"
                placeholder="Please input new name ..."
                onChange={(e) => setName(e.target.value)}
                required
                className="w-3/4 m-auto bg-neutral-300 rounded-sm border border-gray-300"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
              <Button
                className=" bg-[#B1454A] mb-2 text-[#F5F5F5] font-bold px-2  md:p-2 mt-4 rounded-lg mx-auto mb-4"
                type="submit"
                variant="contained"
                onClick={() => updateUserName(savedToken, name)}
              >
                Confirm
              </Button>
            </div>
            <div className="text-center">
              <Link to="/shabu/userprofile">
                <Button
                  className=" bg-[#B1454A] mb-2 text-[#F5F5F5] font-bold px-2 md:p-2 mt-4 rounded-lg mx-auto mb-4 ml-4"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
