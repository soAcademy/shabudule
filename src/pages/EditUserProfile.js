import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const EditUserProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    bio: "",
  });

  console.log("formdata", formData);
  const navigate = useNavigate();

  const savedToken = localStorage.getItem("SavedToken");
  console.log("savedToken1", savedToken);

  const updateUserName = async (idToken, name) => {
    console.log("accessToken3", idToken);
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
      if (result.status === 200) {
        console.log("result.data.editProfile:", result.data);
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserTel = async (idToken, tel) => {
    console.log("accessToken3", idToken);
    try {
      const result = await axios.post(
        "https://shabudule-api.vercel.app/function/updateUserTelAuthShabudule",
        {
          idToken: idToken,
          tel: tel,
        },
        { headers: { Authorization: localStorage.getItem("SavedToken") } }
      );
      console.log("editUserDetail response:", result);
      if (result.status === 200) {
        console.log("result.data.editProfile:", result.data);
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserBio = async (idToken, bio) => {
    console.log("accessToken3", idToken);
    try {
      const result = await axios.post(
        "https://shabudule-api.vercel.app/function/updateUserNameAuthShabudule",
        {
          idToken: idToken,
          bio: bio,
        },
        { headers: { Authorization: localStorage.getItem("SavedToken") } }
      );
      console.log("editUserDetail response:", result);
      if (result.status === 200) {
        console.log("result.data.editProfile:", result.data);
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const editProfilePage = (e) => {
    console.log("token value2:", savedToken);
    e.preventDefault();

    console.log(
      "editUserProfileAuthShabudule called with params:",
      savedToken,
      formData.name,
      formData.tel,
      formData.bio
    );
    console.log("token value3:", savedToken);
    const { name, tel, bio } = formData;

    updateUserName(savedToken, name);
    console.log("updateUserName", updateUserName)
    updateUserTel(savedToken, tel);
    console.log("updateUserTel", updateUserTel)
    updateUserBio(savedToken, bio);
    console.log("updateUserBio", updateUserBio)

    navigate("/shabu/home");
  };

  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto">
        <div className="bg-[#F5F5F5] m-auto md:w-9/12 w-full h-[500px] mx-2 border border-4 border-[#B1454A] rounded-lg mt-[70px]">
          <h1 className="text-center p-4 text-xl font-bold ">
            Edit User Profile
          </h1>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-20 ml-9 md:ml-8">Name</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                id="name"
                onChange={handleInputChange}
                required
                className="w-3/4 m-auto bg-neutral-300 rounded-sm border border-gray-300"
              />
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-20 ml-9 md:ml-8">tel</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                id="tel"
                onChange={handleInputChange}
                className="w-3/4 m-auto bg-neutral-300 rounded-sm border border-gray-300"
              />
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-20 ml-9 md:ml-8">Bio</h1>
            </div>
            <div className="text-center">
              <textarea
                type="text"
                id="bio"
                onChange={handleInputChange}
                className="w-3/4 m-auto bg-neutral-300 rounded-sm border border-gray-300"
              />
            </div>
          </div>
          <form className="flex justify-center">
            <div className="text-center" onClick={editProfilePage} id="editUserProfile-form">
              <Button
                className=" bg-[#B1454A] mb-2 text-[#F5F5F5] font-bold md:w-[200px] w-[100px] p-4  md:p-2 mt-4 rounded-lg mx-auto mb-4  md:text-base text-sm"
                type="submit"
                variant="contained"
              >
                confirm
              </Button>
            </div>
            <div className="text-center">
              <Link to="/shabu/home">
              <Button
                className=" bg-[#B1454A] mb-2 text-[#F5F5F5] font-bold md:w-[200px]  p-4 md:p-2 mt-4 rounded-lg mx-auto mb-4 ml-4 md:text-base text-sm"
                type="submit"
                variant="contained"
              >
                Cancel
              </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
