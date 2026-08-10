"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUp, Sparkles } from "lucide-react";

type Brief = {
  id: string;
  chip: string;
  query: string;
  product: {
    name: string;
    vendor: string;
    match: number;
    image: string;
  };
  materials: { src: string; label: string }[];
};

const BRIEFS: Brief[] = [
  {
    id: "walnut-sofa",
    chip: "Mid-century walnut sofa under $4k",
    query: "Mid-century walnut sofa under $4k",
    product: {
      name: "Halden Curved Sofa",
      vendor: "Kravet",
      match: 98,
      image: "/agents/products/halden-sofa.png",
    },
    materials: [
      { src: "/agents/materials/walnut-grain.png", label: "Walnut veneer" },
      { src: "/agents/materials/oat-linen.png", label: "Oat linen" },
      { src: "/agents/materials/slate-matte.png", label: "Matte slate" },
    ],
  },
  {
    id: "warm-minimal",
    chip: "Warm minimalist living room",
    query: "Warm minimalist living room",
    product: {
      name: "Pell Oak Console",
      vendor: "CB2 Trade",
      match: 91,
      image: "/agents/products/pell-console.png",
    },
    materials: [
      { src: "/agents/materials/cream-stone.png", label: "Cream stone" },
      { src: "/agents/materials/terracotta.png", label: "Terracotta" },
      { src: "/agents/materials/blush-clay.png", label: "Blush clay" },
    ],
  },
  {
    id: "boucle-chair",
    chip: "Bouclé lounge chair, cream",
    query: "Bouclé lounge chair, cream",
    product: {
      name: "Marlow Lounge Chair",
      vendor: "Brume",
      match: 95,
      image: "/agents/products/marlow-chair.png",
    },
    materials: [
      { src: "/agents/materials/cream-boucle.png", label: "Cream bouclé" },
      { src: "/agents/materials/sage-zellige.png", label: "Sage zellige" },
      { src: "/agents/materials/walnut-grain.png", label: "Walnut frame" },
    ],
  },
];

const TYPE_MS = 38;
const SETTLE_MS = 420;
const SEARCH_MS = 900;
const HOLD_MS = 3800;

type Phase = "typing" | "searching" | "resolved";

export function HeroBriefDemo({ isVisible }: { isVisible: boolean }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedLength, setTypedLength] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [reduced, setReduced] = useState(false);

  const brief = BRIEFS[index];
  const resolved = phase === "resolved";

  /* Respect reduced-motion: no typing, no looping — the end state, immediately. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!reduced) return;
    setTypedLength(BRIEFS[index].query.length);
    setPhase("resolved");
  }, [reduced, index]);

  /* Phase machine: type the brief → source → resolve → advance. */
  useEffect(() => {
    if (reduced || !isVisible) return;

    if (phase === "typing") {
      if (typedLength >= brief.query.length) {
        const t = setTimeout(() => setPhase("searching"), SETTLE_MS);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTypedLength((l) => l + 1), TYPE_MS);
      return () => clearTimeout(t);
    }

    if (phase === "searching") {
      const t = setTimeout(() => setPhase("resolved"), SEARCH_MS);
      return () => clearTimeout(t);
    }

    if (!autoRotate) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % BRIEFS.length);
      setTypedLength(0);
      setPhase("typing");
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [phase, typedLength, index, reduced, autoRotate, isVisible, brief.query.length]);

  /* Picking a brief hands control to the visitor and stops the carousel. */
  const selectBrief = useCallback(
    (i: number) => {
      setAutoRotate(false);
      setIndex(i);
      if (reduced) {
        setTypedLength(BRIEFS[i].query.length);
        setPhase("resolved");
      } else {
        setTypedLength(0);
        setPhase("typing");
      }
    },
    [reduced]
  );

  const typed = brief.query.slice(0, typedLength);

  return (
    <div className="w-full">
      <p className="sr-only">
        Demonstration: describe a brief in plain language, such as
        {` "${BRIEFS[0].query}"`}, and Ora returns matching products from trade
        vendors with a fit score and coordinating materials.
      </p>

      {/* Brief bar — the thing a designer actually types into */}
      <div
        aria-hidden="true"
        className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-foreground/15 bg-background/80 px-4 py-3.5 text-left shadow-lg shadow-foreground/5 backdrop-blur-md sm:rounded-full sm:px-5"
      >
        <Sparkles className="h-4 w-4 shrink-0 text-accent" />
        <p className="min-w-0 flex-1 truncate text-sm text-foreground sm:text-base">
          {typed}
          {!reduced && phase === "typing" && (
            <span className="ml-0.5 inline-block h-4 w-0.5 -translate-y-0.5 animate-pulse bg-accent align-middle" />
          )}
        </p>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
          <ArrowUp className="h-4 w-4 text-accent-foreground" />
        </span>
      </div>

      {/* Real, clickable briefs */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {BRIEFS.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => selectBrief(i)}
            aria-pressed={i === index}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
              i === index
                ? "border-accent/60 bg-accent/15 text-foreground"
                : "border-foreground/15 bg-background/60 text-muted-foreground backdrop-blur-sm hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {b.chip}
          </button>
        ))}
      </div>

      {/* The room, with the resolved match floating over it */}
      <figure className="relative mt-10 aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1 ring-foreground/10 shadow-2xl shadow-foreground/10 sm:aspect-[16/10]">
        <Image
          src="/agents/hero-interior.png"
          alt="A warm, naturally-lit living room with a curved boucle sofa, walnut console, and handmade ceramics"
          fill
          priority
          sizes="(min-width: 1024px) 56rem, 100vw"
          className="object-cover"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-4 left-4 right-4 rounded-2xl border border-foreground/10 bg-background/85 p-4 text-left shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:w-80"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent">
              <Sparkles className="h-3 w-3 text-accent-foreground" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
              {resolved ? "Top match" : "Sourcing across 150+ vendors"}
            </span>
            {!resolved && (
              <span className="flex items-center gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1 w-1 animate-pulse rounded-full bg-accent"
                    style={{ animationDelay: `${d * 160}ms` }}
                  />
                ))}
              </span>
            )}
          </div>

          {/* Product row */}
          <div className="mt-3 flex items-center gap-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-foreground/5">
              <Image
                src={brief.product.image}
                alt=""
                fill
                sizes="44px"
                className={`object-cover transition-opacity duration-500 ${
                  resolved ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
            <div className="min-w-0 flex-1">
              {resolved ? (
                <>
                  <p className="truncate text-sm text-foreground">
                    {brief.product.name}
                  </p>
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    {brief.product.vendor}
                  </p>
                </>
              ) : (
                <>
                  <span className="block h-3.5 w-32 animate-pulse rounded bg-foreground/10" />
                  <span className="mt-1.5 block h-3 w-20 animate-pulse rounded bg-foreground/10" />
                </>
              )}
            </div>
            <span
              className={`shrink-0 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-xs text-accent transition-opacity duration-500 ${
                resolved ? "opacity-100" : "opacity-0"
              }`}
            >
              {brief.product.match}%
            </span>
          </div>

          {/* Coordinating materials */}
          <div className="mt-3 flex items-center gap-2">
            {brief.materials.map((m, i) => (
              <span
                key={m.src}
                title={m.label}
                className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-lg ring-1 ring-foreground/10 transition-all duration-500 ${
                  resolved
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1"
                }`}
                style={{ transitionDelay: resolved ? `${i * 90}ms` : "0ms" }}
              >
                <Image
                  src={m.src}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
            ))}
            <span
              className={`ml-1 font-mono text-[10px] leading-tight text-muted-foreground transition-opacity duration-500 ${
                resolved ? "opacity-100" : "opacity-0"
              }`}
            >
              {brief.materials.length} materials
              <br />
              sourced
            </span>
          </div>
        </div>
      </figure>
    </div>
  );
}
