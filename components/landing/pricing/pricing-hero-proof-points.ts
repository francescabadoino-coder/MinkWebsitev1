/**
 * Reasons-to-believe shown in the rotating panel of the pricing hero.
 * Catalog figures live here so they can be updated in one place.
 */
export type ProofPoint = {
  id: string;
  /** Large display line, set at the H1 weight. */
  display: string;
  /** Body-size line beneath the display figure. */
  supporting: string;
  /** Optional smaller muted line beneath the supporting line. */
  qualifier?: string;
};

export const PROOF_POINTS: ProofPoint[] = [
  {
    id: "hours-back",
    display: "500+ hours",
    supporting: "a year back from non-billable work",
  },
  {
    id: "products",
    display: "10k+ products",
    supporting: "across 400+ brands and major showrooms in the U.S.",
  },
  {
    id: "visualizations",
    display: "1,000",
    supporting: "design-ready visualizations a month",
  },
];
