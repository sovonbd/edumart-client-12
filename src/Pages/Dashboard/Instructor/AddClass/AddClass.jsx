import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useSwal from "../../../../hooks/useSwal";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (item) => {
      const res = await axiosSecure.post("/courses", item);
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
    // const imageFile = { image: data.image[0] };

    // // console.log(data);
    // const res = await axios.post(image_hosting_api, imageFile, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });

    // console.log(res.data.data);

    const course = {
      title: data.title,
      instructor: user?.displayName,
      email: user?.email,
      price: parseInt(data.price),
      description: data.description,
      image: data.image,
      instructorImage: user?.photoURL,
      status: "Pending",
      numOfTotalEnrollment: 0,
    };

    // console.log(course);
    mutate(course);
  };

  return (
    <div>
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

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1, width: { xs: "100%", sm: "80%", md: "50%" } }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Course Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-red-500">Title is required</span>
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
                  autoFocus
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-red-500">Price is required</span>
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
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-red-500">Image Url is required</span>
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
                  {...register("image", { required: true })}
                />

                {/* <div className="pb-2">
                  <input
                    {...register("image", { required: true })}
                    type="file"
                  />
                </div> */}
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
                  Submit for Review
                  {/* {userData.status === "Rejected"
                    ? "Request Another"
                    : "Submit for Review"} */}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddClass;
