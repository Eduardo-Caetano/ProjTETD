import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

const initialTheme = localStorage.getItem("moneyscope-theme") === "dark" ? "dark" : "light";
document.documentElement.dataset.theme = initialTheme;
document.documentElement.classList.toggle("dark", initialTheme === "dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
