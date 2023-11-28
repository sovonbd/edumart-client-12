import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const EdumartBusiness = () => {
  return (
    <div className="lg:w-2/3 mx-auto my-10 flex flex-col-reverse md:flex-row px-6 justify-center items-center gap-6 lg:gap-16">
      <div className="text-center md:text-left space-y-2 lg:space-y-4 lg:w-2/5">
        <h3 className="text-lg lg:text-3xl">
          <span className="font-bold">Edumart</span>{" "}
          <span className="font-light text-[#1c539f]">business</span>
        </h3>
        <h1 className="font-bold text-2xl lg:text-4xl ">
          Upskill your team with Edumart Business
        </h1>
        <ul className="text-left list-disc px-5 space-y-2 lg:text-lg">
          <li>Unlimited access to top Edumart courses, anytime, anywhere</li>
          <li>International course collection in 14 languages</li>
          <li>Top certifications in tech and business</li>
        </ul>
        <div className="">
          <Link to="/register">
            <Button
              variant="contained"
              sx={{ width: { xs: "100%", sm: "auto" }, my: { xs: 2, md: 0 } }}>
              Get Started Now
            </Button>
          </Link>
          <Link to="/allClasses">
            <Button
              variant="outlined"
              sx={{
                ml: { xs: 0, sm: 2 },
                border: 1,
                px: { xs: 1, sm: 2 },
                width: { xs: "100%", sm: "auto" },
              }}>
              Try Edumart Courses
            </Button>
          </Link>
        </div>
      </div>
      <img
        src="https://i.ibb.co/rpWzj7b/UB-Promo-800x800.jpg"
        className="md:w-2/5"
        alt=""
      />
    </div>
  );
};

export default EdumartBusiness;
