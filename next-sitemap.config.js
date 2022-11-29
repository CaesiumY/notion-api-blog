/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://caesiumy.dev",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  // ...other options
};
