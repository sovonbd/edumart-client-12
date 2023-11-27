import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";
import Marquee from "react-fast-marquee";

const Sponsors = () => {
  const axiosPublic = useAxiosPublic();
  const { data: sponsors, isLoading } = useQuery({
    queryKey: ["sponsors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sponsors");
      return res.data;
    },
  });

  console.log(sponsors);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-gray-100 py-10 lg:py-20 my-10 text-center">
      <h3 className="lg:text-2xl font-bold">
        We collaborate with{" "}
        <span className="text-[#1c539f]">
          500+ leading universities and companies
        </span>
      </h3>
      <div>
        <Marquee pauseOnHover={true}>
          <div className="flex lg:gap-11 pt-5 lg:pt-10">
            {sponsors.map((sponsor) => (
              <img
                key={sponsor._id}
                src={sponsor.image}
                className="h-8 pl-8 lg:pl-0 lg:h-10"
                alt=""
              />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Sponsors;
