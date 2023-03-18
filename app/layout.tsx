import { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import Footer from "./layout/Footer";
import ToTopButton from "./layout/ToTopButton";

import "../styles/globals.css";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import "../styles/notionStyle.scss";
import "pretendard/dist/web/variable/pretendardvariable.css";
import Header from "./layout/Header";

export const metadata: Metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ToTopButton />
      </body>
    </html>
  );
}
