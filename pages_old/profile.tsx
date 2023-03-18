import { getPageContent } from "cms/notion";
import PageHead from "components/common/PageHead";
import NotionPageRenderer from "components/notion/NotionPageRenderer";
import { GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";
import React from "react";

interface ProfilePageProps {
  recordMap: ExtendedRecordMap;
}

const ProfilePage = ({ recordMap }: ProfilePageProps) => {
  return (
    <>
      <PageHead title="내 프로필" />
      <section>
        <NotionPageRenderer recordMap={recordMap} />
      </section>
    </>
  );
};

export default ProfilePage;

export const getStaticProps: GetStaticProps<ProfilePageProps> = async () => {
  const profilePageId = process.env.PROFILE_ID;

  if (!profilePageId) throw new Error("PROFILE_ID is not defined");

  try {
    const recordMap = await getPageContent(profilePageId);

    return {
      props: {
        recordMap,
      },
    };
  } catch (error) {
    throw new Error("Error while fetching profile page");
  }
};
