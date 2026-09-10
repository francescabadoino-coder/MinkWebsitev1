"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedWaves } from "./animated-waves";
import { useBetaAccess } from "./beta-access-provider";

/** The default headline's styled "designing" word, reused by page overrides. */
export function AccentWord({ children }: { children: ReactNode }) {
  return (
    <span
      className="relative inline-block font-serif italic pr-1"
      style={{
        color: "#232323",
        WebkitTextStroke: "1px #232323",
        paintOrder: "stroke fill",
      }}
    >
      <span className="inline-flex">{children}</span>
      <span className="absolute -bottom-1 left-0 right-1 h-1 bg-accent rounded-full" />
    </span>
  );
}

/**
 * Shared closing CTA. Copy defaults to the homepage messaging; pages can pass
 * their own `headline` / `description` so the CTA isn't a verbatim repeat.
 * Use <AccentWord> in a custom headline to keep the underlined-serif treatment.
 */
export function CtaSection({
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
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Gradient wave accent, matching the hero, anchored bottom and faded */}
      <div
        className="absolute inset-x-0 bottom-0 h-[70vh] pointer-events-none"
        style={{
          WebkitMaskImage:
            "radial-gradient(110% 80% at 30% 110%, #000 30%, transparent 65%)",
          maskImage:
            "radial-gradient(110% 80% at 30% 110%, #000 30%, transparent 65%)",
        }}
      >
        <AnimatedWaves />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
        <h2
          className={`text-[clamp(2.5rem,8vw,6rem)] font-display tracking-tight leading-[0.95] text-balance transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {headline ?? (
            <>
              Stop sourcing. Start <AccentWord>designing</AccentWord>.
            </>
          )}
        </h2>

        <p
          className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {description ??
            "Interior designers lose 500+ hours a year to non-billable work. Ora takes the sourcing off your plate, so you can get back to design."}
        </p>

        <div
          className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            onClick={() => open()}
            className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 h-14 text-base rounded-full group"
          >
            Sign up
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5 bg-background/60 backdrop-blur-sm"
          >
            Sign in
          </Button>
        </div>

        <p
          className={`mt-4 text-sm text-muted-foreground font-mono transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          No credit card required
        </p>
      </div>
    </section>
  );
}
