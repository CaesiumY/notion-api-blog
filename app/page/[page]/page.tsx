import HomePage from "app/page";
import React from "react";

export async function generateStaticParams() {
  return [{ page: "1" }, { page: "2" }];
}

interface PageProps {
  params: {
    page?: string;
  };
}

const PageIndex = async ({ params }: PageProps) => {
  // @ts-ignore
  return <HomePage params={params} />;
};

export default PageIndex;

export const revalidate = 600;
