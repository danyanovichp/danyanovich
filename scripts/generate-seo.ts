import fs from "fs";
import path from "path";
import {
  DEFAULT_LANGUAGE,
  SITE_URL,
  SUPPORTED_LANGUAGES,
  caseSeoRoutes,
  getLocalizedPath,
  legacyRedirects,
  sitemapRoutes,
} from "../src/seo/site";

function ensurePublicDir() {
  const publicDir = path.resolve("./public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
}

function buildSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const routeXml = sitemapRoutes
    .map((route) => {
      const basePath = route.path.replace(/^\/(ru|en)(?=\/|$)/, "");
      const xDefault = `${SITE_URL}${getLocalizedPath(
        DEFAULT_LANGUAGE,
        basePath === "/" ? "" : basePath,
      )}`;
      const alternates = SUPPORTED_LANGUAGES.map((language) => {
        const href = `${SITE_URL}${getLocalizedPath(
          language,
          basePath === "/" ? "" : basePath,
        )}`;
        return `    <xhtml:link rel="alternate" hreflang="${language}" href="${href}"/>`;
      }).join("\n");

      return `  <url>
    <loc>${SITE_URL}${route.path}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("\n\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${routeXml}

</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function buildRedirects() {
  const redirects = legacyRedirects
    .map((rule) => `${rule.from} ${rule.to} 301!`)
    .join("\n");

  return `${redirects}
/ru/* /index.html 200
/en/* /index.html 200
/* /index.html 200
`;
}

function writeFile(fileName: string, contents: string) {
  fs.writeFileSync(path.resolve("./public", fileName), contents);
  console.log(`${fileName} generated`);
}

function main() {
  ensurePublicDir();
  writeFile("sitemap.xml", buildSitemap());
  writeFile("robots.txt", buildRobots());
  writeFile("_redirects", buildRedirects());
  console.log(`SEO assets generated for ${sitemapRoutes.length} routes and ${caseSeoRoutes.length} case pages.`);
}

main();
