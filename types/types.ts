import {
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export interface CardData {
  id: string;
  cover: string;
  title: string;
  description: string;
  published: string;
  icon: PageObjectResponse["icon"];
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
}
