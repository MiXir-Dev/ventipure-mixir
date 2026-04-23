import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SEO_DEFAULT_OG_IMAGE,
  SEO_DEFAULT_ROBOTS,
  getRouteSeoByPath,
  SEO_SITE_URL,
  toAbsoluteAssetUrl,
} from "@/consts/seo";
import { getStructuredDataForPath } from "@/seo/structuredData";

const upsertMetaTag = (selector: string, attributes: Record<string, string>, content: string) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
  element.content = content;
};

const upsertCanonicalTag = (href: string) => {
  let element = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
};

const upsertAlternateTag = (hreflang: string, href: string) => {
  const selector = `link[rel='alternate'][hreflang='${hreflang}']`;
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.rel = "alternate";
    element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
};

const replaceStructuredDataScripts = (schemas: unknown[]) => {
  document.head
    .querySelectorAll("script[type='application/ld+json'][data-vp-seo='dynamic']")
    .forEach((node) => node.remove());

  schemas.forEach((schema, index) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.vpSeo = "dynamic";
    script.dataset.schemaIndex = String(index);
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
};

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const routeSeo = getRouteSeoByPath(pathname);
    const isKnownRoute = Boolean(routeSeo);
    const effectiveRouteSeo = routeSeo || {
      path: "/404",
      title: "Page introuvable - VentiPure",
      description: "Cette page n'existe pas.",
      canonical: `${SEO_SITE_URL}/404`,
      robots: "noindex,follow",
      ogImage: SEO_DEFAULT_OG_IMAGE,
    };

    const canonicalUrl = effectiveRouteSeo.canonical;
    const imageUrl = toAbsoluteAssetUrl(effectiveRouteSeo.ogImage || SEO_DEFAULT_OG_IMAGE);
    const robots = effectiveRouteSeo.robots || SEO_DEFAULT_ROBOTS;
    const ogTitle = effectiveRouteSeo.ogTitle || effectiveRouteSeo.title;
    const ogDescription = effectiveRouteSeo.ogDescription || effectiveRouteSeo.description;

    document.title = effectiveRouteSeo.title;

    upsertMetaTag(
      "meta[name='description']",
      { name: "description" },
      effectiveRouteSeo.description,
    );
    upsertMetaTag("meta[name='robots']", { name: "robots" }, robots);
    upsertMetaTag("meta[property='og:type']", { property: "og:type" }, "website");
    upsertMetaTag("meta[property='og:title']", { property: "og:title" }, ogTitle);
    upsertMetaTag(
      "meta[property='og:description']",
      { property: "og:description" },
      ogDescription,
    );
    upsertMetaTag("meta[property='og:url']", { property: "og:url" }, canonicalUrl);
    upsertMetaTag("meta[property='og:image']", { property: "og:image" }, imageUrl);
    upsertMetaTag("meta[name='twitter:card']", { name: "twitter:card" }, "summary_large_image");
    upsertMetaTag("meta[name='twitter:title']", { name: "twitter:title" }, ogTitle);
    upsertMetaTag(
      "meta[name='twitter:description']",
      { name: "twitter:description" },
      ogDescription,
    );
    upsertMetaTag("meta[name='twitter:image']", { name: "twitter:image" }, imageUrl);
    upsertCanonicalTag(canonicalUrl);
    upsertAlternateTag("fr-CA", canonicalUrl);
    upsertAlternateTag("x-default", canonicalUrl);

    replaceStructuredDataScripts(isKnownRoute ? getStructuredDataForPath(pathname) : []);
  }, [location.pathname]);

  return null;
}
