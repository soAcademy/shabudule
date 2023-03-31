import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarLoggedIn from "./components/NavBarLoggedIn";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import StoreList from "./pages/StoreList";
import PartyList from "./pages/PartyList";
import ShopBranch from "./pages/ShopBranch";
import UserProfile from "./pages/UserProfile";
import CreateUserProfile from "./pages/CreateUserProfile";
import EditUserProfile from "./pages/EditUserProfile";
import { Reservation } from "./pages/Reservation";


export const ShabuContext = createContext();
export const LoggedInNavBarContext = createContext();
export const BranchContext = createContext();
function App() {
  const [tokenId, setTokenId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const [branchId, setBranchId] = useState();
  const [createPartyByDate, setCreatePartyByDate] = useState();

  useEffect(() => {
    const savedToken = localStorage.getItem("SavedToken");
    console.log("savedToken2", savedToken);
    if (savedToken) {  //check if savedToken is truthy
      axios.defaults.headers.common["Authorization"] = savedToken;
      setLoggedIn(true);
    }
  }, []);

  

  return (
    <>
      <BrowserRouter>
      <BranchContext.Provider
          value={{
            branchId,
            setBranchId,
            createPartyByDate,
            setCreatePartyByDate,
          }}
        >
        <ShabuContext.Provider value={{ tokenId, setTokenId }}>
        <LoggedInNavBarContext.Provider value={{ loggedIn, setLoggedIn }}>
        {loggedIn ? <NavBarLoggedIn /> : <NavBar />}
          
          {/* <NavBarLoggedIn /> */}
          {/* <LogIn /> */}
          {/* <Register /> */}
          <Routes>
            <Route exact path="" element={<Home />} />
            <Route exact path="shabu">
              <Route exact path="home" element={<Home />} />
              <Route exact path="store" element={<StoreList />} />
              <Route exact path="party" element={<PartyList />} />
              <Route exact path="login" element={<LogIn />} />
              <Route exact path="register" element={<Register />} />
              <Route exact path="shopbranch" element={<ShopBranch />} />
              <Route exact path="reservation" element={<Reservation />} />
              <Route exact path="userprofile" element={<UserProfile />} />
              <Route exact path="createuserprofile" element={<CreateUserProfile />} />
              <Route exact path="edituserprofile" element={<EditUserProfile />} />
            </Route>
            <Route
              className="bg-red-200 rounded-lg m-2 mt-12 p-2 w-[100px] font-bold"
              exact
              path="*"
              element={<>404 Not Found</>}
            />
          </Routes>
          </LoggedInNavBarContext.Provider>
        </ShabuContext.Provider >
        </BranchContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
