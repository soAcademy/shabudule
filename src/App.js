
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// import NavBarLoggedIn from "./components/NavBarLoggedIn";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import StoreList from "./pages/StoreList";
import PartyList from "./pages/PartyList";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        {/* <NavBarLoggedIn /> */}
        {/* <LogIn /> */}
        {/* <Register /> */}
        <Routes>
          {/* <Route exact path="" element={<Home2 info={info} />} /> */}
          <Route exact path="shabu">
            <Route exact path="home" element={<Home />} />
            <Route exact path="store" element={<StoreList />} />
            <Route exact path="party" element={<PartyList />} />
            <Route exact path="login" element={<LogIn />} />
            <Route exact path="register" element={<Register/>} />
          </Route>
          <Route
            className="bg-red-200 rounded-lg m-2 mt-12 p-2 w-[100px] font-bold"
            exact
            path="*"
            element={<>404 Not Found</>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
