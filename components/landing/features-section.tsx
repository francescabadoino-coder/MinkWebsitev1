"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Check,
  ArrowRight,
  FileText,
  Receipt,
  LayoutGrid,
  Download,
  Package,
  Truck,
  MapPin,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Feature 1 — 2D Visualization: floorplan → render reveal slider    */
/* ---------------------------------------------------------------- */
function VisualizationVisual() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Auto-sweep until the user takes over
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.015;
      setPos(50 + Math.sin(t) * 35);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [auto]);

  const move = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, next)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-foreground/10 select-none cursor-ew-resize"
      onPointerDown={(e) => {
        dragging.current = true;
        setAuto(false);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      {/* Render (after) */}
      <Image
        src="/features/render.png"
        alt="Photorealistic render of the finished living room"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {/* Floorplan (before) clipped to the slider */}
      <div
        className="absolute inset-0 bg-background"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src="/features/floorplan.png"
          alt="2D architectural floor plan"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-mono text-foreground backdrop-blur-sm">
        Floorplan
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-foreground/90 px-3 py-1 text-xs font-mono text-background backdrop-blur-sm">
        Render
      </span>

      {/* Handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-background"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-lg">
          <ArrowRight className="h-3.5 w-3.5 -ml-0.5 text-foreground" />
          <ArrowRight className="h-3.5 w-3.5 -mr-0.5 rotate-180 text-foreground" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Feature 2 — Agentic AI (Ora): pipeline of agent steps             */
/* ---------------------------------------------------------------- */
const AURA_PICKS = [
  { img: "/features/product-sofa.png", name: "Halden Curved Sofa", brand: "Brume", price: "$2,480" },
  { img: "/features/product-chair.png", name: "Marlow Boucle Chair", brand: "Karvet", price: "$1,240" },
  { img: "/features/product-table.png", name: "Pell Oak Coffee Table", brand: "CB2", price: "$890" },
  { img: "/features/product-lamp.png", name: "Arc Brass Floor Lamp", brand: "Brume", price: "$460" },
];

function AgentVisual() {
  const moodImages = [
    "/features/mood-1.png",
    "/features/mood-2.png",
    "/features/mood-3.png",
  ];
  const steps = [
    "Capturing design intent",
    "Sourcing from the brands you love",
    "Showcasing results",
  ];
  // Phases (slow, one every 3.4s):
  // 0 upload · 1-3 Ora working · 4 designer picking items · 5 generating spec doc
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 6), 3400);
    return () => clearInterval(id);
  }, []);

  const picking = active === 4;
  const specDoc = active === 5;
  const collapsedTop = active >= 4;

  return (
    <div className="flex aspect-[4/3] w-full flex-col justify-center gap-4 rounded-2xl border border-foreground/10 bg-muted/40 p-6 lg:p-8">
      {/* Designer uploads three mood images — collapses away once picking begins */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          collapsedTop ? "max-h-0 opacity-0" : "max-h-56 opacity-100"
        }`}
      >
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Mood board uploaded
        </p>
        <div className="flex gap-2">
          {moodImages.map((src, i) => (
            <span
              key={src}
              className={`relative aspect-square flex-1 overflow-hidden rounded-lg ring-1 ring-foreground/10 transition-all duration-500 ${
                active === 0 ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <Image
                src={src}
                alt={`Interior design mood board reference ${i + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </span>
          ))}
        </div>
      </div>

      {/* Bottom region cross-fades between working steps, picking, and spec doc */}
      <div className="relative flex-1">
        {/* Ora's working steps */}
        <div
          className={`absolute inset-0 flex flex-col gap-2.5 transition-opacity duration-500 ${
            collapsedTop ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-mono text-sm text-foreground">Ora is working…</span>
          </div>
          {steps.map((step, i) => {
            const done = active > i + 1;
            const running = active === i + 1;
            return (
              <div
                key={step}
                className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 transition-all duration-500 ${
                  done
                    ? "border-foreground/15 bg-background"
                    : running
                      ? "border-accent/40 bg-background"
                      : "border-foreground/5 bg-transparent opacity-50"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                    done ? "bg-accent text-accent-foreground" : "border border-foreground/20"
                  }`}
                >
                  {done ? (
                    <Check className="h-3 w-3" />
                  ) : running ? (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                  ) : null}
                </span>
                <span className="text-sm text-foreground">{step}</span>
              </div>
            );
          })}
        </div>

        {/* Picking — the designer selects the pieces Ora found */}
        <div
          className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${
            picking ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-sm text-foreground">Select pieces</span>
            <span className="font-mono text-xs text-muted-foreground">
              {AURA_PICKS.length} found
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            {AURA_PICKS.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center gap-3 rounded-lg border border-foreground/10 bg-background p-1.5"
              >
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md ring-1 ring-foreground/10">
                  <Image src={p.img} alt={p.name} fill className="object-cover" sizes="40px" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {p.name}
                  </span>
                  <span className="block font-mono text-xs text-muted-foreground">{p.brand}</span>
                </span>
                {/* Checkbox fills in one-by-one as the designer picks */}
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-300 ${
                    picking
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-foreground/25"
                  }`}
                  style={{ transitionDelay: picking ? `${400 + i * 450}ms` : "0ms" }}
                >
                  <Check className="h-3 w-3" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Spec doc — generated from the selected pieces */}
        <div
          className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${
            specDoc ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <FileText className="h-4 w-4" />
            </span>
            <span className="font-mono text-sm text-foreground">Spec doc generated</span>
          </div>
          <div className="flex flex-1 flex-col rounded-xl border border-foreground/10 bg-background p-4">
            <p className="text-sm font-semibold text-foreground">Birchwell Project — Spec Sheet</p>
            <p className="mb-3 font-mono text-xs text-muted-foreground">
              {AURA_PICKS.length} items · prepared by Ora
            </p>
            <div className="flex flex-col gap-1.5">
              {AURA_PICKS.map((p, i) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between border-b border-foreground/5 pb-1.5 text-xs transition-all duration-500"
                  style={{
                    transitionDelay: specDoc ? `${200 + i * 180}ms` : "0ms",
                    opacity: specDoc ? 1 : 0,
                    transform: specDoc ? "translateY(0)" : "translateY(6px)",
                  }}
                >
                  <span className="truncate text-foreground">{p.name}</span>
                  <span className="ml-2 shrink-0 font-mono text-muted-foreground">{p.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between pt-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Total
              </span>
              <span className="font-mono text-sm font-semibold text-foreground">$5,070</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Feature 3 — Product curation: kitchen before → after reveal slider */
/* ---------------------------------------------------------------- */
function CurationVisual() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Auto-sweep until the user takes over
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.015;
      setPos(50 + Math.sin(t) * 35);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [auto]);

  const move = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, next)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-foreground/10 select-none cursor-ew-resize"
      onPointerDown={(e) => {
        dragging.current = true;
        setAuto(false);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      {/* After (styled with AI-picked products) */}
      <Image
        src="/features/kitchen-after.png"
        alt="The same kitchen redesigned with products curated by Ora"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {/* Before (plain room) clipped to the slider */}
      <div
        className="absolute inset-0 bg-background"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src="/features/kitchen-before.png"
          alt="A plain, builder-grade kitchen before styling"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-mono text-foreground backdrop-blur-sm">
        Before
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-foreground/90 px-3 py-1 text-xs font-mono text-background backdrop-blur-sm">
        Curated by Ora
      </span>

      {/* Handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-background"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-lg">
          <ArrowRight className="h-3.5 w-3.5 -ml-0.5 text-foreground" />
          <ArrowRight className="h-3.5 w-3.5 -mr-0.5 rotate-180 text-foreground" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Feature 4 — One-click exports: specs, invoices, visualizations    */
/* ---------------------------------------------------------------- */
const EXPORTS = [
  { label: "Spec Document", meta: "PDF · 12 pages", Icon: FileText },
  { label: "Client Invoice", meta: "PDF · itemized", Icon: Receipt },
  { label: "2D Visualization", meta: "PNG · high-res", Icon: LayoutGrid },
];

function ExportsVisual() {
  const [active, setActive] = useState(0);
  const [exported, setExported] = useState<boolean[]>([false, false, false]);
  const [paused, setPaused] = useState(false);

  // Loop: export each file strictly in order (1 → 2 → 3), then reset
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setExported((prev) => {
        const nextIndex = prev.findIndex((done) => !done);
        if (nextIndex === -1) {
          // All exported — start over
          setActive(0);
          return [false, false, false];
        }
        const next = [...prev];
        next[nextIndex] = true;
        // Highlight the following file in sequence (if any)
        setActive(Math.min(nextIndex + 1, EXPORTS.length - 1));
        return next;
      });
    }, 1300);
    return () => clearInterval(id);
  }, [paused]);

  const trigger = (i: number) => {
    setActive(i);
    setExported((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const doneCount = exported.filter(Boolean).length;

  return (
    <div
      className="flex aspect-[4/3] w-full flex-col justify-center gap-3 rounded-2xl border border-foreground/10 bg-muted/40 p-6 lg:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-sm text-foreground">Export project files</span>
        <span className="font-mono text-xs text-muted-foreground">
          {doneCount}/{EXPORTS.length} ready
        </span>
      </div>

      {EXPORTS.map((item, i) => {
        const isDone = exported[i];
        const isActive = active === i && !isDone;
        const { Icon } = item;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => trigger(i)}
            aria-label={`Export ${item.label}`}
            className={`flex items-center gap-4 rounded-xl border bg-background px-4 py-3 text-left transition-all duration-500 ${
              isActive ? "border-accent/50 shadow-sm" : "border-foreground/10"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                isDone ? "bg-accent text-accent-foreground" : "bg-foreground/5 text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-foreground">{item.label}</p>
              <p className="font-mono text-xs text-muted-foreground">{item.meta}</p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${
                isDone ? "bg-accent text-accent-foreground" : "bg-foreground text-background"
              }`}
            >
              {isDone ? (
                <>
                  Exported <Check className="h-3 w-3" />
                </>
              ) : (
                <>
                  Export <Download className="h-3 w-3" />
                </>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Feature 5 — Order tracking (Pro): every shipment in one place     */
/* ---------------------------------------------------------------- */
const ORDERS = [
  { name: "Halden Curved Sofa", vendor: "Brume", stage: 3 },
  { name: "Marlow Boucle Chair", vendor: "Karvet", stage: 2 },
  { name: "Pell Oak Coffee Table", vendor: "CB2", stage: 1 },
  { name: "Arc Brass Floor Lamp", vendor: "Brume", stage: 0 },
];

const STAGES = [
  { label: "Ordered", Icon: Package },
  { label: "In transit", Icon: Truck },
  { label: "Out for delivery", Icon: MapPin },
  { label: "Delivered", Icon: Check },
];

function OrderTrackingVisual() {
  // Slowly advance a pulse across the rows so the board feels live
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % ORDERS.length), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex aspect-[4/3] w-full flex-col gap-3 rounded-2xl border border-foreground/10 bg-muted/40 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-foreground">Order tracker</span>
        <span className="rounded-full bg-foreground px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-background">
          Pro
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2">
        {ORDERS.map((order, i) => {
          const stage = STAGES[order.stage];
          const live = tick === i;
          const delivered = order.stage === STAGES.length - 1;
          return (
            <div
              key={order.name}
              className={`flex flex-col gap-2 rounded-xl border bg-background px-4 py-3 transition-all duration-500 ${
                live ? "border-accent/50 shadow-sm" : "border-foreground/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    delivered
                      ? "bg-accent text-accent-foreground"
                      : "bg-foreground/5 text-foreground"
                  }`}
                >
                  <stage.Icon className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-foreground">{order.name}</span>
                  <span className="block font-mono text-xs text-muted-foreground">
                    {order.vendor} · {stage.label}
                  </span>
                </span>
              </div>
              {/* Four-stage progress rail */}
              <div className="flex items-center gap-1">
                {STAGES.map((s, si) => (
                  <span
                    key={s.label}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      si <= order.stage ? "bg-accent" : "bg-foreground/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

const features = [
  {
    number: "01",
    eyebrow: "2D Visualization",
    title: "Turn floorplans into living spaces.",
    description:
      "Upload your floorplans and watch Ora transform them into photorealistic visualizations, so you and your clients can see the finished room before a single product is ordered.",
    Visual: VisualizationVisual,
  },
  {
    number: "02",
    eyebrow: "Agentic AI",
    title: "Meet Ora, your procurement agent.",
    description:
      "Upload a few mood images and Ora captures your design intent, sources products from the brands you love, and showcases the results, automating the busywork end to end.",
    Visual: AgentVisual,
  },
  {
    number: "03",
    eyebrow: "Product Curation",
    title: "Fill every room with the right pieces.",
    description:
      "Ora curates furniture, lighting, and decor from the brands you love and places them in your space, turning an empty room into a finished design you can drag to compare.",
    Visual: CurationVisual,
  },
  {
    number: "04",
    eyebrow: "One-Click Exports",
    title: "One-click exports.",
    description:
      "Export polished spec documents, client invoices, and 2D visualizations in a single click, all client-ready and on brand.",
    Visual: ExportsVisual,
  },
  {
    number: "05",
    eyebrow: "Order Tracking",
    title: "Track all your orders in one place.",
    description:
      "Subscribe to Pro and every order across every vendor lands on one board, from confirmation to delivery, so you always know what has shipped and what is still outstanding.",
    Visual: OrderTrackingVisual,
  },
];

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const reversed = index % 2 === 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 },
    );
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  const { Visual } = feature;

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
          <span className="font-mono">{feature.number}</span>
          <span className="w-8 h-px bg-foreground/30" />
          {feature.eyebrow}
        </span>
        <h3 className="text-3xl lg:text-4xl font-display tracking-tight text-balance mb-5">
          {feature.title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
          {feature.description}
        </p>
      </div>

      {/* Visual */}
      <div className={reversed ? "lg:order-1" : ""}>
        <Visual />
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24 max-w-2xl">
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight text-balance transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            One platform for the
            <br />
            <span className="text-muted-foreground">work behind the design.</span>
          </h2>
        </div>

        {/* Feature rows */}
        <div className="flex flex-col gap-20 lg:gap-32">
          {features.map((feature, index) => (
            <FeatureRow key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
