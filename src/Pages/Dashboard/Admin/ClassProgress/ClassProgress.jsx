import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading/Loading";

const ClassProgress = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: course, isLoading } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/${id}`);
      return res.data;
    },
  });
  // console.log(id);

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // console.log(reviews);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="text-center space-y-1">
        <img src={course.image} className="w-auto mx-auto" alt="" />
        <h3 className="font-bold">Title: {course.title}</h3>
        <p className="text-sm">Instructor: {course.instructor}</p>
      </div>
      <hr className="w-2/3 mx-auto border-gray-400 my-6" />
      <div>
        {reviews?.map((review) => (
          <div
            key={review._id}
            className="relative mb-3 flex flex-col items-center justify-center">
            <img
              src={review.image}
              className="w-24 h-24 rounded-full border-2 p-1 relative top-12 bg-white "
              alt=""
            />
            <div className="bg-gray-100 text-xs text-center py-12 px-10 rounded-full">
              <p>{review.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassProgress;
