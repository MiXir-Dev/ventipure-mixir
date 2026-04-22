export enum ROUTE_PATHS {
  HOME = "/",
  SERVICES = "/services",
  TARIFS = "/tarifs",
  CONTACT = "/contact",
  EQUIPEMENT = "/equipement",
  SECTEURS = "/nos-services-et-secteurs",
}

export enum PAGE_LABELS {
  HOME = "Accueil",
  SERVICES = "Services",
  TARIFS = "Tarifs",
  CONTACT = "Contact",
  EQUIPEMENT = "Équipement",
  SECTEURS = "Secteurs",
  NOS_SECTEURS = "Nos secteurs",
}

export type AppRoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

export type NavigationLink = {
  label: PAGE_LABELS;
  href: AppRoutePath;
};

export const HEADER_NAV_LINKS: NavigationLink[] = [
  { label: PAGE_LABELS.HOME, href: ROUTE_PATHS.HOME },
  { label: PAGE_LABELS.SERVICES, href: ROUTE_PATHS.SERVICES },
  { label: PAGE_LABELS.TARIFS, href: ROUTE_PATHS.TARIFS },
  { label: PAGE_LABELS.SECTEURS, href: ROUTE_PATHS.SECTEURS },
  { label: PAGE_LABELS.CONTACT, href: ROUTE_PATHS.CONTACT },
  // { label: PAGE_LABELS.EQUIPEMENT, href: ROUTE_PATHS.EQUIPEMENT },
];

export const SIDE_PANEL_HEADER_LINKS: AppRoutePath[] = [
  ROUTE_PATHS.HOME,
  ROUTE_PATHS.TARIFS,
  ROUTE_PATHS.CONTACT,
];

export const SIDE_PANEL_NAV_LINKS: NavigationLink[] = [
  { label: PAGE_LABELS.HOME, href: ROUTE_PATHS.HOME },
  { label: PAGE_LABELS.SERVICES, href: ROUTE_PATHS.SERVICES },
  { label: PAGE_LABELS.TARIFS, href: ROUTE_PATHS.TARIFS },
  { label: PAGE_LABELS.EQUIPEMENT, href: ROUTE_PATHS.EQUIPEMENT },
  { label: PAGE_LABELS.CONTACT, href: ROUTE_PATHS.CONTACT },
  { label: PAGE_LABELS.NOS_SECTEURS, href: ROUTE_PATHS.SECTEURS },
];

export const FOOTER_NAV_LINKS: NavigationLink[] = [
  { label: PAGE_LABELS.HOME, href: ROUTE_PATHS.HOME },
  { label: PAGE_LABELS.SERVICES, href: ROUTE_PATHS.SERVICES },
  { label: PAGE_LABELS.TARIFS, href: ROUTE_PATHS.TARIFS },
  { label: PAGE_LABELS.EQUIPEMENT, href: ROUTE_PATHS.EQUIPEMENT },
  { label: PAGE_LABELS.NOS_SECTEURS, href: ROUTE_PATHS.SECTEURS },
  { label: PAGE_LABELS.CONTACT, href: ROUTE_PATHS.CONTACT },
];



export const buildContactServicePath = (serviceId: string) =>
  `${ROUTE_PATHS.CONTACT}?service=${encodeURIComponent(serviceId)}`;

export const buildContactComboPath = (comboId: string) =>
  `${ROUTE_PATHS.CONTACT}?combo=${encodeURIComponent(comboId)}`;
