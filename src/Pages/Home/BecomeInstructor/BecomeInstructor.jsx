import { Button } from "@mui/material";

const BecomeInstructor = () => {
  return (
    <div
      className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-5 lg:gap-16 lg:px-20 my-20 px-6 lg:w-2/3 mx-auto text-center md:text-left"
      data-aos="fade-up">
      <div>
        <img
          src="https://i.ibb.co/xj9qVHS/pngwing-com-10.png"
          alt=""
          className="w-4/5 md:w-auto mx-auto"
        />
      </div>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold">Become an instructor</h1>
        <p className="text-base md:text-lg">
          Instructors from around the world teach thousands of learners on
          Edumart. We provide the tools and skills to teach what you love.
        </p>
        <Button variant="contained" sx={{ width: { xs: 1, md: "auto" } }}>
          Start teaching today
        </Button>
      </div>
    </div>
  );
};

export default BecomeInstructor;
