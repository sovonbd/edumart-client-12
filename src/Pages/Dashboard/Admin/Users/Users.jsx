import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import { Tooltip } from "@mui/material";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import useSwal from "../../../../hooks/useSwal";

const Users = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(userInfo);

  const item = { role: "admin" };
  const { mutate } = useMutation({
    mutationFn: async (userName) => {
      const res = await axiosSecure.patch(`/users/${userName}`, item);
      // console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      // console.log(data);
      if (data.result.modifiedCount > 0) {
        useSwal(`${data.name} is Admin now`, "success");
      }
      refetch();
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleAdmin = (userName) => {
    // console.log(userName);
    mutate(userName);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto">
      <div className="text-center lg:pt-0 text-2xl md:text-4xl font-bold md:pb-5">
        Users
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            {userInfo?.map((user) => (
              <tbody key={user._id}>
                <tr className="text-center">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 border-2 p-1 rounded-full">
                          <img src={user.image} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td className="">
                    {user?.role === "admin" ? (
                      <Tooltip title="Admin" placement="top">
                        <button disabled>
                          <MdAdminPanelSettings className="text-2xl text-gray-700 ml-1" />
                        </button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Make Admin" placement="top">
                        <button onClick={() => handleAdmin(user.name)}>
                          <FaUser className="text-xl text-gray-700"></FaUser>
                        </button>
                      </Tooltip>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
