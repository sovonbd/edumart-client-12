import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnEdumart from "../pages/TeachOnEdumart/TeachOnEdumart";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CoursePage from "../pages/CoursePage/CoursePage";
import Dashboard from "../layout/Dashboard";
import MyEnrollCourses from "../pages/Dashboard/Learners/MyEnrollCourses/MyEnrollCourses";
import MyProfile from "../pages/Dashboard/Learners/MyProfile/MyProfile";
import Payment from "../pages/Dashboard/Learners/Payment/Payment";
import MyEnrollCourseDetails from "../pages/Dashboard/Learners/MyEnrollCourseDetails/MyEnrollCourseDetails";

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
        path: "allClasses/:id",
        element: <CoursePage></CoursePage>,
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
      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // learners routes
      {
        path: "myEnrollCourses",
        element: <MyEnrollCourses></MyEnrollCourses>,
      },
      {
        path: "myEnrollCourses/:id",
        element: <MyEnrollCourseDetails></MyEnrollCourseDetails>,
      },
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
]);

export default Routes;
