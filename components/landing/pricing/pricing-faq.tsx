"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Billing",
    items: [
      {
        q: "What happens after the free trial?",
        a: "The free Trial gives you 15 visualizations with no card required, and furniture procurement is fully unlocked. To generate more, subscribe to Slate ($29 per month), Pro ($69 per month), or Studio ($119 per month). Annual plans are billed $264, $624, or $1,068 per year respectively. Paid plans renew automatically until you cancel, and you can cancel any time from account settings.",
      },
      {
        q: "Do you store my card details?",
        a: "No. Payments are processed securely through Stripe, and your full card number is never stored on Mink's servers.",
      },
      {
        q: "Can I change or cancel my plan any time?",
        a: "Yes. Upgrade, downgrade, or cancel from your account settings whenever you like. Paid plans renew automatically at the price shown until you cancel. Cancellation takes effect at the end of your current billing period and you keep full access until then, but we don't offer partial refunds for time remaining in a cycle.",
      },
      {
        q: "What's the difference between monthly and annual billing?",
        a: "Monthly is $29 for Slate, $69 for Pro, and $119 for Studio, charged every month. Annual is billed once a year at $264 for Slate, $624 for Pro, or $1,068 for Studio, which saves you about 25% compared to paying month to month. Both renew automatically until you cancel, prices shown exclude tax, and you can switch between the two any time.",
      },
      {
        q: "Can prices change after I subscribe?",
        a: "Prices may change, but we notify current subscribers before any change affects their plan, and it never applies to a period you've already paid for. If you'd rather not continue at a new price, cancel before it takes effect.",
      },
    ],
  },
  {
    title: "The product",
    items: [
      {
        q: 'What counts as one "2D visualization"?',
        a: "One visualization is a single AI-generated visual of a product or room concept created from your brief. Your monthly allowance resets at the start of each billing cycle.",
      },
      {
        q: "What's the difference between Slate and Pro?",
        a: "Slate covers the sourcing essentials: 100 visualizations a month, design-brief analysis, product recommendations, transparent reasoning on every pick, and trade vendor access. Pro adds the parts that save the most time: end-to-end procurement, AI-drafted vendor and client emails, one-click exports, order tracking, and 500 visualizations a month.",
      },
      {
        q: "Do I need my own trade accounts?",
        a: "Mink helps you access trade vendors and request pricing on your behalf. Where a vendor requires an active trade account, you'll use your own. Mink streamlines the whole process, but doesn't replace your trade credentials.",
      },
      {
        q: "Can I track my orders in Mink?",
        a: "Yes. On Pro and Studio, every order Mink procures for you is tracked in one place, so you're not chasing shipping updates across a dozen vendor emails. (Slate and the free Trial don't include order tracking.)",
      },
      {
        q: "What happens if I reach my monthly visualization limit?",
        a: "Your visualizations reset at the start of each billing cycle. If you reach the limit before then, you can upgrade any time for a higher allowance, and your existing work is never affected.",
      },
    ],
  },
  {
    title: "Trust & data",
    items: [
      {
        q: "Is my data used to train AI?",
        a: "No. Mink does not train models on your designer, client, or project data. Your work stays yours.",
      },
      {
        q: "Is my client and project data private?",
        a: "Yes. Your projects, briefs, and client details belong to you and are never sold.",
      },
      {
        q: "What happens to my projects if I cancel or downgrade?",
        a: "If you cancel, you keep full access through the end of your paid period. If you downgrade, features above your new tier simply pause, and your project history stays intact and is there again if you upgrade.",
      },
    ],
  },
];

export function PricingFaq() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <h2 className="text-center font-display text-4xl tracking-tight text-balance lg:text-5xl">
          Questions, answered.
        </h2>

        <div className="mt-14 space-y-12">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                {group.title}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {group.items.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="border-foreground/10"
                  >
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
