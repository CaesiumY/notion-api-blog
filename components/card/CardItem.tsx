import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardData } from "types/types";
import IconRenderer from "./IconRenderer";
import TagList from "./tags/TagList";

interface CardItemsProps {
  data: CardData;
}

const CardItem = ({ data }: CardItemsProps) => {
  const { id, cover, title, description, published, icon, tags } = data;

  return (
    <li>
      <article className="group">
        <Link href={`/blog/${id}`}>
          <a>
            <div className="relative pt-[64%] rounded-lg overflow-hidden mb-4">
              <Image
                src={cover}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-all duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold group-hover:text-blue-700">
                <IconRenderer icon={icon} />
                {title}
              </h2>
              {description ? (
                <p className="text-gray-700">{description}</p>
              ) : null}
              <time className="text-gray-500 font-light">{published}</time>
            </div>
          </a>
        </Link>
        <div className="mt-4">
          <TagList tags={tags} />
        </div>
      </article>
    </li>
  );
};

export default CardItem;
