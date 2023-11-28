import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import Glider from "react-glider";
import "glider-js/glider.min.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

  // Define MAX and INTERVAL constants
  const MAX = reviews.length - 1; // or the maximum number of slides
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

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalRef]);

  useEffect(() => {
    axios("reviews.json")
      .then((res) => {
        setReviews(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(reviews.length);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 py-10 lg:py-20 text-center my-20">
      <div className="w-full lg:w-2/3 mx-auto">
        <div className="">
          <h3 className="text-2xl lg:text-4xl font-medium text-center">
            What our students say
          </h3>
          <p className="text-center md:w-2/3 mx-auto p-4 md:pt-0">
            80% of learners report career benefits, such as new skills,
            increased pay, and new job opportunities.
          </p>
        </div>
        <div className="glider-custom-container p-5">
          <Glider
            className="grid gap-6 glider-container"
            
            hasDots
            slidesToShow={1}
            slidesToScroll={1}
            rewind
            ref={callbackRef}>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 m-2 space-y-2 border text-center bg-gray-50 flex flex-col items-center justify-center relative rounded-md">
                <img
                  src={review.image}
                  className="w-20 h-20 rounded-full"
                  alt={review.name}
                />
                <h3 className="">{review.name}</h3>
                <p className="text-lg font-bold pt-10">{review.title}</p>
                <p className="line-clamp-3">{review.description}</p>
              </div>
            ))}
          </Glider>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
