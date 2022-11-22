import { getDatabaseItems, getPageContent } from "cms/notion";
import LoadingSpinner from "components/common/LoadingSpinner";
import NotionPageRenderer from "components/notion/NotionPageRenderer";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ExtendedRecordMap } from "notion-types";
import React from "react";
import { insertPreviewImageToRecordMap } from "utils/previewImage";

interface BlogDetailsPageProps {
  recordMap: ExtendedRecordMap;
}

const BlogDetailsPage = ({ recordMap }: BlogDetailsPageProps) => {
  const { isFallback } = useRouter();

  if (isFallback)
    return (
      <section className="h-screen w-full flex justify-center items-center">
        <LoadingSpinner />
      </section>
    );

  return (
    <section>
      <NotionPageRenderer recordMap={recordMap} />
    </section>
  );
};

export default BlogDetailsPage;

export const getStaticProps: GetStaticProps<BlogDetailsPageProps> = async ({
  params,
}) => {
  const pageId = params?.pageId;

  if (!pageId) throw Error("PageId is not defined");

  const recordMap = await getPageContent(pageId.toString());

  const preview_images = await insertPreviewImageToRecordMap(recordMap);

  return {
    props: {
      recordMap: { ...recordMap, preview_images },
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getDatabaseItems(databaseId);

  const paths = databaseItems.map(({ id: pageId }) => ({
    params: {
      pageId,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
