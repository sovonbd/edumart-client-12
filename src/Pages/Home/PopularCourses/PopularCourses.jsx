import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import PopularCoursesCard from "./PopularCoursesCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Keyboard, Pagination, Navigation } from "swiper/modules";

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
  // console.log(courses);
  if (isLoading) {
    return <Loading></Loading>;
  }

  const sortCourse = courses.sort(
    (a, b) => b.numOfTotalEnrollment - a.numOfTotalEnrollment
  );
  // console.log(sortCourse);

  return (
    <div className="px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {sortCourse.map((course) => (
          <PopularCoursesCard
            key={course.courseId}
            course={course}></PopularCoursesCard>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
