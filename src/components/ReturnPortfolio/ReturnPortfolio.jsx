import { Link } from "react-router-dom";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const ReturnPortfolio = () => {
  return (
    <div className="bg-black p-2 z-50 relative text-white text-center">
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
