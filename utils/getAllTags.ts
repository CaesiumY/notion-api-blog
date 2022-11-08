import { CardData } from "types/types";

export const getAllTags = (data: CardData[]) =>
  data.reduce<CardData["tags"]>((acc, { tags }) => {
    tags.forEach((tag) => {
      if (!acc.find((item) => item.id === tag.id)) {
        acc.push(tag);
      }
    });

    return acc;
  }, []);
