import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userInfo = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user,
  });

  console.log(userInfo);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div>
        <h3 className="text-2xl lg:text-4xl font-bold pb-8 text-center md:text-left">
          My Profile
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <img src={userInfo.image} className="w-40 border-2 rounded-md" alt="" />
        <div className="md:text-xl md:space-y-1">
          <h3>
            <span className="font-bold">Name:</span> {userInfo?.name}
          </h3>
          <p>
            <span className="font-bold">Role:</span>{" "}
            {userInfo?.role ? userInfo.role : "Student"}
          </p>
          <p>
            <span className="font-bold">Email:</span> {userInfo?.email}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {userInfo?.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
