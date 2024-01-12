import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Tooltip } from "@mui/material";
import { FaCheck, FaLongArrowAltRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import useSwal from "../../../../hooks/useSwal";
import Loading from "../../../../components/Loading/Loading";
import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const DAllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [coursesPerPage, setCoursesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: courses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["courses", currentPage, coursesPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/courses?page=${currentPage}&size=${coursesPerPage}`
      );

      const res1 = await axiosSecure.get("/totalCourses");

      return [res.data.resultAll, res1.data.count];
    },
  });

  const { mutate } = useMutation({
    mutationKey: "updateCourse",
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/courses/${id}`, { status });
      // console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        useSwal("The course status updated !!!", "success");
      }
      refetch();
    },
  });

  const handleAccept = (id) => {
    mutate({ id, status: "Accepted" });
  };

  const handleRefuse = (id) => {
    mutate({ id, status: "Rejected" });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  // pagination
  const numberOfPages = Math.floor(courses[1]/ coursesPerPage);
  const pages = [...Array(numberOfPages).keys()];
  // console.log(pages);

  const handleCoursesPerPage = (e) => {
    // console.log(e.target.value);
    const val = parseInt(e.target.value);
    setCoursesPerPage(val);
    setCurrentPage(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

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
            {courses[0]?.map((course) => (
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
                        onClick={() => handleAccept(course._id)}
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
                        onClick={() => handleRefuse(course._id)}
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
      <div className="text-center flex justify-center items-center">
        <button onClick={handlePrev} className="pr-4">
          <GrFormPrevious />
        </button>
        <button className="space-x-2">
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page + 1)}
              key={page}
              className={`${
                currentPage === page + 1 &&
                "px-3 py-1 hover:bg-gray-400 bg-gray-400 rounded-full my-6"
              } px-3 py-1 hover:bg-gray-400 bg-gray-200 rounded-full my-6`}>
              {page + 1}
            </button>
          ))}
        </button>
        <button onClick={handleNext} className="pl-4 pr-10">
          <GrFormNext />
        </button>
        <select
          value={coursesPerPage}
          onChange={handleCoursesPerPage}
          id=""
          className="bg-gray-200 px-1 py-2 rounded-md">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default DAllClasses;
