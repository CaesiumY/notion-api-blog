import { getDatabaseItems } from "cms/notion";
import CardList from "components/card/CardList";
import TagList from "components/card/tags/TagList";
import PageHead from "components/common/PageHead";
import HeroSection from "components/Intro/HeroSection";
import { GetStaticProps } from "next";
import React from "react";
import { CardData } from "types/types";
import { getAllTags } from "utils/getAllTags";
import { parseDatabaseItems } from "utils/parseDatabaseItems";
import { insertPreviewImage } from "utils/previewImage";

interface TagIndexPageProps {
  data: Record<string, CardData[]>;
  allTags: CardData["tags"];
}

const TagIndexPage = ({ data, allTags }: TagIndexPageProps) => {
  return (
    <>
      <PageHead />
      <HeroSection />
      {allTags.map(({ id, name }) => (
        <section
          key={id}
          className="m-4 min-h-[50vh] max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-8 px-4"
        >
          <aside className="basis-[15%]">
            <div className="p-4 rounded-xl shadow-md border">
              <h2 className="text-2xl font-bold mb-4">Tags</h2>
              <TagList tags={getAllTags(data[name])} />
            </div>
          </aside>
          <div className="flex-grow">
            <h3 className="font-bold text-4xl mb-4">#{name}</h3>

            <CardList data={data[name]} />
          </div>
        </section>
      ))}
    </>
  );
};

export default TagIndexPage;

export const getStaticProps: GetStaticProps<TagIndexPageProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);
  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAllTags(parsedData);

  const dataByTag = allTags.reduce<Record<string, CardData[]>>(
    (acc, { name }) => {
      acc[name] = dataWithPreview
        .filter(({ tags }) => tags.findIndex((tag) => tag.name === name) !== -1)
        .slice(0, 3);
      return acc;
    },
    {}
  );

  return {
    props: {
      data: dataByTag,
      allTags,
    },
    revalidate: 60,
  };
};
