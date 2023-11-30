import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import {
  FaCode,
  FaDownload,
  FaFacebook,
  FaInstagram,
  FaMobileAlt,
  FaTwitter,
} from "react-icons/fa";
import { LuMonitorPlay } from "react-icons/lu";
import { RiArticleLine } from "react-icons/ri";
import { FaTrophy } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const CoursePage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  console.log(id);



  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/${id}`);
      setLoading(false);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  console.log(courses);

  if (!courses || courses.length === 0) {
    return <div>No courses found</div>;
  }

  const {
    _id,
    courseId,
    title,
    instructor,
    instructorImage,
    ratings,
    numOfRatingProviders,
    numOfTotalEnrollment,
    price,
    image,
    description,
  } = courses;

  return (
    <div className="md:px-6 lg:px-11 lg:w-4/5 mx-auto my-20">
      <section className="body-font overflow-hidden">
        <div>
          <div className="flex justify-center items-center gap-10 flex-col md:flex-row ">
            <img
              alt=""
              className="md:w-1/2 lg::w-2/5 rounded border border-gray-200"
              src={image}
            />
            <div className="lg:w-2/3 p-6 md:p-3 lg:px-10 lg:py-6 mt-6 md:mt-0 bg-gray-100">
              <h1 className="text-gray-900 text-xl lg:text-3xl title-font font-medium mb-1">
                {title}
              </h1>
              <div className="flex">
                <p className="flex flex-col md:flex-row items-center gap-x-1 gap-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">{ratings}</span>
                    <Rating
                      name="half-rating-read"
                      defaultValue={ratings}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                  </div>
                  <small>
                    ({numOfRatingProviders?.toLocaleString()}+ reviews)
                  </small>
                </p>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 gap-3">
                  <Link href="/" rel="noreferrer" target="_blank">
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="text-gray-500 hover:text-blue-600 cursor-pointer text-lg"></FaFacebook>
                  </Link>
                  <Link href="/" rel="noreferrer" target="_blank">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="text-gray-500 hover:text-pink-600 text-center cursor-pointer text-lg"></FaInstagram>
                  </Link>
                  <Link href="/" rel="noreferrer" target="_blank">
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="text-gray-500 hover:text-blue-600 cursor-pointer text-lg"></FaTwitter>
                  </Link>
                </span>
              </div>
              <p className="text-sm mt-2 md:mt-0 mb-4">
                <span className="font-bold">
                  {numOfTotalEnrollment?.toLocaleString()}
                </span>{" "}
                already enrolled
              </p>
              <div className="space-y-1 pb-4 border-b-2 border-gray-200 mb-3">
                <p className="font-bold">Created By</p>
                <div className="flex items-center gap-1">
                  <img
                    src="https://i.ibb.co/sHYFL9Z/pngwing-com-6.png"
                    className="w-10 h-10 border-2 border-gray-400 p-1 rounded-full"
                    alt=""
                  />
                  <small>{instructor}</small>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="title-font font-bold text-2xl ">${price}</span>
                <div>
                  <Link to={`/payment/${_id}`}>
                    <Button variant="contained" sx={{ width: "100%" }}>
                      Pay Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-10 space-y-10 px-6 md:px-0">
        <div className="flex flex-col md:flex-row gap-8 md:divide-x-2">
          <div className="flex-1 text-justify">{description}</div>
          <div className="flex-1 md:pl-8">
            <h3 className="font-bold text-xl lg:text-2xl">
              This Course includes:
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between py-4 gap-4">
              <p className="flex items-center gap-2">
                <LuMonitorPlay />
                62 hours on-demand video
              </p>
              <p className="flex items-center gap-2">
                <FaDownload></FaDownload> 118 downloadable resources
              </p>
              <p className="flex items-center gap-2">
                <FaCode></FaCode> 7 coding exercises
              </p>
              <p className="flex items-center gap-2">
                <FaMobileAlt /> Access on mobile and TV
              </p>
              <p className="flex items-center gap-2">
                <RiArticleLine /> 66 articles
              </p>
              <p className="flex items-center gap-2">
                <FaTrophy></FaTrophy> Certificate of completion
              </p>
            </div>
          </div>
        </div>
        <div className="border-2 rounded-md p-4 lg:p-10">
          <h3 className="font-bold text-xl lg:text-2xl">What you will learn</h3>
          <div className="flex flex-col md:flex-row md:gap-12 p-6 space-y-2 md:space-y-0">
            <ul className="list-disc space-y-2">
              <li>
                Build 16 web development projects for your portfolio, ready to
                apply for junior developer jobs.
              </li>
              <li>
                After the course you will be able to build and design ANY
                website you want.
              </li>
              <li>Work as a freelance web developer.</li>
              <li>Master backend development with Node js.</li>
            </ul>
            <ul className="list-disc space-y-2">
              <li>
                Learn the latest technologies, including Javascript, React, Node
                and even Web3 development.
              </li>
              <li>
                Build fully-fledged websites and web apps for your startup or
                business.
              </li>
              <li>Master frontend development with React</li>
              <li>Learn professional developer best practices.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursePage;
