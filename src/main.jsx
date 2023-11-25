import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import theme from "./Theme/Theme";
import Routes from "../src/Routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={Routes}></RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
