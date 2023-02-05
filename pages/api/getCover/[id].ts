import { getPageItem } from "cms/notion";
import got from "got";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const response = await got(cover, { responseType: "buffer" });
  const contentType = response.headers["content-type"];

  if (!contentType) throw new Error("No content-type in response headers");

  res.setHeader("Content-Type", contentType);

  res.send(response.body);
};

export default handler;
