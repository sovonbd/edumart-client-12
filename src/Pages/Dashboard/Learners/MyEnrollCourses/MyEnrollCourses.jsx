import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const MyEnrollCourses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // console.log(user?.email);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses._id"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user,
  });

  console.log(courses);
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="">
      <div className="text-center  lg:pt-0 text-2xl md:text-4xl font-bold">
        My Enroll Courses
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-x-8 md:justify-between w-full mx-auto">
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex flex-col md:flex-row gap-1 items-center my-5 bg-gray-100 mx-4 md:mx-0 md:px-5 md:py-3 rounded-md">
            <img
              src={course.image}
              className="md:w-36 rounded-md rounded-b-none md:rounded-b-md"
              alt=""
            />
            <div className="px-3 py-3">
              <h3 className="font-bold">{course.title}</h3>
              <p className="pb-3 text-sm">{course.instructor}</p>
              <div className="pb-2 md:pb-0">
                <Link to={`/dashboard/myEnrollCourses/${course.courseId}`}>
                  <button className="flex items-center gap-1 font-bold text-[#1c539f] hover:underline">
                    Continue to the course{" "}
                    <FaLongArrowAltRight className="text-md mt-[1px]"></FaLongArrowAltRight>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollCourses;
