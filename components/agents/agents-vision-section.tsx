"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MissionTyping } from "@/components/agents/mission-typing";

export function AgentsVisionSection() {
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
    <section ref={sectionRef} className="relative py-28 lg:py-40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Chapter marker */}
        <div
          className={`flex items-center gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Our vision
          </span>
          <span className="h-px flex-1 bg-foreground/10" />
        </div>

        {/* Manifesto — large editorial closing statement */}
        <blockquote
          className={`mt-12 lg:mt-16 max-w-4xl transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[clamp(1.5rem,3.4vw,2.75rem)] font-serif italic leading-[1.22] tracking-tight text-balance">
            &ldquo;We envision a world where AI agents and humans live{" "}
            <span className="text-foreground underline underline-offset-4 decoration-foreground/30">
              symbiotically
            </span>
            . Our agents handle the tedious work, so designers can focus on what
            matters most:{" "}
            <span className="text-foreground underline underline-offset-4 decoration-foreground/30">
              designing beautiful spaces.
            </span>
            &rdquo;
          </p>

          <footer className="mt-10 flex items-center gap-4">
            <span className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-foreground/15">
              <Image
                src="/founders/francesca-obradovic.png"
                alt="Francesca Obradovic, Co-Founder and CEO of Mink"
                fill
                className="object-cover grayscale"
                sizes="56px"
              />
            </span>
            <div>
              <p className="text-base font-medium text-foreground">
                Francesca Obradovic
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Co-Founder, CEO
              </p>
            </div>
          </footer>
        </blockquote>

        {/* Cinematic symbiosis visual — human craft meets calm machine intelligence */}
        <figure
          className={`relative mt-16 lg:mt-20 aspect-[16/9] w-full overflow-hidden rounded-3xl ring-1 ring-foreground/10 shadow-xl shadow-foreground/5 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Image
            src="/agents/vision-symbiosis.png"
            alt="A designer's hands arranging a material board of terracotta, linen, wood, and stone in warm natural light, with a soft luminous glow suggesting Ora's quiet intelligence enhancing the work"
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
            <span className="inline-block rounded-full bg-background/85 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground backdrop-blur-md">
              Human taste, amplified by Ora
            </span>
          </figcaption>
        </figure>

        {/* Mission — typed live */}
        <MissionTyping />
      </div>
    </section>
  );
}
