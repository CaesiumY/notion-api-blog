import type { GetStaticProps } from "next";
import Image from "next/image";
import { getDatabaseItems } from "../cms/notion";
import CardList from "../components/card/CardList";
import PageHead from "../components/common/PageHead";
import HeroSection from "../components/Intro/HeroSection";
import styles from "../styles/Home.module.css";
import { CardData } from "../types/types";
import { parseDatabaseItems } from "../utils/parseDatabaseItems";

interface HomeProps {
  data: CardData[];
}

const Home = ({ data }: HomeProps) => {
  return (
    <>
      <PageHead />
      <HeroSection />

      <section className="m-4 min-h-[50vh] max-w-4xl mx-auto">
        <CardList data={data} />
      </section>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  return {
    props: {
      data: parsedData,
    },
  };
};
