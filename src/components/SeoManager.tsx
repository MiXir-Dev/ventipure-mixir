import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SEO_DEFAULT_OG_IMAGE,
  SEO_DEFAULT_ROBOTS,
  SEO_PAGE_META,
  getRouteSeoByPath,
  toAbsoluteAssetUrl,
  toAbsoluteUrl,
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
    const routeSeo = getRouteSeoByPath(pathname) || SEO_PAGE_META.HOME;
    if (!routeSeo) return;

    const canonicalUrl = toAbsoluteUrl(routeSeo.path);
    const imageUrl = toAbsoluteAssetUrl(routeSeo.ogImage || SEO_DEFAULT_OG_IMAGE);
    const robots = routeSeo.robots || SEO_DEFAULT_ROBOTS;

    document.title = routeSeo.title;

    upsertMetaTag("meta[name='description']", { name: "description" }, routeSeo.description);
    upsertMetaTag("meta[name='robots']", { name: "robots" }, robots);
    upsertMetaTag("meta[property='og:type']", { property: "og:type" }, "website");
    upsertMetaTag("meta[property='og:title']", { property: "og:title" }, routeSeo.title);
    upsertMetaTag(
      "meta[property='og:description']",
      { property: "og:description" },
      routeSeo.description,
    );
    upsertMetaTag("meta[property='og:url']", { property: "og:url" }, canonicalUrl);
    upsertMetaTag("meta[property='og:image']", { property: "og:image" }, imageUrl);
    upsertMetaTag("meta[name='twitter:card']", { name: "twitter:card" }, "summary_large_image");
    upsertMetaTag("meta[name='twitter:title']", { name: "twitter:title" }, routeSeo.title);
    upsertMetaTag(
      "meta[name='twitter:description']",
      { name: "twitter:description" },
      routeSeo.description,
    );
    upsertMetaTag("meta[name='twitter:image']", { name: "twitter:image" }, imageUrl);
    upsertCanonicalTag(canonicalUrl);

    replaceStructuredDataScripts(getStructuredDataForPath(pathname));
  }, [location.pathname]);

  return null;
}
