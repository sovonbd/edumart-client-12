import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Tooltip } from "@mui/material";
import { FaCheck, FaLongArrowAltRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const DAllClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      return res.data;
    },
  });

  const handleAccept = () => {};

  const handleRefuse = () => {};

  return (
    <div>
      <div className="text-center lg:pt-0 text-2xl md:text-4xl font-bold md:pb-5">
        Teacher Request
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Title</th>
                <th>Instructor Email</th>
                <th>Description</th>
                <th>Action</th>
                <th>Progress</th>
              </tr>
            </thead>
            {courses?.map((course) => (
              <tbody key={course._id}>
                <tr className="text-center">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask w-20 h-20">
                          <img
                            src={course.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold w-52">{course.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{course.email}</td>
                  <td>
                    <div className="line-clamp-2">{course.description}</div>
                  </td>
                  <td className="space-y-2 lg:space-y-0 lg:space-x-2 w-24">
                    <Tooltip title="Accept" placement="top">
                      <button
                        onClick={() => handleAccept(course.title)}
                        className={
                          course.status === "Accepted" ||
                          course.status === "Rejected"
                            ? "bg-gray-300 text-white rounded-full p-1"
                            : "border-2 border-green-500 text-green-500 rounded-full p-1 hover:bg-green-500 hover:text-white hover:border-none"
                        }
                        disabled={
                          course.status === "Accepted" ||
                          course.status === "Rejected"
                        }>
                        <FaCheck></FaCheck>
                      </button>
                    </Tooltip>
                    <Tooltip title="Reject" placement="top">
                      <button
                        onClick={() => handleRefuse(course.title)}
                        className={
                          course.status === "Accepted" ||
                          course.status === "Rejected"
                            ? "bg-gray-300 text-white rounded-full p-1"
                            : "border-2 border-red-400 text-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white hover:border-none"
                        }
                        disabled={
                          course.status === "Accepted" ||
                          course.status === "Rejected"
                        }>
                        <RxCross2></RxCross2>
                      </button>
                    </Tooltip>
                  </td>
                  <td>
                    <div className="flex justify-center w-max">
                      <Link to={`/dashboard/class/${course._id}`}>
                        <button className="flex items-center gap-1 font-bold text-[#1c539f] hover:underline">
                          See Progress{" "}
                          <FaLongArrowAltRight className="text-lg mt-1"></FaLongArrowAltRight>
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default DAllClasses;
