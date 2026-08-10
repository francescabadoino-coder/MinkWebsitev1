"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Heart, Check, Star, ArrowRight, Trash2, Truck, Package } from "lucide-react";

/* ---------------------------------------------------------------- */
 /* Demo 1 — Vendor network: source across 260+ trade showrooms        */
/* ---------------------------------------------------------------- */
const RECOMMENDED = [
  { name: "Halden Curved Sofa", vendor: "Kravet", match: 98 },
  { name: "Marlow Linen Chair", vendor: "Brume", match: 95 },
  { name: "Pell Oak Console", vendor: "J. Garner Home", match: 91 },
  { name: "Sona Boucle Ottoman", vendor: "Pindler", match: 88 },
];

function NetworkDemo() {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    setRevealed(0);
    const id = setInterval(
      () => setRevealed((r) => (r >= RECOMMENDED.length ? 0 : r + 1)),
      900,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Search bar */}
      <div className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-background px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="text-sm text-foreground">Mid-century lounge seating, warm tones</span>
        <span className="ml-auto shrink-0 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent">
          260+ showrooms
        </span>
      </div>

      {/* Recommendations */}
      <div className="flex flex-1 flex-col gap-2.5">
        {RECOMMENDED.map((item, i) => {
          const on = i < revealed;
          return (
            <div
              key={item.name}
              className={`flex items-center gap-3 rounded-xl border bg-background px-4 py-3 transition-all duration-500 ${
                on ? "border-foreground/10 opacity-100 translate-y-0" : "border-foreground/5 opacity-0 translate-y-2"
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground/5 font-mono text-xs text-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{item.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{item.vendor}</p>
              </div>
              <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent">
                {item.match}% match
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Demo 2 — Favorite showrooms: Ora prioritizes your picks           */
/* ---------------------------------------------------------------- */
const SHOWROOMS = [
  "Kravet",
  "Schumacher",
  "Holland & Sherry",
  "Pindler",
  "The Shade Store",
];

function ShowroomsDemo() {
  const [favorites, setFavorites] = useState<boolean[]>([true, false, true, false, false]);

  const toggle = (i: number) =>
    setFavorites((prev) => prev.map((f, idx) => (idx === i ? !f : f)));

  // Sort favorites to the top so the prioritization is visible
  const ordered = SHOWROOMS.map((name, i) => ({ name, i, fav: favorites[i] })).sort(
    (a, b) => Number(b.fav) - Number(a.fav),
  );
  const favCount = favorites.filter(Boolean).length;

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-foreground">Your showrooms</span>
        <span className="font-mono text-xs text-muted-foreground">{favCount} prioritized</span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        {ordered.map(({ name, i, fav }) => (
          <button
            key={name}
            type="button"
            onClick={() => toggle(i)}
            aria-label={`${fav ? "Remove" : "Add"} ${name} ${fav ? "from" : "to"} favorites`}
            className={`flex items-center gap-3 rounded-xl border bg-background px-4 py-3 text-left transition-all duration-500 ${
              fav ? "border-accent/40 shadow-sm" : "border-foreground/10"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                fav ? "bg-accent text-accent-foreground" : "bg-foreground/5 text-foreground"
              }`}
            >
              <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
            </span>
            <span className="flex-1 truncate text-sm text-foreground">{name}</span>
            {fav && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent">
                <Star className="h-3 w-3 fill-current" /> Prioritized
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Tap a showroom and Ora bumps it to the top of every recommendation.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Demo 3 — Curate: remove vendors you don't do business with        */
/* ---------------------------------------------------------------- */
const VENDOR_LIST = ["Kravet", "Brume", "Pindler", "J. Garner Home", "Schumacher"];

function RemoveVendorsDemo() {
  // true = still in your network, false = removed
  const [kept, setKept] = useState<boolean[]>([true, true, true, true, true]);
  const toggle = (i: number) =>
    setKept((prev) => prev.map((k, idx) => (idx === i ? !k : k)));

  const keptCount = kept.filter(Boolean).length;

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-foreground">Your vendors</span>
        <span className="font-mono text-xs text-muted-foreground">{keptCount} active</span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        {VENDOR_LIST.map((name, i) => {
          const on = kept[i];
          return (
            <div
              key={name}
              className={`flex items-center gap-3 rounded-xl border bg-background px-4 py-3 transition-all duration-500 ${
                on ? "border-foreground/10" : "border-foreground/5 opacity-40"
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/5 font-display text-sm text-foreground">
                {name.charAt(0)}
              </span>
              <span
                className={`flex-1 truncate text-sm text-foreground ${
                  on ? "" : "line-through"
                }`}
              >
                {name}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => toggle(i)}
                aria-label={`${on ? "Remove" : "Add"} ${name}`}
                className={`relative flex h-6 w-10 shrink-0 items-center rounded-full transition-colors duration-300 ${
                  on ? "bg-accent" : "bg-foreground/15"
                }`}
              >
                <span
                  className={`absolute h-4 w-4 rounded-full bg-background shadow-sm transition-all duration-300 ${
                    on ? "left-5" : "left-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Toggle off the vendors you don&apos;t do business with, and Ora stops recommending them.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Demo 4 — Track: view every delivery in one place                 */
/* ---------------------------------------------------------------- */
const DELIVERIES = [
  { item: "Halden Curved Sofa", vendor: "Kravet", status: "Delivered", eta: "Apr 2", done: true },
  { item: "Marlow Linen Chair", vendor: "Brume", status: "Out for delivery", eta: "Today", done: false },
  { item: "Pell Oak Console", vendor: "J. Garner Home", status: "In transit", eta: "Apr 9", done: false },
];

function DeliveriesDemo() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % DELIVERIES.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-foreground">Deliveries</span>
        <span className="font-mono text-xs text-muted-foreground">{DELIVERIES.length} tracked</span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        {DELIVERIES.map((d, i) => {
          const on = active === i;
          return (
            <div
              key={d.item}
              className={`flex items-center gap-3 rounded-xl border bg-background px-4 py-3 transition-all duration-500 ${
                on ? "border-accent/40 shadow-sm" : "border-foreground/10"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  d.done ? "bg-accent text-accent-foreground" : "bg-foreground/5 text-foreground"
                }`}
              >
                {d.done ? <Package className="h-4 w-4" /> : <Truck className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{d.item}</p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {d.vendor} · {d.status}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{d.eta}</span>
            </div>
          );
        })}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Track every shipment across all your vendors in one place.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- */

const STEPS = [
  {
    id: "network",
    Icon: Search,
    title: "Hundreds of trade brands across 260+ showrooms across the U.S.",
    description:
      "Upload your vendors and let Ora surface the right products from hundreds of trade brands across 260+ showrooms nationwide, matched to your brief in seconds.",
    Demo: NetworkDemo,
  },
  {
    id: "showrooms",
    Icon: Heart,
    title: "Prioritize your favorite showrooms.",
    description:
      "Build a list of the showrooms you love, and Ora will prioritize products from those vendors in every recommendation it makes.",
    Demo: ShowroomsDemo,
  },
  {
    id: "remove",
    Icon: Trash2,
    title: "Remove vendors you don't do business with.",
    description:
      "Prune your network in one place. Drop any vendor you no longer work with and Ora stops surfacing their products in recommendations.",
    Demo: RemoveVendorsDemo,
  },
  {
    id: "deliveries",
    Icon: Truck,
    title: "View deliveries all in one place.",
    description:
      "Track every shipment across all your vendors from a single view, from in transit to out for delivery to delivered.",
    Demo: DeliveriesDemo,
  },
];

export function VendorNetworkSection() {
  const [active, setActive] = useState(0);
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

  const ActiveDemo = STEPS[active].Demo;

  return (
    <section id="vendors" ref={sectionRef} className="relative py-24 lg:py-32 scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20 max-w-2xl">
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight text-balance transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Your vendors,
            <br />
            <span className="text-muted-foreground">working in your favor.</span>
          </h2>
        </div>

        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Selectable value props */}
          <div className="flex flex-col gap-3">
            {STEPS.map((step, i) => {
              const on = active === i;
              const { Icon } = step;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`group rounded-2xl border p-6 text-left transition-all duration-300 ${
                    on
                      ? "border-foreground/15 bg-muted/40 shadow-sm"
                      : "border-foreground/10 hover:border-foreground/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        on ? "bg-accent text-accent-foreground" : "bg-foreground/5 text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-display tracking-tight text-foreground">
                        {step.title}
                      </h3>
                      <div
                        className={`grid transition-all duration-300 ${
                          on ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <p className="overflow-hidden text-base text-muted-foreground leading-relaxed text-pretty">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                        on ? "text-accent translate-x-0 opacity-100" : "text-muted-foreground -translate-x-2 opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive demo panel */}
          <div className="rounded-2xl border border-foreground/10 bg-muted/40 p-6 lg:p-8 min-h-[420px] flex">
            <div key={active} className="flex w-full animate-in fade-in duration-500">
              <ActiveDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
