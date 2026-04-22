import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import seoRoutes from "../src/consts/seoRoutes.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const LOCAL_BUSINESS_ROUTES = new Set([
  "/",
  "/contact",
  "/montreal",
  "/laval",
  "/longueuil",
  "/repentigny",
]);

const jsonLdRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;

const decodeHtml = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");

const extractTitle = (html) => {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? decodeHtml(match[1].trim()) : null;
};

const extractMetaContent = (html, name) => {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `<meta[^>]*name=["']${escapedName}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  const match = html.match(regex);
  return match ? decodeHtml(match[1].trim()) : null;
};

const extractCanonical = (html) => {
  const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
  return match ? decodeHtml(match[1].trim()) : null;
};

const hasType = (value, expected) => {
  if (typeof value === "string") return value === expected;
  if (Array.isArray(value)) return value.includes(expected);
  return false;
};

const findLocalBusinessNode = (nodes) =>
  nodes.find((node) => node && typeof node === "object" && hasType(node["@type"], "LocalBusiness"));

const getRouteHtmlPath = (routePath) =>
  routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, routePath.replace(/^\//, ""), "index.html");

const resolveServerEntryPath = async () => {
  const candidates = [
    path.join(distDir, "server", "entry-server.js"),
    path.join(distDir, "server", "entry-server.mjs"),
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // continue
    }
  }

  return null;
};

const run = async () => {
  const errors = [];
  const routesToValidate = seoRoutes.filter((route) => route.excludeFromSitemap !== true);
  const serverEntryPath = await resolveServerEntryPath();

  if (!serverEntryPath) {
    console.error("DIST integrity validation failed: missing dist/server entry file.");
    process.exitCode = 1;
    return;
  }

  const serverEntry = await import(serverEntryPath);
  const getStructuredDataForPath = serverEntry.getStructuredDataForPath;

  if (typeof getStructuredDataForPath !== "function") {
    console.error("DIST integrity validation failed: getStructuredDataForPath export is missing.");
    process.exitCode = 1;
    return;
  }

  for (const route of routesToValidate) {
    const htmlPath = getRouteHtmlPath(route.path);
    let html;

    try {
      html = await readFile(htmlPath, "utf8");
    } catch {
      errors.push(`Missing built HTML for ${route.path} (${htmlPath})`);
      continue;
    }

    const actualTitle = extractTitle(html);
    if (actualTitle !== route.title) {
      errors.push(`TITLE DRIFT on ${route.path}: expected "${route.title}", found "${actualTitle ?? "MISSING"}"`);
    }

    const actualDescription = extractMetaContent(html, "description");
    if (actualDescription !== route.description) {
      errors.push(
        `DESCRIPTION DRIFT on ${route.path}: expected "${route.description}", found "${actualDescription ?? "MISSING"}"`,
      );
    }

    const actualCanonical = extractCanonical(html);
    if (actualCanonical !== route.canonical) {
      errors.push(
        `CANONICAL DRIFT on ${route.path}: expected "${route.canonical}", found "${actualCanonical ?? "MISSING"}"`,
      );
    }

    const actualRobots = extractMetaContent(html, "robots");
    if (actualRobots !== route.robots) {
      errors.push(`ROBOTS DRIFT on ${route.path}: expected "${route.robots}", found "${actualRobots ?? "MISSING"}"`);
    }

    if (!LOCAL_BUSINESS_ROUTES.has(route.path)) continue;

    const expectedNodes = getStructuredDataForPath(route.path);
    const expectedBusiness = findLocalBusinessNode(Array.isArray(expectedNodes) ? expectedNodes : []);
    const expectedPriceRange = expectedBusiness?.priceRange;
    if (!expectedPriceRange) continue;

    const parsedNodes = [];
    for (const match of html.matchAll(jsonLdRegex)) {
      try {
        parsedNodes.push(JSON.parse(match[1]));
      } catch {
        // JSON parse validity is already covered by validate-structured-data
      }
    }

    const distBusiness = findLocalBusinessNode(parsedNodes);
    if (!distBusiness) {
      errors.push(`SCHEMA DRIFT on ${route.path}: LocalBusiness JSON-LD is missing in dist HTML.`);
      continue;
    }

    if (distBusiness.priceRange !== expectedPriceRange) {
      errors.push(
        `SCHEMA DRIFT on ${route.path}: priceRange expected "${expectedPriceRange}", found "${distBusiness.priceRange ?? "MISSING"}"`,
      );
    }
  }

  if (errors.length > 0) {
    console.error("DIST integrity validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`DIST integrity validation passed (${routesToValidate.length} routes checked).`);
};

run().catch((error) => {
  console.error("DIST integrity validation failed unexpectedly:", error);
  process.exitCode = 1;
});
