"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { plans, PlanCard, TrialBanner } from "@/components/landing/pricing-section";
import { Fn, PricingFootnotes } from "./pricing-footnotes";

type Cell = boolean | string;

const planMeta = {
  slate: plans[0],
  pro: plans[1],
  studio: plans[2],
};

const COMPARISON: {
  label: string;
  slate: Cell;
  pro: Cell;
  studio: Cell;
  /** Footnote qualifying this claim. */
  fn?: number;
}[] = [
  { label: "Designers included", slate: "1", pro: "1", studio: "1" },
  {
    label: "2D visualizations / month",
    slate: "100",
    pro: "500",
    studio: "1,000",
    fn: 2,
  },
  { label: "Ora design-brief analysis", slate: true, pro: true, studio: true },
  { label: "Product recommendations (vetted brands)", slate: true, pro: true, studio: true },
  { label: "Transparent reasoning on every pick", slate: true, pro: true, studio: true },
  {
    label: "Trade vendor access & pricing requests",
    slate: true,
    pro: true,
    studio: true,
    fn: 3,
  },
  { label: "Ora agentic procurement, end to end", slate: false, pro: true, studio: true },
  { label: "AI-drafted vendor & client emails", slate: false, pro: true, studio: true },
  { label: "One-click spec, invoice & visual exports", slate: false, pro: true, studio: true },
  {
    label: "Order & delivery tracking, all in one place",
    slate: false,
    pro: true,
    studio: "priority",
    fn: 4,
  },
  { label: "Live support", slate: false, pro: false, studio: true },
  { label: "Early access to new features & products", slate: false, pro: false, studio: true },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-accent">
        <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3.5} />
      </span>
    );
  }
  if (value === false) {
    return <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" aria-hidden />;
  }
  if (value === "priority") {
    return (
      <span className="inline-flex items-center justify-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
          <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3.5} />
        </span>
        <span className="text-xs text-muted-foreground">Priority</span>
      </span>
    );
  }
  return <span className="text-sm text-foreground tabular-nums">{value}</span>;
}

function priceLabel(key: keyof typeof planMeta, isAnnual: boolean) {
  const price = isAnnual ? planMeta[key].price.annual : planMeta[key].price.monthly;
  return { price, suffix: price === 0 ? "forever" : "/mo" };
}

export function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-5xl tracking-tight text-balance lg:text-7xl">
            Pricing that pays for{" "}
            {/* Copy stays #232323; the underline bar carries the emphasis */}
            <span className="relative inline-block font-serif italic pr-1">
              <span className="inline-flex">itself</span>
              <span className="absolute -bottom-1 left-0 right-1 h-1 rounded-full bg-foreground/25" />
            </span>
            .
            <Fn n={5} primary />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground text-pretty">
            Start free, no credit card required. Pick the plan that fits how you
            work, and cancel any time.
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
            onClick={() => setIsAnnual((v) => !v)}
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
            <PlanCard
              key={plan.name}
              plan={plan}
              idx={idx}
              isAnnual={isAnnual}
              showFootnotes
            />
          ))}
        </div>

        {/* Value-reinforcement strip */}
        <p className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground text-pretty">
          The average designer loses 500+ hours a year to non-billable work.{" "}
          <span className="font-medium text-foreground">
            Pro pays for itself in the first reclaimed afternoon.
          </span>
          <Fn n={5} />
        </p>

        {/* Comparison Table */}
        <div className="mt-24 lg:mt-32">
          <h2 className="text-center font-display text-4xl tracking-tight text-balance lg:text-5xl">
            Compare every plan.
          </h2>

          {/* Desktop table */}
          <div className="mt-12 hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-[40%] py-4 text-left align-bottom">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Features
                    </span>
                  </th>
                  <th className="px-4 py-4 text-center align-bottom">
                    <span className="font-display text-lg tracking-tight">Slate</span>
                  </th>
                  <th className="px-4 pb-4 text-center align-bottom">
                    <div className="rounded-t-2xl bg-foreground px-4 pb-4 pt-5 text-background">
                      <span className="font-display text-lg tracking-tight">Pro</span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-background/60">
                        Popular
                      </span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center align-bottom">
                    <span className="font-display text-lg tracking-tight">Studio</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Price row */}
                <tr className="border-t border-foreground/10">
                  <td className="py-5 text-base font-medium text-foreground">Price</td>
                  {(["slate", "pro", "studio"] as const).map((key) => {
                    const { price, suffix } = priceLabel(key, isAnnual);
                    return (
                      <td
                        key={key}
                        className={`px-4 py-5 text-center ${
                          key === "pro" ? "bg-foreground/[0.03]" : ""
                        }`}
                      >
                        <span className="font-display text-2xl tracking-tight tabular-nums">
                          ${price}
                        </span>
                        <span className="ml-1 text-xs text-muted-foreground">{suffix}</span>
                        {price > 0 && <Fn n={1} />}
                      </td>
                    );
                  })}
                </tr>

                {COMPARISON.map((row, i) => (
                  <tr key={row.label} className="border-t border-foreground/10">
                    <td className="py-4 pr-4 text-base text-muted-foreground">
                      {row.label}
                      {row.fn && <Fn n={row.fn} />}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <CellValue value={row.slate} />
                    </td>
                    <td
                      className={`px-4 py-4 text-center bg-foreground/[0.03] ${
                        i === COMPARISON.length - 1 ? "rounded-b-2xl" : ""
                      }`}
                    >
                      <CellValue value={row.pro} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <CellValue value={row.studio} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked */}
          <div className="mt-10 space-y-6 md:hidden">
            {(["slate", "pro", "studio"] as const).map((key) => {
              const { price, suffix } = priceLabel(key, isAnnual);
              return (
                <div
                  key={key}
                  className={`rounded-2xl border p-6 ${
                    key === "pro"
                      ? "border-foreground/20 bg-foreground/[0.03]"
                      : "border-foreground/10"
                  }`}
                >
                  <div className="flex items-baseline justify-between border-b border-foreground/10 pb-4">
                    <h3 className="font-display text-xl tracking-tight">
                      {planMeta[key].name}
                    </h3>
                    <span>
                      <span className="font-display text-2xl tracking-tight tabular-nums">
                        ${price}
                      </span>
                      <span className="ml-1 text-xs text-muted-foreground">{suffix}</span>
                      {price > 0 && <Fn n={1} />}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {COMPARISON.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-center justify-between gap-4 text-[15px]"
                      >
                        <span className="text-muted-foreground">
                          {row.label}
                          {row.fn && <Fn n={row.fn} />}
                        </span>
                        <CellValue value={row[key]} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Free trial, positioned below the paid cards and comparison table */}
        <div className="mt-16 lg:mt-20">
          <TrialBanner showFootnotes />
        </div>
      </div>

      {/* Sits directly under the comparison table so the numbered markers in
          it resolve without a long scroll. Outside the max-w-6xl container
          because it supplies its own narrower container and padding. */}
      <PricingFootnotes />
    </section>
  );
}
