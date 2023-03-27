import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopBranch, Reservation, StoreList } from "./pages";

export const BranchContext = createContext();

function App() {
  const [branchId, setBranchId] = useState();
  // const []

  return (
    <div className="App">
      <BrowserRouter>
        <BranchContext.Provider value={{ branchId, setBranchId }}>
          <Routes>
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
