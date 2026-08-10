"use client";

import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/components/landing/pricing-section";
import { useBetaAccess } from "@/components/landing/beta-access-provider";

/**
 * Studio plan highlight for the About page, sitting directly under "Where we
 * are today".
 *
 * Price and features are read from the canonical `plans` array in
 * pricing-section rather than retyped here, so this section can never drift
 * from the pricing page. Looked up by name instead of index so reordering the
 * plans doesn't silently point this at Pro.
 */
const studio = plans.find((p) => p.name === "Studio") ?? plans[plans.length - 1];

export function StudioPlanSection() {
  const { open } = useBetaAccess();

  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-muted/40">
          <div className="grid lg:grid-cols-2">
            {/* Kitchen frame, reused from the gallery this section replaced.
                min-h keeps it from collapsing on mobile, where the grid
                stacks and the image has no column height to fill. */}
            <div className="relative min-h-[280px] lg:min-h-[540px]">
              <Image
                src="/space-dark.jpg"
                alt="A dark, modern kitchen with wood slat cabinetry, a marble backsplash and herringbone floors"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-8 lg:p-14">
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-accent/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-foreground">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Studio plan
              </span>

              <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-balance lg:text-5xl">
                Get exclusive access to the latest AI agents with Studio.
              </h2>

              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                {studio.description} Studio members get every new agent first,
                as we ship it, plus the highest limits and a direct line to our
                team.
              </p>

              <ul className="mt-8 space-y-3.5">
                {studio.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                      <Check
                        className="h-3 w-3 text-accent-foreground"
                        strokeWidth={3.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-pretty leading-relaxed text-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-4xl font-semibold tracking-tight tabular-nums">
                  ${studio.price.monthly}
                </span>
                <span className="text-muted-foreground">/mo</span>
                <span className="ml-1 text-sm text-muted-foreground">
                  or ${studio.price.annual}/mo billed annually
                </span>
              </div>

              <Button
                onClick={() =>
                  open({
                    name: studio.name,
                    monthlyPrice: studio.price.monthly,
                    annualMonthlyPrice: studio.price.annual,
                    isAnnual: false,
                  })
                }
                className="mt-7 h-14 self-start rounded-full bg-cta px-8 text-base text-cta-foreground hover:bg-cta/90"
              >
                Sign up for Studio
              </Button>

              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {studio.seats} · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
