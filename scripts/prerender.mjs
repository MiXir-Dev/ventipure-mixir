import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "../src/consts/seoRoutes.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const clientIndexPath = path.join(distDir, "index.html");
const resolveSsrEntryPath = async () => {
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

  throw new Error("Unable to find SSR entry file in dist/server");
};

const ROOT_NODE_REGEX = /<div id="root">[\s\S]*?<\/div>/;

const getRouteHtmlPath = (routePath) => {
  if (routePath === "/") return clientIndexPath;
  return path.join(distDir, routePath.replace(/^\//, ""), "index.html");
};

const ensureRouteShell = async (routePath, baseHtml) => {
  const htmlPath = getRouteHtmlPath(routePath);
  const dirPath = path.dirname(htmlPath);
  await mkdir(dirPath, { recursive: true });

  try {
    await readFile(htmlPath, "utf8");
  } catch {
    await writeFile(htmlPath, baseHtml, "utf8");
  }

  return htmlPath;
};

const injectRenderedHtml = (html, renderedBody) => {
  const rootWithBody = `<div id="root">${renderedBody}</div>`;
  if (ROOT_NODE_REGEX.test(html)) {
    return html.replace(ROOT_NODE_REGEX, rootWithBody);
  }

  return html.replace('<div id="root"></div>', rootWithBody);
};

const run = async () => {
  const ssrEntryPath = await resolveSsrEntryPath();
  const [{ render }, baseHtml] = await Promise.all([
    import(ssrEntryPath),
    readFile(clientIndexPath, "utf8"),
  ]);

  for (const route of routes) {
    const routePath = route.path;

    try {
      const htmlPath = await ensureRouteShell(routePath, baseHtml);
      const currentHtml = await readFile(htmlPath, "utf8");
      const renderedBody = await render(routePath);
      const nextHtml = injectRenderedHtml(currentHtml, renderedBody);
      await writeFile(htmlPath, nextHtml, "utf8");
      console.log(`[prerender] ${routePath} -> ${path.relative(rootDir, htmlPath)}`);
    } catch (error) {
      console.error(`[prerender] failed for ${routePath}:`, error);
    }
  }
};

run().catch((error) => {
  console.error("Prerender failed:", error);
  process.exitCode = 1;
});
