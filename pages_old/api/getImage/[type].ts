import { getPageItem } from "cms/notion";
import got from "got";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseDatabaseItems } from "utils/parseDatabaseItems";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, id } = req.query;

  if (!id) throw new Error("No id provided");

  const pageItem = await getPageItem(id.toString());
  const { cover, icon } = parseDatabaseItems([pageItem])[0];

  let url = "";

  switch (type) {
    case "cover":
      url = cover;
      break;
    case "icon":
      url = icon?.type === "url" ? icon.url : "";
      break;
    default:
      throw new Error("No type provided");
  }

  const response = await got(url, { responseType: "buffer" });
  const contentType = response.headers["content-type"];

  if (!contentType) throw new Error("No content-type in response headers");

  res.setHeader("Content-Type", contentType);

  res.send(response.body);
};

export default handler;
