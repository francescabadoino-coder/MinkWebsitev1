"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedWaves } from "@/components/landing/animated-waves";
import { useBetaAccess } from "@/components/landing/beta-access-provider";

/**
 * Shared closing CTA for the pricing and showcase pages. Copy defaults to the
 * pricing messaging; pages can override `headline` / `description` so the CTA
 * speaks to that page (the showcase page passes work/proof-oriented copy).
 * The signature underlined-serif emphasis in the headline is preserved either
 * way — a plain `headline` string still renders with the standard treatment.
 */
export function PricingClosingCta({
  headline,
  description,
}: {
  headline?: ReactNode;
  description?: ReactNode;
} = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { open } = useBetaAccess();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32">
      {/* Gradient wave accent, matching the hero, anchored bottom and faded */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70vh]"
        style={{
          WebkitMaskImage:
            "radial-gradient(110% 80% at 30% 110%, #000 30%, transparent 65%)",
          maskImage:
            "radial-gradient(110% 80% at 30% 110%, #000 30%, transparent 65%)",
        }}
      >
        <AnimatedWaves />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center lg:px-12">
        <h2
          className={`text-[clamp(2.25rem,7vw,5rem)] font-display leading-[0.98] tracking-tight text-balance transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {headline ?? (
            <>
              Start free. Upgrade when it{" "}
              {/* Copy stays #232323; the underline bar carries the emphasis */}
              <span className="relative inline-block font-serif italic pr-1">
                <span className="inline-flex">pays off</span>
                <span className="absolute -bottom-1 left-0 right-1 h-1 rounded-full bg-foreground/25" />
              </span>
              .
            </>
          )}
        </h2>

        <p
          className={`mx-auto mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {description ??
            "Try Mink on a real project at no cost. No credit card, no commitment, just your hours back."}
        </p>

        <div
          className={`mt-12 flex flex-col items-center justify-center gap-4 transition-all delay-300 duration-700 sm:flex-row ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            onClick={() => open()}
            className="group h-14 rounded-full bg-cta px-8 text-base text-cta-foreground hover:bg-cta/90"
          >
            Sign up
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 rounded-full border-foreground/20 bg-background/60 px-8 text-base backdrop-blur-sm hover:bg-foreground/5"
          >
            Sign in
          </Button>
        </div>

        <p
          className={`mt-4 font-mono text-sm text-muted-foreground transition-all delay-300 duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          No credit card required
        </p>
      </div>
    </section>
  );
}
