import { ROUTE_PATHS } from "@/consts/navigation";
import seoRoutes from "@/consts/seoRoutes.json";
import seoDefaults from "@/consts/seoDefaults.json";

export const SEO_SITE_URL = seoDefaults.siteUrl;
export const SEO_DEFAULT_OG_IMAGE = seoDefaults.defaultOgImage;
export const SEO_DEFAULT_ROBOTS = seoDefaults.defaultRobots;

export type RouteSeoEntry = {
  path: string;
  title: string;
  description: string;
  robots?: string;
  indexable?: boolean;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
  ogImage?: string;
};

export const SEO_ROUTE_ENTRIES = seoRoutes as RouteSeoEntry[];

export const SEO_ROUTE_BY_PATH = SEO_ROUTE_ENTRIES.reduce<Record<string, RouteSeoEntry>>(
  (acc, entry) => {
    acc[entry.path] = entry;
    return acc;
  },
  {},
);

export const SEO_PAGE_META = {
  HOME: SEO_ROUTE_BY_PATH[ROUTE_PATHS.HOME],
  SERVICES: SEO_ROUTE_BY_PATH[ROUTE_PATHS.SERVICES],
  TARIFS: SEO_ROUTE_BY_PATH[ROUTE_PATHS.TARIFS],
  EQUIPEMENT: SEO_ROUTE_BY_PATH[ROUTE_PATHS.EQUIPEMENT],
  SECTEURS: SEO_ROUTE_BY_PATH[ROUTE_PATHS.SECTEURS],
  CONTACT: SEO_ROUTE_BY_PATH[ROUTE_PATHS.CONTACT],
} as const;

export const getRouteSeoByPath = (pathname: string): RouteSeoEntry | undefined =>
  SEO_ROUTE_BY_PATH[pathname];

export const toAbsoluteUrl = (path: string) => {
  if (path === ROUTE_PATHS.HOME) return SEO_SITE_URL;
  return `${SEO_SITE_URL}${path}`;
};

export const toAbsoluteAssetUrl = (assetPath: string) => {
  if (/^https?:\/\//.test(assetPath)) return assetPath;
  return `${SEO_SITE_URL}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
};
