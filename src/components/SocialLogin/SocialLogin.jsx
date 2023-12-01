import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

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
          phoneNumber: res.user?.phoneNumber || "N/A",
        };
        // console.log(userInfo);
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome back to Edumart !!!",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(from, { replace: true });
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
      <FaFacebook
        onClick={handleGoogleSignIn}
        className="  hover:text-blue-600 cursor-pointer"
      />
      <FaGithub
        onClick={handleGoogleSignIn}
        className=" hover:text-black text-center cursor-pointer"
      />
    </div>
  );
};

export default SocialLogin;
