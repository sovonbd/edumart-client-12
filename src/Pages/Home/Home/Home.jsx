import Banner from "../Banner/Banner";
import PopularCourses from "../PopularCourses/PopularCourses";
import Reviews from "../Reviews/Reviews";
import Sponsors from "../Sponsors/Sponsors";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <PopularCourses></PopularCourses>
      <Sponsors></Sponsors>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
