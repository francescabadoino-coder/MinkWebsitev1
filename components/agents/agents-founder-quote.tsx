"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function AgentsFounderQuote() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="relative py-28 lg:py-40 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        {/* Chapter marker */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="h-px w-12 bg-foreground/15" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            From the team
          </span>
          <span className="h-px w-12 bg-foreground/15" />
        </div>

        {/* Portrait */}
        <div
          className={`mt-12 flex justify-center transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <span className="relative h-20 w-20 overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10">
            {/* Same source and treatment as the About page team card, so the
                two portraits of Caleb read as the same person: full colour,
                and the higher-resolution cut-out rather than the small
                grey-background crop that used to live in /founders. */}
            <Image
              src="/founder-banzhef.jpg"
              alt="Caleb Banzhaf, Co-Founder and CTO of Mink"
              fill
              className="object-cover"
              sizes="80px"
            />
          </span>
        </div>

        {/* Quote */}
        <blockquote
          className={`mt-10 transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-serif italic leading-[1.22] tracking-tight text-balance">
            &ldquo;The frontier of AI moves every week. We refuse to bet the
            craft of designers on a single model, so we built Ora to stay
            model-agnostic and{" "}
            {/* Emphasis carried by an underline, not color: all copy reads #232323 */}
            <span className="underline underline-offset-4 decoration-foreground/30">
              always adopt the best.
            </span>
            &rdquo;
          </p>
          <footer className="mt-10">
            <p className="text-base font-medium text-foreground">Caleb Banzhaf</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Co-Founder, CTO
            </p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
