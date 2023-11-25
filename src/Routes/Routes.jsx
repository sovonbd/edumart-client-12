import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AllClasses from "../Pages/AllClasses/AllClasses";
import TeachOnEdumart from "../Pages/TeachOnEdumart/TeachOnEdumart";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "teachOnEdumart",
        element: <TeachOnEdumart></TeachOnEdumart>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default Routes;
