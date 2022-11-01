import Image from "next/image";
import React from "react";
import idk from "../../public/idk.png";
import {
  AiOutlineHome,
  AiOutlineTags,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";

const NavTable = {
  "/": {
    name: "Home",
    icon: <AiOutlineHome />,
  },
  "/tags": {
    name: "Tags",
    icon: <AiOutlineTags />,
  },
  "/search": {
    name: "Search",
    icon: <AiOutlineSearch />,
  },
  "/profile": {
    name: "Profile",
    icon: <AiOutlineUser />,
  },
};

interface HeaderMenuProps {
  isMenuOpen: boolean;
}

const HeaderMenu = ({ isMenuOpen }: HeaderMenuProps) => {
  const { asPath } = useRouter();

  return (
    <aside
      className={`z-50 bg-white fixed top-0 bottom-0 w-3/5 max-w-sm transition-all duration-500 ${
        isMenuOpen ? "left-0" : "-left-[60%]"
      }`}
    >
      <div className="py-8 flex flex-col h-full">
        <div className="relative w-full h-1/3">
          <Image
            src={idk}
            alt="Profile Image"
            objectFit="contain"
            layout="fill"
          />
        </div>
        <h1 className="text-center font-bold text-2xl">
          <Link href="/profile">
            <a>Caesiumy</a>
          </Link>
        </h1>

        <ul className="mt-8 flex flex-col">
          {Object.entries(NavTable).map(([href, value]) => (
            <li
              key={href}
              className={`text-2xl text-black/70 hover:text-black hover:bg-gray-100 ${
                asPath === href ? "text-black bg-gray-100" : ""
              }`}
            >
              <Link href={href}>
                <a className="flex flex-row gap-2 items-center p-4">
                  <span>{value.icon}</span>
                  {value.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default HeaderMenu;
