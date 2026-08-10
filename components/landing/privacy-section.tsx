"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, EyeOff, FileLock2 } from "lucide-react";

const principles = [
  {
    Icon: EyeOff,
    title: "We never sell your data",
    description: "Your renders, floorplans, and selections are never sold or shared with third parties.",
    statusLabel: "Data sales",
    statusValue: "Never",
  },
  {
    Icon: FileLock2,
    title: "Your designs, your IP",
    description: "Everything you create on Mink stays fully owned by you and your firm.",
    statusLabel: "Ownership",
    statusValue: "100% yours",
  },
  {
    Icon: Lock,
    title: "Encrypted by default",
    description: "Projects are encrypted in transit and at rest, never shared across accounts.",
    statusLabel: "Encryption",
    statusValue: "AES-256",
  },
];

export function PrivacySection() {
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
      id="privacy"
      ref={sectionRef}
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#232323] text-background overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            Privacy by design
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight text-balance transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {"Your data stays yours. "}
            <span className="relative inline-block font-serif italic">
              Always.
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-accent" />
            </span>
          </h2>
          <p
            className={`mt-6 text-lg text-background/60 leading-relaxed text-pretty transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            We use AI to take the tedious work off your plate, never to sell your data.
          </p>
        </div>

        {/* Principle cards */}
        <div className="mt-16 lg:mt-20 grid md:grid-cols-3 gap-px bg-background/10 border border-background/10">
          {principles.map((principle, index) => {
            const Icon = principle.Icon;
            return (
              <div
                key={principle.title}
                className={`group bg-[#232323] p-8 lg:p-10 flex flex-col transition-all duration-700 hover:bg-background/[0.03] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/10 text-background transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-8 text-xl lg:text-2xl font-display tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-3 text-background/55 leading-relaxed flex-1">
                  {principle.description}
                </p>

                <div className="mt-8 pt-5 border-t border-background/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-background/40">
                    {principle.statusLabel}
                  </span>
                  <span className="font-mono text-sm text-background">
                    {principle.statusValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
