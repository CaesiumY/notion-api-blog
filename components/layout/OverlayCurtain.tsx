import React from "react";

interface OverlayCurtainProps {
  onClick: () => void;
}

const OverlayCurtain = ({ onClick }: OverlayCurtainProps) => {
  return (
    <div
      className="z-40 fixed top-0 bottom-0 left-0 right-0 bg-black/60"
      onClick={onClick}
    />
  );
};

export default OverlayCurtain;
