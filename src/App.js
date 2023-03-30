import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ShopBranch,
  Reservation,
  StoreList,
  Home,
  UserProfile,
  LogIn
} from "./pages";

export const BranchContext = createContext();

function App() {
  const [branchId, setBranchId] = useState();
  const [createPartyByDate, setCreatePartyByDate] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <BranchContext.Provider
          value={{
            branchId,
            setBranchId,
            createPartyByDate,
            setCreatePartyByDate,
          }}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/userProfile" element={<UserProfile />} />
            <Route exact path="/storeList" element={<StoreList />} />
            <Route exact path="/shopBranch" element={<ShopBranch />} />
            <Route exact path="/reservation" element={<Reservation />} />
          </Routes>
        </BranchContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
