import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "../src/consts/seoRoutes.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const jsonLdRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g;

const getHtmlPath = (routePath) =>
  routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, routePath.replace(/^\//, ""), "index.html");

const hasType = (value, expected) => {
  if (typeof value === "string") return value === expected;
  if (Array.isArray(value)) return value.includes(expected);
  return false;
};

const validate = async () => {
  const errors = [];

  for (const route of routes) {
    const htmlPath = getHtmlPath(route.path);
    let html = "";

    try {
      html = await readFile(htmlPath, "utf8");
    } catch (error) {
      errors.push(`Missing built HTML for ${route.path} (${htmlPath})`);
      continue;
    }

    const scripts = [...html.matchAll(jsonLdRegex)];

    for (const [_, rawJson] of scripts) {
      let data;
      try {
        data = JSON.parse(rawJson.trim());
      } catch (error) {
        errors.push(`Invalid JSON-LD on ${route.path}: ${error.message}`);
        continue;
      }

      if (!data["@context"]) {
        errors.push(`Missing @context in JSON-LD on ${route.path}`);
      }

      if (!data["@type"]) {
        errors.push(`Missing @type in JSON-LD on ${route.path}`);
      }

      if (hasType(data["@type"], "LocalBusiness") && !data.name) {
        errors.push(`Missing name in LocalBusiness JSON-LD on ${route.path}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Structured data validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Structured data validation passed.");
};

validate().catch((error) => {
  console.error("Structured data validation failed unexpectedly:", error);
  process.exitCode = 1;
});
