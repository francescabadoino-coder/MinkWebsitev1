"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ScanLine } from "lucide-react";

type Detail = { label: string; value: string };

const DETAILS: Detail[] = [
  { label: "Material", value: "Zellige ceramic" },
  { label: "Finish", value: "Matte, handmade" },
  { label: "Dimension", value: '4" × 4"' },
  { label: "Color", value: "Terracotta clay" },
];

// Phases of the loop, in order, with durations (ms)
const PHASES = [
  { name: "frame", duration: 1400 },
  { name: "capture", duration: 600 },
  { name: "scan", duration: 1800 },
  { name: "detail", duration: 2600 },
  { name: "reset", duration: 700 },
] as const;

export function CaptureLoop() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = PHASES[phaseIndex].name;

  useEffect(() => {
    const id = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, PHASES[phaseIndex].duration);
    return () => clearTimeout(id);
  }, [phaseIndex]);

  const detailsVisible = phase === "detail";
  const scanning = phase === "scan";
  const flashing = phase === "capture";

  return (
    <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-foreground/10 bg-foreground/5">
      {/* Base photo */}
      <Image
        src="/agents/tile-capture.png"
        alt="An interior designer photographing tile samples so Ora can capture their details"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 40vw"
        priority
      />

      {/* Dark vignette for legibility of overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Viewfinder frame */}
      <div
        className={`absolute inset-6 rounded-lg transition-all duration-500 ${
          phase === "frame" || scanning
            ? "opacity-100 scale-100"
            : "opacity-0 scale-105"
        }`}
      >
        {/* Corner brackets */}
        {[
          "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg",
          "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
          "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
          "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
        ].map((pos) => (
          <span
            key={pos}
            className={`absolute h-7 w-7 border-white/90 ${pos}`}
          />
        ))}

        {/* REC indicator */}
        <div className="absolute left-1/2 top-3 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/90">
            {scanning ? "Analyzing" : "Capturing"}
          </span>
        </div>
      </div>

      {/* Shutter flash */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-150 ${
          flashing ? "opacity-80" : "opacity-0"
        }`}
      />

      {/* AI scan line sweeping down */}
      <div
        className={`absolute inset-x-0 pointer-events-none transition-opacity duration-300 ${
          scanning ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: 0,
          height: "100%",
        }}
      >
        <div
          className={`absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent/40 to-transparent ${
            scanning ? "animate-scan-sweep" : ""
          }`}
        />
        <div
          className={`absolute inset-x-0 h-0.5 bg-accent shadow-[0_0_12px_2px_var(--accent)] ${
            scanning ? "animate-scan-line" : ""
          }`}
        />
      </div>

      {/* Extracted detail tags */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end gap-2">
        <div
          className={`mb-1 flex items-center gap-2 transition-all duration-500 ${
            detailsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-accent-foreground">
            <ScanLine className="h-3 w-3" />
            <span className="font-mono text-[10px] uppercase tracking-widest">
              Ora captured
            </span>
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {DETAILS.map((d, i) => (
            <span
              key={d.label}
              className={`rounded-lg bg-black/55 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/10 transition-all duration-500 ${
                detailsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: detailsVisible ? `${i * 120}ms` : "0ms" }}
            >
              <span className="block font-mono text-[9px] uppercase tracking-widest text-white/50">
                {d.label}
              </span>
              <span className="block text-sm font-medium text-white">
                {d.value}
              </span>
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
