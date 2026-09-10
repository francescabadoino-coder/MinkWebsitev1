/**
 * Full text of the six pricing and billing topics that used to sit in a
 * standalone block on the pricing page. The pricing page now carries short
 * numbered footnotes; these are the complete versions, shared by the Billing
 * Policy page and the Terms of Use.
 */
export type PolicyTopic = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const BILLING_TOPICS: PolicyTopic[] = [
  {
    id: "billing-and-renewal",
    title: "Billing and renewal",
    paragraphs: [
      "Paid plans (Slate, Pro, and Studio) renew automatically at the price shown until you cancel. Monthly plans renew each month on the date your plan started. Annual plans renew each year on that date.",
      "You can cancel any time from account settings. Cancellation takes effect at the end of your current billing period, and you keep full access until then. We do not offer partial refunds for time remaining in a billing cycle.",
      "The Trial is free and takes no card. It includes 15 visualizations to start; to generate more you subscribe to Slate, Pro, or Studio, and billing begins when you subscribe. We send a reminder before any first charge.",
    ],
  },
  {
    id: "usage-limits",
    title: "Usage limits",
    paragraphs: [
      "Monthly visualization limits are 100 on Slate, 500 on Pro, and 1,000 on Studio, and reset at the start of each billing cycle without rolling over. The free Trial includes 15 visualizations to start, after which a paid plan is required to generate more.",
      "One visualization is a single AI-generated visual of a product or room concept created from your brief. If you reach your limit before the cycle resets, you can upgrade any time for a higher limit. Work you have already created is never affected.",
    ],
  },
  {
    id: "trade-vendor-pricing",
    title: "Trade vendor pricing",
    paragraphs: [
      "Mink facilitates access to trade vendors and pricing requests. Actual trade pricing and eligibility are set by each vendor and depend on your own trade status. Savings vary and are not guaranteed.",
      "Where a vendor requires an active trade account, you will use your own. Mink streamlines the process but does not replace your trade credentials, and Mink is not a party to the pricing terms a vendor extends to you.",
    ],
  },
  {
    id: "order-and-delivery-tracking",
    title: "Order and delivery tracking",
    paragraphs: [
      "Mink consolidates tracking for orders it procures on your behalf. Actual shipping times, costs, and fulfillment are handled by the vendor.",
      "Mink is not the seller or shipper of record for these orders and does not control vendor lead times, backorders, damage in transit, or delivery scheduling. Order tracking is included on Pro and Studio, with priority tracking on Studio. Slate and the free Trial do not include order tracking.",
    ],
  },
  {
    id: "pricing-changes",
    title: "Pricing changes",
    paragraphs: [
      "Prices may change. Current subscribers are notified before any change affects their plan, and a change never applies to a billing period you have already paid for.",
      "If you do not want to continue at a new price, you can cancel before the change takes effect and keep access through the end of your current period.",
    ],
  },
  {
    id: "taxes",
    title: "Taxes",
    paragraphs: [
      "Prices shown on the pricing page may exclude applicable taxes. Tax is calculated at checkout based on your billing location and appears as its own line item on the order summary before the total.",
      "Where Mink is required to collect sales tax, VAT, or GST, that amount is added to the plan price rather than included in it.",
    ],
  },
];

/**
 * Illustrative-figures disclaimer. Mirrors footnote 5 on the pricing page and
 * the savings calculator note, so all three stay in sync.
 *
 * UNRESOLVED BEFORE LAUNCH: the source placeholder still needs a citable,
 * non-paywalled primary source for the "500+ hours a year" and "$150 to
 * $200/hr" figures.
 */
export const ILLUSTRATIVE_FIGURES_TOPIC: PolicyTopic = {
  id: "illustrative-figures",
  title: "Illustrative figures",
  paragraphs: [
    "Figures shown in the savings calculator and in claims such as the average designer losing 500 or more hours a year to non-billable work are illustrative, not a guarantee of results.",
    "Time and income reclaimed depend on your rate, hours spent on procurement, and how much sourcing you hand off. Industry figures are drawn from [ADD CITABLE SOURCE].",
  ],
};
