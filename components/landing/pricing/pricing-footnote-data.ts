/**
 * Numbered footnote copy for the pricing page.
 *
 * Anchor map:
 *   1 -> Pro/Studio prices (cards + comparison table price row)
 *   2 -> "50 / 500 / 1,000 2D visualizations / month"
 *   3 -> "Trade vendor access & pricing requests"
 *   4 -> order and delivery tracking claims
 *   5 -> "Pricing that pays for itself" headline + the "500+ hours" line
 *
 * UNRESOLVED BEFORE LAUNCH: footnote 5 carries a source placeholder. The
 * "500+ hours a year" and "$150 to $200/hr" figures still need a citable,
 * non-paywalled primary source. The placeholder is rendered on purpose so it
 * cannot ship unnoticed.
 */
export const INDUSTRY_SOURCE_PLACEHOLDER = "[ADD CITABLE SOURCE]";

export const PRICING_FOOTNOTES: string[] = [
  "Paid plans (Pro and Studio) renew automatically at the price shown until you cancel. Cancel any time from account settings; cancellation takes effect at the end of your current billing period. We do not offer partial refunds for time remaining in a billing cycle. Prices may change, and current subscribers are notified before any change affects their plan. Prices shown may exclude applicable taxes, which are calculated at checkout.",
  "Monthly visualization limits (50 on Starter, 500 on Pro, 1,000 on Studio) reset at the start of each billing cycle and do not roll over. You can upgrade any time for a higher limit.",
  "Mink facilitates access to trade vendors and pricing requests. Actual trade pricing and eligibility are set by each vendor and depend on your own trade status. Savings vary and are not guaranteed.",
  "Mink consolidates tracking for orders it procures on your behalf. Actual shipping times, costs, and fulfillment are handled by the vendor.",
  `Illustrative figure, not a guarantee of results. Time and income reclaimed depend on your rate, hours spent on procurement, and how much sourcing you hand off. Industry figures are drawn from ${INDUSTRY_SOURCE_PLACEHOLDER}.`,
];

/** Maps a plan feature string to the footnote that qualifies it. */
export const FEATURE_FOOTNOTES: Record<string, number> = {
  "50 2D visualizations / month": 2,
  "500 2D visualizations / month": 2,
  "1,000 2D visualizations / month": 2,
  "Trade vendor access & pricing requests": 3,
  "Track every Mink order & delivery in one place": 4,
  "Priority delivery tracking, all in one place": 4,
};
