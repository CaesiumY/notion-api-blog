import { getSearchItems } from "cms/notion";
import type { NextApiRequest, NextApiResponse } from "next";
import { CardData } from "types/types";
import { parseDatabaseItems } from "utils/parseDatabaseItems";

export interface SearchResultType {
  data: CardData[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SearchResultType>
) => {
  const { q } = req.query;

  if (!q) throw new Error("Query is required");

  const query = q.toString();

  const searchItems = await getSearchItems(query);

  const parsedItems = parseDatabaseItems(searchItems);

  res.status(200).json({ data: parsedItems });
};

export default handler;
