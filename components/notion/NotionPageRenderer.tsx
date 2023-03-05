import TagItem from "components/card/tags/TagItem";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { defaultMapImageUrl, NotionRenderer } from "react-notion-x";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);

interface NotionPageRendererProps {
  recordMap: ExtendedRecordMap;
}

const NotionPageRenderer = ({ recordMap }: NotionPageRendererProps) => {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      disableHeader={true}
      showTableOfContents={true}
      previewImages={!!recordMap?.preview_images}
      mapImageUrl={(url, block) => defaultMapImageUrl(url, block) ?? url}
      components={{
        Code,
        Collection,
        Equation,

        nextLink: Link,
        propertyDateValue: (dateProperty) =>
          dateProperty.data[0][1][0][1].start_date,
        propertySelectValue: ({ option }) =>
          option ? (
            <TagItem key={option.id} color={option.color} name={option.value} />
          ) : null,
      }}
    />
  );
};

export default NotionPageRenderer;
