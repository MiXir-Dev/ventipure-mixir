import { CONTACT_PHONE_DISPLAY } from "@/consts/contact";

export type FaqItem = {
  q: string;
  a: string;
};

export const HOME_FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quels services de nettoyage de ventilation offrez-vous?",
    a: "Nous offrons le nettoyage des conduits de fournaise, de l'echangeur d'air, du conduit de secheuse et du climatiseur mural. Tous nos services sont disponibles en residentiel et en commercial.",
  },
  {
    q: "Combien coute un nettoyage de conduits de fournaise?",
    a: "Le nettoyage des conduits de fournaise est offert a partir de 349 $ et inclut jusqu'a 15 sorties de ventilation. Des frais peuvent s'appliquer selon la distance et le nombre de sorties supplementaires.",
  },
  {
    q: "Pourquoi faire nettoyer un conduit de secheuse?",
    a: "Un conduit de secheuse encrasse peut nuire au fonctionnement de l'appareil, augmenter le temps de sechage et favoriser l'accumulation de charpie. Un entretien regulier aide a maintenir une utilisation plus securitaire.",
  },
  {
    q: "Le nettoyage d'un echangeur d'air ameliore-t-il la qualite de l'air?",
    a: "Oui. Un echangeur d'air bien entretenu contribue a une meilleure circulation d'air et aide a maintenir un environnement interieur plus sain.",
  },
  {
    q: "Comment demander une soumission?",
    a: `Contactez-nous par telephone au ${CONTACT_PHONE_DISPLAY} ou par le formulaire de contact du site. Nous vous repondrons rapidement pour valider vos besoins et planifier l'intervention.`,
  },
];

export const SERVICES_FAQ_ITEMS: FaqItem[] = [
  {
    q: "Combien de temps dure un nettoyage complet de ventilation?",
    a: "La duree depend du type de service et du nombre de sorties. En residentiel, l'intervention prend generalement entre 1 h 30 et 3 h.",
  },
  {
    q: "A quelle frequence faut-il nettoyer les conduits?",
    a: "Pour la plupart des residences, un entretien tous les 3 a 5 ans est recommande. La frequence peut etre plus courte en presence d'animaux, de renovation ou d'allergies.",
  },
  {
    q: "Le nettoyage inclut-il la verification visuelle du reseau?",
    a: "Oui, chaque intervention comprend une verification des composantes accessibles avant et apres le nettoyage pour confirmer l'etat general.",
  },
  {
    q: "Intervenez-vous aussi pour des batiments commerciaux?",
    a: "Oui. Nous proposons des interventions sur estimation pour bureaux, commerces et immeubles a revenus, avec planification adaptee aux heures d'ouverture.",
  },
];

export const TARIFS_FAQ_ITEMS: FaqItem[] = [
  {
    q: "Pourquoi les tarifs commencent-ils a partir d'un prix?",
    a: "Le prix final depend notamment du nombre de sorties, de la configuration du reseau et de la distance. Le tarif affiche correspond a la base d'intervention.",
  },
  {
    q: "Le combo fournaise + secheuse est-il vraiment avantageux?",
    a: "Oui. Le combo applique un rabais de 20 $ compare au total des deux services pris separement.",
  },
  {
    q: "Y a-t-il des frais cachaes?",
    a: "Non. Les prix sont presentes clairement et toute variation eventuelle est confirmee avant l'intervention.",
  },
  {
    q: "Quels modes de paiement acceptez-vous?",
    a: "Nous acceptons les methodes de paiement courantes. Les details sont confirmes lors de la prise de rendez-vous.",
  },
];

export const ROUTE_FAQ_ITEMS = {
  HOME: HOME_FAQ_ITEMS,
  SERVICES: SERVICES_FAQ_ITEMS,
  TARIFS: TARIFS_FAQ_ITEMS,
} as const;


// SERVICES FAQ
export const FAQ_CONDUIT: FaqItem[] = [
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
]

export const FAQ_SECHEUSE: FaqItem[] = [
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
]

export const FAQ_ECHANGER: FaqItem[] = [
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
]

export const FAQ_CLIMATISEUR: FaqItem[] = [
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
]

export const FAQ_COMMERCIAUX: FaqItem[] = [
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
]

// LOCATION FAQ

export const FAQ_MONTREAL: FaqItem[] = [
  {
    q: "Desservez-vous le Plateau-Mont-Royal et Rosemont?",
    a: "Oui, nous intervenons régulièrement dans le Plateau-Mont-Royal, Rosemont et d'autres secteurs centraux de Montréal.",
  },
  {
    q: "Les maisons plus anciennes de Montréal ont-elles besoin d'un entretien plus fréquent?",
    a: "Souvent oui, surtout après des rénovations ou lorsqu'il y a accumulation visible de poussière dans les conduits.",
  },
  {
    q: "Offrez-vous le nettoyage de conduit de sécheuse à Montréal?",
    a: "Oui, ce service est disponible partout dans Montréal avec prise de rendez-vous rapide selon les disponibilités.",
  },
  {
    q: "Quel est le délai habituel pour un rendez-vous à Montréal?",
    a: "Les délais varient selon la saison, mais nous proposons des plages rapides dès qu'un créneau est disponible.",
  },
  {
    q: "Pouvez-vous intervenir dans un duplex ou un triplex?",
    a: "Oui, nous adaptons la portée de l'intervention au type d'immeuble et à la configuration des conduits.",
  },
]

export const FAQ_LAVAL: FaqItem[] = [
  {
    q: "Est-ce que VentiPure dessert Chomedey et Laval-des-Rapides?",
    a: "Nous desservons Chomedey, Pont-Viau, Duvernay et l'ensemble du territoire de Laval selon les disponibilités.",
  },
  {
    q: "Le nettoyage de l'échangeur d'air est-il recommandé dans les maisons récentes à Laval?",
    a: "Oui, l'entretien de l'échangeur d'air demeure essentiel pour maintenir un renouvellement d'air efficace.",
  },
  {
    q: "Proposez-vous des services combinés à Laval?",
    a: "Oui, plusieurs clients combinent le nettoyage des conduits de fournaise et du conduit de sécheuse lors d'une même visite.",
  },
  {
    q: "Combien coûte un nettoyage de conduit de sécheuse à Laval?",
    a: "Le service commence à 149 $, avec validation de la configuration avant l'intervention.",
  },
  {
    q: "Intervenez-vous dans des condos à Laval?",
    a: "Oui, nous adaptons la méthode selon les règles d'accès et la configuration propre aux immeubles en copropriété.",
  },
]

export const FAQ_LONGUEUIL: FaqItem[] = [
  {
    q: "Desservez-vous Brossard et Saint-Hubert?",
    a: "Oui, Brossard, Saint-Hubert, Boucherville et les secteurs autour de Longueuil font partie de notre zone d'intervention.",
  },
  {
    q: "Est-il possible de réserver un nettoyage de ventilation pour un condo à Longueuil?",
    a: "Oui, nous intervenons en condo avec une portée adaptée à l'installation disponible et aux règles d'accès de l'immeuble.",
  },
  {
    q: "Quel service est le plus demandé sur la Rive-Sud?",
    a: "Le nettoyage des conduits de fournaise et du conduit de sécheuse est très demandé, souvent en combinaison.",
  },
  {
    q: "Offrez-vous des interventions commerciales à Longueuil?",
    a: "Oui, des mandats commerciaux sont possibles sur estimation selon la configuration du bâtiment.",
  },
  {
    q: "Peut-on obtenir une soumission rapide pour Saint-Lambert?",
    a: "Oui, vous pouvez demander une soumission en ligne pour Saint-Lambert et les secteurs voisins de la Rive-Sud.",
  },
]

export const FAQ_REPENTIGNY: FaqItem[] = [
  {
    q: "Desservez-vous Le Gardeur et L'Assomption?",
    a: "Oui, nous couvrons Le Gardeur, L'Assomption et les secteurs voisins autour de Repentigny.",
  },
  {
    q: "Le nettoyage des conduits est-il utile dans une maison récente à Repentigny?",
    a: "Oui, même les maisons récentes accumulent poussière et résidus au fil du temps dans les conduits.",
  },
  {
    q: "Proposez-vous le service de climatiseur mural dans le secteur de Repentigny?",
    a: "Oui, le nettoyage de climatiseur mural est offert à Repentigny et dans les environs.",
  },
  {
    q: "Quel est le meilleur moment pour planifier l'entretien?",
    a: "Idéalement au printemps ou à l'automne, mais nous intervenons toute l'année selon les disponibilités.",
  },
  {
    q: "Peut-on demander un service commercial à Terrebonne ou Mascouche?",
    a: "Oui, des interventions commerciales sont possibles sur estimation dans ces secteurs.",
  },
]