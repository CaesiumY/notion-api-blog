import {
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PreviewImageType } from "utils/previewImage";

export type IconType =
  | {
      type: "emoji";
      emoji: string;
    }
  | {
      type: "url";
      url: string;
      proxyUrl: string;
    }
  | null;

export interface CardData {
  id: string;
  cover: string;
  title: string;
  description: string;
  published: string;
  icon: IconType;
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
  lastEditedTime: string;
  preview?: PreviewImageType;
}
