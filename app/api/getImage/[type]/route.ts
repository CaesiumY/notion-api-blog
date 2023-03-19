import { getPageItem } from "cms/notion";
import got from "got";
import { NextRequest } from "next/server";
import { parseDatabaseItems } from "utils/parseDatabaseItems";

interface GetImageParams {
  params: {
    type: string;
  };
}

export async function GET(request: NextRequest, { params }: GetImageParams) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { type } = params;

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

  return new Response(response.body, {
    headers: {
      "Content-Type": contentType,
    },
  });
}
