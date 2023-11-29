import { Button, Rating } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const PopularCoursesCard = ({ course }) => {
  const {
    courseId,
    title,
    instructor,
    instructorImage,
    ratings,
    numOfRatingProviders,
    numOfTotalEnrollment,
    price,
    image,
    description,
  } = course;

  const location = useLocation();
  // console.log(location);

  return (
    <div className="space-y-2 shadow-md rounded-md p-3 hover:scale-105 hover:shadow-lg border-[1px] hover:duration-300 mx-2">
      <img src={image} className="w-[100%] lg:h-48 rounded-md" alt="" />
      <h3 className="font-bold line-clamp-2 h-12">{title}</h3>
      {location.pathname === "/allClasses" ? (
        <p className="line-clamp-2 text-sm text-gray-500">{description}</p>
      ) : (
        ""
      )}
      <div className="flex items-center gap-1">
        <img
          src="https://i.ibb.co/sHYFL9Z/pngwing-com-6.png"
          className="w-10 h-10 border-2 border-gray-400 p-1 rounded-full"
          alt=""
        />
        <small>{instructor}</small>
      </div>
      {/* <p>({numOfRatingProviders})</p> */}
      <p className="flex items-center gap-1">
        <span className="font-bold">{ratings}</span>
        <Rating
          name="half-rating-read"
          defaultValue={ratings}
          precision={0.5}
          size="small"
          readOnly
        />
        <small>({numOfRatingProviders.toLocaleString()}+ reviews)</small>
      </p>

      {location.pathname === "/allClasses" ? (
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-bold">
              {numOfTotalEnrollment.toLocaleString()}
            </span>{" "}
            already enrolled
          </p>
          <div>
            <Link to={`${courseId}`}>
              <Button variant="contained" sx={{ width: "100%" }}>
                Enroll for ${price}
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="font-bold">${price}</p>
      )}
    </div>
  );
};

export default PopularCoursesCard;
