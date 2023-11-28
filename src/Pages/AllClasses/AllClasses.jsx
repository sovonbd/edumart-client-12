import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import { RiDoubleQuotesL } from "react-icons/ri";
import PopularCoursesCard from "../Home/PopularCourses/PopularCoursesCard";

const AllClasses = () => {
  const [quotes, setQuotes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

  // Define MAX and INTERVAL constants
  const MAX = quotes.length - 1; // or the maximum number of slides
  const INTERVAL = 2000; // or the interval in milliseconds
  const callbackRef = useCallback(
    (glider) => {
      if (glider) {
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            let index = glider.page;
            if (index < MAX) {
              index += 1;
            } else {
              index = 0;
            }
            glider.scrollItem(index, false);
          }, INTERVAL);
        }
      }
    },
    [MAX]
  );

  // quotes related

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalRef]);

  useEffect(() => {
    axios("quotes.json")
      .then((res) => {
        setQuotes(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // courses related

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

  // component loading

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {/* quotes related */}
      <div className="bg-gray-100 py-10 lg:py-5 text-center mb-20">
        <div className="w-full lg:w-3/5 mx-auto">
          <div className="glider-custom-container p-5">
            <Glider
              className="grid gap-6 glider-container"
              hasDots
              slidesToShow={1}
              slidesToScroll={1}
              rewind
              ref={callbackRef}>
              {quotes.map((quote, idx) => (
                <div
                  key={idx}
                  className="md:px-6 md:py-12 m-2 space-y-6 border text-center bg-gray-50 flex flex-col items-center justify-center relative rounded-md">
                  <p className="italic text-sm px-10 md:w-11/12 font-serif font-extralight">
                    {quote.quote}
                  </p>
                  <RiDoubleQuotesL className="text-3xl" />
                  <h3 className="font-bold">{quote.speaker}</h3>
                </div>
              ))}
            </Glider>
          </div>
        </div>
      </div>

      {/* course related */}
      <div>
        <div className="px-2 md:px-6 my-20">
          <h3 className="text-2xl lg:text-4xl font-medium text-center md:text-left">
            Start learning with our popular courses
          </h3>
          <p className="text-center md:text-left pt-4 md:pt-0">
            Explore our newest programs, focused on delivering in-demand skills.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 gap-y-10 p-5">
            {courses.map((course) => (
              <PopularCoursesCard
                key={course.courseId}
                course={course}></PopularCoursesCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
