import Banner from "../Banner/Banner";
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
    </div>
  );
};

export default Home;
