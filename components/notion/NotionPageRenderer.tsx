import React from "react";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import TagItem from "components/card/tags/TagItem";

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
  isProfile?: boolean;
}

const NotionPageRenderer = ({
  recordMap,
  isProfile,
}: NotionPageRendererProps) => {
  const LinkObject = isProfile
    ? {}
    : {
        Link,
      };

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      disableHeader={true}
      showTableOfContents={true}
      previewImages={!!recordMap?.preview_images}
      components={{
        Code,
        Collection,
        Equation,
        Image,
        propertyDateValue: (dateProperty) =>
          dateProperty.data[0][1][0][1].start_date,
        propertySelectValue: ({ option: { id, color, value } }) => (
          <TagItem key={id} color={color} name={value} />
        ),
        ...LinkObject,
      }}
    />
  );
};

export default NotionPageRenderer;
