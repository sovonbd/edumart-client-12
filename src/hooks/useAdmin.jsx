import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user);
  const email = user?.email;

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${email}`);
      console.log(res.data);
      return res.data.admin;
    },
    enabled: !!user,
  });
  return [isAdmin, isLoading];
};

export default useAdmin;
