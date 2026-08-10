"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedWaves } from "./animated-waves";
import { useBetaAccess } from "./beta-access-provider";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { open } = useBetaAccess();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Stripe-style gradient accent band, anchored top, faded before the text */}
      <div
        className="absolute inset-x-0 top-0 h-[55vh] pointer-events-none"
        style={{
          WebkitMaskImage:
            "radial-gradient(110% 80% at 70% -10%, #000 28%, transparent 62%)",
          maskImage:
            "radial-gradient(110% 80% at 70% -10%, #000 28%, transparent 62%)",
        }}
      >
        <AnimatedWaves />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-44 pb-8 lg:pt-56 lg:pb-10 text-center flex flex-col items-center">
        {/* Main headline */}
        <h1
          className={`text-[clamp(2.75rem,9vw,7rem)] font-display leading-[0.95] tracking-tight mb-8 text-balance transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block whitespace-nowrap">Design more.</span>
          <span className="block whitespace-nowrap">
            Stress{" "}
            <span
              className="relative inline-block font-serif italic pr-1"
              style={{
                color: "#232323",
                WebkitTextStroke: "1px #232323",
                paintOrder: "stroke fill",
              }}
            >
              <span className="inline-flex">less.</span>
              <span className="absolute -bottom-1 left-0 right-1 h-1 bg-accent rounded-full" />
            </span>
          </span>
        </h1>

        {/* Description */}
        <p
          className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          AI agents built to handle the sourcing, the admin, and the
          back-and-forth so you can focus on what you do best: designing
          beautiful spaces.
        </p>

        {/* CTAs */}
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
          className={`mt-4 text-sm text-muted-foreground transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          No credit card required
        </p>
      </div>
    </section>
  );
}
