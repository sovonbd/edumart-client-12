import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import useSwal from "../../../../hooks/useSwal";
import { Tooltip } from "@mui/material";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [actionButton, setActionButton] = useState(false);
  const {
    data: instructors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/instructors");
      return res.data;
    },
  });
  // console.log(instructors);

  const ItemUser = { role: "Teacher" };
  const itemAccept = { status: "Accepted" };
  const { mutate } = useMutation({
    mutationFn: async (instructorName) => {
      const res1 = await axiosSecure.patch(
        `/users/${instructorName}`,
        ItemUser
      );
      const res2 = await axiosSecure.patch(
        `/instructors/${instructorName}`,
        itemAccept
      );
      // console.log(res.data.result);
      // refetch();
      console.log({ res1, res2 });
      return { res1, res2 };
    },
    onSuccess: (data) => {
      const { res1, res2 } = data;
      if (res2.data.result.modifiedCount > 0 && res1.data.modifiedCount > 0) {
        useSwal(`${res2.data.name} is teacher now!!!`, "success");
      }
      setActionButton(true);
      refetch();
    },
  });

  const itemReject = { status: "Rejected" };
  const { mutate: mutateRefuse } = useMutation({
    mutationFn: async (instructorName) => {
      const res1 = await axiosSecure.patch(
        `/instructors/${instructorName}`,
        itemReject
      );
      console.log(res1.data);
      return res1.data;
    },
    onSuccess: (data) => {
      if (data.result.modifiedCount > 0) {
        useSwal(`${data.name} request is declined!!!`, "error");
      }
      setActionButton(true);
      refetch();
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleAccept = (instructor) => {
    // console.log("clicked", instructor);
    mutate(instructor);
  };

  const handleRefuse = (instructor) => {
    mutateRefuse(instructor);
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
                <th>Name</th>
                <th>Experience</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {instructors.map((instructor) => (
              <tbody key={instructor._id}>
                <tr className="text-center">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={instructor.instructorImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{instructor.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <td>{instructor.experience}</td>
                  <td>{instructor.title}</td>
                  <td>{instructor.category}</td>
                  <td>{instructor.status}</td>
                  <td className="space-y-2 lg:space-y-0 lg:space-x-2">
                    <Tooltip title="Accept" placement="top">
                      <button
                        onClick={() => handleAccept(instructor.instructor)}
                        className={
                          instructor.status === "Accepted" ||
                          instructor.status === "Rejected"
                            ? "bg-gray-300 text-white rounded-full p-1"
                            : "border-2 border-green-500 text-green-500 rounded-full p-1 hover:bg-green-500 hover:text-white hover:border-none"
                        }
                        disabled={
                          instructor.status === "Accepted" ||
                          instructor.status === "Rejected"
                        }>
                        <FaCheck></FaCheck>
                      </button>
                    </Tooltip>
                    <Tooltip title="Reject" placement="top">
                      <button
                        onClick={() => handleRefuse(instructor.instructor)}
                        className={
                          instructor.status === "Accepted" ||
                          instructor.status === "Rejected"
                            ? "bg-gray-300 text-white rounded-full p-1"
                            : "border-2 border-red-400 text-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white hover:border-none"
                        }
                        disabled={
                          instructor.status === "Accepted" ||
                          instructor.status === "Rejected"
                        }>
                        <RxCross2></RxCross2>
                      </button>
                    </Tooltip>
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

export default TeacherRequest;
