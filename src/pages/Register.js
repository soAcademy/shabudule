import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { fire } from "../fire";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LoggedInNavBarContext } from "../App";

const Register = () => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const { setLoggedIn } = useContext(LoggedInNavBarContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

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

  const createUser = async (accessToken) => {
    console.log("accessToken", accessToken);
    const result = await axios
      .post(
        "https://shabudule-api.vercel.app/function/createUserAuthShabudule",
        {
          idToken: accessToken,
        }
      )
      .catch((error) => console.log(error));
    console.log("result.data.token:", result.data);
  };

  const registerPage = (e) => {
    e.preventDefault();
    console.log("auth", auth);

    const isPasswordMatch = checkPassword();

    const errors = {};
    if (formData.email.trim() === "") {
      errors.email = "required";
    }
    if (formData.password.trim() === "") {
      errors.password = "required";
    }
    if (formData.confirmPassword.trim() === "") {
      errors.confirmPassword = "required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0 && isPasswordMatch === true) {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((u) => {
          console.log(u);
          createUser(u.user.accessToken);
          console.log("accessTokenu", u.user.accessToken);
          localStorage.setItem("SavedToken", u.user.accessToken); //save token is the key, bearer is the type of token used, u.user.token is athe value
          axios.defaults.headers.common["Authorization"] = u.user.accessToken; //sets a default value for the "Authorization" header for all Axios HTTP requests.
          setFormData({ email: "", password: "", confirmPassword: "" });
          setLoggedIn(true);
          navigate("/shabu/createuserprofile");
        })
        .catch((err) => {
          alert(err);
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
        <div className="bg-[#F5F5F5] md:w-9/12 w-full h-1/2 mx-2 border border-4 border-[#B1454A] rounded-lg mt-20">
          <h1 className="text-center p-4 text-xl font-bold ">Registration</h1>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-20 ml-9 md:ml-8 mb-2">Email</h1>
            </div>
            <div className="text-center">
              <input
                type="email"
                id="email"
                onChange={handleInputChange}
                required
                className={inputClassName("email")}
              />
            </div>
            <div
              id="email-error"
              className="text-[#B1454A] ml-12 md:ml-28 font-bold text-sm"
              style={{ display: formErrors.email ? "block" : "none" }}
            >
              {formErrors.email}
            </div>
            <div
              id="register-error"
              className="text-[#B1454A] ml-12 md:ml-28 font-bold text-sm"
              style={{ display: registerError ? "block" : "none" }}
            >
              {registerError}
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-20 ml-9 md:ml-8 mb-2">Password</h1>
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
              className="text-[#B1454A] ml-12 md:ml-28 font-bold text-sm"
              style={{ display: formErrors.password ? "block" : "none" }}
            >
              {formErrors.password}
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <h1 className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5">.</h1>
              <h1 className="lg:ml-20 ml-9 md:ml-8 mb-2">Confirm Password</h1>
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
              className="text-[#B1454A] ml-12 md:ml-28 font-bold text-sm"
              style={{ display: formErrors.confirmPassword ? "block" : "none" }}
            >
              {formErrors.confirmPassword}
            </div>

            <div
              id="password-match-error"
              className="text-[#B1454A] ml-12 md:ml-28 font-bold text-sm"
              style={{ display: passwordMatchError ? "block" : "none" }}
            >
              {passwordMatchError}
            </div>
          </div>
          <div className="py-2">
            <div className="flex">
              <div className="text-[#F5F5F5] ml-1 md:ml-3 lg:ml-5">.</div>
              <div className="text-xs mt-2 lg:ml-20 ml-9 md:ml-8">
                Already have an account?
              </div>
              <div>
                <Link to="/shabu/login">
                  <button className="mr-5 text-xs mt-2 button hover:text-sky-500 active:text-sky-800 ">
                    Log in
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <form onClick={registerPage} id="register-form">
            <div className="text-center">
              <Button
                className=" bg-[#B1454A] text-[#F5F5F5] font-bold md:w-1/3 w-3/4 p-2 mt-2 rounded-lg mx-auto md:text-base text-sm"
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
