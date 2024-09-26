import React from "react";
import ReactDOM from "react-dom/client";
import Panel from "@pages/panel/Panel";
import "./index.css";
import "./assets/styles/tailwind.css"
import {AuthContextProvider} from "@src/context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Panel/>
    </AuthContextProvider>
  </React.StrictMode>,
);
