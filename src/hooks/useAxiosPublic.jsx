import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://edumart-server-side-gamma.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
