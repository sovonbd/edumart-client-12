import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";
import PopularCoursesCard from "./PopularCoursesCard";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PopularCourses = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/courses");
      setLoading(false);
      return res.data.result;
    },
  });
  console.log(courses);

  // component loading

  if (loading) {
    return <Loading></Loading>;
  }

  const sortCourse = courses.sort(
    (a, b) => b.numOfTotalEnrollment - a.numOfTotalEnrollment
  );

  return (
    <div className="px-6 my-20">
      <h3 className="text-2xl lg:text-4xl font-medium text-center md:text-left">
        Start learning with our popular courses
      </h3>
      <p className="text-center md:text-left pt-4 md:pt-0">
        Explore our newest programs, focused on delivering in-demand skills.
      </p>
      <div className="glider-custom-container p-5">
        <Glider
          className="grid gap-6 glider-container"
          hasArrows
          hasDots
          slidesToShow={5}
          slidesToScroll={5}
          responsive={[
            {
              breakpoint: 980,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                itemWidth: 150,
                duration: 0.25,
              },
            },
            {
              breakpoint: 562,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                itemWidth: 150,
                duration: 0.25,
              },
            },
            {
              breakpoint: 320,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                itemWidth: 150,
                duration: 0.25,
              },
            },
          ]}>
          {sortCourse.map((course) => (
            <PopularCoursesCard
              key={course.courseId}
              course={course}></PopularCoursesCard>
          ))}
        </Glider>
      </div>
      <div className="flex justify-center">
        <Link to="/allClasses">
          <button className="flex items-center gap-1 font-bold text-[#1c539f] hover:underline">
            Explore More Courses{" "}
            <FaLongArrowAltRight className="text-lg mt-1"></FaLongArrowAltRight>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularCourses;
