import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import { RxUpdate } from "react-icons/rx";

import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { IoMdEye } from "react-icons/io";
import Swal from "sweetalert2";

const MyCourses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // console.log(user?.email);

  const {
    data: courses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["courses.email"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/user/${user.email}`);
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/courses/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id, {
          onSuccess: (data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your course has been deleted.",
                icon: "success",
              });
            }
            refetch();
          },
        });
      }
    });
  };
  return (
    <div>
      <div className="text-center lg:pt-0 text-2xl md:text-4xl font-bold md:pb-5">
        My Courses
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Title</th>
                <th>Instructor</th>
                <th>Email</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {courses?.map((course) => (
              <tbody key={course._id} className="">
                <tr className="text-center">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask w-20 h-16">
                          <img
                            src={course.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{course.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="w-24">{course.instructor}</td>
                  <td>{course.email}</td>
                  <td>
                    <div className="line-clamp-2">{course.description}</div>
                  </td>
                  <td>${course.price}</td>
                  <td>{course.status}</td>
                  <td>
                    <div className="flex flex-col justify-center items-center gap-y-2">
                      <Link to={`/dashboard/update/${course._id}`}>
                        <Tooltip title="Update" placement="right">
                          <button className="text-green-600 hover:bg-green-500 hover:text-white hover:p-1 hover:rounded-full">
                            <RxUpdate></RxUpdate>
                          </button>
                        </Tooltip>
                      </Link>
                      <Tooltip title="Delete" placement="right">
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-red-600 hover:bg-red-500 hover:text-white hover:p-1 hover:rounded-full">
                          <RxCross2></RxCross2>
                        </button>
                      </Tooltip>

                      <Tooltip title="Details" placement="right">
                        <Link to={`/dashboard/myCourses/${course._id}`}>
                          <button
                            className="text-[#1c539f] hover:bg-[#1c539f] hover:text-white hover:p-1 hover:rounded-full">
                            <IoMdEye></IoMdEye>
                          </button>
                        </Link>
                      </Tooltip>
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

export default MyCourses;
