"use client";

import { useEffect, useRef, useState } from "react";
import {
  UserCheck,
  LayoutGrid,
  ShoppingBag,
  ClipboardList,
  Truck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Stage = {
  Icon: LucideIcon;
  title: string;
  tag: string;
  body: string;
  status: "live" | "soon" | "roadmap";
  capabilities: string[];
};

// Ordered as a real sequence: a project moves left to right, from the first
// client conversation through to delivery on site. Order is load-bearing here,
// so the numbered markers in the rail are meaningful rather than decorative.
const STAGES: Stage[] = [
  {
    Icon: UserCheck,
    title: "Client Onboarding",
    tag: "Kickoff",
    body: "Capture the brief, set expectations, and keep clients in the loop, automatically.",
    status: "soon",
    capabilities: [
      "Intake questionnaires",
      "Brief summaries",
      "Auto status updates",
      "Client reminders",
    ],
  },
  {
    Icon: LayoutGrid,
    title: "Concept & Mood Boarding",
    tag: "Design",
    body: "Turn a brief into curated, on-brand boards in minutes, not days.",
    status: "soon",
    capabilities: [
      "Brief → board",
      "On-brand curation",
      "Style matching",
      "Instant revisions",
    ],
  },
  {
    Icon: ShoppingBag,
    title: "Sourcing & Procurement",
    tag: "Specify",
    body: "Sourcing, quotes, orders, and vendor back-and-forth, done for you.",
    // The only shipped agent today. `initialActive` below opens the section
    // here rather than on step 01 so the live capability leads.
    status: "live",
    capabilities: [
      "Product sourcing",
      "Quote requests",
      "Vendor outreach",
      "Order tracking",
    ],
  },
  {
    Icon: ClipboardList,
    title: "Admin & Proposals",
    tag: "Approve",
    body: "Timelines, proposals, and the paperwork that eats your week, handled.",
    status: "soon",
    capabilities: [
      "Proposal drafting",
      "Timeline building",
      "Invoicing prep",
      "File organization",
    ],
  },
  {
    Icon: Truck,
    title: "Delivery & Execution",
    tag: "Install",
    body: "Track freight, coordinate installs, and close out the punch list on site.",
    status: "soon",
    capabilities: [
      "Freight tracking",
      "Install scheduling",
      "Punch lists",
      "Final walkthrough",
    ],
  },
];

const STATUS_LABEL: Record<Stage["status"], string> = {
  live: "Live",
  soon: "Coming soon",
  roadmap: "On the roadmap",
};

/**
 * Open on the shipped agent rather than step 01. Sourcing is the only `live`
 * stage while the rest are `soon`, so defaulting to index 0 would have opened
 * the section on an unavailable capability. Derived, not hardcoded, so it
 * follows the data as more agents go live. Falls back to 0 if none are live.
 */
const initialActive = Math.max(
  STAGES.findIndex((s) => s.status === "live"),
  0
);

export function AgentsRoadmapSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(initialActive);
  const [paused, setPaused] = useState(false);
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

  useEffect(() => {
    if (!isVisible || paused) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % STAGES.length),
      3200
    );
    return () => clearInterval(id);
  }, [isVisible, paused]);

  const activeStage = STAGES[active];
  // Rail fill stops at the active dot. Dots sit at column centres, so the
  // travel spans from the first centre to the last.
  const progress = (active / (STAGES.length - 1)) * 100;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="max-w-2xl">
          <span
            className={`inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            What we&apos;re building
            <span className="h-px w-8 bg-foreground/30" />
          </span>
          <h2
            className={`mt-5 font-display text-4xl leading-[1.05] tracking-tight text-balance transition-all duration-1000 lg:text-6xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            An agent for every step of the design process.
          </h2>
          <p
            className={`mt-6 text-pretty text-lg leading-relaxed text-muted-foreground transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Follow a project from the first client conversation through to
            delivery on site. Each step has an agent taking the busywork off your
            plate.
          </p>
        </div>

        <div
          className={`mt-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Horizontal timeline rail. Scrolls sideways on narrow screens so it
              always reads as a left-to-right sequence. */}
          <div className="-mx-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:overflow-visible lg:px-0">
            <div
              role="tablist"
              aria-label="Design process stages"
              className="relative grid min-w-[720px] grid-cols-5 gap-4 lg:min-w-0"
            >
              {/* Base rail sits behind the dots, inset half a column on each
                  side so it starts and ends at a dot centre. */}
              <span
                aria-hidden="true"
                className="absolute left-[10%] right-[10%] top-1.5 h-px bg-foreground/15"
              />
              <span
                aria-hidden="true"
                className="absolute left-[10%] top-1.5 h-px bg-foreground transition-all duration-500 ease-out"
                style={{ width: `calc((100% - 20%) * ${progress / 100})` }}
              />

              {STAGES.map((stage, i) => {
                const selected = i === active;
                const complete = i < active;
                return (
                  <button
                    key={stage.title}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className="group relative flex flex-col items-center text-center"
                  >
                    {/* Dot on the rail */}
                    <span
                      className={`relative z-10 flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        selected
                          ? "border-foreground bg-foreground scale-125"
                          : complete
                            ? "border-foreground bg-foreground"
                            : "border-foreground/25 bg-background group-hover:border-foreground/50"
                      }`}
                    />
                    <span
                      className={`mt-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                        selected
                          ? "bg-accent/20 text-foreground ring-1 ring-accent/40"
                          : "bg-muted/60 text-foreground/60 group-hover:bg-muted"
                      }`}
                    >
                      <stage.Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} · {stage.tag}
                    </span>
                    <span
                      className={`mt-1.5 text-pretty text-sm font-medium transition-colors duration-300 ${
                        selected ? "text-foreground" : "text-foreground/70"
                      }`}
                    >
                      {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel for the selected stage */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-foreground/10 bg-muted/30 p-7 lg:p-10">
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${
                  activeStage.status === "live"
                    ? "bg-accent/20 text-foreground"
                    : "bg-foreground/5 text-muted-foreground"
                }`}
              >
                {activeStage.status === "live" && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                )}
                {STATUS_LABEL[activeStage.status]}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                Step {String(active + 1).padStart(2, "0")} /{" "}
                {String(STAGES.length).padStart(2, "0")}
              </span>
            </div>

            <div
              key={active}
              className="animate-fade-in-up lg:flex lg:items-start lg:gap-12"
            >
              <div className="mt-6 lg:flex-1">
                <h3 className="font-display text-2xl tracking-tight text-balance text-foreground lg:text-3xl">
                  {activeStage.title}
                </h3>
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
                  {activeStage.body}
                </p>
              </div>

              <div className="mt-8 lg:mt-6 lg:w-[46%]">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  What it handles
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeStage.capabilities.map((cap, i) => (
                    <span
                      key={cap}
                      className="rounded-full border border-foreground/10 bg-background px-3 py-1.5 text-sm text-foreground"
                      style={{
                        animation: "fade-in-up 0.5s ease-out both",
                        animationDelay: `${i * 80}ms`,
                      }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Auto-advance progress */}
            <div className="mt-8 h-0.5 w-full overflow-hidden rounded-full bg-foreground/10">
              {!paused && isVisible && (
                <div
                  key={active}
                  className="h-full bg-foreground/40"
                  style={{ animation: "agent-progress 3.2s linear forwards" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
