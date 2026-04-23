import { ROUTE_PATHS } from "@/consts/navigation";
import {
  SERVICE_MARKETING_ENTRIES,
  SERVICE_ROUTE_BY_ID,
  type ServiceMarketingId,
} from "@/consts/services";
import {
  FAQ_CLIMATISEUR,
  FAQ_COMMERCIAUX,
  FAQ_CONDUIT,
  FAQ_ECHANGER,
  FAQ_SECHEUSE,
} from "@/consts/faqs";

export type ServiceLandingFaqItem = {
  q: string;
  a: string;
};

export type ServiceLandingImage = {
  src: string;
  alt: string;
};

export type ServiceLandingProcessStep = {
  title: string;
  description: string;
};

export type ServiceLandingPageConfig = {
  id: ServiceMarketingId;
  path: string;
  h1: string;
  subtitle: string;
  priceSignal: string;

  heroImage: ServiceLandingImage;
  supportImage?: ServiceLandingImage;

  benefits: string[];
  symptomChips: string[];

  problemSection: string;
  includes: string[];
  excludes: string[];
  processSteps: ServiceLandingProcessStep[];
  faq: ServiceLandingFaqItem[];
  relatedServices: ServiceMarketingId[];

  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

const entriesById = SERVICE_MARKETING_ENTRIES.reduce<
  Record<ServiceMarketingId, (typeof SERVICE_MARKETING_ENTRIES)[number]>
>((acc, entry) => {
  acc[entry.id] = entry;
  return acc;
}, {} as Record<ServiceMarketingId, (typeof SERVICE_MARKETING_ENTRIES)[number]>);

export const SERVICE_LANDING_PAGES: ServiceLandingPageConfig[] = [
  {
    id: "conduits",
    path: ROUTE_PATHS.SERVICES_CONDUITS,
    h1: "Nettoyage des conduits de fournaise à Montréal et Grand Montréal",
    subtitle:
      "Améliorez la circulation de l’air dans votre maison et gardez un réseau de ventilation résidentiel mieux entretenu toute l’année.",
    priceSignal: "À partir de 349 $",
    heroImage: {
      src: "/nettoyage-ventillations/service-conduits.jpg",
      alt: "Nettoyage professionnel des conduits de fournaise dans une résidence du Grand Montréal",
    },
    supportImage: {
      src: "/nettoyage-ventillations/tarif-conduits.jpg",
      alt: "Intervention de nettoyage de conduits de fournaise résidentiels au Québec",
    },
    benefits: [
      "Jusqu’à 15 sorties incluses",
      "Meilleure circulation de l’air",
      "Entretien résidentiel professionnel",
    ],
    symptomChips: [
      "Poussière persistante",
      "Air inégal d’une pièce à l’autre",
      "Après rénovations",
      "Présence d’animaux",
    ],
    problemSection:
      "Les conduits de fournaise accumulent naturellement poussière fine, squames, résidus de rénovation et autres particules en suspension. Avec le temps, cette accumulation peut nuire au confort, rendre la circulation d’air moins uniforme et diminuer l’efficacité globale du système. Un nettoyage professionnel aide à repartir sur une base plus saine et plus stable pour l’entretien du réseau résidentiel.",
    includes: [
      "Inspection visuelle des conduits accessibles avant l’intervention",
      "Nettoyage des conduits d’alimentation et de retour accessibles",
      "Aspiration avec équipement adapté au nettoyage résidentiel",
      "Nettoyage des grilles et sorties incluses au forfait de base",
      "Vérification finale des composantes traitées",
    ],
    excludes: [
      "Démontage complet de conduits encastrés non accessibles",
      "Réparation de conduits endommagés ou fuyants",
      "Travaux d’électricité, de plomberie ou de conversion de système",
    ],
    processSteps: [
      {
        title: "Inspection du réseau",
        description:
          "Validation du réseau accessible, du nombre de sorties et des points d’intervention.",
      },
      {
        title: "Préparation de l’intervention",
        description:
          "Mise en pression négative et préparation des accès pour travailler proprement.",
      },
      {
        title: "Nettoyage des sections ciblées",
        description:
          "Brossage, soufflage contrôlé et aspiration des conduits accessibles.",
      },
      {
        title: "Vérification finale",
        description:
          "Contrôle des composantes traitées et résumé clair de l’intervention.",
      },
    ],
    faq: FAQ_CONDUIT,
    relatedServices: ["secheuse", "echangeur"],
    primaryCtaLabel: "Demander une soumission pour les conduits",
    secondaryCtaLabel: "Voir les tarifs",
  },
  {
    id: "secheuse",
    path: ROUTE_PATHS.SERVICES_SECHEUSE,
    h1: "Nettoyage du conduit de sécheuse à Montréal et Grand Montréal",
    subtitle:
      "Réduisez l’accumulation de charpie et retrouvez un séchage plus rapide avec un conduit entretenu correctement.",
    priceSignal: "À partir de 149 $",
    heroImage: {
      src: "/nettoyage-ventillations/service-secheuse.jpg",
      alt: "Nettoyage professionnel d’un conduit de sécheuse dans une résidence du Grand Montréal",
    },
    supportImage: {
      src: "/nettoyage-ventillations/tarif-secheuse.jpg",
      alt: "Entretien d’un conduit de sécheuse résidentiel au Québec",
    },
    benefits: [
      "Réduction de la charpie accumulée",
      "Séchage plus efficace",
      "Entretien important pour la sécurité",
    ],
    symptomChips: [
      "Temps de séchage plus long",
      "Accumulation de charpie",
      "Conduit long ou avec coudes",
      "Usage fréquent",
    ],
    problemSection:
      "Avec l’usage, la charpie et les résidus s’accumulent dans le conduit de sécheuse et réduisent le débit d’air. La sécheuse doit alors fonctionner plus longtemps, ce qui augmente l’usure, la consommation d’énergie et les risques évitables. Un nettoyage bien exécuté aide à retirer les dépôts accumulés et à garder une évacuation plus efficace.",
    includes: [
      "Inspection du trajet du conduit de sécheuse",
      "Retrait de la charpie dans les sections accessibles",
      "Nettoyage de la sortie extérieure quand accessible",
      "Vérification du débit d’air après intervention",
      "Recommandations d’entretien selon l’usage du foyer",
    ],
    excludes: [
      "Remplacement de conduit écrasé ou non conforme",
      "Réparation d’appareil électroménager",
      "Travaux d’ouverture de mur pour accès fermé",
    ],
    processSteps: [
      {
        title: "Évaluation du trajet",
        description:
          "Repérage des zones d’accumulation et des contraintes du conduit.",
      },
      {
        title: "Délogement des résidus",
        description:
          "Retrait contrôlé de la charpie et des dépôts accumulés.",
      },
      {
        title: "Aspiration complète",
        description:
          "Nettoyage du conduit et de la sortie extérieure lorsque possible.",
      },
      {
        title: "Validation finale",
        description:
          "Vérification du fonctionnement et conseils d’entretien préventif.",
      },
    ],
    faq: FAQ_SECHEUSE,
    relatedServices: ["conduits", "climatiseur"],
    primaryCtaLabel: "Demander une soumission pour la sécheuse",
    secondaryCtaLabel: "Voir les tarifs",
  },
  {
    id: "echangeur",
    path: ROUTE_PATHS.SERVICES_ECHANGEUR,
    h1: "Nettoyage de l’échangeur d’air à Montréal et Grand Montréal",
    subtitle:
      "Maintenez un renouvellement d’air plus efficace et un environnement intérieur mieux entretenu grâce à un échangeur propre.",
    priceSignal: "249 $",
    heroImage: {
      src: "/nettoyage-ventillations/service-echangeur.jpg",
      alt: "Nettoyage professionnel d’un échangeur d’air résidentiel à Montréal et dans le Grand Montréal",
    },
    supportImage: {
      src: "/nettoyage-ventillations/tarif-echangeur.jpg",
      alt: "Entretien d’un échangeur d’air dans une résidence québécoise",
    },
    benefits: [
      "Air intérieur mieux renouvelé",
      "Entretien préventif utile",
      "Fonctionnement plus stable de l’appareil",
    ],
    symptomChips: [
      "Humidité persistante",
      "Odeurs qui restent",
      "Filtres encrassés",
      "Ventilation moins efficace",
    ],
    problemSection:
      "Dans une maison bien isolée, l’échangeur d’air joue un rôle important dans le renouvellement de l’air intérieur. Quand les filtres, le noyau et les sections accessibles s’encrassent, la circulation devient moins efficace et l’appareil peut perdre en rendement. Un nettoyage complet aide à garder un fonctionnement plus stable et un meilleur confort au quotidien.",
    includes: [
      "Nettoyage du noyau de l’échangeur d’air",
      "Nettoyage ou entretien des filtres selon leur type",
      "Nettoyage des sections de conduits accessibles",
      "Vérification de base du fonctionnement de l’appareil",
      "Recommandations de fréquence d’entretien",
    ],
    excludes: [
      "Remplacement de pièces électroniques défectueuses",
      "Réparation complète du moteur ou de la carte de contrôle",
      "Modification de la configuration du système de ventilation",
    ],
    processSteps: [
      {
        title: "Inspection de l’appareil",
        description:
          "Vérification des composantes, des accès et de l’état général de l’échangeur.",
      },
      {
        title: "Nettoyage des composantes",
        description:
          "Nettoyage du noyau, des filtres et des sections accessibles.",
      },
      {
        title: "Remontage et vérification",
        description:
          "Remise en place des composantes et validation du fonctionnement.",
      },
      {
        title: "Conseils d’entretien",
        description:
          "Recommandations simples selon votre installation et votre usage.",
      },
    ],
    faq: FAQ_ECHANGER,
    relatedServices: ["conduits", "climatiseur"],
    primaryCtaLabel: "Demander une soumission pour l’échangeur d’air",
    secondaryCtaLabel: "Voir les tarifs",
  },
  {
    id: "climatiseur",
    path: ROUTE_PATHS.SERVICES_CLIMATISEUR,
    h1: "Nettoyage de climatiseur mural à Montréal et Grand Montréal",
    subtitle:
      "Retrouvez un air plus propre et une meilleure performance de refroidissement pendant les périodes chaudes.",
    priceSignal: "249 $",
    heroImage: {
      src: "/nettoyage-ventillations/service-climatiseur.jpg",
      alt: "Nettoyage d’un climatiseur mural résidentiel dans le Grand Montréal",
    },
    supportImage: {
      src: "/nettoyage-ventillations/tarif-climatiseur.jpg",
      alt: "Entretien professionnel d’un climatiseur mural au Québec",
    },
    benefits: [
      "Air plus propre",
      "Réduction des odeurs",
      "Meilleure performance saisonnière",
    ],
    symptomChips: [
      "Odeurs à l’allumage",
      "Filtres encrassés",
      "Débit d’air plus faible",
      "Entretien avant l’été",
    ],
    problemSection:
      "Un climatiseur mural ou une thermopompe murale accumule rapidement poussière, résidus et humidité sur les filtres et les surfaces critiques. Quand ces composantes sont encrassées, l’air passe moins bien, les odeurs augmentent et l’appareil doit travailler plus fort. Un entretien ciblé aide à garder un fonctionnement plus propre et plus efficace pendant la saison chaude.",
    includes: [
      "Nettoyage des filtres de l’unité murale",
      "Nettoyage de l’évaporateur et des surfaces accessibles",
      "Nettoyage du bac de récupération",
      "Vérification visuelle de l’écoulement de base",
      "Contrôle de fonctionnement après intervention",
    ],
    excludes: [
      "Recharge de gaz réfrigérant",
      "Réparation de fuite réfrigérante",
      "Réparation électronique de carte ou compresseur",
    ],
    processSteps: [
      {
        title: "Inspection de l’unité",
        description:
          "Vérification des composantes accessibles et de l’état général de l’appareil.",
      },
      {
        title: "Nettoyage ciblé",
        description:
          "Traitement des filtres, de l’évaporateur et des zones critiques.",
      },
      {
        title: "Rinçage et remise en état",
        description:
          "Nettoyage des surfaces traitées et vérification des écoulements visibles.",
      },
      {
        title: "Validation du rendement",
        description:
          "Remise en marche et contrôle de fonctionnement après intervention.",
      },
    ],
    faq: FAQ_CLIMATISEUR,
    relatedServices: ["echangeur", "secheuse"],
    primaryCtaLabel: "Demander une soumission pour le climatiseur mural",
    secondaryCtaLabel: "Voir les tarifs",
  },
  {
    id: "commercial",
    path: ROUTE_PATHS.SERVICES_COMMERCIAUX,
    h1: "Nettoyage de conduits commerciaux à Montréal et Grand Montréal",
    subtitle:
      "Planifiez une intervention adaptée à vos opérations pour maintenir un environnement plus propre dans vos locaux.",
    priceSignal: "Sur estimation",
    heroImage: {
      src: "/nettoyage-ventillations/service-editorial.jpg",
      alt: "Nettoyage de conduits commerciaux pour bureaux et commerces à Montréal et dans le Grand Montréal",
    },
    supportImage: {
      src: "/nettoyage-ventillations/service-editorial.jpg",
      alt: "Intervention de nettoyage de ventilation commerciale au Québec",
    },
    benefits: [
      "Intervention adaptée à vos opérations",
      "Approche planifiée selon vos horaires",
      "Soumission sur mesure",
    ],
    symptomChips: [
      "Bureaux et commerces",
      "Qualité d’air en milieu de travail",
      "Entretien planifié",
      "Intervention sur mesure",
    ],
    problemSection:
      "En milieu commercial, la ventilation influence directement le confort des occupants, l’expérience client et la stabilité des opérations. Avec le temps, les conduits accumulent poussière, particules et résidus liés à l’usage quotidien du bâtiment. Une intervention planifiée permet d’entretenir les sections visées sans perturber inutilement vos activités.",
    includes: [
      "Évaluation initiale du réseau et des accès",
      "Plan d’intervention adapté au bâtiment et aux horaires",
      "Nettoyage des conduits accessibles selon la portée validée",
      "Coordination avec la gestion du bâtiment ou l’exploitant",
      "Compte rendu des travaux réalisés",
    ],
    excludes: [
      "Travaux de reconstruction de conduits",
      "Interventions en espaces non accessibles sans préparation préalable",
      "Maintenance mécanique complète des unités CVAC",
    ],
    processSteps: [
      {
        title: "Visite technique",
        description:
          "Évaluation du bâtiment, des accès et de la portée d’intervention.",
      },
      {
        title: "Planification",
        description:
          "Organisation du chantier selon vos horaires et vos contraintes opérationnelles.",
      },
      {
        title: "Nettoyage ciblé",
        description:
          "Intervention avec équipements spécialisés sur les sections validées.",
      },
      {
        title: "Compte rendu",
        description:
          "Résumé clair des travaux réalisés et recommandations au besoin.",
      },
    ],
    faq: FAQ_COMMERCIAUX,
    relatedServices: ["conduits", "echangeur"],
    primaryCtaLabel: "Demander une estimation commerciale",
    secondaryCtaLabel: "Nous contacter",
  },
];

export const SERVICE_LANDING_BY_PATH = SERVICE_LANDING_PAGES.reduce<
  Record<string, ServiceLandingPageConfig>
>((acc, page) => {
  acc[page.path] = page;
  return acc;
}, {});

export const SERVICE_LANDING_BY_ID = SERVICE_LANDING_PAGES.reduce<
  Record<ServiceMarketingId, ServiceLandingPageConfig>
>((acc, page) => {
  acc[page.id] = page;
  return acc;
}, {} as Record<ServiceMarketingId, ServiceLandingPageConfig>);

export const getServiceEntryForLanding = (id: ServiceMarketingId) => entriesById[id];

export const getServiceRoute = (id: ServiceMarketingId) => SERVICE_ROUTE_BY_ID[id];