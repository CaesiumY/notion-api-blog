import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingSpinner = () => {
  return (
    <span className="animate-spin">
      <AiOutlineLoading3Quarters size={"4rem"} />
    </span>
  );
};

export default LoadingSpinner;
