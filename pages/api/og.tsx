import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Notion Devlog";

    return new ImageResponse(
      (
        <div
          style={{
            fontWeight: 700,
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(90deg, rgba(6,182,212,1) 0%, rgba(59,130,246,1) 100%)",
          }}
        >
          <div tw="flex justify-center items-center py-8 px-4 text-center w-3/4 bg-white shadow-2xl rounded-2xl">
            <h1
              tw="font-black text-8xl mb-2 text-transparent p-8"
              style={{
                background:
                  "linear-gradient(90deg, rgba(6,182,212,1) 0%, rgba(59,130,246,1) 100%)",
                backgroundClip: "text",
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Pretendard Black",
            data: await fetch(
              new URL(
                "../../assets/Pretendard-Black.subset.woff",
                import.meta.url
              )
            ).then((res) => res.arrayBuffer()),
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

export default handler;
