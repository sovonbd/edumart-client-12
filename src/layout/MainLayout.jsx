import { Outlet, useLocation } from "react-router-dom";
import DrawerAppBar from "../pages/Home/Navbar/DrawerAppBar";
import Footer from "../components/Footer/Footer";
import ReturnPortfolio from "../components/ReturnPortfolio/ReturnPortfolio";

const MainLayout = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <div className="relative">
      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      !location.pathname.startsWith("/payment/") ? (
        <div>
          <ReturnPortfolio />
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
