import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";

// import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        // console.log(res.user);
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
          image: res.user?.photoURL,
        };
        // console.log(userInfo);

        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          toast.success("Your registration was successful!!!");
          navigate(from, { replace: true });
        });
      })
      .catch((err) => console.log(err));
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="flex gap-8 justify-center py-2 text-4xl text-gray-400 ">
      <button
        onClick={handleGoogleSignIn}
        className="icon-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {isHovered ? <FcGoogle /> : <FaGoogle />}
      </button>
      <FaFacebook className="  hover:text-blue-600 cursor-pointer" />
      <FaGithub className=" hover:text-black text-center cursor-pointer" />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SocialLogin;
