"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCountUp, useInViewOnce } from "@/hooks/use-count-up";
import { INDUSTRY_SOURCE_PLACEHOLDER } from "./pricing-footnote-data";

const WEEKS_PER_YEAR = 52;

/**
 * Rate range reflects the client-billed design rate, not a salaried wage.
 * U.S. market average bills at roughly $150–$200/hr per 2026 industry data.
 */
const RATE_MIN = 100;
const RATE_MAX = 500;
const RATE_STEP = 5;
const DEFAULT_RATE = 150;

const sliderSkin =
  "[&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-track]]:bg-foreground/85 [&_[data-slot=slider-range]]:bg-accent [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:border-transparent [&_[data-slot=slider-thumb]]:bg-accent";

function formatDollars(value: number) {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function PricingSavingsCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(DEFAULT_RATE);
  const [oraShare, setOraShare] = useState(60);

  const reclaimedHours = Math.round(
    hoursPerWeek * WEEKS_PER_YEAR * (oraShare / 100),
  );
  // Reclaimed hours are valued at the billed rate the designer charges clients.
  const annualValue = reclaimedHours * hourlyRate;
  const monthlyValue = Math.round(annualValue / 12);

  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3);
  const animatedAnnual = useCountUp(annualValue, { active: inView });
  const animatedHours = useCountUp(reclaimedHours, { active: inView });
  const animatedMonthly = useCountUp(monthlyValue, { active: inView });

  // Section rhythm, container width, and eyebrow match the home page
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Savings calculator
          <span className="h-px w-8 bg-foreground/30" />
        </span>
        <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-balance lg:text-6xl">
          What is procurement costing you?
        </h2>
        <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted-foreground text-pretty">
          Estimate the time and billable income you could reclaim by letting
          Ora handle the sourcing.
        </p>

        <div
          ref={ref}
          className="mt-10 overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-sm"
        >
          <div className="flex flex-col md:flex-row">
            {/* Inputs */}
            <div className="flex flex-col gap-8 p-8 md:w-[55%] lg:p-10">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="hours-per-week"
                  className="font-display text-base tracking-tight"
                >
                  Hours a week you spend on procurement
                </label>
                <input
                  id="hours-per-week"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={80}
                  value={hoursPerWeek}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    if (Number.isNaN(next)) return;
                    setHoursPerWeek(Math.max(1, Math.min(80, next)));
                  }}
                  className="w-full rounded-lg border border-foreground/10 bg-muted/40 px-4 py-3 font-display text-2xl tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor="hourly-rate"
                    className="font-display text-base tracking-tight"
                  >
                    Your hourly rate
                  </label>
                  <span className="font-display text-base tracking-tight">
                    {formatDollars(hourlyRate)}/hr
                  </span>
                </div>
                <Slider
                  id="hourly-rate"
                  aria-label="Your hourly rate"
                  min={RATE_MIN}
                  max={RATE_MAX}
                  step={RATE_STEP}
                  value={[hourlyRate]}
                  onValueChange={([next]) => setHourlyRate(next)}
                  className={sliderSkin}
                />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  U.S. market average is $150–$200/hr (2026 industry data).
                  Adjust to your own rate.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor="mink-share"
                    className="font-display text-base tracking-tight"
                  >
                    How much of it Ora handles
                  </label>
                  <span className="font-display text-base tracking-tight">
                    {oraShare}%
                  </span>
                </div>
                <Slider
                  id="mink-share"
                  aria-label="How much of it Ora handles"
                  min={10}
                  max={100}
                  step={5}
                  value={[oraShare]}
                  onValueChange={([next]) => setOraShare(next)}
                  className={sliderSkin}
                />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Adjust to match how much of your sourcing you&apos;d hand off.
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="relative flex flex-col justify-center gap-6 border-t border-foreground/10 bg-muted/60 p-8 md:w-[45%] md:border-t-0 md:border-l lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-10 right-0 h-40 w-56 bg-accent/40 opacity-60 blur-3xl"
              />
              <div className="relative flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">
                  You could reclaim
                </p>
                <p
                  className="font-display text-5xl leading-none tracking-tight lg:text-6xl"
                  aria-live="polite"
                >
                  {formatDollars(animatedAnnual)}
                </p>
                <p className="mt-1 font-display text-base tracking-tight">
                  in billable time per year
                </p>
              </div>

              <div className="relative flex flex-wrap gap-x-10 gap-y-4">
                <div className="flex flex-col">
                  <span className="font-display text-2xl tracking-tight">
                    {animatedHours.toLocaleString("en-US")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    hours a year
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl tracking-tight">
                    {formatDollars(animatedMonthly)}
                  </span>
                  <span className="text-sm text-muted-foreground">a month</span>
                </div>
              </div>

              <p className="relative max-w-[34ch] text-base leading-relaxed text-muted-foreground text-pretty">
                That&apos;s time back for billable design work, or winning your
                next client.
              </p>

              <div className="relative">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-full bg-cta px-6 text-base text-cta-foreground hover:bg-cta/90"
                >
                  <Link href="/signup">
                    Sign up
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
          Estimates only. Illustrative figures, not a guarantee of results.
          Time and income reclaimed depend on your rate, hours spent on
          procurement, and how much sourcing you hand off. The default rate of
          $150/hr reflects the U.S. market average billed rate for interior
          designers, so adjust it to your own rate above. Industry figures are
          drawn from {INDUSTRY_SOURCE_PLACEHOLDER}.
        </p>
      </div>
    </section>
  );
}
