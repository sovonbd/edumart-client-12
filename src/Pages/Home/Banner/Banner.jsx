import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex gap-4 items-center px-3 md:px-8 text-center md:text-left lg:w-4/5 mx-auto my-10">
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl text-center md:text-left lg:text-7xl font-bold">
          Learn without limits
        </h1>
        <p className="text-center md:text-left lg:text-xl">
          Start, switch, or advance your career with the Courses, Professional
          Certificates, and Bootcamps from world-class teachers and
          professionals.
        </p>
        <div>
          <Link to="/register">
            <Button variant="contained">Join for Free</Button>
          </Link>
          <Link to="/allClasses">
            <Button
              variant="outlined"
              sx={{
                ml: 2,
                border: 1,
                px: { xs: 1, sm: 2 },
              }}>
              Try Edumart Courses
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex md:flex-1">
        <img src="https://i.ibb.co/Gx2m6pV/pngwing-com-7.png" alt="" />
      </div>
    </div>
  );
};

export default Banner;
