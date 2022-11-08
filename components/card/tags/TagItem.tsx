import { COLOR_TABLE } from "const/const";
import React from "react";

interface TagItemProps {
  name: string;
  color: keyof typeof COLOR_TABLE;
}

const TagItem = ({ name, color }: TagItemProps) => {
  return (
    <li>
      <button
        className="rounded-xl border px-2 py-1 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        style={{
          backgroundColor: COLOR_TABLE[color],
        }}
      >
        {name}
      </button>
    </li>
  );
};

export default TagItem;
