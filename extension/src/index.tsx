import React from "react";
import ReactDOM from "react-dom/client";
import Panel from "@pages/panel/Panel";
import "./index.css";
// import "./assets/styles/fira-go.css"
import "./assets/styles/tailwind.css"

const root = ReactDOM.createRoot(document.getElementById("root")!);

console.log("React injected from index.tsx");

root.render(
  <React.StrictMode>
    <>
      <Panel/>
    </>
  </React.StrictMode>,
);
