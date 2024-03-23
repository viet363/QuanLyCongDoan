import React from "react";
import { createRoot } from "react-dom/client";
import PageMain from "./PageMain.jsx";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.body);
root.render(
  <BrowserRouter>
    <PageMain></PageMain>
  </BrowserRouter>
);
