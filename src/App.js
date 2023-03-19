import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, UserProfile } from "./pages/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/userProfile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
