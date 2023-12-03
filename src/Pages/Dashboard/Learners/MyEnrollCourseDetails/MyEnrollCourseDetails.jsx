import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import { IoEnterOutline } from "react-icons/io5";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Rating,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useSwal from "../../../../hooks/useSwal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 300,
    sm: 600,
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const MyEnrollCourseDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useAuth();
  // console.log(user.displayName, user.photoURL);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/${id}`);
      return res.data;
    },
  });

  // console.log(course);

  const { data: assignments, isLoading } = useQuery({
    queryKey: ["assignment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`);
      return res.data;
    },
  });
  // console.log(assignments);

  const { mutate } = useMutation({
    mutationFn: async (item) => {
      const res = await axiosSecure.post("/reviews", item);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.insertedId) {
        useSwal("Thanks for your review!!!", "success");
      }
      handleClose();
    },
  });

  const item = {
    submitted: 1,
  };
  const { mutate: assignmentSubmit } = useMutation({
    mutationFn: async (assignmentId) => {
      const res = await axiosSecure.patch(`/assignments/${assignmentId}`, item);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        useSwal("Assignment Submitted!!!", "success");
      }
      handleClose();
    },
  });

  if (isLoading || courseLoading) {
    return <Loading></Loading>;
  }

  const onSubmit = (data) => {
    console.log(data);
    const item = {
      courseId: id,
      name: user?.displayName,
      image: user?.photoURL,
      title: course?.title,
      rating: data.rating,
      description: data.description,
    };
    mutate(item);
  };

  const handleAssignmentSubmit = (id) => {
    // console.log(id);

    assignmentSubmit(id);
  };
  return (
    <div>
      <div className="text-center space-y-1">
        <img src={course.image} className="w-auto mx-auto" alt="" />
        <h3 className="font-bold">Title: {course.title}</h3>
        <p className="text-sm">Instructor: {course.instructor}</p>
        <div>
          <Button onClick={handleOpen} variant="contained">
            Evaluate the Course
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}>
            <Fade in={open}>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={style}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="rating"
                  label="provide your ratings here"
                  name="rating"
                  autoComplete="rating"
                  autoFocus
                  {...register("rating", { required: true })}
                />

                {errors.rating && (
                  <span className="text-red-500">Rating is required</span>
                )}

                <TextField
                  margin="normal"
                  fullWidth
                  id="description"
                  label="review the course out of 5"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  {...register("description", { required: true })}
                />

                {errors.description && (
                  <span className="text-red-500">
                    Description is required <br />
                  </span>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}>
                  {" "}
                  Send
                </Button>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
      <hr className="w-2/3 mx-auto border-gray-400 my-6" />
      <div>
        {assignments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-[100%] lg:w-2/3 mx-auto bg-gray-50 ">
              {/* head */}
              <thead>
                <tr className="text-center border-b-2 border-gray-200">
                  <th>Title</th>
                  <th>Deadline</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              {assignments?.map((assignment) => (
                <tbody key={assignment._id} className="">
                  <tr className="text-center">
                    <td>
                      <div>
                        <div className="font-bold lg:w-24">
                          {assignment.title}
                        </div>
                      </div>
                    </td>
                    <td className="lg:w-32">{assignment.deadline}</td>
                    <td>
                      <div className="line-clamp-2">
                        {assignment.description}
                      </div>
                    </td>
                    <td>
                      <Tooltip title="Submit" placement="top">
                        <button
                          onClick={() => handleAssignmentSubmit(assignment._id)}
                          className="text-xl">
                          <IoEnterOutline />
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            No assignments available
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrollCourseDetails;
