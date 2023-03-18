import { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import CustomScripts from "./layout/CustomScripts";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import ToTopButton from "./layout/ToTopButton";

import "katex/dist/katex.min.css";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";
import "../styles/globals.css";
import "../styles/notionStyle.scss";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <CustomScripts />
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ToTopButton />
      </body>
    </html>
  );
}

const DEFAULT_HEADER = {
  title: "Notion Devlog",
  description: "Next.js와 TypeScript로 만드는 NotionAPI 블로그",
  url: process.env.SITE_URL ?? "https://notion-api-blog-caesiumy.vercel.app",
};

export const metadata: Metadata = {
  title: {
    default: DEFAULT_HEADER.title,
    template: `%s | ${DEFAULT_HEADER.title}`,
  },
  description: DEFAULT_HEADER.description,
  icons: ["/favicon.ico"],
  alternates: {
    canonical: DEFAULT_HEADER.url,
  },
  openGraph: {
    type: "website",
    title: DEFAULT_HEADER.title,
    description: DEFAULT_HEADER.description,
    siteName: DEFAULT_HEADER.title,
    images: [
      {
        url: `${DEFAULT_HEADER.url}/api/og`,
        width: 1200,
        height: 630,
        alt: DEFAULT_HEADER.title,
      },
    ],
    url: DEFAULT_HEADER.url,
    locale: "ko_KR",
  },
};
