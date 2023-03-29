import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import InjectTailwind from "./InjectTailwind";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InjectTailwind>
      {" "}
      <App />
    </InjectTailwind>
  </React.StrictMode>
);

