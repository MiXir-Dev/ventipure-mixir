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

export const FAQ_ITEMS = HOME_FAQ_ITEMS;

export const ROUTE_FAQ_ITEMS = {
  HOME: HOME_FAQ_ITEMS,
  SERVICES: SERVICES_FAQ_ITEMS,
  TARIFS: TARIFS_FAQ_ITEMS,
} as const;
