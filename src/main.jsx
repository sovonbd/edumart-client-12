import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";
import Routes from "../src/routes/Routes";
import AuthProvider from "./providers/AuthProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
