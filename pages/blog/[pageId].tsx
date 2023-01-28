import { getPageContent } from "cms/notion";
import LoadingSpinner from "components/common/LoadingSpinner";
import NotionPageRenderer from "components/notion/NotionPageRenderer";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ExtendedRecordMap } from "notion-types";
import { getCachedDatabaseItems } from "utils/getCachedDatabaseItems";
import { insertPreviewImageToRecordMap } from "utils/previewImage";
import Giscus from "@giscus/react";

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
      <div className="max-w-4xl mx-auto my-8">
        <Giscus
          id="comments"
          term="blog"
          repo="CaesiumY/notion-api-blog"
          repoId="R_kgDOITdSEg"
          category="General"
          categoryId="DIC_kwDOITdSEs4CS0Sk"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="ko"
          loading="lazy"
        />
      </div>
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
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getCachedDatabaseItems(databaseId);

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
