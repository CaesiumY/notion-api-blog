import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem 1rem",
              textAlign: "center",
              width: "75%",
              background: "white",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "1.5rem",
            }}
          >
            <h1
              style={{
                background:
                  "linear-gradient(90deg, rgba(6,182,212,1) 0%, rgba(59,130,246,1) 100%)",
                backgroundClip: "text",
                fontFamily: "Pretendard Black",
                padding: "1rem",
                color: "transparent",
                fontSize: "96px",
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
