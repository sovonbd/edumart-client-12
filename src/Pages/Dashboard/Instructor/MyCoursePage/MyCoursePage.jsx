import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useSwal from "../../../../hooks/useSwal";
import Loading from "../../../../components/Loading/Loading";

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

const MyCoursePage = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (item) => {
      const res = await axiosSecure.post("/assignments", item);
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        useSwal("Assignment Created !!!", "success");
      }
      handleClose();
    },
  });

  const {
    data: assignments = [],
    isLoading: assignmentsLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`);
      return res.data;
    },
  });

  console.log(assignments);

  // const { data: assignmentName, isLoading: nameLoading } = useQuery({
  //   queryKey: ["assignmentName"],
  //   queryFn: async (name) => {
  //     const res = await axiosSecure.get(`/assignments/${name}`);
  //     return res.data;
  //   },
  // });

  // console.log(assignmentName);

  const onSubmit = (data) => {
    // console.log(dayjs(data.date.$d).format("MMM D, YYYY"));
    const assignment = {
      courseId: id,
      title: data.title,
      deadline: dayjs(data.date.$d).format("MMM DD, YYYY"),
      description: data.description,
    };
    console.log(assignment);
    mutate(assignment);
    refetch();
  };

  if (isLoading || assignmentsLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="stats divide-y-2 md:divide-y-0 shadow flex flex-col w-max mx-auto md:flex-row ">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current text-[#1c539f]">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="stat-title text-sm ">Total Enrollment</div>
            <div className="stat-value">{courses?.numOfTotalEnrollment}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current text-[#1c539f]">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <div className="stat-title text-sm">Total Assignments</div>
            <div className="stat-value">{assignments?.result?.length}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current text-[#1c539f]">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4 "></path>
              </svg>
            </div>
            <div className="stat-title text-sm">Total Submission Received</div>
            <div className="stat-value">{assignments.result1}</div>
          </div>
        </div>
        <div className="text-center py-10">
          <Button onClick={handleOpen} variant="contained">
            <IoMdAdd className="mr-2 text-xl font-bold" />
            Create Assignment
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
                  required
                  fullWidth
                  id="title"
                  label="Assignment Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-red-500">Title is required</span>
                )}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(newValue) => {
                      setValue("date", newValue);
                    }}
                    sx={{ width: "100%" }}
                    label="Assignment Deadline"
                  />
                </LocalizationProvider>
                {errors.date && (
                  <span className="text-red-500">Date is required</span>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Assignment description"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-red-500">Image Url is required</span>
                )}

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
                  Create
                </Button>
              </Box>
            </Fade>
          </Modal>
        </div>
        <div></div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-[100%] lg:w-2/3 mx-auto bg-gray-100 ">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Deadline</th>
              <th>Description</th>
              <th>Today&apos;s Submission</th>
              <th>Total Submission</th>
            </tr>
          </thead>
          {assignments?.result?.map((assignment) => (
            <tbody key={assignment._id} className="">
              <tr className="text-center">
                <td>
                  <div>
                    <div className="font-bold lg:w-24">{assignment.title}</div>
                  </div>
                </td>
                <td className="lg:w-32">{assignment.deadline}</td>
                <td>
                  <div className="line-clamp-2">{assignment.description}</div>
                </td>
                <td>{assignment.submitted || 0}</td>
                <td>{assignment?.submitted || 0}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyCoursePage;
