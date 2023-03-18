"use client";

import { COLOR_TABLE } from "const/const";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

interface TagItemProps {
  name: string;
  color: keyof typeof COLOR_TABLE;
}

const TagItem = ({ name, color }: TagItemProps) => {
  const { push, prefetch } = useRouter();

  const pathToTagName = `/tags/${name.toLowerCase()}`;

  const onClick = () => {
    push(pathToTagName);
  };

  useEffect(() => {
    prefetch(pathToTagName);
  }, [prefetch, pathToTagName]);

  return (
    <button
      className="rounded-xl border px-2 py-1 hover:-translate-y-1 hover:shadow-md transition-all duration-300 font-light text-sm"
      style={{
        backgroundColor: COLOR_TABLE[color],
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default TagItem;
