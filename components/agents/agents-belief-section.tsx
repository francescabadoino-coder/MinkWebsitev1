"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function AgentsBeliefSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 bg-foreground text-background overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
        {/* Chapter marker */}
        <div
          className={`flex items-center gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-background/50">
            01 / What we believe
          </span>
          <span className="h-px flex-1 bg-background/15" />
        </div>

        {/* Vision — large editorial statement */}
        <blockquote className="mt-12 lg:mt-16">
          <p
            className={`text-[clamp(1.75rem,4.5vw,3.25rem)] font-serif italic leading-[1.18] tracking-tight text-balance transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            &ldquo;We envision a world where AI agents and humans live{" "}
            {/* Emphasis via underline, never color — copy stays one tone */}
            <span className="underline underline-offset-4 decoration-background/30">
              symbiotically
            </span>
            , where our agents specialize in the boring and tedious tasks, so
            designers can spend more time on what matters most to them:{" "}
            <span className="underline underline-offset-4 decoration-background/30">
              designing beautiful spaces.
            </span>
            &rdquo;
          </p>

          {/* Attribution */}
          <footer
            className={`mt-10 flex items-center gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-background/20">
              <Image
                src="/founders/francesca-obradovic.png"
                alt="Francesca Obradovic, Co-Founder of Mink"
                fill
                className="object-cover grayscale"
                sizes="56px"
              />
            </span>
            <div>
              <p className="text-base font-medium text-background">
                Francesca Obradovic
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-background/50">
                Co-Founder
              </p>
            </div>
          </footer>
        </blockquote>

        {/* Mission — the consequence of the belief */}
        <div
          className={`mt-20 lg:mt-28 max-w-2xl transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-background/50">
            That is why we&apos;re on a mission
          </span>
          <p className="mt-5 text-2xl lg:text-3xl font-display leading-snug text-pretty">
            To empower designers around the world to do what they do best:{" "}
            <span className="font-serif italic underline underline-offset-4 decoration-background/30">
              design.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
