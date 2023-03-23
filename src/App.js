import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopBranch, Reservation } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/shopBranch" element={<ShopBranch />} />
          <Route exact path="/reservation" element={<Reservation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
