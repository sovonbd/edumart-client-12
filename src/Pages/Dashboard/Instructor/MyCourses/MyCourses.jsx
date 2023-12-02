import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";

import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSwal from "../../../../hooks/useSwal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  maxHeight: "600px",
};
const MyCourses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(user?.email);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses.email"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/user/${user.email}`);
      return res.data;
    },
  });

  console.log(courses);

  const { mutate } = useMutation({
    mutationFn: async (item) => {
      const res = await axiosSecure.patch("/courses", item);
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        useSwal("Your course updated !!!", "success");
      }
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const onSubmit = (data) => {
    const course = {
      title: data.title,
      price: parseInt(data.price),
      description: data.description,
      image: data.image,
    };
    mutate(course);
  };
  const handleDelete = () => {};
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
                      <Tooltip title="Update" placement="right">
                        <button
                          onClick={handleOpen}
                          className="text-green-600 hover:bg-green-500 hover:text-white hover:p-1 hover:rounded-full"

                          // handleAccept(course._id)
                          // disabled={
                          //   instructor.status === "Accepted" ||
                          //   instructor.status === "Rejected"
                          // }
                        >
                          <RxUpdate></RxUpdate>
                        </button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description">
                          <Box sx={style}>
                            <Box
                              component="form"
                              noValidate
                              onSubmit={handleSubmit(onSubmit)}
                              sx={{
                                mt: 1,
                              }}>
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Course Title"
                                name="title"
                                autoComplete="title"
                                defaultValue={course.title}
                                autoFocus
                              />
                              {errors.title && (
                                <span className="text-red-500">
                                  Title is required
                                </span>
                              )}
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="instructor"
                                label="Your Name"
                                name="instructor"
                                autoComplete="instructor"
                                defaultValue={user?.displayName || ""}
                                autoFocus
                                disabled
                              />
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Your Email"
                                name="email"
                                autoComplete="email"
                                defaultValue={user?.email || ""}
                                autoFocus
                                disabled
                              />
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="price"
                                label="Course price"
                                name="price"
                                autoComplete="price"
                                defaultValue={course.price}
                                autoFocus
                              />
                              {errors.price && (
                                <span className="text-red-500">
                                  Price is required
                                </span>
                              )}
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Course description"
                                name="description"
                                autoComplete="description"
                                autoFocus
                                defaultValue={course.description}
                              />
                              {errors.description && (
                                <span className="text-red-500">
                                  Image Url is required
                                </span>
                              )}
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="image"
                                label="Image Url"
                                name="image"
                                autoComplete="image"
                                autoFocus
                                defaultValue={course.image}
                              />

                              {errors.image && (
                                <span className="text-red-500">
                                  User image is required <br />
                                </span>
                              )}

                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}>
                                {" "}
                                Update
                              </Button>
                            </Box>
                          </Box>
                        </Modal>
                      </Tooltip>
                      <Tooltip title="Delete" placement="right">
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-red-600 hover:bg-red-500 hover:text-white hover:p-1 hover:rounded-full"
                          // disabled={
                          //   instructor.status === "Accepted" ||
                          //   instructor.status === "Rejected"
                          // }
                        >
                          <RxCross2></RxCross2>
                        </button>
                      </Tooltip>
                      <Link to={`/dashboard/myCourses/${course._id}`}>
                        <Tooltip title="Details" placement="right">
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="text-[#1c539f] hover:bg-[#1c539f] hover:text-white hover:p-1 hover:rounded-full"
                            // className={
                            //   course.status === "Accepted" ||
                            //   course.status === "Rejected"
                            //     ? "bg-gray-300 text-white rounded-full p-1"
                            //     : "border-2 border-red-400 text-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white hover:border-none"
                            // }
                            // disabled={
                            //   instructor.status === "Accepted" ||
                            //   instructor.status === "Rejected"
                            // }
                          >
                            <IoMdEye></IoMdEye>
                          </button>
                        </Tooltip>
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

export default MyCourses;
