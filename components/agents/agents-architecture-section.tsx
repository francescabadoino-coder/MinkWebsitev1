"use client";

import { useEffect, useRef, useState } from "react";

const MODELS = ["GPT", "Claude", "Gemini", "Llama", "Mistral", "Grok"];

export function AgentsArchitectureSection() {
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
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* Copy */}
        <div>
          <span
            className={`inline-block font-mono text-xs uppercase tracking-widest text-muted-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            How it works
          </span>
          <h2
            className={`mt-5 text-[clamp(2rem,5vw,3.5rem)] font-display leading-[1.05] tracking-tight text-balance transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Agentic AI, built to stay on the frontier.
          </h2>
          <p
            className={`mt-6 text-lg text-muted-foreground leading-relaxed text-pretty transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Ora is agentic AI: it plans, decides, and completes multi-step work
            on its own instead of waiting on a prompt at every turn. Underneath
            it stays LLM-agnostic, routing each task to whichever frontier model
            handles it best and adopting new ones the moment they ship, so
            there&apos;s no vendor lock-in and no tools to switch. Your designs
            and data are never used to train any of those models, so your IP
            stays yours.
          </p>
        </div>

        {/* Visual: Ora core orbited by interchangeable models */}
        <div
          className={`relative aspect-square w-full max-w-md mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Concentric rings */}
          <div className="absolute inset-0 rounded-full border border-foreground/10" />
          <div className="absolute inset-[15%] rounded-full border border-foreground/10" />
          <div className="absolute inset-[30%] rounded-full border border-dashed border-foreground/15" />

          {/* Core */}
          <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-foreground text-background shadow-lg">
            <span className="font-display text-2xl leading-none">Ora</span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-background/60">
              Agent core
            </span>
          </div>

          {/* Orbiting model chips.
              Each chip is placed with percentage left/top resolved against the
              square container, so the ring stays perfectly concentric with the
              core at every viewport width. RADIUS matches the inset-[15%] ring. */}
          <div className="absolute inset-0 animate-orbit-spin">
            {MODELS.map((model, i) => {
              const angle = (i / MODELS.length) * (Math.PI * 2);
              const RADIUS = 42.5; // % of container half-width
              const left = 50 + RADIUS * Math.sin(angle);
              const top = 50 - RADIUS * Math.cos(angle);
              return (
                <div
                  key={model}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  {/* Counter-spin keeps the label upright as the ring turns */}
                  <div className="animate-orbit-counter">
                    <span className="block whitespace-nowrap rounded-full border border-foreground/10 bg-background px-3 py-1.5 font-mono text-xs text-foreground shadow-sm">
                      {model}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
