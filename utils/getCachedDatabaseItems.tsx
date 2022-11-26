import { DatabaseQueryOption, getDatabaseItems } from "cms/notion";
import fs from "fs";
import path from "path";

const OPTION_QUERY = "option";

export const getCachedDatabaseItems = async (
  databaseId: string,
  option?: DatabaseQueryOption
) => {
  if (process.env.NODE_ENV === "development")
    return await getDatabaseItems(databaseId, option);

  const cacheKey = new URLSearchParams({});

  if (option) cacheKey.append(OPTION_QUERY, JSON.stringify(option));

  const CACHE_PATH = path.join(
    __dirname,
    `.collection${
      cacheKey.has(OPTION_QUERY) ? `?${cacheKey.toString()}` : ""
    }.json`
  );

  let cachedData: Awaited<ReturnType<typeof getDatabaseItems>> = [];

  try {
    const fileData = fs.readFileSync(CACHE_PATH, "utf-8");
    cachedData = JSON.parse(fileData);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }

  if (!cachedData.length) {
    cachedData = await getDatabaseItems(databaseId, option);

    try {
      if (!fs.existsSync(CACHE_PATH)) {
        fs.writeFileSync(CACHE_PATH, JSON.stringify(cachedData));
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  return cachedData;
};
