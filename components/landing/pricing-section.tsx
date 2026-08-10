"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, Sparkles, Users } from "lucide-react";
import { useBetaAccess } from "./beta-access-provider";
import { Fn } from "./pricing/pricing-footnotes";
import { FEATURE_FOOTNOTES } from "./pricing/pricing-footnote-data";

export const plans = [
  {
    name: "Slate",
    description: "Everything you need to start sourcing with Ora.",
    // Entry paid plan. `annual` is the monthly-equivalent when billed yearly.
    price: { monthly: 29, annual: 22 },
    seats: "1 designer",
    features: [
      "100 2D visualizations / month",
      "Ora design-brief analysis",
      "Product recommendations from vetted brands",
      "Transparent reasoning on every pick",
      "Trade vendor access & pricing requests",
    ],
    cta: "Sign up",
    popular: false,
  },
  {
    name: "Pro",
    description: "For designers ready to reclaim their non-billable hours.",
    // `annual` is the monthly-equivalent when billed yearly: 25% off monthly.
    price: { monthly: 69, annual: 52 },
    seats: "1 designer",
    features: [
      "Everything in Slate",
      "500 2D visualizations / month",
      "Ora agentic procurement, end to end",
      "AI-drafted vendor & client emails",
      "One-click spec, invoice & visual exports",
      "Track every Mink order & delivery in one place",
    ],
    cta: "Sign up",
    popular: true,
  },
  {
    name: "Studio",
    description: "For designers who want the most out of Mink.",
    price: { monthly: 119, annual: 89 },
    seats: "1 designer",
    features: [
      "Everything in Pro",
      "1,000 2D visualizations / month",
      "Priority delivery tracking, all in one place",
      "Live support",
      "Early access to new features & products",
    ],
    cta: "Sign up",
    popular: false,
  },
];

/**
 * The free trial tier. It is intentionally NOT part of `plans` so the three
 * paid cards stay a clean 3-up grid; it renders as a standalone banner below
 * the paid plans via <TrialBanner />. 15 visualizations are free, then a paid
 * plan is required for more. Furniture procurement is unlocked during the trial.
 */
export const trialPlan = {
  name: "Trial",
  description:
    "Try Mink on a real project. 15 visualizations to see how Ora sources, with furniture procurement fully unlocked.",
  features: [
    "15 2D visualizations to start",
    "Unlimited furniture procurement",
    "Ora design-brief analysis",
    "Product recommendations from vetted brands",
    "Transparent reasoning on every pick",
  ],
  cta: "Start free",
};

export function PlanCard({
  plan,
  idx,
  isAnnual,
  showFootnotes = false,
}: {
  plan: (typeof plans)[number];
  idx: number;
  isAnnual: boolean;
  /** Footnote markers only render on the pricing page, where the list lives. */
  showFootnotes?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });
  const { open } = useBetaAccess();

  const handleMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      on: true,
    });
  };

  const price = isAnnual ? plan.price.annual : plan.price.monthly;
  const isPaid = price > 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
      className={`group relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
        plan.popular
          ? "border-foreground/20 bg-foreground text-background shadow-xl"
          : "border-foreground/10 bg-background hover:border-foreground/25"
      }`}
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(380px circle at ${glow.x}% ${glow.y}%, ${
            plan.popular ? "rgba(255,255,255,0.08)" : "rgba(120,120,120,0.08)"
          }, transparent 70%)`,
        }}
      />

      {plan.popular && (
        <span className="absolute right-6 top-8 inline-flex items-center gap-1.5 rounded-full bg-background/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-background backdrop-blur-sm">
          <Sparkles className="h-3 w-3" />
          Popular
        </span>
      )}

      {/* Header */}
      <div className="relative">
        <span
          className={`font-mono text-xs ${
            plan.popular ? "text-background/50" : "text-muted-foreground"
          }`}
        >
          {String(idx + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 font-display text-2xl tracking-tight">{plan.name}</h3>
        <p
          className={`mt-2 min-h-[40px] text-sm leading-relaxed ${
            plan.popular ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div
        className={`relative mt-6 flex items-baseline gap-1 border-b pb-6 ${
          plan.popular ? "border-background/15" : "border-foreground/10"
        }`}
      >
        <span className="font-display text-5xl tracking-tight tabular-nums">${price}</span>
        <span
          className={`text-sm ${
            plan.popular ? "text-background/60" : "text-muted-foreground"
          }`}
        >
          {price === 0 ? "forever" : "/mo"}
        </span>
        {showFootnotes && isPaid && <Fn n={1} primary={plan.popular} />}
      </div>

      {/* Seats */}
      <div
        className={`relative mt-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs ${
          plan.popular ? "bg-background/10 text-background" : "bg-foreground/5 text-foreground"
        }`}
      >
        <Users className="h-3.5 w-3.5" />
        {plan.seats}
      </div>

      {/* Features */}
      <ul className="relative mt-6 flex-1 space-y-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                plan.popular ? "bg-background text-foreground" : "bg-accent text-accent-foreground"
              }`}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
            </span>
            <span
              className={`text-sm leading-snug ${
                plan.popular ? "text-background/85" : "text-muted-foreground"
              }`}
            >
              {feature}
              {showFootnotes && FEATURE_FOOTNOTES[feature] && (
                <Fn n={FEATURE_FOOTNOTES[feature]} primary={plan.popular} />
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() =>
          open(
            isPaid
              ? {
                  name: plan.name,
                  monthlyPrice: plan.price.monthly,
                  annualMonthlyPrice: plan.price.annual,
                  isAnnual,
                }
              : undefined,
          )
        }
        className={`relative mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all group/cta ${
          // The Pro card's surface is already --cta (#232323), so a bg-cta
          // button would disappear into it. Use the light grey base instead so
          // the button stays legible on the dark card.
          plan.popular
            ? "bg-background text-foreground hover:bg-background/90"
            : "bg-cta text-cta-foreground hover:bg-cta/90"
        }`}
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
      </button>

      {isPaid && (
        <p
          className={`relative mt-3 text-center text-xs ${
            plan.popular ? "text-background/60" : "text-muted-foreground"
          }`}
        >
          Billed {isAnnual ? "annually" : "monthly"}. Renews until canceled.
        </p>
      )}
    </div>
  );
}

/**
 * Standalone free-trial banner shown beneath the three paid cards. Uses a
 * dashed outline and no price column so it reads as a distinct "try first"
 * option rather than a fourth tier competing with the paid plans.
 */
export function TrialBanner({
  showFootnotes = false,
}: {
  /** Footnote markers only render on the pricing page, where the list lives. */
  showFootnotes?: boolean;
}) {
  const { open } = useBetaAccess();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-foreground/25 bg-foreground/[0.02] p-8 lg:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: identity + price + subscribe-to-continue note */}
        <div className="lg:max-w-sm">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
            <Sparkles className="h-3 w-3" />
            Free trial · no card
          </span>
          <div className="mt-4 flex items-baseline gap-3">
            <h3 className="font-display text-3xl tracking-tight">{trialPlan.name}</h3>
            <span className="font-display text-2xl tracking-tight tabular-nums text-muted-foreground">
              $0
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
            {trialPlan.description}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Once you&apos;ve used your 15 visualizations, subscribe to Slate,
            Pro, or Studio to keep generating.
            {showFootnotes && <Fn n={2} />}
          </p>
        </div>

        {/* Right: what's included + CTA */}
        <div className="lg:flex-1 lg:pl-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            {trialPlan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
                <span className="text-sm leading-snug text-muted-foreground">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => open()}
            className="group/cta mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta py-3.5 text-sm font-medium text-cta-foreground transition-all hover:bg-cta/90 sm:w-auto sm:px-8"
          >
            {trialPlan.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-28 lg:py-36 border-t border-foreground/10">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl tracking-tight text-balance lg:text-6xl">
            Pricing that pays for itself.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
            Start free, no credit card required. Pick the plan with the 2D
            visualizations you need and cancel any time.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span
            className={`text-sm transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Toggle annual billing"
            className="relative h-7 w-14 rounded-full bg-foreground/10 p-1 transition-colors hover:bg-foreground/20"
          >
            <div
              className={`h-5 w-5 rounded-full bg-foreground transition-transform duration-300 ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm transition-colors ${
              isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Annual
          </span>
          <span className="ml-1 rounded-full bg-accent/20 px-2 py-0.5 font-mono text-xs text-foreground">
            Save 25%
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 grid items-start gap-6 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <PlanCard key={plan.name} plan={plan} idx={idx} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Free trial, positioned beneath the paid plans */}
        <div className="mt-6">
          <TrialBanner />
        </div>
      </div>
    </section>
  );
}
