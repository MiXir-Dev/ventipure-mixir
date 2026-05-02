import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "../src/consts/seoRoutes.json" with { type: "json" };
import seoDefaults from "../src/consts/seoDefaults.json" with { type: "json" };

const SEO_BLOCK_REGEX = /<!-- SEO_START -->([\s\S]*?)<!-- SEO_END -->/;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");
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

const routeToComponentMap = {
  "/": "src/pages/Index.tsx",
  "/services": "src/pages/Services.tsx",
  "/services/nettoyage-conduits-fournaise": "src/pages/services/NettoyageConduitsFournaisePage.tsx",
  "/services/nettoyage-conduit-secheuse": "src/pages/services/NettoyageConduitSecheusePage.tsx",
  "/services/nettoyage-echangeur-air": "src/pages/services/NettoyageEchangeurAirPage.tsx",
  "/services/nettoyage-climatiseur-mural": "src/pages/services/NettoyageClimatiseurMuralPage.tsx",
  "/services/nettoyage-conduits-commerciaux": "src/pages/services/NettoyageConduitsCommerciauxPage.tsx",
  "/tarifs": "src/pages/Tarifs.tsx",
  "/equipement": "src/pages/Equipement.tsx",
  "/nos-services-et-secteurs": "src/pages/NosServicesEtSecteurs.tsx",
  "/nettoyage-ventilation-montreal": "src/pages/locations/MontrealPage.tsx",
  "/nettoyage-ventilation-laval": "src/pages/locations/LavalPage.tsx",
  "/nettoyage-ventilation-longueuil": "src/pages/locations/LongueuilPage.tsx",
  "/nettoyage-ventilation-repentigny": "src/pages/locations/RepentignyPage.tsx",
  "/contact": "src/pages/Contact.tsx",
  "/404": "src/pages/NotFound.tsx",
  "/politique-de-confidentialite": "src/pages/PolitiqueDeConfidentialite.tsx",
  "/modalites-dutilisation": "src/pages/ModalitesDutilisation.tsx",
};

const imageRouteMap = {
  "/": {
    loc: "https://ventipure.ca/og/default.jpg",
    title: "Nettoyage de ventilation | VentiPure",
  },
  "/services/nettoyage-conduits-fournaise": {
    loc: "https://ventipure.ca/og/service-conduits.jpg",
    title: "Nettoyage des conduits de fournaise | VentiPure",
  },
  "/services/nettoyage-conduit-secheuse": {
    loc: "https://ventipure.ca/og/service-secheuse.jpg",
    title: "Nettoyage du conduit de sécheuse | VentiPure",
  },
  "/services/nettoyage-echangeur-air": {
    loc: "https://ventipure.ca/og/service-echangeur.jpg",
    title: "Nettoyage de l'échangeur d'air | VentiPure",
  },
  "/services/nettoyage-climatiseur-mural": {
    loc: "https://ventipure.ca/og/service-climatiseur.jpg",
    title: "Nettoyage de climatiseur mural | VentiPure",
  },
  "/services/nettoyage-conduits-commerciaux": {
    loc: "https://ventipure.ca/og/service-commercial.jpg",
    title: "Nettoyage de conduits commerciaux | VentiPure",
  },
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const toAbsoluteAssetUrl = (assetPath) => {
  if (!assetPath) return `${seoDefaults.siteUrl}${seoDefaults.defaultOgImage}`;
  if (/^https?:\/\//.test(assetPath)) return assetPath;
  return `${seoDefaults.siteUrl}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
};

const getRouteHtmlPath = (routePath) =>
  routePath === "/" ? path.join(distDir, "index.html") : path.join(distDir, routePath.replace(/^\//, ""), "index.html");

const getLastModified = (routePath) => {
  const componentFile = routeToComponentMap[routePath];
  const fallback = new Date().toISOString().split("T")[0];

  if (!componentFile) return fallback;

  try {
    const date = execSync(`git log -1 --format="%ci" -- ${componentFile}`, {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim()
      .split(" ")[0];

    return date || fallback;
  } catch {
    return fallback;
  }
};

const isIndexableRoute = (route) =>
  route.indexable !== false &&
  route.excludeFromSitemap !== true &&
  !String(route.robots || "").toLowerCase().includes("noindex");

const getStructuredDataGenerator = async () => {
  const serverEntryPath = await resolveServerEntryPath();
  if (!serverEntryPath) {
    console.warn("[seo] Structured data generator unavailable: SSR entry file not found");
    return () => [];
  }

  try {
    const module = await import(serverEntryPath);
    if (typeof module.getStructuredDataForPath === "function") {
      return module.getStructuredDataForPath;
    }
  } catch (error) {
    console.warn("[seo] Structured data generator unavailable:", error?.message || error);
  }

  return () => [];
};

const serializeStructuredDataScripts = (schemas) => {
  if (!Array.isArray(schemas) || schemas.length === 0) return [];

  return schemas.map((schema) => {
    const json = JSON.stringify(schema).replace(/</g, "\\u003c");
    return `    <script type="application/ld+json">${json}</script>`;
  });
};

const buildSeoBlock = (route, structuredDataScripts) => {
  const canonical = route.canonical || `${seoDefaults.siteUrl}${route.path === "/" ? "/" : route.path}`;
  const image = toAbsoluteAssetUrl(route.ogImage || seoDefaults.defaultOgImage);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const robots = escapeHtml(route.robots || seoDefaults.defaultRobots);
  const ogTitle = escapeHtml(route.ogTitle || route.title);
  const ogDescription = escapeHtml(route.ogDescription || route.description);

  return [
    "<!-- SEO_START -->",
    `    <title>${title}</title>`,
    `    <meta name="description" content="${description}" />`,
    `    <meta name="robots" content="${robots}" />`,
    `    <link rel="canonical" href="${canonical}" />`,
    `    <link rel="alternate" hreflang="fr-CA" href="${canonical}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    '    <meta property="og:type" content="website" />',
    `    <meta property="og:title" content="${ogTitle}" />`,
    `    <meta property="og:description" content="${ogDescription}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:image" content="${image}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${ogTitle}" />`,
    `    <meta name="twitter:description" content="${ogDescription}" />`,
    `    <meta name="twitter:image" content="${image}" />`,
    ...structuredDataScripts,
    "    <!-- SEO_END -->",
  ].join("\n");
};

const ensureHtmlFile = async (routePath, defaultHtml) => {
  const htmlPath = getRouteHtmlPath(routePath);
  const routeDir = path.dirname(htmlPath);
  await mkdir(routeDir, { recursive: true });

  try {
    await access(htmlPath);
  } catch {
    await writeFile(htmlPath, defaultHtml, "utf8");
  }

  return htmlPath;
};

const replaceSeoBlock = (html, seoBlock) => {
  if (SEO_BLOCK_REGEX.test(html)) {
    return html.replace(SEO_BLOCK_REGEX, () => seoBlock);
  }

  return html.replace("</head>", `${seoBlock}\n  </head>`);
};

const warnMissingOgImage = async (route) => {
  if (!route.ogImage || /^https?:\/\//.test(route.ogImage)) return;

  const filePath = path.join(publicDir, route.ogImage.replace(/^\//, ""));
  try {
    await access(filePath);
  } catch {
    console.warn(`[seo] Missing ogImage file for ${route.path}: ${route.ogImage}`);
  }
};

const buildSitemapXml = (routeEntries) => {
  const urlNodes = routeEntries
    .map((route) => {
      const canonical = route.canonical || `${seoDefaults.siteUrl}${route.path === "/" ? "/" : route.path}`;
      const changefreq = route.changefreq || "monthly";
      const priority = Number.isFinite(route.priority) ? Number(route.priority).toFixed(1) : "0.8";
      const lastmod = getLastModified(route.path);
      const imageNode = imageRouteMap[route.path]
        ? [
            "    <image:image>",
            `      <image:loc>${escapeXml(imageRouteMap[route.path].loc)}</image:loc>`,
            `      <image:title>${escapeXml(imageRouteMap[route.path].title)}</image:title>`,
            "    </image:image>",
          ].join("\n")
        : "";

      return [
        "  <url>",
        `    <loc>${escapeXml(canonical)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        imageNode,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    urlNodes,
    "</urlset>",
    "",
  ].join("\n");
};

const sitemapIndexXml = (files) => {
  const now = new Date().toISOString().split("T")[0];
  const nodes = files
    .map(
      (file) =>
        [
          "  <sitemap>",
          `    <loc>${seoDefaults.siteUrl}/${file}</loc>`,
          `    <lastmod>${now}</lastmod>`,
          "  </sitemap>",
        ].join("\n"),
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    nodes,
    "</sitemapindex>",
    "",
  ].join("\n");
};

const generateSitemaps = async (indexableRoutes) => {
  if (indexableRoutes.length > 50) {
    const core = indexableRoutes.filter(
      (route) =>
        !route.path.startsWith("/services/") &&
        ![
          "/nettoyage-ventilation-montreal",
          "/nettoyage-ventilation-laval",
          "/nettoyage-ventilation-longueuil",
          "/nettoyage-ventilation-repentigny",
        ].includes(route.path),
    );
    const services = indexableRoutes.filter((route) => route.path.startsWith("/services/"));
    const locations = indexableRoutes.filter((route) =>
      [
        "/nettoyage-ventilation-montreal",
        "/nettoyage-ventilation-laval",
        "/nettoyage-ventilation-longueuil",
        "/nettoyage-ventilation-repentigny",
      ].includes(route.path),
    );

    await writeFile(path.join(distDir, "sitemap-main.xml"), buildSitemapXml(core), "utf8");
    await writeFile(path.join(distDir, "sitemap-services.xml"), buildSitemapXml(services), "utf8");
    await writeFile(path.join(distDir, "sitemap-locations.xml"), buildSitemapXml(locations), "utf8");
    await writeFile(
      path.join(distDir, "sitemap.xml"),
      sitemapIndexXml(["sitemap-main.xml", "sitemap-services.xml", "sitemap-locations.xml"]),
      "utf8",
    );

    return;
  }

  await writeFile(path.join(distDir, "sitemap.xml"), buildSitemapXml(indexableRoutes), "utf8");
};

const run = async () => {
  const structuredDataForPath = await getStructuredDataGenerator();
  const fallbackHtml = await readFile(path.join(distDir, "index.html"), "utf8");

  for (const route of routes) {
    const htmlPath = await ensureHtmlFile(route.path, fallbackHtml);
    const html = await readFile(htmlPath, "utf8");
    const structuredDataScripts = serializeStructuredDataScripts(structuredDataForPath(route.path));
    const seoBlock = buildSeoBlock(route, structuredDataScripts);
    const nextHtml = replaceSeoBlock(html, seoBlock);
    await writeFile(htmlPath, nextHtml, "utf8");
    await warnMissingOgImage(route);
  }

  const indexableRoutes = routes.filter(isIndexableRoute);
  await generateSitemaps(indexableRoutes);
};

run().catch((error) => {
  console.error("Failed to generate SEO assets:", error);
  process.exitCode = 1;
});
