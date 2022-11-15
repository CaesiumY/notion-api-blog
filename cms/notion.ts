import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export const propertyTable = {
  Public: "Public",
  Published: "Published",
};

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabaseItems = async (databaseId: string) => {
  const databaseItems = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: propertyTable.Public,
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: propertyTable.Published,
        direction: "descending",
      },
    ],
  });

  return databaseItems.results;
};

export const getPageItem = async (pageId: string) => {
  const pageItem = await notion.pages.retrieve({
    page_id: pageId,
  });

  return pageItem;
};

export const reactNotionApi = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const recordMap = await reactNotionApi.getPage(pageId);

  return recordMap;
};
