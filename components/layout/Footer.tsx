import React from "react";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-white">
      <div className="flex flex-row flex-wrap justify-around items-center max-w-5xl mx-auto">
        <a href="mailto:dev.caesiumy@gmail.com" className="hover:underline">
          dev.caesiumy@gmail.com
        </a>
        <p className="hover:underline">&copy;Caesiumy</p>
        <div>
          <ul className="flex flex-row flex-wrap justify-center items-center gap-2">
            <li className="hover:text-white/50">
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                <span>
                  <AiFillGithub size="2rem" />
                </span>
              </a>
            </li>
            <li className="hover:text-white/50">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <span>
                  <AiOutlineInstagram size="2rem" />
                </span>
              </a>
            </li>
            <li className="hover:text-white/50">
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <span>
                  <AiOutlineYoutube size="2rem" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
