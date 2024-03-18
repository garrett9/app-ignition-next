/**
 * For more information on configuring automatic sitemap generation,
 * @see https://www.npmjs.com/package/next-sitemap#installation.
 */

const NEXT_SSG_FILES = [
  '/*.json$',
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$',
  '/*.js$',
];

const exclude = ['/login*', '/register*', '/forgot-password*'];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // exclude,
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || '',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: NEXT_SSG_FILES,
      },
    ],
  },
  // ...other options
};
