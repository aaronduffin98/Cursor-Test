import React from "react";
import { createRoot } from "react-dom/client";
import SUSIHomePage from "./SUSIHomePage.jsx";
import { CommentButton } from "./components/CommentButton.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <SUSIHomePage />
      <CommentButton />
    </>
  </React.StrictMode>
);
