import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BranchContext } from "../App";
import { LoggedInNavBarContext } from "../App";
import Button from "@mui/material/Button";
import { fire } from "../fire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setLoggedIn } = useContext(LoggedInNavBarContext);
  const { setToken } = useContext(BranchContext);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const auth = getAuth(fire);

  const loggedOut = () => {
    localStorage.removeItem("SavedToken");
    setLoggedIn(false);
  };

  // const runLogoutTimer = (dispatch, timer) => {
  //   setTimeout(() => {
  //     dispatch(loggedOut());
  //   }, 5000);
  // };

  const logInPage = (e) => {
    e.preventDefault();
    // console.log("auth", auth);

    const errors = {};
    if (formData.email.trim() === "") {
      errors.email = "required";
    }
    if (formData.password.trim() === "") {
      errors.password = "required";
      setPasswordError("");
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((u) => {
          const accessToken = u.user.accessToken;
          setToken(accessToken);
          console.log(u);
          console.log("accessToken", u.user.accessToken);
          localStorage.setItem("SavedToken", u.user.accessToken); //save token is the key, bearer is the type of token used, u.user.token is athe value
          // runLogoutTimer(dispatch, u.data.timer * 1000);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + u.user.accessToken; //sets a default value for the "Authorization" header for all Axios HTTP requests.
          setLoggedIn(true);
          setFormData({ email: "", password: "" });
          setPasswordError("");
          navigate("/shabu/home");
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "auth/wrong-password") {
            setPasswordError("Incorrect password. Please try again.");
          } else {
            setPasswordError("An error occurred. Please try again later.");
          }
        });
    }
  };
  const user = auth.currentUser;

  if (user) {
    user
      .getIdToken()
      .then((token) => {
        // console.log(`User token ID: ${token}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    console.log("No user currently signed in.");
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const inputClassName = (id) => {
    return formErrors[id]
      ? "w-3/4 m-auto bg-neutral-300 rounded-sm border border-[#B1454A]"
      : "w-3/4 m-auto bg-neutral-300 rounded-sm border border-gray-300";
  };

  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center">
        <div className="bg-[#F5F5F5] md:w-1/2 w-full mx-2 border-4 border-[#B1454A] rounded-lg mt-20 h-1/2">
          <h1 className="text-center p-4 text-xl font-bold">Log In</h1>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5 mb-2">.</h1>
              <h1 className="lg:ml-12 ml-8 md:ml-8">Email</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={inputClassName("email")}
              />
            </div>
            <div
              id="email-error"
              className="text-[#B1454A] md:ml-16 ml-12 font-bold text-sm"
              style={{ display: formErrors.email ? "block" : "none" }}
            >
              {formErrors.email}
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5 mb-2">.</h1>
              <h1 className="lg:ml-12 ml-8 md:ml-8">Password</h1>
            </div>
            <div className="text-center">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={inputClassName("password")}
              />
            </div>
            <div
              id="password-error"
              className="text-[#B1454A] md:ml-16 ml-12 font-bold text-sm"
              style={{ display: formErrors.password ? "block" : "none" }}
            >
              {formErrors.password}
            </div>
            <div
              id="password-error"
              className="text-[#B1454A] md:ml-16 ml-12 font-bold text-sm"
              style={{ display: passwordError ? "block" : "none" }}
            >
              {passwordError}
            </div>
            <div className="flex">
              <h1 className="text-[#F5F5F5] md:ml-3 lg:ml-5">.</h1>
              <button className="lg:ml-12 md:ml-8 ml-10 text-xs mt-2 underline-offset-0 underline button hover:text-sky-500 active:text-sky-800 ">
                Forgot Password?
              </button>
            </div>
          </div>
          <form onClick={logInPage} id="logIn-form">
            <div className="text-center">
              <Button
                className=" bg-[#B1454A] text-[#F5F5F5] font-bold md:w-1/3 w-3/4 p-2 mt-4 rounded-lg mx-auto mb-4  md:text-base text-sm"
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
