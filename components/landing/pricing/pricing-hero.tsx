import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingRotatingProof } from "./pricing-rotating-proof";

export function PricingHero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-28 lg:pt-16 lg:pb-36">
      {/* Background: faint container rules + diagonal gradient ribbon */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-6xl -translate-x-1/2 lg:block">
          <div className="absolute inset-y-0 left-12 w-px bg-foreground/[0.06]" />
          <div className="absolute inset-y-0 right-12 w-px bg-foreground/[0.06]" />
        </div>
        <div className="absolute -left-[20%] top-[46%] h-[38vh] w-[140%] -rotate-6 bg-gradient-to-r from-accent/25 via-accent/50 to-accent/20 opacity-40 blur-3xl md:opacity-60" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        {/* Headline */}
        <h1 className="max-w-3xl font-display text-4xl leading-[1.04] tracking-tight text-balance md:text-5xl lg:text-7xl">
          Scale your design business with AI
        </h1>

        <div className="relative mt-14 lg:mt-24">
          {/* Plan card */}
          <div className="overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-xl">
            <div className="flex flex-col md:flex-row">
              {/* Left panel */}
              <div className="flex flex-col justify-center gap-6 p-8 md:w-1/2 lg:w-[45%] lg:p-12">
                <h2 className="font-display text-3xl tracking-tight lg:text-4xl">
                  Mink Studio
                </h2>
                <p className="max-w-[42ch] text-lg leading-relaxed text-muted-foreground text-pretty">
                  Our most powerful plan for designers growing their business.
                  Take on more projects without adding to your plate. Sourcing,
                  procurement, and delivery, handled end to end.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    size="lg"
                    className="group h-13 w-full rounded-full bg-cta px-7 text-base text-cta-foreground hover:bg-cta/90 sm:w-auto"
                  >
                    <Link href="/signup">
                      Sign up
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-13 w-full rounded-full border-foreground/15 px-7 text-base sm:w-auto"
                  >
                    <Link href="/signin">Sign in</Link>
                  </Button>
                </div>
              </div>

              {/* Right panel */}
              <div className="border-t border-foreground/10 bg-muted/60 p-8 md:w-1/2 md:border-l md:border-t-0 lg:w-[55%] lg:p-12">
                <PricingRotatingProof />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
