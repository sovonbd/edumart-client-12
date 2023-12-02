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
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import TeacherRequest from "../pages/Dashboard/Admin/TeacherRequest/TeacherRequest";
import Users from "../pages/Dashboard/Admin/Users/Users";
import DAllClasses from "../pages/Dashboard/Admin/DAllClasses/DAllClasses";
import ClassProgress from "../pages/Dashboard/Admin/ClassProgress/ClassProgress";
import MyCourses from "../pages/Dashboard/Instructor/MyCourses/MyCourses";
import AddClass from "../pages/Dashboard/Instructor/AddClass/AddClass";
import MyCoursePage from "../pages/Dashboard/Instructor/MyCoursePage/MyCoursePage";

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
        element: (
          <PrivateRoutes>
            <CoursePage></CoursePage>
          </PrivateRoutes>
        ),
      },
      {
        path: "teachOnEdumart",
        element: (
          <PrivateRoutes>
            <TeachOnEdumart></TeachOnEdumart>
          </PrivateRoutes>
        ),
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
        element: (
          <PrivateRoutes>
            <Payment></Payment>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      // admin routes
      {
        path: "teacherRequest",
        element: (
          <AdminRoutes>
            <TeacherRequest></TeacherRequest>
          </AdminRoutes>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoutes>
            <Users></Users>
          </AdminRoutes>
        ),
      },
      {
        path: "allClasses",
        element: (
          <AdminRoutes>
            <DAllClasses></DAllClasses>
          </AdminRoutes>
        ),
      },
      {
        path: "class/:id",
        element: (
          <AdminRoutes>
            <ClassProgress></ClassProgress>
          </AdminRoutes>
        ),
      },

      // instructors routes
      {
        path: "addClass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myCourses",
        element: <MyCourses></MyCourses>,
      },
      {
        path: "myCourses/:id",
        element: <MyCoursePage></MyCoursePage>,
      },

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
