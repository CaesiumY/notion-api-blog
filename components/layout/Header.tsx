import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import HeaderMenu from "./HeaderMenu";
import OverlayCurtain from "./OverlayCurtain";

const Header = () => {
  const { pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = isMenuOpen ? "isMenuOpen" : "";
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 bg-white/40 backdrop-blur-md">
        <div className="p-4 flex flex-row justify-between items-center max-w-4xl mx-auto">
          <button
            className="p-1 hover:bg-gray-200 rounded-lg"
            onClick={() => setIsMenuOpen(true)}
          >
            <span>
              <AiOutlineMenu size="2rem" />
            </span>
          </button>
          <Link href={"/"}>
            <h1 className="font-extrabold text-2xl cursor-pointer select-none">
              Notion Blog
            </h1>
          </Link>
          <button className="p-1 hover:bg-gray-200 rounded-lg">
            <span>
              <AiOutlineSearch size="2rem" />
            </span>
          </button>
        </div>
      </header>
      <HeaderMenu isMenuOpen={isMenuOpen} />
      {isMenuOpen ? (
        <OverlayCurtain onClick={() => setIsMenuOpen(false)} />
      ) : null}
    </>
  );
};

export default Header;
