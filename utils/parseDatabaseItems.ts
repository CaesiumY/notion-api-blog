import { getDatabaseItems } from "../cms/notion";
import { CardData, IconType } from "../types/types";

export const parseDatabaseItems = (
  databaseItems: Awaited<ReturnType<typeof getDatabaseItems>>
) =>
  databaseItems.reduce<CardData[]>((acc, item) => {
    if (!("properties" in item)) return acc;

    const { id } = item;
    const { Description, Published, Tags, 이름 } = item.properties;

    const cover =
      item.cover?.type === "external"
        ? item.cover.external.url
        : item.cover?.file
        ? item.cover.file.url
        : "";

    const title = 이름?.type === "title" ? 이름.title[0].plain_text : "";
    const description =
      Description?.type === "rich_text"
        ? Description.rich_text[0]?.plain_text ?? ""
        : "";
    const published =
      Published?.type === "date" ? Published.date?.start ?? "" : "";
    const tags = Tags.type === "multi_select" ? Tags.multi_select : [];

    const lastEditedTime = item.last_edited_time;

    let parsedIcon: IconType = null;

    if (item.icon?.type === "emoji") {
      parsedIcon = { type: "emoji", emoji: item.icon.emoji };
    } else if (item.icon) {
      parsedIcon = {
        type: "url",
        url:
          item.icon?.type === "external"
            ? item.icon.external.url
            : item.icon.file.url,
        proxyUrl: `api/getImage/icon?${new URLSearchParams({
          id,
          lastEditedTime,
        })}`,
      };
    }

    acc.push({
      id,
      icon: parsedIcon,
      cover,
      title,
      description,
      published,
      tags,
      lastEditedTime,
    });

    return acc;
  }, []);
