import {
  CONTACT_ADDRESS_COUNTRY,
  CONTACT_ADDRESS_LOCALITY,
  CONTACT_ADDRESS_POSTAL_CODE,
  CONTACT_ADDRESS_REGION,
  CONTACT_ADDRESS_STREET,
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
} from "@/consts/contact";
import { FAQ_ITEMS } from "@/consts/faqs";
import { ROUTE_PATHS, buildContactServicePath } from "@/consts/navigation";
import { SEO_SITE_URL } from "@/consts/seo";
import { STRUCTURED_DATA_AREA_SERVED } from "@/consts/zones";
import { SERVICES } from "@/consts/services";

const businessAddress = {
  "@type": "PostalAddress",
  streetAddress: CONTACT_ADDRESS_STREET,
  addressLocality: CONTACT_ADDRESS_LOCALITY,
  addressRegion: CONTACT_ADDRESS_REGION,
  postalCode: CONTACT_ADDRESS_POSTAL_CODE,
  addressCountry: CONTACT_ADDRESS_COUNTRY,
};

const areaServed = STRUCTURED_DATA_AREA_SERVED.map((name) => ({
  "@type": "City",
  name,
}));

const serviceDescriptions: Record<string, string> = {
  conduits:
    "Nettoyage des conduits de fournaise résidentiels pour favoriser une circulation d'air plus saine.",
  secheuse:
    "Nettoyage du conduit de sécheuse pour limiter l'accumulation de charpie et améliorer la performance.",
  echangeur:
    "Nettoyage de l'échangeur d'air pour un renouvellement d'air intérieur efficace.",
  climatiseur:
    "Nettoyage de climatiseur mural incluant filtres, évaporateur et bac de récupération.",
  commercial:
    "Nettoyage de conduits commerciaux sur estimation pour bureaux et commerces.",
};

const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "VentiPure",
  url: SEO_SITE_URL,
  telephone: CONTACT_PHONE_E164,
  email: CONTACT_EMAIL,
  address: businessAddress,
  areaServed,
  description:
    "Service professionnel de nettoyage de ventilation résidentielle et commerciale au Québec.",
});

const servicesSchema = () =>
  SERVICES.filter((service) => service.id !== "autre").map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.label,
    description: serviceDescriptions[service.id] || service.title,
    provider: {
      "@type": "ProfessionalService",
      name: "VentiPure",
      url: SEO_SITE_URL,
    },
    areaServed,
    url: `${SEO_SITE_URL}${ROUTE_PATHS.SERVICES}#${service.id}`,
    ...(service.price !== null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "CAD",
            price: String(service.price),
            url: `${SEO_SITE_URL}${buildContactServicePath(service.id)}`,
          },
        }
      : {}),
  }));

const faqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

const breadcrumbSchema = (path: string, label: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: SEO_SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: label,
      item: `${SEO_SITE_URL}${path}`,
    },
  ],
});

export const getStructuredDataForPath = (pathname: string) => {
  switch (pathname) {
    case ROUTE_PATHS.HOME:
      return [localBusinessSchema(), faqSchema()];
    case ROUTE_PATHS.SERVICES:
      return [breadcrumbSchema(ROUTE_PATHS.SERVICES, "Services"), ...servicesSchema()];
    case ROUTE_PATHS.TARIFS:
      return [breadcrumbSchema(ROUTE_PATHS.TARIFS, "Tarifs"), ...servicesSchema()];
    case ROUTE_PATHS.EQUIPEMENT:
      return [breadcrumbSchema(ROUTE_PATHS.EQUIPEMENT, "Équipement")];
    case ROUTE_PATHS.SECTEURS:
      return [breadcrumbSchema(ROUTE_PATHS.SECTEURS, "Secteurs desservis")];
    case ROUTE_PATHS.CONTACT:
      return [breadcrumbSchema(ROUTE_PATHS.CONTACT, "Contact"), localBusinessSchema()];
    default:
      return [];
  }
};
