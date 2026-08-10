"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedWaves } from "@/components/landing/animated-waves";
import { useBetaAccess } from "@/components/landing/beta-access-provider";
import { PlatformLoop } from "@/components/agents/platform-loop";
import { HeroBriefDemo } from "@/components/agents/hero-brief-demo";

export function AgentsHero() {
  const [isVisible, setIsVisible] = useState(false);
  const { open } = useBetaAccess();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Gradient wave accent, anchored top, faded before the text */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none"
        style={{
          WebkitMaskImage:
            "radial-gradient(110% 80% at 50% -10%, #000 28%, transparent 62%)",
          maskImage:
            "radial-gradient(110% 80% at 50% -10%, #000 28%, transparent 62%)",
        }}
      >
        <AnimatedWaves />
      </div>

      {/* Hero — outcome-first, Ora introduced */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-44 pb-20 lg:pt-56 lg:pb-28 text-center flex flex-col items-center">
        <h1
          className={`text-[clamp(2.5rem,8vw,6rem)] font-display leading-[0.95] tracking-tight mb-8 text-balance transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Cooper is a display accent: emphasise one word, not a whole
              clause, or the wider serif overwhelms the Nourd headline. */}
          Meet Ora, the AI agent that{" "}
          <span className="font-serif italic text-foreground">actually</span>{" "}
          does the work.
        </h1>

        <p
          className={`text-xl lg:text-2xl text-foreground leading-relaxed max-w-3xl mx-auto text-pretty transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Ora takes the sourcing, specs, and vendor busywork, so you get back
          to{" "}
          <span className="font-serif italic text-foreground underline underline-offset-4 decoration-foreground/30">
            designing beautiful spaces.
          </span>
        </p>

        <div
          className={`mt-12 flex flex-col items-center gap-3 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => open()}
              className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 h-14 text-base rounded-full group"
            >
              Sign up
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5 bg-background/60 backdrop-blur-sm"
            >
              <a href="/signin">Sign in</a>
            </Button>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            First 100 designers, free.
          </p>
        </div>

        {/* Hero product moment — type a brief, watch Ora resolve it against the room */}
        <div
          className={`relative mt-16 w-full max-w-4xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <HeroBriefDemo isVisible={isVisible} />
        </div>
      </div>

      {/* Product demo — Ora in action, looping */}
      <div className="relative z-10 w-full border-t border-foreground/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div
            className={`flex items-center gap-4 mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              See Ora work
            </span>
            <span className="h-px flex-1 bg-foreground/10" />
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
            <div
              className={`transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-display leading-[1.1] tracking-tight text-balance">
                Watch Ora source a piece, reach out to vendors, and match it,
                in seconds.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
                Snap or describe what you need. Ora scans your trade catalog,
                identifies the piece, and pulls the closest matches across
                vendors, ranked by price, lead time, and fit.
              </p>
            </div>

            {/* Imagery — looping demo of the platform identifying a material and matching vendors */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <PlatformLoop />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
