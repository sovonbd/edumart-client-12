import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();

  const onSubmit = async (data) => {
    // console.log(data);
    const name = data.name;
    const number = data.number;
    const email = data.email;
    const password = data.password;

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(res.data.data.display_url);
    const photo = res.data.data.display_url;

    createUser(email, password).then((res) => {
      // console.log(res.user);
      updateUserProfile(name, photo)
        .then(() => {
          const userInfo = {
            name: name,
            phoneNumber : number,
            email: email,
            image: photo,
          };

          axiosPublic.post("/users", userInfo).then((res) => {
            // console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Welcome !!!",
                text: "User registered successfully",
              });
              navigate("/");
            }
          });
        })
        .catch((err) => console.log(err));
    });
    reset();
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: { xl: 18, xs: 0 },
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, p: 4, bgcolor: "primary.main" }}>
            <HowToRegIcon fontSize="large" />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: 600, fontSize: 32, textTransform: "capitalize" }}>
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              autoFocus
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="number"
              label="Phone number"
              name="number"
              autoComplete="number"
              autoFocus
              {...register("number", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">
                Password is required <br />
              </span>
            )}

            <div className="pb-2">
              <input {...register("image", { required: true })} type="file" />
            </div>
            {errors.image && (
              <span className="text-red-500">
                User image is required <br />
              </span>
            )}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="I want to receive inspiration and updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}>
              Sign Up
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already has an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <div className="divider">Or login with</div>
          <SocialLogin></SocialLogin>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
