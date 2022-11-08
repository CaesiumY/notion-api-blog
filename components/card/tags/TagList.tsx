import React from "react";
import { CardData } from "types/types";
import TagItem from "./TagItem";

interface TagListProps {
  tags: CardData["tags"];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <ul className="flex flex-row flex-wrap gap-2">
      {tags.map(({ id, name, color }) => (
        <TagItem key={id} name={name} color={color} />
      ))}
    </ul>
  );
};

export default TagList;
