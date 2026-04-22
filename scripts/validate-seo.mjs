import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import seoRoutes from "../src/consts/seoRoutes.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const appPath = path.join(rootDir, "src", "App.tsx");
const navigationPath = path.join(rootDir, "src", "consts", "navigation.ts");
const seoBusinessPath = path.join(rootDir, "src", "consts", "seoBusiness.ts");
const locationLandingPath = path.join(rootDir, "src", "consts", "locationLandingPages.ts");
const dist404Path = path.join(rootDir, "dist", "404", "index.html");

const enumRouteRegex = /(\w+)\s*=\s*"([^"]+)"/g;
const routeRegex = /<Route\s+path=(?:"([^"]+)"|\{ROUTE_PATHS\.([A-Z0-9_]+)\})/g;
const locationEntryRegex =
  /\{\s*path:\s*ROUTE_PATHS\.([A-Z0-9_]+),[\s\S]*?localContext:\s*"([\s\S]*?)",[\s\S]*?serviceApproach:\s*"([\s\S]*?)",[\s\S]*?neighborhoods:\s*\[([\s\S]*?)\],/g;

const LOCATION_CONTENT_MIN_WORDS = 150;

const isNonSeoRoute = (routePath) => routePath === "*";

const countWords = (value) =>
  value
    .replace(/\\n/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const hasNonCommentString = (value) => {
  const withoutComments = value.replace(/\/\/.*$/gm, "").trim();
  return withoutComments.length > 0;
};

const validate = async () => {
  const isPostBuild = process.argv.includes("--postbuild");
  const [appContent, navigationContent, seoBusinessContent, locationLandingContent] =
    await Promise.all([
      readFile(appPath, "utf8"),
      readFile(navigationPath, "utf8"),
      readFile(seoBusinessPath, "utf8"),
      readFile(locationLandingPath, "utf8"),
    ]);

  const routeEnumMap = {};
  const routeEnumBlockMatch = navigationContent.match(/export enum ROUTE_PATHS\s*{([\s\S]*?)}/);
  const routeEnumBlock = routeEnumBlockMatch?.[1] || "";
  for (const match of routeEnumBlock.matchAll(enumRouteRegex)) {
    routeEnumMap[match[1]] = match[2];
  }

  const appRoutes = new Set();
  for (const match of appContent.matchAll(routeRegex)) {
    const literalPath = match[1];
    const enumKey = match[2];

    if (literalPath) {
      appRoutes.add(literalPath);
      continue;
    }

    if (enumKey && routeEnumMap[enumKey]) {
      appRoutes.add(routeEnumMap[enumKey]);
    }
  }

  const seoPathSet = new Set(seoRoutes.map((entry) => entry.path));
  const errors = [];
  const warnings = [];

  for (const routePath of appRoutes) {
    if (isNonSeoRoute(routePath)) continue;
    if (!seoPathSet.has(routePath)) {
      errors.push(`Missing SEO entry for App route: ${routePath}`);
    }
  }

  for (const entry of seoRoutes) {
    if (!entry.title) errors.push(`Missing title for ${entry.path}`);
    if (!entry.description) errors.push(`Missing description for ${entry.path}`);
    if (!entry.canonical) errors.push(`Missing canonical for ${entry.path}`);
    if (!entry.robots) errors.push(`Missing robots for ${entry.path}`);

    if (entry.title && entry.title.length > 60) {
      errors.push(`Title too long (${entry.title.length}) for ${entry.path}`);
    }

    if (entry.description && entry.description.length > 155) {
      errors.push(`Description too long (${entry.description.length}) for ${entry.path}`);
    }
  }

  const titlesMap = new Map();
  const descriptionsMap = new Map();

  for (const entry of seoRoutes) {
    if (titlesMap.has(entry.title)) {
      errors.push(
        `Duplicate title for ${entry.path} and ${titlesMap.get(entry.title)}: "${entry.title}"`,
      );
    } else {
      titlesMap.set(entry.title, entry.path);
    }

    if (descriptionsMap.has(entry.description)) {
      errors.push(
        `Duplicate description for ${entry.path} and ${descriptionsMap.get(entry.description)}: "${entry.description}"`,
      );
    } else {
      descriptionsMap.set(entry.description, entry.path);
    }
  }

  const notFoundEntry = seoRoutes.find((entry) => entry.path === "/404");
  if (!notFoundEntry) {
    errors.push("Missing SEO entry for /404.");
  } else if (notFoundEntry.robots !== "noindex,follow") {
    errors.push(`Route /404 must use robots=\"noindex,follow\" (found \"${notFoundEntry.robots}\").`);
  }

  if (isPostBuild) {
    try {
      const dist404Html = await readFile(dist404Path, "utf8");
      if (!/<meta\s+name=["']robots["'][^>]*content=["']noindex,follow["'][^>]*>/i.test(dist404Html)) {
        errors.push("dist/404/index.html is missing <meta name=\"robots\" content=\"noindex,follow\">.");
      }
    } catch {
      errors.push("Missing dist/404/index.html after build.");
    }
  }

  for (const match of locationLandingContent.matchAll(locationEntryRegex)) {
    const slug = match[1];
    const localContext = match[2];
    const serviceApproach = match[3];
    const neighborhoodsBlock = match[4];

    const combinedWordCount = countWords(`${localContext} ${serviceApproach}`);
    if (combinedWordCount < LOCATION_CONTENT_MIN_WORDS) {
      errors.push(
        `Location page "${slug}" has ${combinedWordCount} words in localContext+serviceApproach. Minimum is ${LOCATION_CONTENT_MIN_WORDS}.`,
      );
    }

    const neighborhoodCount = (neighborhoodsBlock.match(/ZONE_AREA_LABELS\./g) || []).length;
    if (neighborhoodCount < 2) {
      errors.push(
        `Location page "${slug}" has fewer than 2 neighborhood references. Add specific sub-areas to avoid doorway page classification.`,
      );
    }
  }

  if (/aggregateRating:\s*null\b/.test(seoBusinessContent)) {
    warnings.push(
      "⚠ WARNING: aggregateRating is unset. Add real GBP review data to seoBusiness.ts to enable rich results.",
    );
  }

  const sameAsMatch = seoBusinessContent.match(/sameAs:\s*\[([\s\S]*?)\]\s*as string\[]/);
  const sameAsBody = sameAsMatch?.[1] ?? "";
  if (!hasNonCommentString(sameAsBody)) {
    warnings.push("⚠ WARNING: sameAs is empty. Add confirmed social/GBP URLs to seoBusiness.ts.");
  }

  if (warnings.length > 0) {
    for (const warning of warnings) {
      console.warn(warning);
    }
  }

  if (errors.length > 0) {
    console.error("SEO validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `SEO validation passed (${seoRoutes.length} SEO entries, ${appRoutes.size} routes scanned).`,
  );
};

validate().catch((error) => {
  console.error("SEO validation failed unexpectedly:", error);
  process.exitCode = 1;
});
