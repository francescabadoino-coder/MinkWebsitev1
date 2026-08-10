"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Loader2, Sparkles } from "lucide-react";

type Tile = {
  id: string;
  name: string;
  img: string;
};

type Match = {
  name: string;
  vendor: string;
  price: string;
  img: string;
  similarity: string;
};

// The grid of samples the designer is browsing — real macro material photos.
const TILES: Tile[] = [
  { id: "a", name: "Sage Zellige", img: "/agents/materials/sage-zellige.png" },
  { id: "b", name: "Terracotta", img: "/agents/materials/terracotta.png" },
  { id: "c", name: "Ocean Glass", img: "/agents/materials/ocean-glass.png" },
  { id: "d", name: "Cream Stone", img: "/agents/materials/cream-stone.png" },
  { id: "e", name: "Slate Matte", img: "/agents/materials/slate-matte.png" },
  { id: "f", name: "Blush Clay", img: "/agents/materials/blush-clay.png" },
];

// The selected tile (terracotta).
const SELECTED = TILES[1];

// Procurement returns SIMILAR tiles — same terracotta family, not identical.
const MATCHES: Match[] = [
  {
    name: "Handmade Terracotta",
    vendor: "Zia Tile",
    price: "$38/sf",
    similarity: "96% match",
    img: "/agents/materials/match-zia.png",
  },
  {
    name: "Marrakesh Clay",
    vendor: "Clé Tile",
    price: "$42/sf",
    similarity: "92% match",
    img: "/agents/materials/match-cle.png",
  },
  {
    name: "Tuscan Cotto",
    vendor: "Mosaic House",
    price: "$35/sf",
    similarity: "89% match",
    img: "/agents/materials/match-mosaic.png",
  },
];

const PHASES = [
  { name: "browse", duration: 2200 },
  { name: "zoom", duration: 1600 },
  { name: "analyzing", duration: 1800 },
  { name: "matches", duration: 3200 },
  { name: "reset", duration: 800 },
] as const;

export function PlatformLoop() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [tapped, setTapped] = useState(false);
  const phase = PHASES[phaseIndex].name;

  useEffect(() => {
    const id = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, PHASES[phaseIndex].duration);
    return () => clearTimeout(id);
  }, [phaseIndex]);

  // UI-driven selection — the highlighted tile is chosen mid-browse.
  useEffect(() => {
    setTapped(false);
    if (phase === "browse") {
      const id = setTimeout(() => setTapped(true), 1400);
      return () => clearTimeout(id);
    }
  }, [phase]);

  const browsing = phase === "browse";
  const zooming = phase === "zoom";
  const analyzing = phase === "analyzing";
  const showMatches = phase === "matches";
  const zoomed = zooming || analyzing || showMatches;

  return (
    <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-foreground/10 bg-foreground/[0.03]">
      <div className="absolute inset-0 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-md bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-foreground">
              Ora
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Live
            </span>
          </span>
        </div>

        {/* Body */}
        <div className="relative flex-1 overflow-hidden p-5">
          {/* Sample grid (browse) */}
          <div
            className={`grid grid-cols-3 gap-2.5 transition-all duration-500 ${
              browsing ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {TILES.map((t) => {
              const isSelected = t.id === SELECTED.id;
              return (
                <div
                  key={t.id}
                  className={`relative aspect-square overflow-hidden rounded-lg ring-1 transition-all duration-300 ${
                    isSelected && tapped
                      ? "ring-2 ring-accent scale-[1.04]"
                      : "ring-foreground/10"
                  }`}
                >
                  <Image
                    src={t.img || "/placeholder.svg"}
                    alt={t.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  {isSelected && tapped && (
                    <>
                      <span className="absolute inset-0 ring-2 ring-inset ring-accent rounded-lg" />
                      <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
                        <Check className="h-3 w-3" />
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Zoomed-in selected tile (zoom + analyzing) */}
          <div
            className={`absolute inset-5 transition-all duration-500 ${
              zoomed
                ? "opacity-100 scale-100"
                : "opacity-0 scale-150 pointer-events-none"
            }`}
          >
            <div
              className="relative mx-auto aspect-square w-3/4 overflow-hidden rounded-xl ring-1 ring-foreground/10"
            >
              <Image
                src={SELECTED.img || "/placeholder.svg"}
                alt={SELECTED.name}
                fill
                sizes="240px"
                className="object-cover"
              />

              {/* Scan sweep while analyzing */}
              <div
                className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${
                  analyzing ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className={`absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-accent/40 to-transparent ${
                    analyzing ? "animate-scan-sweep" : ""
                  }`}
                />
                <div
                  className={`absolute inset-x-0 h-0.5 bg-accent shadow-[0_0_12px_2px_var(--accent)] ${
                    analyzing ? "animate-scan-line" : ""
                  }`}
                />
              </div>
            </div>

            {/* Status line */}
            <div className="mt-4 flex items-center justify-center gap-2 text-center">
              {zooming && (
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {SELECTED.name}
                </span>
              )}
              {analyzing && (
                <>
                  <Loader2 className="h-3.5 w-3.5 text-accent animate-spin" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    Finding similar materials
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Vendor matches — SIMILAR tiles, sliding up */}
          <div
            className={`absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-foreground/10 bg-background p-4 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.25)] transition-transform duration-500 ${
              showMatches ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                3 similar from trade vendors
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {MATCHES.map((m, i) => (
                <div
                  key={m.name}
                  className={`flex items-center justify-between rounded-lg bg-foreground/[0.04] px-3 py-2 ring-1 ring-foreground/10 transition-all duration-500 ${
                    showMatches
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-3"
                  }`}
                  style={{
                    transitionDelay: showMatches ? `${150 + i * 130}ms` : "0ms",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md ring-1 ring-foreground/10">
                      <Image
                        src={m.img || "/placeholder.svg"}
                        alt={m.name}
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </span>
                    <div>
                      <span className="block text-xs font-medium text-foreground">
                        {m.name}
                      </span>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        {m.vendor}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-medium text-foreground">
                      {m.price}
                    </span>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-accent">
                      {m.similarity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
