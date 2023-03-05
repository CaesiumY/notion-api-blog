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
import { motion } from "framer-motion";

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
      className={`z-50 bg-white fixed top-0 left-0 bottom-0 w-3/5 max-w-sm transition-all duration-500 ${
        isMenuOpen ? "" : "-translate-x-[101%]"
      }`}
    >
      <div className="py-8 flex flex-col h-full">
        <motion.div
          className="relative w-full h-1/4 mx-auto"
          initial={{ x: -60 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={idk}
            alt="Profile Image"
            className="object-contain absolute w-full h-full"
          />
        </motion.div>
        <motion.h1
          className="text-center font-bold text-2xl"
          initial={{ x: -60 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/profile">Caesiumy</Link>
        </motion.h1>

        <ul className="mt-8 flex flex-col text-gray-500">
          {Object.entries(NavTable).map(([href, value], index) => (
            <li
              key={href}
              className={`text-xl  hover:text-black hover:bg-gray-100 ${
                asPath === href ? "text-black bg-gray-100" : ""
              }`}
            >
              <Link href={href}>
                <motion.p
                  className="flex flex-row gap-2 items-center px-8 py-6 cursor-pointer"
                  initial={{ x: -60 }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
                >
                  <span>{value.icon}</span>
                  {value.name}
                </motion.p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default HeaderMenu;
