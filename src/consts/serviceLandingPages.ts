import { ROUTE_PATHS } from "@/consts/navigation";
import {
  SERVICE_MARKETING_ENTRIES,
  SERVICE_ROUTE_BY_ID,
  type ServiceMarketingId,
} from "@/consts/services";

export type ServiceLandingFaqItem = {
  q: string;
  a: string;
};

export type ServiceLandingPageConfig = {
  id: ServiceMarketingId;
  path: string;
  h1: string;
  subtitle: string;
  priceSignal: string;
  problemSection: string;
  includes: string[];
  excludes: string[];
  processSteps: string[];
  faq: ServiceLandingFaqItem[];
  relatedServices: ServiceMarketingId[];
};

const entriesById = SERVICE_MARKETING_ENTRIES.reduce<Record<ServiceMarketingId, (typeof SERVICE_MARKETING_ENTRIES)[number]>>(
  (acc, entry) => {
    acc[entry.id] = entry;
    return acc;
  },
  {} as Record<ServiceMarketingId, (typeof SERVICE_MARKETING_ENTRIES)[number]>,
);

export const SERVICE_LANDING_PAGES: ServiceLandingPageConfig[] = [
  {
    id: "conduits",
    path: ROUTE_PATHS.SERVICES_CONDUITS,
    h1: "Nettoyage des conduits de fournaise à Montréal et Grand Montréal",
    subtitle:
      "Respirez un air intérieur plus sain et gardez un système de chauffage à air pulsé plus efficace toute l'année.",
    priceSignal: "Dès 349 $",
    problemSection:
      "Les conduits de fournaise d'un système de chauffage à air pulsé accumulent naturellement poussière fine, squames, résidus de rénovation et particules en suspension. Au Québec, la fournaise fonctionne souvent entre 6 et 8 mois par année, donc l'air circule longtemps dans le même réseau et transporte ces dépôts dans les pièces. Dans plusieurs maisons de Montréal construites avant 1990, on retrouve encore des sections de conduits galvanisés ou des raccords ajoutés au fil des travaux, ce qui favorise l'accumulation de particules. Quand le réseau est encrassé, la qualité de l'air intérieur peut se dégrader, le confort devient irrégulier d'une pièce à l'autre et la fournaise peut forcer davantage, ce qui nuit à l'efficacité énergétique. Un nettoyage de conduits de fournaise réalisé selon les bonnes pratiques ACNOR/NADCA aide à rétablir une circulation d'air plus stable. Pour la plupart des résidences, une fréquence de 3 à 5 ans est réaliste; en présence d'animaux, d'allergies ou après des rénovations, un entretien annuel peut être plus approprié.",
    includes: [
      "Inspection visuelle des conduits accessibles avant l'intervention",
      "Nettoyage mécanique des conduits d'alimentation et de retour accessibles",
      "Aspiration avec filtration adaptée au nettoyage résidentiel",
      "Nettoyage des grilles et sorties incluses au forfait de base",
      "Vérification finale des composantes traitées",
    ],
    excludes: [
      "Démontage complet de conduits encastrés non accessibles",
      "Réparation de conduits endommagés ou fuyants",
      "Travaux d'électricité, de plomberie ou de conversion de système",
    ],
    processSteps: [
      "Inspection du réseau et validation du nombre de sorties",
      "Mise en pression négative et préparation des points d'accès",
      "Brossage et soufflage contrôlé de chaque section de conduit",
      "Nettoyage final, vérification et résumé de l'intervention",
    ],
    faq: [
      {
        q: "Combien de temps dure le nettoyage des conduits de fournaise?",
        a: "La plupart des interventions durent entre 2 h et 3 h selon la taille de la maison et le nombre de sorties à traiter.",
      },
      {
        q: "À quelle fréquence faut-il nettoyer les conduits de fournaise au Québec?",
        a: "Un intervalle de 3 à 5 ans est courant, mais il peut être plus court après des rénovations, avec animaux ou allergies marquées.",
      },
      {
        q: "Le nettoyage des conduits améliore-t-il la qualité de l'air intérieur?",
        a: "Oui, il aide à réduire la recirculation de poussière et de particules dans les pièces lorsque le chauffage fonctionne.",
      },
      {
        q: "Le nettoyage inclut-il toutes les sorties de ventilation?",
        a: "Le forfait de base inclut un nombre défini de sorties. Les sorties supplémentaires sont validées avant le début des travaux.",
      },
      {
        q: "Est-ce que je dois quitter la maison pendant l'intervention?",
        a: "Non, dans la majorité des cas vous pouvez rester sur place. Notre équipe vous indique simplement les zones à garder dégagées.",
      },
    ],
    relatedServices: ["secheuse", "echangeur"],
  },
  {
    id: "secheuse",
    path: ROUTE_PATHS.SERVICES_SECHEUSE,
    h1: "Nettoyage du conduit de sécheuse à Montréal et Grand Montréal",
    subtitle:
      "Réduisez l'accumulation de charpie et retrouvez un séchage plus rapide avec un conduit entretenu correctement.",
    priceSignal: "Dès 149 $",
    problemSection:
      "Le conduit de sécheuse est l'un des éléments les plus à risque quand il est négligé. Avec l'usage, l'accumulation de charpie se colle aux parois, réduit le débit d'air et oblige la sécheuse à fonctionner plus longtemps pour un même chargement. Les conséquences sont concrètes: cycles plus longs, consommation d'énergie plus élevée, surchauffe de l'appareil et hausse du risque d'incendie. Dans les maisons familiales du Grand Montréal, où la sécheuse roule souvent plusieurs fois par semaine, ce problème se développe rapidement. Un conduit partiellement bloqué peut facilement doubler la durée de séchage, surtout si le trajet est long ou comporte plusieurs coudes. Un nettoyage de conduit de sécheuse bien exécuté retire les dépôts de charpie, améliore l'efficacité du séchage et réduit les risques évitables. Pour la majorité des foyers québécois, un nettoyage annuel est recommandé; pour les grandes familles ou un usage intensif, un entretien aux 6 mois est souvent plus prudent. Cette approche s'aligne avec les recommandations d'inspection périodique du fabricant et les bonnes pratiques de sécurité résidentielle.",
    includes: [
      "Inspection du trajet du conduit de sécheuse",
      "Retrait de la charpie accumulée dans les sections accessibles",
      "Nettoyage de la sortie extérieure quand accessible",
      "Vérification du débit d'air après intervention",
      "Recommandations d'entretien adaptées à l'usage du foyer",
    ],
    excludes: [
      "Remplacement de conduit écrasé ou non conforme",
      "Réparation d'appareil électroménager",
      "Travaux de menuiserie ou d'ouverture de mur pour accès fermé",
    ],
    processSteps: [
      "Évaluation du trajet et des points d'accumulation",
      "Délogement contrôlé des résidus de charpie",
      "Aspiration complète du conduit et de la sortie",
      "Test de fonctionnement et conseils de prévention",
    ],
    faq: [
      {
        q: "Pourquoi le nettoyage du conduit de sécheuse est-il important?",
        a: "Parce qu'un conduit obstrué nuit au débit d'air, allonge les cycles et augmente les risques de surchauffe liés à la charpie.",
      },
      {
        q: "À quelle fréquence faut-il faire nettoyer un conduit de sécheuse?",
        a: "Généralement chaque 12 à 24 mois selon la fréquence d'utilisation et la longueur du conduit.",
      },
      {
        q: "Quels signes indiquent qu'un nettoyage est nécessaire?",
        a: "Séchage plus long, appareil très chaud, odeur inhabituelle ou accumulation visible de charpie près de la sortie extérieure.",
      },
      {
        q: "Le service inclut-il la sortie extérieure?",
        a: "Oui, quand elle est accessible et sécuritaire, elle est nettoyée dans le cadre de l'intervention.",
      },
      {
        q: "Est-ce que le nettoyage peut réduire ma consommation d'énergie?",
        a: "Un meilleur débit d'air peut réduire la durée des cycles et donc limiter la consommation globale de la sécheuse.",
      },
    ],
    relatedServices: ["conduits", "climatiseur"],
  },
  {
    id: "echangeur",
    path: ROUTE_PATHS.SERVICES_ECHANGEUR,
    h1: "Nettoyage de l'échangeur d'air à Montréal et Grand Montréal",
    subtitle:
      "Maintenez un renouvellement d'air efficace et un environnement intérieur plus sain grâce à un échangeur bien entretenu.",
    priceSignal: "249 $",
    problemSection:
      "Dans une maison moderne bien isolée, l'échangeur d'air est essentiel pour évacuer l'humidité et renouveler l'air intérieur. Au Québec, le Code du bâtiment impose depuis les années 1990 une ventilation mécanique dans les constructions neuves, ce qui explique la présence fréquente de VRC ou de VRÉ dans le Grand Montréal. Quand les filtres, le noyau et les conduits accessibles s'encrassent, le ventilateur récupérateur de chaleur perd en rendement: l'air circule moins bien, l'humidité monte et les odeurs persistent plus longtemps. En hiver, cette situation peut accentuer la condensation et l'inconfort dans les pièces les plus fermées. Un nettoyage d'échangeur d'air complet redonne au système sa capacité de renouvellement et améliore la qualité de l'air intérieur au quotidien. Pour la plupart des résidences, une inspection des filtres deux fois par année et un nettoyage complet tous les 1 à 2 ans donnent de bons résultats. Dans les foyers plus occupés ou plus humides, une fréquence annuelle est souvent préférable pour garder un fonctionnement stable.",
    includes: [
      "Nettoyage du noyau de l'échangeur d'air",
      "Nettoyage ou entretien des filtres selon leur type",
      "Nettoyage des sections de conduits accessibles",
      "Vérification de base du fonctionnement de l'appareil",
      "Recommandations de fréquence d'entretien",
    ],
    excludes: [
      "Remplacement de pièces électroniques défectueuses",
      "Réparation complète du moteur ou de la carte de contrôle",
      "Modification de la configuration du système de ventilation",
    ],
    processSteps: [
      "Inspection de l'appareil et de ses composantes",
      "Nettoyage du noyau, des filtres et des accès",
      "Remontage et vérification du fonctionnement",
      "Validation finale et recommandations d'entretien",
    ],
    faq: [
      {
        q: "Pourquoi nettoyer l'échangeur d'air régulièrement?",
        a: "Pour maintenir un bon renouvellement de l'air et éviter que poussière et humidité nuisent au confort intérieur.",
      },
      {
        q: "Le nettoyage inclut-il les filtres de l'échangeur?",
        a: "Oui, les filtres sont nettoyés ou vérifiés selon leur type et leur état au moment de l'intervention.",
      },
      {
        q: "Combien de temps dure le nettoyage d'un échangeur d'air?",
        a: "En moyenne entre 60 et 90 minutes selon le modèle et l'accès aux composantes.",
      },
      {
        q: "Est-ce que ce service est utile même si l'appareil fonctionne encore?",
        a: "Oui, un appareil qui fonctionne peut tout de même perdre en efficacité si ses composantes sont encrassées.",
      },
      {
        q: "À quelle fréquence planifier l'entretien d'un échangeur d'air?",
        a: "Un entretien annuel est une bonne base pour la majorité des résidences.",
      },
    ],
    relatedServices: ["conduits", "climatiseur"],
  },
  {
    id: "climatiseur",
    path: ROUTE_PATHS.SERVICES_CLIMATISEUR,
    h1: "Nettoyage de climatiseur mural à Montréal et Grand Montréal",
    subtitle:
      "Retrouvez un air plus propre et une meilleure performance de refroidissement pendant les périodes chaudes.",
    priceSignal: "249 $",
    problemSection:
      "Un climatiseur mural ou une thermopompe murale accumule rapidement poussière, biofilm et résidus sur les filtres, l'évaporateur et le bac de récupération. Quand ces composantes sont encrassées, l'air passe moins bien, les odeurs augmentent et l'appareil doit travailler plus fort pour maintenir la température demandée. Dans le climat du Québec, les périodes chaudes et humides de juillet-août favorisent la croissance de moisissures dans l'unité si l'entretien est repoussé trop longtemps. Résultat: qualité de l'air plus faible, inconfort et baisse de rendement. Un nettoyage de climatiseur mural ciblé sur les zones critiques aide à rétablir un débit d'air stable, limite la dispersion de particules et soutient la performance saisonnière de l'appareil. Pour un usage standard, une intervention annuelle avant l'été est recommandée. Si la thermopompe fonctionne aussi en chauffage pendant l'hiver, deux entretiens par année sont souvent plus adaptés. Cette routine réduit l'usure prématurée et garde un air intérieur plus sain pour toute la famille.",
    includes: [
      "Nettoyage des filtres de l'unité murale",
      "Nettoyage de l'évaporateur et des surfaces accessibles",
      "Nettoyage du bac de récupération",
      "Vérification visuelle de l'écoulement de base",
      "Contrôle de fonctionnement après intervention",
    ],
    excludes: [
      "Recharge de gaz réfrigérant",
      "Réparation de fuite réfrigérante",
      "Réparation électronique de carte ou compresseur",
    ],
    processSteps: [
      "Inspection de l'unité et des composantes accessibles",
      "Nettoyage ciblé des filtres, évaporateur et bac",
      "Rinçage et assainissement des zones traitées",
      "Remise en marche et validation du rendement",
    ],
    faq: [
      {
        q: "Quand faut-il nettoyer un climatiseur mural?",
        a: "Idéalement une fois par année, avant la saison chaude, ou plus souvent si l'appareil fonctionne intensivement.",
      },
      {
        q: "Le nettoyage peut-il réduire les odeurs du climatiseur?",
        a: "Oui, le nettoyage des composantes encrassées aide souvent à diminuer les odeurs causées par l'accumulation de résidus.",
      },
      {
        q: "Le service inclut-il la vérification du bac de récupération?",
        a: "Oui, le bac est nettoyé et vérifié dans le cadre du service standard.",
      },
      {
        q: "Combien de temps dure un nettoyage de climatiseur mural?",
        a: "En moyenne entre 60 et 90 minutes selon l'état de l'unité.",
      },
      {
        q: "Est-ce que le nettoyage améliore le rendement de refroidissement?",
        a: "Un appareil propre peut mieux circuler l'air et maintenir un rendement plus stable pendant l'été.",
      },
    ],
    relatedServices: ["echangeur", "secheuse"],
  },
  {
    id: "commercial",
    path: ROUTE_PATHS.SERVICES_COMMERCIAUX,
    h1: "Nettoyage de conduits commerciaux à Montréal et Grand Montréal",
    subtitle:
      "Planifiez des interventions adaptées à vos opérations pour maintenir un environnement plus propre dans vos locaux.",
    priceSignal: "Sur estimation",
    problemSection:
      "En milieu commercial, la ventilation commerciale influence directement le confort des employés, l'expérience client et la conformité opérationnelle. Dans des bureaux, cliniques, commerces ou immeubles multilocatifs, les conduits commerciaux accumulent poussière, particules fines et résidus liés à l'occupation quotidienne. Sans plan d'entretien, la qualité de l'air en milieu de travail se dégrade, les plaintes d'odeur augmentent et certains systèmes CVAC perdent en efficacité. Au Québec, les obligations générales de la LSST et les attentes CNESST sur la qualité de l'environnement de travail poussent les exploitants à documenter l'entretien de leurs installations. Un nettoyage structuré selon les pratiques reconnues (NADCA/ASHRAE 62.1) aide à maintenir un réseau plus sain et plus stable. Pour des environnements exigeants comme restauration, cliniques ou installations médicales, une fréquence annuelle est souvent recommandée. Pour des bureaux standards, un cycle de 2 à 3 ans peut suffire selon l'occupation et le type d'activité. L'approche VentiPure vise des interventions planifiées, avec minimum d'interruption des opérations.",
    includes: [
      "Évaluation initiale du réseau et des accès",
      "Plan d'intervention adapté au bâtiment et aux horaires",
      "Nettoyage des conduits accessibles selon la portée validée",
      "Coordination avec la gestion du bâtiment ou l'exploitant",
      "Compte rendu des travaux réalisés",
    ],
    excludes: [
      "Travaux de reconstruction de conduits",
      "Interventions en espaces non accessibles sans préparation préalable",
      "Maintenance mécanique complète des unités CVAC",
    ],
    processSteps: [
      "Visite technique et définition de la portée",
      "Planification du chantier selon vos heures d'opération",
      "Nettoyage des sections ciblées avec équipements spécialisés",
      "Vérification finale et rapport d'intervention",
    ],
    faq: [
      {
        q: "Comment est établi le prix d'un nettoyage commercial?",
        a: "Le prix dépend de la superficie, de la complexité du réseau, des accès et des contraintes d'horaire. Une estimation est fournie après évaluation.",
      },
      {
        q: "Pouvez-vous intervenir en dehors des heures d'ouverture?",
        a: "Oui, les interventions peuvent être planifiées tôt le matin, en soirée ou selon un horaire compatible avec vos activités.",
      },
      {
        q: "Quels types de bâtiments commerciaux desservez-vous?",
        a: "Nous intervenons dans des bureaux, commerces, immeubles à revenus et autres bâtiments institutionnels selon le mandat.",
      },
      {
        q: "Fournissez-vous un compte rendu après l'intervention?",
        a: "Oui, un résumé de la portée réalisée est remis à la fin des travaux.",
      },
      {
        q: "Est-ce possible de planifier un entretien préventif annuel?",
        a: "Oui, nous pouvons définir une fréquence d'entretien adaptée à votre bâtiment et à votre niveau d'occupation.",
      },
    ],
    relatedServices: ["conduits", "echangeur"],
  },
];

export const SERVICE_LANDING_BY_PATH = SERVICE_LANDING_PAGES.reduce<Record<string, ServiceLandingPageConfig>>(
  (acc, page) => {
    acc[page.path] = page;
    return acc;
  },
  {},
);

export const SERVICE_LANDING_BY_ID = SERVICE_LANDING_PAGES.reduce<Record<ServiceMarketingId, ServiceLandingPageConfig>>(
  (acc, page) => {
    acc[page.id] = page;
    return acc;
  },
  {} as Record<ServiceMarketingId, ServiceLandingPageConfig>,
);

export const getServiceEntryForLanding = (id: ServiceMarketingId) => entriesById[id];

export const getServiceRoute = (id: ServiceMarketingId) => SERVICE_ROUTE_BY_ID[id];
