"use client";

import { useEffect, useState } from "react";
import { PROOF_POINTS } from "./pricing-hero-proof-points";

const INTERVAL_MS = 5000;

export function PricingRotatingProof() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  // Bumping this restarts the interval so a clicked dot gets a full turn.
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(query.matches);
    const onChange = () => setPrefersReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReduced || isPaused) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % PROOF_POINTS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [prefersReduced, isPaused, timerKey]);

  const select = (next: number) => {
    setIndex(next);
    setTimerKey((key) => key + 1);
  };

  return (
    <div
      className="flex h-full flex-col items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Fixed height reserves space for the tallest item so nothing shifts. */}
      <div
        aria-live="polite"
        className="relative flex h-[150px] w-full items-center justify-center sm:h-[164px]"
      >
        {PROOF_POINTS.map((point, i) => {
          const isActive = i === index;
          return (
            <div
              key={point.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 flex flex-col items-center justify-center px-2 text-center ${
                prefersReduced ? "" : "transition-all duration-300 ease-out"
              } ${
                isActive
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 translate-y-2"
              }`}
            >
              <span className="font-display text-4xl tracking-tight text-balance lg:text-5xl">
                {point.display}
              </span>
              <span className="mt-3 max-w-[26ch] text-base leading-relaxed text-muted-foreground text-pretty lg:text-lg">
                {point.supporting}
              </span>
              {point.qualifier ? (
                <span className="mt-1.5 max-w-[30ch] text-sm leading-relaxed text-muted-foreground/80 text-pretty">
                  {point.qualifier}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Indicator dots */}
      <div className="mt-6 flex items-center justify-center gap-2.5">
        {PROOF_POINTS.map((point, i) => {
          const isActive = i === index;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show: ${point.display} ${point.supporting}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive
                  ? "w-6 bg-foreground"
                  : "w-2.5 bg-foreground/25 hover:bg-foreground/40"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
