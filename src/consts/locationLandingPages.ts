import { ROUTE_PATHS } from "@/consts/navigation";
import { AREA_SERVED_LABELS, ZONE_AREA_LABELS } from "@/consts/zones";
import {
  FAQ_LAVAL,
  FAQ_LONGUEUIL,
  FAQ_MONTREAL,
  FAQ_REPENTIGNY,
} from "./faqs";

export type LocationFaqItem = {
  q: string;
  a: string;
};

export type LocationLandingImage = {
  src: string;
  alt: string;
};

export type LocationHighlightItem = {
  title: string;
  image: LocationLandingImage;
};

export type LocationLandingPageConfig = {
  path: string;
  cityName: string;
  subtitle: string;
  localContext: string;
  serviceApproach: string;
  neighborhoods: string[];
  faq: LocationFaqItem[];
  heroImage: LocationLandingImage;
  primaryCtaLabel: string;
  highlightItems: LocationHighlightItem[];
};

export const LOCATION_LANDING_PAGES: LocationLandingPageConfig[] = [
  {
    path: ROUTE_PATHS.MONTREAL,
    cityName: AREA_SERVED_LABELS.MONTREAL,
    subtitle:
      "Interventions de nettoyage de ventilation adaptées aux immeubles urbains, plex et maisons unifamiliales.",
    localContext:
      "À Montréal, le contexte résidentiel est particulier: une part importante des logements date d'avant 1980, avec beaucoup de plex, triplex et maisons jumelées qui ont été modifiés au fil des décennies. Dans des secteurs comme le Plateau-Mont-Royal, Rosemont, Verdun ou NDG, on voit souvent des conduits plus anciens, parfois partiellement remplacés lors de rénovations, ce qui favorise l'accumulation de poussière dans les tronçons moins accessibles. L'île compte 19 arrondissements, et la densité urbaine fait en sorte que les systèmes de chauffage à air pulsé tournent longtemps en hiver pendant plusieurs mois. Cette utilisation intensive augmente la recirculation de particules lorsque le réseau n'est pas entretenu. Dans des zones centrales comme Ville-Marie et Ahuntsic, le besoin revient souvent après travaux intérieurs, changement de locataire ou période de chauffage prolongée. Un entretien périodique aide à stabiliser la qualité de l'air intérieur, limite les odeurs persistantes et améliore le confort quotidien, autant dans une maison unifamiliale que dans un petit immeuble locatif.",
    serviceApproach:
      "Notre approche à Montréal tient compte de la réalité de terrain: accès plus serrés, stationnement variable, bâtiments multi-logements et horaires parfois restreints. Nous planifions les interventions pour minimiser l'impact sur votre journée et pour maintenir un chantier propre, même dans des entrées communes ou des cages d'escalier étroites. Dans Rosemont et le Plateau-Mont-Royal, nous adaptons souvent la méthode à des configurations de duplex et triplex; dans Saint-Léonard et Ville-Marie, nous rencontrons davantage de maisons unifamiliales ou de copropriétés avec systèmes mixtes. L'objectif reste le même: nettoyer efficacement les composantes accessibles et vous donner une recommandation d'entretien qui correspond à votre bâtiment, pas une fréquence générique. Selon la présence d'animaux, d'allergies, de rénovations récentes ou l'âge du réseau, nous ajustons le plan préventif pour garder une circulation d'air plus stable d'une saison à l'autre. Cette approche locale permet des interventions plus précises et des résultats plus cohérents pour les résidents de l'île.",
    neighborhoods: [
      ZONE_AREA_LABELS.PLATEAU_MONT_ROYAL,
      ZONE_AREA_LABELS.ROSEMONT,
      ZONE_AREA_LABELS.AHUNTSIC,
      ZONE_AREA_LABELS.SAINT_LEONARD,
      ZONE_AREA_LABELS.VILLE_MARIE,
    ],
    faq: FAQ_MONTREAL,
    heroImage: {
      src: "/nettoyage-ventillations/location-montreal.jpg",
      alt: "Nettoyage de ventilation résidentielle et commerciale à Montréal",
    },
    primaryCtaLabel: "Demander une soumission à Montréal",
    highlightItems: [
      {
        title: "Maisons, plex et petits immeubles",
        image: {
          src: "/nettoyage-ventillations/location-montreal-highlight-1.jpg",
          alt: "Maisons et plex desservis à Montréal",
        },
      },
      {
        title: "Interventions adaptées aux accès urbains",
        image: {
          src: "/nettoyage-ventillations/location-montreal-highlight-2.jpg",
          alt: "Intervention de nettoyage de ventilation en milieu urbain à Montréal",
        },
      },
      {
        title: "Soumission rapide dans l’île de Montréal",
        image: {
          src: "/nettoyage-ventillations/location-montreal-highlight-3.jpg",
          alt: "Soumission rapide pour un service de ventilation à Montréal",
        },
      },
    ],
  },
  {
    path: ROUTE_PATHS.LAVAL,
    cityName: AREA_SERVED_LABELS.LAVAL,
    subtitle:
      "Nettoyage de conduits et d'échangeurs d'air pour maisons unifamiliales et copropriétés de la rive nord.",
    localContext:
      "Laval présente un profil résidentiel différent de plusieurs secteurs centraux de Montréal. Le développement suburbain s'est fortement accéléré après 1970, avec une proportion importante de maisons unifamiliales et de copropriétés plus récentes. Dans des quartiers comme Chomedey, Vimont, Sainte-Rose et Duvernay, on retrouve fréquemment des systèmes à air pulsé avec échangeur d'air, surtout dans les constructions des dernières décennies. Même avec des installations plus modernes, l'accumulation de poussière demeure réelle: va-et-vient quotidien, garages attenants, animaux et travaux légers contribuent à charger le réseau de ventilation. Le climat de Laval suit la même longue saison de chauffage que le Grand Montréal, ce qui sollicite la fournaise plusieurs mois par année. Dans ce contexte, un entretien planifié des conduits, du VRC et du conduit de sécheuse aide à garder une qualité d'air plus constante et un rendement stable des équipements. Les demandes les plus fréquentes combinent justement ces trois services pour éviter les pertes de performance entre deux saisons.",
    serviceApproach:
      "Sur Laval, nous structurons les rendez-vous selon les secteurs pour réduire les délais et mieux respecter les plages horaires familiales. En pratique, cela veut dire des circuits d'intervention optimisés entre Chomedey, Pont-Viau, Vimont, Sainte-Rose et Duvernay, avec une validation claire de la portée avant de commencer. Notre équipe adapte la méthode à la configuration du bâtiment: maison unifamiliale avec sous-sol aménagé, condo avec accès restreint, ou unité intergénérationnelle avec plusieurs sorties. Nous insistons sur la transparence des inclusions, notamment pour les sorties supplémentaires, les limitations d'accès et les recommandations d'entretien à moyen terme. Lorsque le système comprend un échangeur d'air, nous combinons souvent l'intervention pour éviter des déplacements répétés et maintenir une performance globale plus uniforme. Cette approche pragmatique répond bien à la réalité lavalloise: habitations récentes, usage intensif des équipements et besoin d'un service efficace sans complexité inutile.",
    neighborhoods: [
      ZONE_AREA_LABELS.CHOMEDEY,
      ZONE_AREA_LABELS.SAINTE_ROSE,
      ZONE_AREA_LABELS.VIMONT,
      ZONE_AREA_LABELS.PONT_VIAU,
      ZONE_AREA_LABELS.DUVERNAY,
    ],
    faq: FAQ_LAVAL,
    heroImage: {
      src: "/nettoyage-ventillations/location-laval.jpg",
      alt: "Service de nettoyage de ventilation à Laval et sur la rive nord",
    },
    primaryCtaLabel: "Demander une soumission à Laval",
    highlightItems: [
      {
        title: "Maisons récentes, condos et copropriétés",
        image: {
          src: "/nettoyage-ventillations/location-laval-highlight-1.jpg",
          alt: "Maisons et copropriétés desservies à Laval",
        },
      },
      {
        title: "Interventions organisées par secteur",
        image: {
          src: "/nettoyage-ventillations/location-laval-highlight-2.jpg",
          alt: "Interventions locales de ventilation à Laval",
        },
      },
      {
        title: "Nettoyage de ventilation simple et efficace",
        image: {
          src: "/nettoyage-ventillations/location-laval-highlight-3.jpg",
          alt: "Service de ventilation résidentielle à Laval",
        },
      },
    ],
  },
  {
    path: ROUTE_PATHS.LONGUEUIL,
    cityName: AREA_SERVED_LABELS.LONGUEUIL,
    subtitle:
      "Services de nettoyage de ventilation sur la Rive-Sud pour maisons, condos et petits immeubles.",
    localContext:
      "Longueuil et la Rive-Sud ne forment pas un seul marché uniforme: on y trouve des réalités très différentes entre Longueuil, Saint-Hubert, Greenfield Park, Saint-Lambert et Brossard. Dans Longueuil et Saint-Hubert, une partie importante des maisons date des années 1960-1970, avec des réseaux de fournaise classiques qui demandent un entretien régulier pour conserver un bon débit d'air. À l'inverse, plusieurs secteurs de Brossard ont connu une croissance récente autour du Quartier DIX30 et de Solar Uniquartier, avec davantage de condos et de maisons récentes équipés de VRC. La proximité du fleuve peut aussi accentuer l'humidité dans certains secteurs, ce qui encrasse plus vite les composantes d'échangeur d'air. Cette combinaison de bâtiments plus anciens et de constructions nouvelles explique pourquoi les besoins varient autant d'un quartier à l'autre. Un plan de nettoyage bien ciblé améliore la qualité de l'air intérieur, réduit les écarts de confort entre pièces et aide à maintenir la performance des systèmes sur l'ensemble de l'année.",
    serviceApproach:
      "Notre approche à Longueuil est basée sur la segmentation locale des interventions. Nous ne traitons pas de la même façon un bungalow de Saint-Hubert, un condo de Brossard ou une copropriété à Greenfield Park. Avant chaque intervention, nous validons la configuration réelle du réseau, les contraintes d'accès et l'historique d'entretien pour recommander une portée qui correspond à votre situation. Sur la Rive-Sud, plusieurs clients choisissent une visite combinée conduits de fournaise + conduit de sécheuse, puis ajoutent l'échangeur d'air selon l'état observé. Cette séquence permet de maintenir un coût clair tout en traitant les points les plus critiques d'abord. Nous couvrons aussi Boucherville et Saint-Lambert avec la même logique: service propre, explication simple, suivi concret. L'objectif est d'offrir un nettoyage de ventilation vraiment utile pour le bâtiment concerné, sans approche copiée-collée d'une ville à l'autre.",
    neighborhoods: [
      ZONE_AREA_LABELS.BROSSARD,
      ZONE_AREA_LABELS.SAINT_HUBERT,
      ZONE_AREA_LABELS.BOUCHERVILLE,
      ZONE_AREA_LABELS.SAINT_LAMBERT,
      ZONE_AREA_LABELS.GREENFIELD_PARK,
    ],
    faq: FAQ_LONGUEUIL,
    heroImage: {
      src: "/nettoyage-ventillations/location-longueuil.jpg",
      alt: "Nettoyage de ventilation à Longueuil et sur la Rive-Sud",
    },
    primaryCtaLabel: "Demander une soumission à Longueuil",
    highlightItems: [
      {
        title: "Maisons, condos et petits immeubles",
        image: {
          src: "/nettoyage-ventillations/location-longueuil-highlight-1.jpg",
          alt: "Maisons et condos desservis à Longueuil",
        },
      },
      {
        title: "Approche adaptée à la Rive-Sud",
        image: {
          src: "/nettoyage-ventillations/location-longueuil-highlight-2.jpg",
          alt: "Service de ventilation adapté à la Rive-Sud",
        },
      },
      {
        title: "Soumission rapide pour Longueuil et les environs",
        image: {
          src: "/nettoyage-ventillations/location-longueuil-highlight-3.jpg",
          alt: "Soumission rapide pour un service de ventilation à Longueuil",
        },
      },
    ],
  },
  {
    path: ROUTE_PATHS.REPENTIGNY,
    cityName: AREA_SERVED_LABELS.REPENTIGNY,
    subtitle:
      "Interventions de nettoyage de ventilation pour les résidences familiales de Repentigny et des environs.",
    localContext:
      "Repentigny, sur la couronne nord et dans la région de Lanaudière, connaît une croissance résidentielle soutenue depuis les années 1990. Le secteur mélange bungalows établis, maisons à étages plus récentes et quartiers familiaux en expansion. Cette réalité influence directement l'entretien de ventilation: usage fréquent de la fournaise, présence d'animaux, circulation quotidienne élevée et accumulation progressive de poussière dans les conduits. Les zones voisines comme L'Assomption, Le Gardeur et Charlemagne partagent des profils similaires, avec des foyers actifs et une forte utilisation des systèmes de chauffage pendant la saison froide. Dans plusieurs résidences, on retrouve aussi des thermopompes murales ajoutées en complément, ce qui augmente l'importance d'un entretien préventif cohérent entre chauffage et climatisation. Un nettoyage planifié aide à garder un air intérieur plus stable, à limiter les odeurs persistantes et à maintenir la performance des équipements. C'est particulièrement pertinent pour les ménages avec enfants ou allergies, où la qualité d'air est un enjeu quotidien.",
    serviceApproach:
      "À Repentigny et dans les secteurs autour de L'Assomption et Le Gardeur, nous organisons les interventions par zones pour limiter les déplacements et proposer des rendez-vous plus fiables. Comme notre base est à Sainte-Julie, certaines plages sont regroupées par secteur pour garder une logistique efficace, surtout vers Charlemagne, Mascouche et Terrebonne. Cette planification permet de maintenir des délais réalistes sans réduire la qualité du travail sur place. Côté méthode, nous priorisons les besoins les plus critiques selon le bâtiment: conduits de fournaise pour la saison de chauffage, conduit de sécheuse pour la sécurité, puis échangeur ou climatiseur mural selon l'état des composantes. Chaque intervention se termine avec un résumé clair des actions réalisées et des recommandations adaptées à l'usage de la maison. Cette approche est particulièrement utile pour les familles qui veulent une maintenance préventive simple, sans devoir coordonner plusieurs fournisseurs pour la ventilation résidentielle.",
    neighborhoods: [
      ZONE_AREA_LABELS.LASSOMPTION,
      ZONE_AREA_LABELS.LE_GARDEUR,
      ZONE_AREA_LABELS.CHARLEMAGNE,
      ZONE_AREA_LABELS.MASCOUCHE,
      ZONE_AREA_LABELS.TERREBONNE,
    ],
    faq: FAQ_REPENTIGNY,
    heroImage: {
      src: "/nettoyage-ventillations/location-repentigny.jpg",
      alt: "Nettoyage de ventilation résidentielle à Repentigny et dans les environs",
    },
    primaryCtaLabel: "Demander une soumission à Repentigny",
    highlightItems: [
      {
        title: "Résidences familiales et maisons récentes",
        image: {
          src: "/nettoyage-ventillations/location-repentigny-highlight-1.jpg",
          alt: "Résidences familiales desservies à Repentigny",
        },
      },
      {
        title: "Planification par zones pour plus d’efficacité",
        image: {
          src: "/nettoyage-ventillations/location-repentigny-highlight-2.jpg",
          alt: "Planification locale des interventions à Repentigny",
        },
      },
      {
        title: "Entretien simple et préventif",
        image: {
          src: "/nettoyage-ventillations/location-repentigny-highlight-3.jpg",
          alt: "Entretien préventif de ventilation à Repentigny",
        },
      },
    ],
  },
];

export const LOCATION_LANDING_BY_PATH =
  LOCATION_LANDING_PAGES.reduce<Record<string, LocationLandingPageConfig>>(
    (acc, page) => {
      acc[page.path] = page;
      return acc;
    },
    {},
  );
