import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { LoggedInNavBarContext } from "../App";

const CreateUserProfile = () => {
  // const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    bio: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    tel: "",
    bio: "",
  });
  console.log("formdata", formData);
  const navigate = useNavigate();

  const savedToken = localStorage.getItem("SavedToken");
  console.log("savedToken1", savedToken);

  const createUserDetail = async (idToken, name, tel, bio) => {
    console.log("accessToken3", idToken);
    try {
      const result = await axios.post(
        "https://shabudule-api.vercel.app/function/createUserProfileAuthShabudule",
        {
          idToken: idToken,
          name: name,
          tel: tel,
          bio: bio,
        },
        { headers: { Authorization: localStorage.getItem("SavedToken") } }
      );
      console.log("createUserDetail response:", result);
      if (result.status === 200) {
        console.log("result.data.createProfile:", result.data);
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

  // const handleFileInputChange = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) {
  //     return;
  //   }
  //   if (!file.type.startsWith("image/")) {
  //     setFormErrors({
  //       ...formErrors,
  //       picture: "Only image files are allowed.",
  //     });
  //     return;
  //   }
  //   setFormData({ ...formData, picture: file });
  // };

  const createProfilePage = async (e) => {
    console.log("token value2:", savedToken);
    e.preventDefault();

    const errors = {};
    if (formData.name.trim() === "") {
      errors.name = "required";
    }
    if (formData.tel.trim() === "") {
      errors.tel = "required";
    }
    if (formData.bio.trim() === "") {
      errors.bio = "required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(
        "createUserProfileAuthShabudule called with params:",
        savedToken,
        formData.name,
        formData.tel,
        formData.bio
      );
      console.log("token value3:", savedToken);
      const { name, tel, bio } = formData;
      console.log("token value8:", savedToken);
      console.log("name:", name);
      console.log("tel:", tel);
      console.log("bio:", bio);
      try {
        const result = await createUserDetail(savedToken, name, tel, bio);
        console.log("token value4:", savedToken);
        console.log("createUserDetail result:", result);
      } catch (error) {
        console.log("createUserDetail error:", error);
      }

      navigate("/shabu/home");
    }
  };

  const inputClassName = (id) => {
    return formErrors[id]
      ? "w-3/4 m-auto bg-neutral-300 rounded-sm border border-red-500"
      : "w-3/4 m-auto bg-neutral-300 rounded-sm border border-gray-300";
  };
  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto">
        <div className="bg-[#F5F5F5] m-auto md:w-9/12 w-full h-[500px] mx-2 border border-4 border-[#B1454A] rounded-lg mt-[70px]">
          <h1 className="text-center p-4 text-xl font-bold ">
            Create User Profile
          </h1>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-20 ml-9 md:ml-8">name</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                id="name"
                onChange={handleInputChange}
                required
                className={inputClassName("name")}
              />
            </div>
            <div
              id="name-error"
              className="text-[#B1454A] ml-12 md:ml-28 font-bold text-sm"
              style={{ display: formErrors.name ? "block" : "none" }}
            >
              {formErrors.name}
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
                className={inputClassName("tel")}
              />
            </div>
            <div
              id="tel-error"
              className="text-[#B1454A] ml-12 md:ml-28 font-bold text-sm"
              style={{ display: formErrors.tel ? "block" : "none" }}
            >
              {formErrors.tel}
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
                className={inputClassName("bio")}
              />
            </div>
            <div
              id="bio-error"
              className="text-[#B1454A] ml-12 md:ml-28 font-bold text-sm"
              style={{ display: formErrors.bio ? "block" : "none" }}
            >
              {formErrors.bio}
            </div>
            {/* <div className="flex justify-center mt-2">
              <div className="w-4/5 pl-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </div>
              <div
                id="picture-error"
                className="text-[#B1454A] ml-12 md:ml-28 font-bold text-sm"
                style={{ display: formErrors.picture ? "block" : "none" }}
              >
                {formErrors.picture}
              </div>
            </div> */}
          </div>
          <form onClick={createProfilePage} id="createUserProfile-form">
            <div className="text-center">
              <Button
                className=" bg-[#B1454A] mb-2 text-[#F5F5F5] font-bold md:w-1/3 w-3/4 p-2 mt-4 rounded-lg mx-auto mb-4  md:text-base text-sm"
                type="submit"
                variant="contained"
              >
                confirm
              </Button>..
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUserProfile;
