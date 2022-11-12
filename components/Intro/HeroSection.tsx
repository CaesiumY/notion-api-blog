import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section>
      <motion.div
        className="py-16 md:py-36 bg-[length:100%_55%] bg-no-repeat px-4 flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500"
        initial={{
          backgroundSize: "100% 100%",
        }}
        whileInView={{
          backgroundSize: "100% 55%",
        }}
        transition={{
          duration: 1,
        }}
        viewport={{
          once: true,
        }}
      >
        <motion.div
          className="p-8 md:p-16 bg-white rounded-xl shadow-lg text-center"
          initial={{ y: 36, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{
            once: true,
          }}
        >
          <h1 className="font-black text-5xl pb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Notion Devlog
          </h1>
          <p>
            Notion Devlog is a blog template built with Next.js and Notion API.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
