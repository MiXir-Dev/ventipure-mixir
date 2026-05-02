import {
  CONTACT_ADDRESS_COUNTRY,
  CONTACT_ADDRESS_LOCALITY,
  CONTACT_ADDRESS_POSTAL_CODE,
  CONTACT_ADDRESS_REGION,
  CONTACT_ADDRESS_STREET,
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
} from "@/consts/contact";
import { type FaqItem, ROUTE_FAQ_ITEMS } from "@/consts/faqs";
import { LOCATION_LANDING_BY_PATH } from "@/consts/locationLandingPages";
import { ROUTE_PATHS, buildContactServicePath } from "@/consts/navigation";
import { SEO_BUSINESS } from "@/consts/seoBusiness";
import { SEO_SITE_URL } from "@/consts/seo";
import {
  SERVICE_LANDING_BY_PATH,
  type ServiceLandingPageConfig,
} from "@/consts/serviceLandingPages";
import { SERVICES } from "@/consts/services";

const BUSINESS_ID = `${SEO_SITE_URL}/#business`;
const DEFAULT_IMAGE = `${SEO_SITE_URL}/og/default.jpg`;
const DEFAULT_LOGO = `${SEO_SITE_URL}/logo-dark.png`;

const CITY_ENTITY_IDS: Record<string, string> = {
  Montréal: "https://www.wikidata.org/wiki/Q340",
  Laval: "https://www.wikidata.org/wiki/Q379634",
  Longueuil: "https://www.wikidata.org/wiki/Q200178",
  Repentigny: "https://www.wikidata.org/wiki/Q741682",
};

const buildCityNode = (name: string) => {
  const entityId = CITY_ENTITY_IDS[name];
  if (entityId) {
    return { "@type": "City", name, "@id": entityId };
  }
  return { "@type": "City", name };
};

const GLOBAL_AREA_SERVED = [
  buildCityNode("Montréal"),
  buildCityNode("Laval"),
  buildCityNode("Longueuil"),
  buildCityNode("Brossard"),
  buildCityNode("Repentigny"),
  buildCityNode("Saint-Hubert"),
  buildCityNode("Boucherville"),
  buildCityNode("Terrebonne"),
  buildCityNode("Sainte-Julie"),
];

const baseLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HVACBusiness", "ProfessionalService"],
  "@id": BUSINESS_ID,
  name: "VentiPure",
  url: SEO_SITE_URL,
  logo: DEFAULT_LOGO,
  image: DEFAULT_IMAGE,
  description:
    "Nettoyage de conduits de ventilation, fournaise, sécheuse et échangeur d'air au Grand Montréal. Service résidentiel et commercial.",
  telephone: CONTACT_PHONE_E164,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_ADDRESS_STREET,
    addressLocality: CONTACT_ADDRESS_LOCALITY,
    addressRegion: CONTACT_ADDRESS_REGION,
    postalCode: CONTACT_ADDRESS_POSTAL_CODE,
    addressCountry: CONTACT_ADDRESS_COUNTRY,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.5869,
    longitude: -73.3311,
  },
  areaServed: GLOBAL_AREA_SERVED,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "16:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Interac",
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 45.5869,
      longitude: -73.3311,
    },
    geoRadius: "50000",
  },
  ...(SEO_BUSINESS.sameAs.length > 0 ? { sameAs: SEO_BUSINESS.sameAs } : {}),
  ...(SEO_BUSINESS.hasMap ? { hasMap: SEO_BUSINESS.hasMap } : {}),
  ...(SEO_BUSINESS.aggregateRating
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ...SEO_BUSINESS.aggregateRating,
        },
      }
    : {}),
});

const getServiceDescription = (serviceId: string): string => {
  const page = Object.values(SERVICE_LANDING_BY_PATH).find((entry) => entry.id === serviceId);
  if (!page) return "Service professionnel de nettoyage de ventilation au Grand Montréal.";
  return page.problemSection;
};

const buildServiceSchemaNode = (serviceId: string) => {
  const service = SERVICES.find((item) => item.id === serviceId);
  if (!service || service.id === "autre") return null;

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: getServiceDescription(service.id),
    provider: { "@id": BUSINESS_ID },
    areaServed: GLOBAL_AREA_SERVED,
  };

  if (service.price !== null) {
    node.offers = {
      "@type": "Offer",
      price: String(service.price),
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: String(service.price),
        priceCurrency: "CAD",
        description: `À partir de ${service.priceLabel}`,
      },
      url: `${SEO_SITE_URL}${buildContactServicePath(service.id)}`,
    };
  }

  return node;
};

const buildLocationServiceSchemaNode = (path: string) => {
  const location = LOCATION_LANDING_BY_PATH[path];
  if (!location) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SEO_SITE_URL}${path}#service`,
    name: `Nettoyage de ventilation à ${location.cityName}`,
    serviceType: "Nettoyage de ventilation",
    url: `${SEO_SITE_URL}${path}`,
    areaServed: [buildCityNode(location.cityName)],
    provider: { "@id": BUSINESS_ID },
    description: location.subtitle,
  };
};

const allCoreServiceSchemaNodes = () =>
  SERVICES.filter((service) => service.id !== "autre")
    .map((service) => buildServiceSchemaNode(service.id))
    .filter((service): service is Record<string, unknown> => Boolean(service));

const faqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SEO_SITE_URL}${item.path === "/" ? "/" : item.path}`,
  })),
});

const serviceLandingSchemas = (path: string, config: ServiceLandingPageConfig) => {
  const serviceSchema = buildServiceSchemaNode(config.id);
  const routeFaq: FaqItem[] = config.faq;

  const nodes: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Accueil", path: ROUTE_PATHS.HOME },
      { name: "Services", path: ROUTE_PATHS.SERVICES },
      { name: config.h1, path },
    ]),
    faqSchema(routeFaq),
  ];

  if (serviceSchema) nodes.push(serviceSchema);

  return nodes;
};

const locationLandingSchemas = (path: string) => {
  const location = LOCATION_LANDING_BY_PATH[path];
  if (!location) return [];
  const locationService = buildLocationServiceSchemaNode(path);

  return [
    breadcrumbSchema([
      { name: "Accueil", path: ROUTE_PATHS.HOME },
      { name: `Nettoyage de ventilation à ${location.cityName}`, path },
    ]),
    baseLocalBusinessSchema(),
    ...(locationService ? [locationService] : []),
    faqSchema(location.faq),
  ];
};

export const getStructuredDataForPath = (pathname: string) => {
  const normalizedPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (SERVICE_LANDING_BY_PATH[normalizedPath]) return serviceLandingSchemas(normalizedPath, SERVICE_LANDING_BY_PATH[normalizedPath]);
  if (LOCATION_LANDING_BY_PATH[normalizedPath]) return locationLandingSchemas(normalizedPath);

  switch (normalizedPath) {
    case ROUTE_PATHS.HOME:
      return [baseLocalBusinessSchema(), faqSchema(ROUTE_FAQ_ITEMS.HOME)];
    case ROUTE_PATHS.SERVICES:
      return [
        breadcrumbSchema([
          { name: "Accueil", path: ROUTE_PATHS.HOME },
          { name: "Services", path: ROUTE_PATHS.SERVICES },
        ]),
        faqSchema(ROUTE_FAQ_ITEMS.SERVICES),
        ...allCoreServiceSchemaNodes(),
      ];
    case ROUTE_PATHS.TARIFS:
      return [
        breadcrumbSchema([
          { name: "Accueil", path: ROUTE_PATHS.HOME },
          { name: "Tarifs", path: ROUTE_PATHS.TARIFS },
        ]),
        faqSchema(ROUTE_FAQ_ITEMS.TARIFS),
        ...allCoreServiceSchemaNodes(),
      ];
    case ROUTE_PATHS.EQUIPEMENT:
      return [
        breadcrumbSchema([
          { name: "Accueil", path: ROUTE_PATHS.HOME },
          { name: "Équipement", path: ROUTE_PATHS.EQUIPEMENT },
        ]),
      ];
    case ROUTE_PATHS.SECTEURS:
      return [
        breadcrumbSchema([
          { name: "Accueil", path: ROUTE_PATHS.HOME },
          { name: "Zones desservies", path: ROUTE_PATHS.SECTEURS },
        ]),
      ];
    case ROUTE_PATHS.CONTACT:
      return [
        breadcrumbSchema([
          { name: "Accueil", path: ROUTE_PATHS.HOME },
          { name: "Contact", path: ROUTE_PATHS.CONTACT },
        ]),
        baseLocalBusinessSchema(),
      ];
    case ROUTE_PATHS.POLITIQUE_CONFIDENTIALITE:
      return [
        breadcrumbSchema([
          { name: "Accueil", path: ROUTE_PATHS.HOME },
          { name: "Politique de confidentialité", path: ROUTE_PATHS.POLITIQUE_CONFIDENTIALITE },
        ]),
      ];
    case ROUTE_PATHS.MODALITES_UTILISATION:
      return [
        breadcrumbSchema([
          { name: "Accueil", path: ROUTE_PATHS.HOME },
          { name: "Modalités d'utilisation", path: ROUTE_PATHS.MODALITES_UTILISATION },
        ]),
      ];
    default:
      return [];
  }
};
