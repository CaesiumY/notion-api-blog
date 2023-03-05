import Image from "next/image";
import { IconType } from "types/types";

interface IconRendererProps {
  icon: IconType;
}

const IconRenderer = ({ icon }: IconRendererProps) => {
  if (!icon) return null;

  if (icon.type === "emoji") return <span>{icon.emoji}</span>;

  return (
    <span className="mr-2 inline-block">
      <Image
        src={icon.proxyUrl}
        alt="icon"
        width={24}
        height={24}
        className="rounded-full overflow-hidden"
      />
    </span>
  );
};

export default IconRenderer;
