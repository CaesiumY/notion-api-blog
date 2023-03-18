import TagList from "app/page/card/tags/TagList";
import { POSTS_PER_PAGE } from "const/const";
import { getAllTags } from "utils/getAllTags";
import { getCachedDatabaseItems } from "utils/getCachedDatabaseItems";
import { parseDatabaseItems } from "utils/parseDatabaseItems";
import { insertPreviewImage } from "utils/previewImage";
import CardList from "./page/card/CardList";
import HeroSection from "./page/HeroSection";
import Pagination from "./page/Pagination";

const getHomeRecordMap = async (currentPage = 1) => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAllTags(parsedData);

  const data = dataWithPreview.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  return {
    data,
    allTags,
    totalLength: dataWithPreview.length,
  };
};

interface PageProps {
  params: {
    page?: string;
  };
}

const HomePage = async ({ params }: PageProps) => {
  const currentPage = parseInt(params.page ?? "1", 10);
  const { data, allTags, totalLength } = await getHomeRecordMap(currentPage);

  return (
    <>
      <HeroSection />
      <section className="m-4 min-h-[50vh] max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-8 px-4">
        <aside className="basis-[15%]">
          <div className="p-4 rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold mb-4">Tags</h2>
            <TagList tags={allTags} />
          </div>
        </aside>
        <div className="flex-grow">
          <h3 className="font-bold text-4xl mb-4">Devlog</h3>

          <CardList data={data} />
          <div className="my-4 flex justify-center">
            <Pagination current={currentPage} total={totalLength} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

export const revalidate = 600;
