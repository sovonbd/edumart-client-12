import { FaUsers, FaBook, FaUserGraduate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";

import StatAnimation from "../../../hooks/useStatAnimation";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";

const WebsiteStats = () => {
  const axiosPublic = useAxiosPublic();
  const num1 = 4850;
  const num2 = 2850;
  const num3 = 7850;
  const num4 = 1350;

  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/stats");
      return res.data;
    },
  });

  console.log(stats);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-around items-center mx-auto md:gap-5 lg:px-20 my-20 px-6 ">
        <img
          src="https://i.ibb.co/XWC74rW/pngwing-com-13.png"
          className="md:w-1/2"
          alt=""
        />
        <div className="">
          <h1 className="text-2xl text-center lg:text-left lg:text-4xl md:mx-auto font-bold py-4">
            From the Edumart Community
          </h1>
          <div className="grid grid-cols-2 items-end gap-x-3 gap-y-8">
            <div className="">
              <div className="flex items-end gap-3">
                <FaUsers className="md:text-6xl text-[#1c539f] text-5xl" />
                <span className="font-bold text-xl lg:text-4xl">
                  <StatAnimation num={stats.totalUsers} />
                </span>
              </div>
              <p className="lg:text-2xl font-light text-center lg:text-left">
                Total Users
              </p>
            </div>
            <div className="">
              <div className="flex items-end gap-3">
                <FaBook className="lg:text-6xl text-[#1c539f] text-5xl" />
                <span className="font-bold text-xl lg:text-4xl">
                  <StatAnimation num={stats.totalCourses} />
                </span>
              </div>
              <p className="lg:text-2xl font-light text-center lg:text-left">
                Courses Offered
              </p>
            </div>
            <div className="">
              <div className="flex items-end gap-3">
                <FaUserGraduate className="lg:text-6xl text-[#1c539f] text-5xl" />
                <span className="font-bold text-xl lg:text-4xl">
                  <StatAnimation num={stats.totalLearners} />
                </span>
              </div>
              <p className="lg:text-2xl font-light text-center lg:text-left">
                Number of Learners
              </p>
            </div>
            <div className="">
              <div className="flex items-end gap-3">
                <GiTeacher className="lg:text-6xl text-[#1c539f] text-5xl" />
                <span className="font-bold text-xl lg:text-4xl">
                  <StatAnimation num={stats.totalTeachers} />
                </span>
              </div>
              <p className="lg:text-2xl font-light text-center lg:text-left">
                Instructors
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteStats;
