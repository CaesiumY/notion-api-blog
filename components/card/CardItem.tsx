import LoadingSpinner from "components/common/LoadingSpinner";
import { DEFAULT_BASE64 } from "const/const";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CardData } from "types/types";
import IconRenderer from "./IconRenderer";
import TagList from "./tags/TagList";

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

  const [iconSrc, setIconSrc] = useState(icon);
  const [isLoading, setIsLoading] = useState(true);

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
          <a>
            <div className="relative pt-[64%] rounded-lg overflow-hidden mb-4">
              <Image
                src={`api/getCover/${id}?lastEditedTime=${lastEditedTime}`}
                alt={title}
                layout="fill"
                objectFit="cover"
                className={`group-hover:scale-110 transition-all duration-300`}
                placeholder="blur"
                onLoad={() => setIsLoading(false)}
                blurDataURL={preview?.dataURIBase64 ?? DEFAULT_BASE64}
              />
              {isLoading ? (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold group-hover:text-blue-500">
                <IconRenderer icon={iconSrc} />
                {title}
              </h2>
              {description ? (
                <p className="text-gray-700">{description}</p>
              ) : null}
              <time className="text-gray-500 font-light text-sm">
                {published}
              </time>
            </div>
          </a>
        </Link>
        <div className="mt-4">
          <TagList tags={tags} />
        </div>
      </article>
    </motion.li>
  );
};

export default CardItem;
