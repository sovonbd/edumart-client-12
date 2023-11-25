import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes";
import { ThemeProvider } from "@mui/material";
import theme from "./Theme/Theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={Routes}></RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
