import { CONTACT_MAPS_URL } from "@/consts/contact";

export const SEO_BUSINESS = {
  // Set to real values only after GBP data is verified.
  aggregateRating: null as
    | null
    | {
        ratingValue: string;
        reviewCount: string;
        bestRating: string;
        worstRating: string;
      },

  // Add only confirmed public profile URLs.
  sameAs: [] as string[],

  // Confirmed from the public business address used across the site.
  hasMap: CONTACT_MAPS_URL,
};
