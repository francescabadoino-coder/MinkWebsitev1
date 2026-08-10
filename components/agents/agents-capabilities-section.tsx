"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import Image from "next/image";
import {
  Search,
  Mail,
  FileText,
  GitCompareArrows,
  Check,
  ArrowRight,
} from "lucide-react";

type Capability = {
  id: string;
  number: string;
  eyebrow: string;
  Icon: typeof Search;
  title: string;
  description: string;
  Visual: () => ReactElement;
};

/* -------- Visual 1: Sourcing — streaming product matches -------- */
function SourcingVisual() {
  const products = [
    { name: "Halden Curved Sofa", vendor: "Karvet", match: 98, img: "/agents/products/halden-sofa.png" },
    { name: "Marlow Linen Chair", vendor: "Brume", match: 95, img: "/agents/products/marlow-chair.png" },
    { name: "Pell Oak Console", vendor: "CB2 Trade", match: 91, img: "/agents/products/pell-console.png" },
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setShown((s) => (s >= products.length ? 0 : s + 1)),
      900
    );
    return () => clearInterval(id);
  }, [products.length]);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 rounded-xl border border-foreground/10 bg-background px-4 py-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground">
          Mid-century walnut sofa, under $4k
        </span>
      </div>
      {products.map((p, i) => (
        <div
          key={p.name}
          className={`flex items-center gap-3 rounded-xl border bg-background px-3 py-2.5 transition-all duration-500 ${
            i < shown
              ? "border-foreground/10 opacity-100 translate-y-0"
              : "border-transparent opacity-0 translate-y-2"
          }`}
        >
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-foreground/5">
            <Image
              src={p.img}
              alt={p.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-foreground">{p.name}</p>
            <p className="font-mono text-xs text-muted-foreground">{p.vendor}</p>
          </div>
          <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-xs text-accent">
            {p.match}%
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------- Visual 2: Outreach — drafting a vendor email -------- */
function OutreachVisual() {
  const full =
    "Hi Karvet team, I'd love to confirm trade pricing and lead time on the Halden Curved Sofa for a client project. Could you share availability?";
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = i >= full.length ? 0 : i + 2;
      setText(full.slice(0, i));
    }, 45);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col rounded-xl border border-foreground/10 bg-background">
      <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-2.5">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-xs text-muted-foreground">
          To: sales@karvet.com
        </span>
      </div>
      <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-2.5">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-foreground/5">
          <Image
            src="/agents/products/halden-sofa.png"
            alt="Halden Curved Sofa"
            fill
            className="object-cover"
            sizes="40px"
          />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm text-foreground">Halden Curved Sofa</p>
          <p className="font-mono text-xs text-muted-foreground">
            Re: Trade pricing &amp; lead time
          </p>
        </div>
      </div>
      <div className="flex-1 px-4 py-3">
        <p className="text-sm leading-relaxed text-foreground">
          {text}
          <span className="ml-0.5 inline-block h-4 w-0.5 -translate-y-0.5 animate-pulse bg-accent align-middle" />
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-foreground/10 px-4 py-2.5">
        <span className="font-mono text-xs text-muted-foreground">
          Drafted by Ora
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-xs text-background">
          Send <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

/* -------- Visual 3: Comparison — side-by-side options -------- */
function ComparisonVisual() {
  const rows = [
    { label: "Price", a: "$3,840", b: "$4,120" },
    { label: "Lead time", a: "6 wks", b: "3 wks" },
    { label: "Trade disc.", a: "20%", b: "15%" },
  ];
  const [pick, setPick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPick((p) => (p === 0 ? 1 : 0)), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid h-full grid-cols-2 gap-3">
      {["Karvet", "Brume"].map((vendor, col) => (
        <div
          key={vendor}
          className={`flex flex-col rounded-xl border bg-background p-4 transition-all duration-500 ${
            pick === col
              ? "border-accent/60 shadow-sm"
              : "border-foreground/10 opacity-70"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-foreground/5">
              <Image
                src="/agents/products/halden-sofa.png"
                alt="Halden Curved Sofa"
                fill
                className="object-cover"
                sizes="36px"
              />
            </span>
            <span className="flex-1 text-sm text-foreground">{vendor}</span>
            {pick === col && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="h-3 w-3" />
              </span>
            )}
          </div>
          <div className="mt-3 space-y-2.5">
            {rows.map((r) => (
              <div key={r.label} className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {r.label}
                </span>
                <span className="text-sm text-foreground">
                  {col === 0 ? r.a : r.b}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------- Visual 4: Specs — generating a spec doc -------- */
function SpecVisual() {
  const lines = [
    "Project: Oak Street Residence",
    "SKU: HAL-CRV-WAL-01",
    "Vendor: Karvet · Trade",
    "Qty: 1 · $3,840",
    "Lead time: 6 weeks",
  ];
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setCount((c) => (c >= lines.length ? 0 : c + 1)),
      650
    );
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <div className="flex h-full flex-col rounded-xl border border-foreground/10 bg-background">
      <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-2.5">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-xs text-muted-foreground">
          spec-sheet.pdf
        </span>
      </div>
      <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3">
        <span className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-foreground/5">
          <Image
            src="/agents/products/halden-sofa.png"
            alt="Halden Curved Sofa"
            fill
            className="object-cover"
            sizes="64px"
          />
        </span>
        <div>
          <p className="text-sm text-foreground">Halden Curved Sofa</p>
          <p className="font-mono text-xs text-muted-foreground">
            Walnut · Cognac leather
          </p>
        </div>
      </div>
      <div className="flex-1 space-y-2 px-4 py-3">
        {lines.map((line, i) => (
          <div
            key={line}
            className={`flex items-center gap-2 transition-all duration-400 ${
              i < count ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
          >
            <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
            <span className="font-mono text-xs text-foreground">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CAPABILITIES: Capability[] = [
  {
    id: "sourcing",
    number: "01",
    eyebrow: "Sourcing",
    Icon: Search,
    title: "Sources products in seconds.",
    description:
      "Describe what you need in plain language and Ora searches 150+ trade vendors, ranking the best matches by price, lead time, and fit.",
    Visual: SourcingVisual,
  },
  {
    id: "outreach",
    number: "02",
    eyebrow: "Vendor Outreach",
    Icon: Mail,
    title: "Handles vendor outreach.",
    description:
      "Ora drafts and sends vendor emails for pricing, availability, and lead times, then tracks every reply in one place.",
    Visual: OutreachVisual,
  },
  {
    id: "comparison",
    number: "03",
    eyebrow: "Comparison",
    Icon: GitCompareArrows,
    title: "Compares your options.",
    description:
      "Stack vendors side by side on the details that matter, so you can make the right call for every client and budget.",
    Visual: ComparisonVisual,
  },
  {
    id: "specs",
    number: "04",
    eyebrow: "Client Specs",
    Icon: FileText,
    title: "Builds client-ready specs.",
    description:
      "Turn approved selections into polished spec documents and invoices in a single click, always on brand.",
    Visual: SpecVisual,
  },
];

function CapabilityRow({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const reversed = index % 2 === 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  const { Visual } = capability;

  return (
    <div
      ref={rowRef}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Copy */}
      <div className={reversed ? "lg:order-2" : ""}>
        <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-5">
          <span className="font-mono">{capability.number}</span>
          <span className="w-8 h-px bg-foreground/30" />
          {capability.eyebrow}
        </span>
        <h3 className="text-3xl lg:text-4xl font-display tracking-tight text-balance mb-5">
          {capability.title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
          {capability.description}
        </p>
      </div>

      {/* Visual */}
      <div className={reversed ? "lg:order-1" : ""}>
        <div className="aspect-[4/3] w-full rounded-2xl border border-foreground/10 bg-muted/40 p-4 lg:p-5">
          <Visual />
        </div>
      </div>
    </div>
  );
}

export function AgentsCapabilitiesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-24 lg:py-32 scroll-mt-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24 max-w-2xl">
          <span
            className={`inline-block font-mono text-xs uppercase tracking-widest text-muted-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Capabilities
          </span>
          <h2
            className={`mt-5 text-4xl lg:text-6xl font-display tracking-tight text-balance transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Meet Ora, your{" "}
            <span className="text-muted-foreground">procurement agent.</span>
          </h2>
          <p
            className={`mt-6 text-lg text-muted-foreground leading-relaxed text-pretty transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Ora works across the entire sourcing workflow, from the first
            search to the final spec sheet.
          </p>
        </div>

        {/* Capability rows */}
        <div className="flex flex-col gap-20 lg:gap-32">
          {CAPABILITIES.map((capability, index) => (
            <CapabilityRow
              key={capability.id}
              capability={capability}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
