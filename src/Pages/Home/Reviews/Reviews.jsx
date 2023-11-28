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
  const callbackRef = useCallback((glider) => {
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
  }, [MAX]);

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
          slidesToShow={1}
          slidesToScroll={1}
          scrollLock
          ref={callbackRef}
          // responsive={[
          //   {
          //     breakpoint: 980,
          //     settings: {
          //       slidesToShow: 3,
          //       slidesToScroll: 3,
          //       itemWidth: 150,
          //       duration: 0.25,
          //     },
          //   },
          //   {
          //     breakpoint: 562,
          //     settings: {
          //       slidesToShow: 2,
          //       slidesToScroll: 2,
          //       itemWidth: 150,
          //       duration: 0.25,
          //     },
          //   },
          //   {
          //     breakpoint: 320,
          //     settings: {
          //       slidesToShow: 1,
          //       slidesToScroll: 1,
          //       itemWidth: 150,
          //       duration: 0.25,
          //     },
          //   },
          // ]}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-2 m-2 space-y-2 border text-center">
              <img
                src={review.image}
                className="w-20 rounded-full"
                alt={review.name} // Consider using the name as alt text
              />
              <h3>{review.name}</h3>
              <p className="text-lg font-bold">{review.title}</p>
              <p>{review.description}</p>
            </div>
          ))}
        </Glider>
      </div>
    </div>
  );
};

export default Reviews;
