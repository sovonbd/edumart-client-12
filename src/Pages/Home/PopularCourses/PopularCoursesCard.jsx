const PopularCoursesCard = ({ course }) => {
  const { title, instructor, ratings, numOfRatingProviders, price, image } =
    course;

  return (
    <div className="space-y-2 shadow-md rounded-md p-2 hover:scale-105 hover:shadow-lg border-[1px] hover:duration-300 mx-2">
      <img
        src={image}
        className="w-[100%] rounded-md"
        alt=""
      />
      <h3 className="font-bold line-clamp-2 h-12">{title}</h3>
      <small>{instructor}</small>
      <p>
        {ratings}({numOfRatingProviders})
      </p>
      <p className="font-bold">${price}</p>
    </div>
  );
};

export default PopularCoursesCard;
