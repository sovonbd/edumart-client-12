import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const ReturnPortfolio = () => {
  const location = useLocation();
  return (
    <div
      className={`bg-black p-2  text-white text-center fixed w-full ${
        location.pathname.startsWith("/dashboard") ? "z-90 md:w-11/12" : "z-10"
      }`}>
      <Link
        to="https://sovon-10e71.web.app/"
        className="flex items-center justify-center gap-1">
        <span className="hover:underline">Return to my portfolio</span>{" "}
        <HiOutlineArrowLongRight className="text-2xl" />
      </Link>
    </div>
  );
};

export default ReturnPortfolio;
