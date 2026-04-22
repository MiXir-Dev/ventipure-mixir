import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "../src/consts/seoRoutes.json" with { type: "json" };
import seoDefaults from "../src/consts/seoDefaults.json" with { type: "json" };

const SEO_BLOCK_REGEX = /<!-- SEO_START -->([\s\S]*?)<!-- SEO_END -->/;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const distIndexPath = path.join(distDir, "index.html");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const toAbsoluteUrl = (pathname) =>
  pathname === "/" ? seoDefaults.siteUrl : `${seoDefaults.siteUrl}${pathname}`;

const toAbsoluteAssetUrl = (assetPath) => {
  if (!assetPath) return `${seoDefaults.siteUrl}${seoDefaults.defaultOgImage}`;
  if (/^https?:\/\//.test(assetPath)) return assetPath;
  return `${seoDefaults.siteUrl}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
};

const buildSeoBlock = (route) => {
  const canonical = toAbsoluteUrl(route.path);
  const image = toAbsoluteAssetUrl(route.ogImage || seoDefaults.defaultOgImage);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const robots = escapeHtml(route.robots || seoDefaults.defaultRobots);

  return [
    "<!-- SEO_START -->",
    `    <title>${title}</title>`,
    `    <meta name="description" content="${description}" />`,
    `    <meta name="robots" content="${robots}" />`,
    `    <link rel="canonical" href="${canonical}" />`,
    '    <meta property="og:type" content="website" />',
    `    <meta property="og:title" content="${title}" />`,
    `    <meta property="og:description" content="${description}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:image" content="${image}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${title}" />`,
    `    <meta name="twitter:description" content="${description}" />`,
    `    <meta name="twitter:image" content="${image}" />`,
    "    <!-- SEO_END -->",
  ].join("\n");
};

const createRouteHtml = (baseHtml, route) => {
  const seoBlock = buildSeoBlock(route);
  if (!SEO_BLOCK_REGEX.test(baseHtml)) {
    throw new Error("SEO markers not found in dist/index.html");
  }
  return baseHtml.replace(SEO_BLOCK_REGEX, seoBlock);
};

const writeRouteHtml = async (baseHtml, route) => {
  const routeHtml = createRouteHtml(baseHtml, route);

  if (route.path === "/") {
    await writeFile(distIndexPath, routeHtml, "utf8");
    return;
  }

  const routeDir = path.join(distDir, route.path.replace(/^\//, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), routeHtml, "utf8");
};

const generateSitemapXml = (routeEntries) => {
  const today = new Date().toISOString().slice(0, 10);
  const urlNodes = routeEntries
    .filter((route) => route.indexable !== false && !String(route.robots || "").includes("noindex"))
    .map((route) => {
      const loc = toAbsoluteUrl(route.path);
      const changefreq = route.changefreq || "weekly";
      const priority = Number.isFinite(route.priority) ? Number(route.priority).toFixed(1) : "0.8";

      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlNodes,
    "</urlset>",
    "",
  ].join("\n");
};

const run = async () => {
  const baseHtml = await readFile(distIndexPath, "utf8");

  for (const route of routes) {
    await writeRouteHtml(baseHtml, route);
  }

  const sitemap = generateSitemapXml(routes);
  await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
};

run().catch((error) => {
  console.error("Failed to generate SEO assets:", error);
  process.exitCode = 1;
});
