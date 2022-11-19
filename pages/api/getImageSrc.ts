import { getPageItem } from "cms/notion";
import type { NextApiRequest, NextApiResponse } from "next";
import { CardData } from "types/types";

export interface ImageSrcType {
  cover: CardData["cover"];
  icon: CardData["icon"];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ImageSrcType>
) => {
  const { id } = req.query;

  if (!id) throw new Error("No id provided");

  const pageItem = await getPageItem(id.toString());

  if (!("properties" in pageItem)) throw new Error("No properties in pageItem");

  const cover =
    pageItem.cover?.type === "external"
      ? pageItem.cover.external.url
      : pageItem.cover?.file
      ? pageItem.cover.file.url
      : "";

  res.status(200).json({ cover, icon: pageItem.icon });
};

export default handler;
