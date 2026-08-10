"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Search, FileX2 } from "lucide-react";

/* Findings from the Mink Customer Study. Card shape intentionally mirrors the
   privacy principles on the home page: icon, title, description, then a
   mono label/value footer row. */
const findings = [
  {
    Icon: Users,
    title: "12 designers, one question",
    description:
      "Solo practitioners through to studio principals, walked through their real projects.",
    statusLabel: "Interviewed",
    statusValue: "12",
  },
  {
    Icon: Search,
    title: "Sourcing was the bottleneck",
    description:
      "Every single conversation landed on the same complaint before we asked about it.",
    statusLabel: "Agreement",
    statusValue: "12 of 12",
  },
  {
    Icon: FileX2,
    title: "No tool worth keeping",
    description:
      "Spreadsheets, email threads, and vendor PDFs, held together by hand.",
    statusLabel: "Tools they'd keep",
    statusValue: "0",
  },
];

export function AgentsByDesigners() {
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
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#232323] text-background overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            The origin story
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight text-balance transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Mink started with 12 designers.{" "}
            <span className="font-bold underline underline-offset-4">Not a product.</span>
          </h2>
          <p
            className={`mt-6 text-lg text-background/60 leading-relaxed text-pretty transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            We ran the Mink Customer Study before building anything, and every
            agent we shipped traces back to what those designers told us.
          </p>
        </div>

        {/* Study quote.
            Attributed to the study, not to any individual: participants are
            anonymised by design. Do not add named designers or portraits. */}
        <blockquote
          className={`mt-16 max-w-3xl transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[clamp(1.25rem,2.6vw,1.875rem)] font-serif italic leading-[1.35] tracking-tight text-pretty">
            &ldquo;I spend more hours sourcing and chasing vendors than I do
            designing. I want those hours back.&rdquo;
          </p>
          <footer className="mt-6 font-mono text-xs uppercase tracking-widest text-background/40">
            The Mink Customer Study · anonymised
          </footer>
        </blockquote>

        {/* Finding cards */}
        <div className="mt-16 lg:mt-20 grid md:grid-cols-3 gap-px bg-background/10 border border-background/10">
          {findings.map((finding, index) => {
            const Icon = finding.Icon;
            return (
              <div
                key={finding.title}
                className={`group bg-[#232323] p-8 lg:p-10 flex flex-col transition-all duration-700 hover:bg-background/[0.03] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/10 text-background transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-8 text-xl lg:text-2xl font-display tracking-tight">
                  {finding.title}
                </h3>
                <p className="mt-3 text-background/55 leading-relaxed flex-1">
                  {finding.description}
                </p>

                <div className="mt-8 pt-5 border-t border-background/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-background/40">
                    {finding.statusLabel}
                  </span>
                  <span className="font-mono text-sm text-background">
                    {finding.statusValue}
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
