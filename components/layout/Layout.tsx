import ToTopButton from "components/common/ToTopButton";
import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ToTopButton />
    </>
  );
};

export default Layout;
