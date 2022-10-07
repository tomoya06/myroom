import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import "./animate.scss";
import { globalContext } from "./context";
import vhCheck from "vh-check";

vhCheck();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App context={globalContext} />
  </React.StrictMode>
);
