import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // careful with css import order
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
