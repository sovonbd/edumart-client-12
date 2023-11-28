import Banner from "../Banner/Banner";
import BecomeInstructor from "../BecomeInstructor/BecomeInstructor";
import PopularCourses from "../PopularCourses/PopularCourses";
import Reviews from "../Reviews/Reviews";
import Sponsors from "../Sponsors/Sponsors";
import WebsiteStats from "../WebsiteStats/WebsiteStats";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <PopularCourses></PopularCourses>
      <Sponsors></Sponsors>
      <Reviews></Reviews>
      <WebsiteStats></WebsiteStats>
      <BecomeInstructor></BecomeInstructor>
    </div>
  );
};

export default Home;
