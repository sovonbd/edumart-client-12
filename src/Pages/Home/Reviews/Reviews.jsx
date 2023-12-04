import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "@mui/material";

const Reviews = () => {
  const intervalRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });

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

  // component loading

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div
      className="bg-gray-100 py-10 lg:py-20 text-center my-20"
      data-aos="fade-up">
      <div className="w-full lg:w-2/3 mx-auto">
        <div className="">
          <h3 className="text-2xl lg:text-4xl font-medium text-center">
            What our learners say
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
                key={review._id}
                className="p-6 m-2 space-y-2 border text-center bg-gray-50 flex flex-col items-center justify-center relative rounded-md">
                <img
                  src={review.image}
                  className="w-20 h-16 rounded-full"
                  alt={review.name}
                />
                <h3 className=" pb-4">{review.name}</h3>
                <Rating
                  name="half-rating-read"
                  defaultValue={review.rating}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                <p className="text-lg font-bold pb-4">{review.title}</p>
                <p className="line-clamp-3 text-sm font-serif font-extralight italic">
                  {review.description}
                </p>
              </div>
            ))}
          </Glider>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
