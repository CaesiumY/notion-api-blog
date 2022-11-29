import CardItem from "components/card/CardItem";
import { GetStaticProps } from "next";
import { CardData } from "types/types";
import { getCachedDatabaseItems } from "utils/getCachedDatabaseItems";
import { parseDatabaseItems } from "utils/parseDatabaseItems";
import { insertPreviewImage } from "utils/previewImage";

interface NotFoundPageProps {
  data: CardData;
}

const NotFoundPage = ({ data }: NotFoundPageProps) => {
  return (
    <section>
      <div className="mx-auto max-w-4xl flex justify-center items-center flex-col gap-4 min-h-screen">
        <div className="mb-8 text-center">
          <h1 className="font-black text-4xl mb-16">404 Not Found!</h1>
          <h2 className="font-extrabold text-4xl">저런! 막다른 길이네요!</h2>
          <p className="text-2xl">대신 이런 글은 어떠세요?</p>
        </div>
        <CardItem data={data} />
      </div>
    </section>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps<NotFoundPageProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await insertPreviewImage(parsedData);

  return {
    props: {
      data: dataWithPreview[0],
    },
    revalidate: 60,
  };
};
