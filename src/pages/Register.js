import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { fire } from "../fire";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const checkPassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      setPasswordMatchError("Passwords don't match. Please try again.");
      return false;
    } else {
      setPasswordMatch(true);
      setPasswordMatchError("");
      return true;
    }
  };

  const auth = getAuth(fire);
  const registerPage = (e) => {
    e.preventDefault();
    console.log("auth", auth);

    const isPasswordMatch = checkPassword();

    const errors = {};
    if (formData.username.trim() === "") {
      errors.username = "required";
    }
    if (formData.password.trim() === "") {
      errors.password = "required";
    }
    if (formData.confirmPassword.trim() === "") {
      errors.confirmPassword = "required";
    }
    if (formData.email.trim() === "") {
      errors.email = "required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0 && isPasswordMatch === true) {
      createUserWithEmailAndPassword(auth, formData.username, formData.password)
        .then((u) => {
          console.log(u);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const inputClassName = (id) => {
    return formErrors[id]
      ? "w-3/4 m-auto bg-neutral-300 rounded-sm border border-red-500"
      : "w-3/4 m-auto bg-neutral-300 rounded-sm border border-gray-300";
  };
  return (
    <>
      <div className="bg-neutral-300 h-screen flex justify-center overflow-auto">
        <div className="bg-neutral-50 m-auto md:w-10/12 w-full h-[500px] mx-2 border border-4 border-red-700 rounded-lg mt-[70px]">
          <h1 className="text-center p-4 text-xl font-bold ">Registration</h1>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-9 md:ml-8">Username</h1>
            </div>
            <div className="text-center">
              <input
                type="text"
                id="username"
                onChange={handleInputChange}
                required
                className={inputClassName("username")}
              />
            </div>
            <div
              id="username-error"
              className="text-red-700 ml-12 font-bold text-sm"
              style={{ display: formErrors.username ? "block" : "none" }}
            >
              {formErrors.username}
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-9 md:ml-8">Password</h1>
            </div>
            <div className="text-center">
              <input
                type="password"
                id="password"
                onChange={handleInputChange}
                className={inputClassName("password")}
              />
            </div>
            <div
              id="password-error"
              className="text-red-700 ml-12 font-bold text-sm"
              style={{ display: formErrors.password ? "block" : "none" }}
            >
              {formErrors.password}
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-9 md:ml-8">Confirm Password</h1>
            </div>
            <div className="text-center">
              <input
                type="password"
                id="confirmPassword"
                onChange={handleInputChange}
                className={inputClassName("confirmPassword")}
              />
            </div>
            <div
              id="confirmPassword-error"
              className="text-red-700 ml-12 font-bold text-sm"
              style={{ display: formErrors.confirmPassword ? "block" : "none" }}
            >
              {formErrors.confirmPassword}
            </div>

            <div
              id="password-match-error"
              className="text-red-700 text-center font-bold text-sm"
              style={{ display: passwordMatchError ? "block" : "none" }}
            >
              {passwordMatchError}
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-12 ml-9 md:ml-8">Email</h1>
            </div>
            <div className="text-center">
              <input
                type="email"
                id="email"
                onChange={handleInputChange}
                className={inputClassName("email")}
              />
            </div>
            <div
              id="email-error"
              className="text-red-700 ml-12 font-bold text-sm"
              style={{ display: formErrors.email ? "block" : "none" }}
            >
              {formErrors.email}
            </div>
            <div className="flex">
              <div className="text-neutral-50 ml-1 md:ml-3 lg:ml-5">.</div>
              <div className="text-xs mt-2 lg:ml-12 ml-9 md:ml-8">
                already have an account?
              </div>
              <div>
                <Link to="/shabu/login">
                  <button className="mr-5 text-xs mt-2 underline-offset-0 underline button hover:text-sky-500 active:text-sky-800 ">
                    Log in
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <form onClick={registerPage} id="register-form">
            <div className="text-center">
              <Button
                className=" bg-red-700 mb-2 text-neutral-50 font-bold md:w-1/3 w-3/4 p-2 mt-4 rounded-lg mx-auto mb-4  md:text-base text-sm"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
