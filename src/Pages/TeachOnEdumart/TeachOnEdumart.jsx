import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import useSwal from "../../hooks/useSwal";

const TeachOnEdumart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = [], isLoading: queryLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/instructors/${user.displayName}`);
      // if (res.data.message === true) {
      //   setReqSent(true);
      // }
      // console.log(res.data);
      return res.data;
    },
    enabled: !!user.displayName,
  });

  // console.log(userData);
  // console.log(userData?.status);
  // console.log(userData.);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading: mutationLoading } = useMutation({
    mutationFn: async (item) => {
      const res = await axiosSecure.post("/instructors", item);
      // console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        useSwal("Your request sent !!!", "success");
      }
    },
  });

  const onSubmit = async (data) => {
    const item = {
      instructor: data.instructor,
      experience: data.experience,
      title: data.title,
      category: data.category,
      instructorImage: user.photoURL,
      status: "pending",
    };

    await mutate(item);
  };

  if (queryLoading || mutationLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="relative ">
        <img
          className="w-full"
          src="https://i.ibb.co/fnS5vTb/lovely-attractive-redhead-female-glasses-working-project-with-team-member-showing-thumbup-chec.jpg"
          alt=""
        />
        <div className="md:absolute md:top-1/4 lg:top-1/3 lg:right-2/3 md:w-2/5 lg:w-1/5 space-y-2 px-4 py-6 md:py-0">
          <h3 className="text-xl md:text-3xl lg:text-5xl font-bold">
            Come teach with us
          </h3>
          <p className="text-sm md:text-base">
            Become an instructor and change lives — including your own
          </p>
          <Button variant="contained" sx={{ width: "100%" }}>
            Get Started
          </Button>
        </div>
      </div>

      {userData?.status === "pending" ? (
        <div className="flex justify-center items-center h-[60vh]">
          Request Sent
        </div>
      ) : userData?.status === "Accepted" ? (
        <div className="justify-center items-center h-[60vh] flex flex-col space-y-3">
          <p>You are a Teacher in Edumart</p>
          <Link to="/dashboard">
            <Button variant="contained">Go to Your Dashboard</Button>
          </Link>
        </div>
      ) : (
        <div>
          <Grid component="main">
            <CssBaseline />
            <Grid item xs={12} sm={6} md={5} elevation={6} square>
              <Box
                sx={{
                  my: { md: 4, xs: 0 },
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    fontSize: 32,
                    textTransform: "capitalize",
                    my: 2,
                  }}>
                  Fill up the form
                </Typography>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                    width: { xs: "100%", sm: "80%", md: "48%" },
                    textAlign: "center",
                  }}>
                  Having thoroughly completed the form to review, I've realized
                  my passion for education and am now eager to embark on the
                  fulfilling journey of becoming a teacher, nurturing young
                  minds and shaping a brighter future.
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ mt: 1, width: { xs: "100%", sm: "80%", md: "50%" } }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="instructor"
                    label="Your Name"
                    name="instructor"
                    autoComplete="instructor"
                    autoFocus
                    {...register("instructor", { required: true })}
                  />
                  {errors.instructor && (
                    <span className="text-red-500">Name is required</span>
                  )}

                  <FormControl fullWidth margin="normal" required>
                    <InputLabel id="demo-simple-select-label">
                      Your Experience
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="experience"
                      label="Your Experience"
                      name="experience"
                      autoComplete="experience"
                      defaultValue=""
                      autoFocus
                      {...register("experience", { required: true })}>
                      <MenuItem value={"Beginner"}>Beginner</MenuItem>
                      <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                      <MenuItem value={"Experienced"}>Experienced</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.experience && (
                    <span className="text-red-500">Name is required</span>
                  )}

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <span className="text-red-500">Title is required</span>
                  )}
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="Category"
                      name="category"
                      autoComplete="category"
                      defaultValue=""
                      autoFocus
                      {...register("category", { required: true })}>
                      <MenuItem value={"Web Development"}>
                        Web Development
                      </MenuItem>
                      <MenuItem value={"Data Science"}>Data Science</MenuItem>
                      <MenuItem value={"Cybersecurity"}>Cybersecurity</MenuItem>
                      <MenuItem value={"Cloud Computing"}>
                        Cloud Computing
                      </MenuItem>
                      <MenuItem value={"Software Testing"}>
                        Software Testing
                      </MenuItem>
                      <MenuItem value={"Back End Development"}>
                        Back End Development
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {errors.category && (
                    <span className="text-red-500">Category is required</span>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}>
                    {userData.status === "Rejected"
                      ? "Request Another"
                      : "Submit for Review"}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default TeachOnEdumart;
