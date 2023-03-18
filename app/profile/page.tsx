import NotionPageRenderer from "app/notion/NotionPageRenderer";
import { getPageContent } from "cms/notion";
import { Metadata } from "next/types";

const getProfileRecordMap = async () => {
  const profilePageId = process.env.PROFILE_ID;
  if (!profilePageId) throw new Error("PROFILE_ID is not defined");
  try {
    const recordMap = await getPageContent(profilePageId);

    return recordMap;
  } catch (error) {
    throw new Error("Error while fetching profile page");
  }
};

const ProfilePage = async () => {
  const recordMap = await getProfileRecordMap();

  return (
    <>
      <section>
        <NotionPageRenderer recordMap={recordMap} />
      </section>
    </>
  );
};

export default ProfilePage;

export const metadata: Metadata = {
  title: "내 프로필",
};

export const revalidate = 600;
