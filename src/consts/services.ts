import { ROUTE_PATHS } from "@/consts/navigation";

export type ServiceId =
  | "conduits"
  | "secheuse"
  | "echangeur"
  | "climatiseur"
  | "commercial"
  | "autre";

export type ServiceItem = {
  id: ServiceId;
  label: string;
  title: string;
  price: number | null;
  priceLabel: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "conduits",
    label: "Conduits de fournaise",
    title: "Nettoyage des conduits de fournaise",
    price: 349,
    priceLabel: "349 $",
  },
  {
    id: "secheuse",
    label: "Conduit de sécheuse",
    title: "Nettoyage du conduit de sécheuse",
    price: 149,
    priceLabel: "149 $",
  },
  {
    id: "echangeur",
    label: "Échangeur d'air",
    title: "Nettoyage de l'échangeur d'air",
    price: 249,
    priceLabel: "249 $",
  },
  {
    id: "climatiseur",
    label: "Climatiseur mural",
    title: "Nettoyage de climatiseur mural",
    price: 249,
    priceLabel: "249 $",
  },
  {
    id: "commercial",
    label: "Conduits commerciaux",
    title: "Nettoyage de conduits commerciaux",
    price: null,
    priceLabel: "Sur demande",
  },
  {
    id: "autre",
    label: "Autre",
    title: "Autre besoin",
    price: null,
    priceLabel: "Sur estimation",
  },
];

export const COMBO_DISCOUNT = 20;
export const COMBO_SERVICES: ServiceId[] = ["conduits", "secheuse"];

export const COMBO_PRESETS: Record<string, ServiceId[]> = {
  "best-seller": COMBO_SERVICES,
};

export const getService = (id: string): ServiceItem | undefined =>
  SERVICES.find((s) => s.id === id);

export type ServiceMarketingId = Exclude<ServiceId, "autre">;

export const SERVICE_ROUTE_BY_ID: Record<ServiceMarketingId, string> = {
  conduits: ROUTE_PATHS.SERVICES_CONDUITS,
  secheuse: ROUTE_PATHS.SERVICES_SECHEUSE,
  echangeur: ROUTE_PATHS.SERVICES_ECHANGEUR,
  climatiseur: ROUTE_PATHS.SERVICES_CLIMATISEUR,
  commercial: ROUTE_PATHS.SERVICES_COMMERCIAUX,
};

export enum SERVICE_MEDIA_ASSETS {
  SERVICE_CONDUITS = "/nettoyage-ventillations/service-conduits.jpg",
  SERVICE_ECHANGEUR = "/nettoyage-ventillations/service-echangeur.jpg",
  SERVICE_SECHEUSE = "/nettoyage-ventillations/service-secheuse.jpg",
  SERVICE_CLIMATISEUR = "/nettoyage-ventillations/service-climatiseur.jpg",
  SERVICE_EDITORIAL = "/nettoyage-ventillations/service-editorial.jpg",
  TARIF_CONDUITS = "/nettoyage-ventillations/tarif-conduits.jpg",
  TARIF_ECHANGEUR = "/nettoyage-ventillations/tarif-echangeur.jpg",
  TARIF_SECHEUSE = "/nettoyage-ventillations/tarif-secheuse.jpg",
  TARIF_CLIMATISEUR = "/nettoyage-ventillations/tarif-climatiseur.jpg",
}

export type ServiceMarketingEntry = {
  id: ServiceMarketingId;
  homeDescription: string;
  servicesPage: {
    title: string;
    price: string;
    description: string;
    benefits: string[];
    image: SERVICE_MEDIA_ASSETS;
    alt: string;
  };
  tarifsPage: {
    title: string;
    price: string;
    priceNote: string;
    includes: string;
    image: SERVICE_MEDIA_ASSETS;
    alt: string;
  };
};

export const SERVICE_MARKETING_ENTRIES: ServiceMarketingEntry[] = [
  {
    id: "conduits",
    homeDescription:
      "Nettoyage complet du réseau de conduits pour une meilleure circulation d'air chaud et un système plus performant.",
    servicesPage: {
      title: "Nettoyage des conduits de fournaise",
      price: "À partir de 349 $",
      description:
        "Ce service cible les conduits de ventilation reliés à votre fournaise résidentielle. Le nettoyage professionnel permet de réduire l'accumulation de poussière et de favoriser une meilleure circulation de l'air dans toute la maison.",
      benefits: [
        "Jusqu'à 15 sorties incluses",
        "Amélioration de la circulation de l'air",
        "Entretien du système résidentiel",
      ],
      image: SERVICE_MEDIA_ASSETS.SERVICE_CONDUITS,
      alt: "Technicien nettoyant les conduits de fournaise dans une maison résidentielle au Québec",
    },
    tarifsPage: {
      title: "Conduits de fournaise",
      price: "349 $",
      priceNote: "à partir de",
      includes:
        "Jusqu'à 15 sorties incluses. Frais variables selon la distance et les sorties supplémentaires.",
      image: SERVICE_MEDIA_ASSETS.TARIF_CONDUITS,
      alt: "Nettoyage de conduits de fournaise résidentielle au Québec",
    },
  },
  {
    id: "echangeur",
    homeDescription:
      "Entretien de l'échangeur pour un renouvellement d'air efficace et un environnement intérieur plus sain.",
    servicesPage: {
      title: "Nettoyage de l'échangeur d'air",
      price: "249 $",
      description:
        "Le nettoyage de l'échangeur d'air contribue à un meilleur renouvellement de l'air intérieur et au bon fonctionnement de l'appareil. Ce service comprend le noyau, les filtres et les conduits accessibles.",
      benefits: [
        "Air intérieur plus sain",
        "Meilleur fonctionnement de l'appareil",
        "Entretien préventif utile",
      ],
      image: SERVICE_MEDIA_ASSETS.SERVICE_ECHANGEUR,
      alt: "Nettoyage professionnel d'un échangeur d'air résidentiel",
    },
    tarifsPage: {
      title: "Échangeur d'air",
      price: "249 $",
      priceNote: "",
      includes: "Nettoyage complet du noyau, des filtres et des conduits accessibles.",
      image: SERVICE_MEDIA_ASSETS.TARIF_ECHANGEUR,
      alt: "Nettoyage d'échangeur d'air résidentiel",
    },
  },
  {
    id: "secheuse",
    homeDescription:
      "Retrait de la charpie accumulée dans le conduit pour un séchage plus rapide et une utilisation plus sécuritaire.",
    servicesPage: {
      title: "Nettoyage du conduit de sécheuse",
      price: "149 $",
      description:
        "Le retrait de la charpie et des résidus accumulés dans le conduit de sécheuse aide à maintenir une meilleure performance de l'appareil et contribue à une utilisation résidentielle plus sécuritaire.",
      benefits: [
        "Réduction du temps de séchage",
        "Moins d'accumulation de charpie",
        "Entretien important pour la sécurité",
      ],
      image: SERVICE_MEDIA_ASSETS.SERVICE_SECHEUSE,
      alt: "Nettoyage du conduit de sécheuse dans une résidence québécoise",
    },
    tarifsPage: {
      title: "Conduit de sécheuse",
      price: "149 $",
      priceNote: "",
      includes: "Retrait de la charpie et nettoyage du conduit jusqu'à la sortie extérieure.",
      image: SERVICE_MEDIA_ASSETS.TARIF_SECHEUSE,
      alt: "Nettoyage de conduit de sécheuse résidentielle",
    },
  },
  {
    id: "climatiseur",
    homeDescription:
      "Nettoyage en profondeur de l'unité murale pour un meilleur rendement pendant les mois chauds.",
    servicesPage: {
      title: "Nettoyage d'air climatisé mural",
      price: "249 $",
      description:
        "Le nettoyage de l'unité murale comprend les filtres, l'évaporateur et le bac de récupération. Ce service aide à réduire les odeurs, à améliorer la propreté de l'air et à maintenir une meilleure performance de refroidissement.",
      benefits: [
        "Air plus propre",
        "Réduction des odeurs",
        "Meilleure performance de l'unité",
      ],
      image: SERVICE_MEDIA_ASSETS.SERVICE_CLIMATISEUR,
      alt: "Nettoyage d'un climatiseur mural résidentiel",
    },
    tarifsPage: {
      title: "Climatiseur mural",
      price: "249 $",
      priceNote: "",
      includes:
        "Nettoyage de l'unité murale, des filtres, de l'évaporateur et du bac de récupération.",
      image: SERVICE_MEDIA_ASSETS.TARIF_CLIMATISEUR,
      alt: "Nettoyage de climatiseur mural résidentiel",
    },
  },
  {
    id: "commercial",
    homeDescription:
      "Solutions d'entretien sur mesure pour bureaux, commerces et immeubles à revenus, après estimation gratuite.",
    servicesPage: {
      title: "Nettoyage de conduits commerciaux",
      price: "Sur estimation",
      description:
        "Solutions d'entretien sur mesure pour bureaux, commerces et bâtiments industriels. Nous évaluons votre réseau de ventilation et préparons une estimation adaptée à vos espaces et à votre horaire d'opération.",
      benefits: [
        "Expertise pour bureaux, commerces et bâtiments industriels",
        "Estimation gratuite sur place ou à distance",
        "Interventions planifiées selon vos heures d'ouverture",
      ],
      image: SERVICE_MEDIA_ASSETS.SERVICE_EDITORIAL,
      alt: "Nettoyage de conduits de ventilation commerciaux pour bureaux et commerces au Québec",
    },
    tarifsPage: {
      title: "Conduits commerciaux",
      price: "Sur demande",
      priceNote: "",
      includes:
        "Solutions d'entretien sur mesure pour bureaux, commerces et immeubles à revenus, après estimation gratuite.",
      image: SERVICE_MEDIA_ASSETS.SERVICE_EDITORIAL,
      alt: "Nettoyage de conduits de ventilation pour bureaux et commerces au Québec",
    },
  },
];
