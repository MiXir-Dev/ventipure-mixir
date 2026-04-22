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

  // Add only confirmed public profiles.
  sameAs: [] as string[],

  // Add the real GBP/Maps URL when verified.
  hasMap: null as null | string,
};
