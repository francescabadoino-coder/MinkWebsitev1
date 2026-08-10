"use client";

import { useEffect, useRef, useState } from "react";

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.25 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animated count-up to 40 once the section is in view.
  useEffect(() => {
    if (!isVisible) return;
    const target = 40;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo for a snappy settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: the stat, made visual */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-7xl lg:text-9xl font-display tracking-tighter tabular-nums">
                {count}
              </span>
              <span className="text-4xl lg:text-6xl font-display text-muted-foreground">
                %
              </span>
            </div>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-md text-pretty">
              of an interior designer&apos;s time goes to procurement and admin
              (the bulk of it{" "}
              <span className="text-foreground font-medium">non-billable</span>).
            </p>

            {/* Time-allocation bar */}
            <div className="mt-10 max-w-md">
              <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-foreground transition-all duration-1000 ease-out"
                  style={{ width: isVisible ? "40%" : "0%" }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
                  Procurement &amp; admin
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                  Actual design work
                </span>
              </div>
            </div>
          </div>

          {/* Right: the narrative + reframe */}
          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="max-w-xl text-3xl lg:text-5xl font-display tracking-tight text-balance leading-[1.1]">
              We believe there&apos;s a better way to design.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed text-pretty">
              That&apos;s why we built an AI end-to-end platform that handles the
              procurement, so you can spend more time growing your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
