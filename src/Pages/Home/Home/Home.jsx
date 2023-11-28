import Banner from "../Banner/Banner";
import BecomeInstructor from "../BecomeInstructor/BecomeInstructor";
import EdumartBusiness from "../EdumartBusiness/EdumartBusiness";
import PopularCourses from "../PopularCourses/PopularCourses";
import Reviews from "../Reviews/Reviews";
import Sponsors from "../Sponsors/Sponsors";
import WebsiteStats from "../WebsiteStats/WebsiteStats";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <Sponsors></Sponsors>
      <PopularCourses></PopularCourses>
      <BecomeInstructor></BecomeInstructor>
      <Reviews></Reviews>
      <WebsiteStats></WebsiteStats>
      <EdumartBusiness></EdumartBusiness>
    </div>
  );
};

export default Home;
