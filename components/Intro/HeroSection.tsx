import React from "react";

const HeroSection = () => {
  return (
    <section>
      <div className="py-16 md:py-32 bg-[length:100%_55%] bg-no-repeat px-4 flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 className="font-black text-4xl mb-2">Notion Devlog</h1>
          <p>
            Notion Devlog is a blog template built with Next.js and Notion API.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
