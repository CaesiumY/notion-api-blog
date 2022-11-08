import React from "react";

const HeroSection = () => {
  return (
    <section>
      <div className="py-16 md:py-36 bg-[length:100%_55%] bg-no-repeat px-4 flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="p-8 md:p-16 bg-white rounded-xl shadow-lg text-center">
          <h1 className="font-black text-5xl pb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Notion Devlog
          </h1>
          <p>
            Notion Devlog is a blog template built with Next.js and Notion API.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
