"use client";

import TagList from "app/page/card/tags/TagList";
import { DEFAULT_BASE64 } from "const/const";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CardData } from "types/types";
import IconRenderer from "./IconRenderer";

interface CardItemsProps {
  data: CardData;
}

const CardItem = ({ data }: CardItemsProps) => {
  const {
    id,
    title,
    description,
    published,
    icon,
    tags,
    preview,
    lastEditedTime,
  } = data;

  const params = new URLSearchParams({
    id,
    lastEditedTime,
  });

  return (
    <motion.li
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
      className="list-none"
    >
      <article className="group">
        <Link href={`/blog/${id}`}>
          <div className="relative pt-[64%] rounded-lg overflow-hidden mb-4">
            <Image
              src={`/api/getImage/cover?${params.toString()}`}
              alt={title}
              className={`group-hover:scale-110 transition-all duration-300 object-cover`}
              placeholder="blur"
              blurDataURL={preview?.dataURIBase64 ?? DEFAULT_BASE64}
              fill
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold group-hover:text-blue-500 flex flex-row items-center">
              <IconRenderer icon={icon} />
              {title}
            </h2>
            {description ? (
              <p className="text-gray-700">{description}</p>
            ) : null}
            <time className="text-gray-500 font-light text-sm">
              {published}
            </time>
          </div>
        </Link>
        <div className="mt-4">
          <TagList tags={tags} />
        </div>
      </article>
    </motion.li>
  );
};

export default CardItem;
