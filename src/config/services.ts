/**
 * Centralized service catalog.
 * Single source of truth for service IDs, labels and prices used across
 * the homepage, contact form, services page and pricing page.
 */

export type ServiceId =
  | "conduits"
  | "secheuse"
  | "echangeur"
  | "climatiseur"
  | "commercial"
  | "autre";

export type ServiceItem = {
  id: ServiceId;
  /** Short label used in tags/checkboxes */
  label: string;
  /** Full marketing title */
  title: string;
  /** Numeric price in CAD; null = "Sur estimation" */
  price: number | null;
  /** Display string for prices ("349 $" or "Sur estimation") */
  priceLabel: string;
};

/** Order matters: this is the order shown in the contact form. */
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

/** Combo discount rule: applies only to Furnace + Dryer duo. */
export const COMBO_DISCOUNT = 20;
export const COMBO_SERVICES: ServiceId[] = ["conduits", "secheuse"];

/** URL ?combo=... presets that pre-select services in the form. */
export const COMBO_PRESETS: Record<string, ServiceId[]> = {
  "best-seller": COMBO_SERVICES,
};

export const getService = (id: string): ServiceItem | undefined =>
  SERVICES.find((s) => s.id === id);
