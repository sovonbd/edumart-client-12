import { Outlet, useLocation } from "react-router-dom";
import DrawerAppBar from "../pages/Home/Navbar/DrawerAppBar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/register" ? (
        <div>
          <DrawerAppBar></DrawerAppBar>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      ) : (
        <Outlet></Outlet>
      )}
    </div>
  );
};

export default MainLayout;
