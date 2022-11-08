import React from "react";
import { CardData } from "types/types";
import CardItem from "./CardItem";

interface CardListProps {
  data: CardData[];
}

const CardList = ({ data }: CardListProps) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <CardItem key={item.id} data={item} />
      ))}
    </ul>
  );
};

export default CardList;
