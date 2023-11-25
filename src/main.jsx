import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
<<<<<<< HEAD
import Routes from "./Routes/Routes";
=======
import Routes from "./routes/Routes";
>>>>>>> 265cc67 (updated the login and register page newly)
import { ThemeProvider } from "@mui/material";
import theme from "./Theme/Theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={Routes}></RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
