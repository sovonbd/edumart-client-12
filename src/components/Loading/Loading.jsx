import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loadingAnimation.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="w-1/2 md:w-1/4 mx-auto"></Lottie>
    </div>
  );
};

export default Loading;
