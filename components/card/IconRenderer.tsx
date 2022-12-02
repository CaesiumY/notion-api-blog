import Image from "next/image";
import React from "react";
import { CardData } from "types/types";

interface IconRendererProps {
  icon: CardData["icon"];
}

const IconRenderer = ({ icon }: IconRendererProps) => {
  if (!icon) return null;

  if (icon.type === "emoji") return <span>{icon.emoji}</span>;

  return (
    <span className="mr-2 align-middle">
      <Image
        // for the limit of the free plan, we should turn off the next/image optimization :(
        unoptimized
        src={icon.type === "external" ? icon.external.url : icon.file.url}
        alt="icon"
        width={24}
        height={24}
        className="rounded-full overflow-hidden"
      />
    </span>
  );
};

export default IconRenderer;
