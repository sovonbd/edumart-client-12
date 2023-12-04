import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import useSwal from "../../../../hooks/useSwal";
import useAuth from "../../../../hooks/useAuth";

const UpdateCoursePage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: courseInfo, isLoading } = useQuery({
    queryKey: ["courseInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/${id}`);
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (item) => {
      const res = await axiosSecure.patch(`/courses/${courseInfo._id}`, item);
      // console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      // console.log(data);
      if (data.modifiedCount > 0) {
        useSwal("Your course is updated !!!", "success");
      }
      navigate("/dashboard/myCourses");
      reset();
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
                Update Your Course Information
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
                  defaultValue={courseInfo.title}
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
                  defaultValue={courseInfo.price}
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
                  defaultValue={courseInfo.description}
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
                  defaultValue={courseInfo.image}
                  {...register("image", { required: true })}
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UpdateCoursePage;
