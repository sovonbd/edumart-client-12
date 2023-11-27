import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import PopularCoursesCard from "./PopularCoursesCard";
import Glider from "react-glider";
import "glider-js/glider.min.css";

const PopularCourses = () => {
  const axiosPublic = useAxiosPublic();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios("courses.json")
      .then((res) => {
        setCourses(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const sortCourse = courses.sort(
    (a, b) => b.numOfTotalEnrollment - a.numOfTotalEnrollment
  );

  return (
    <div className="px-6 my-20">
      <div className="my-10">
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
      </div>
    </div>
  );
};

export default PopularCourses;
