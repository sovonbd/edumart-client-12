import { Outlet, useLocation } from "react-router-dom";
import DrawerAppBar from "../pages/Home/Navbar/DrawerAppBar";


const MainLayout = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/register" ? (
        <DrawerAppBar></DrawerAppBar>
      ) : (
        ""
      )}
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
