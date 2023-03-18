"use client";

import { SlArrowUp } from "react-icons/sl";

const ToTopButton = () => {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className="fixed bottom-8 right-8 hover:bg-gray-100 p-4"
      onClick={onClick}
    >
      <SlArrowUp size={"2rem"} />
    </button>
  );
};

export default ToTopButton;
