"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ROOM_TILES,
  getProductByLabel,
  type ProofTile,
} from "./product-proof-tiles";

const ROOM_SIZES = "(min-width: 1024px) 700px, 100vw";
const THUMB_SIZES = "120px";
const DETAIL_SIZES = "(min-width: 1024px) 420px, 100vw";

/** Placeholder shown for any tile whose image src is still null. */
function Pending() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden>
      <span className="px-4 text-center text-xs text-muted-foreground">
        Image pending
      </span>
    </div>
  );
}

/**
 * Interactive "shop the room" viewer. A room selector switches the large
 * render; pins on the render reveal the exact product Ora sourced in a synced
 * detail panel. Rooms with no catalogued pieces still display, with a gentle
 * empty state so the proof set stays complete.
 */
export function ShoppableRoom() {
  const [roomIndex, setRoomIndex] = useState(0);
  const room = ROOM_TILES[roomIndex];
  const hotspots = room.hotspots ?? [];

  // Default the detail panel to the room's first pinned product.
  const [activeProduct, setActiveProduct] = useState<string | null>(
    hotspots[0]?.product ?? null,
  );

  const product = useMemo(
    () => (activeProduct ? getProductByLabel(activeProduct) : undefined),
    [activeProduct],
  );

  const selectRoom = (index: number) => {
    setRoomIndex(index);
    setActiveProduct(ROOM_TILES[index].hotspots?.[0]?.product ?? null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      {/* Room + pins */}
      <div className="lg:col-span-3">
        <div className="relative overflow-hidden rounded-2xl aspect-[3/2] bg-muted">
          {room.src ? (
            <Image
              key={room.src}
              src={room.src}
              alt={room.alt}
              fill
              sizes={ROOM_SIZES}
              className="object-cover"
              priority={roomIndex === 0}
            />
          ) : (
            <Pending />
          )}

          {hotspots.map((hs) => {
            const isActive = hs.product === activeProduct;
            return (
              <button
                key={hs.product}
                type="button"
                onClick={() => setActiveProduct(hs.product)}
                onMouseEnter={() => setActiveProduct(hs.product)}
                onFocus={() => setActiveProduct(hs.product)}
                aria-label={`Show ${hs.product}`}
                aria-pressed={isActive}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  {!isActive && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 motion-safe:animate-ping" />
                  )}
                  <span
                    className={`relative h-4 w-4 rounded-full border-2 border-background shadow-md transition-transform duration-200 ${
                      isActive
                        ? "scale-110 bg-accent"
                        : "bg-foreground/80 hover:scale-110"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Room selector */}
        <div
          className="mt-4 flex gap-3"
          role="tablist"
          aria-label="Choose a room"
        >
          {ROOM_TILES.map((r, i) => {
            const selected = i === roomIndex;
            return (
              <button
                key={r.label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectRoom(i)}
                className={`group relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  selected
                    ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {r.src ? (
                  <Image
                    src={r.src}
                    alt=""
                    fill
                    sizes={THUMB_SIZES}
                    className="object-cover"
                  />
                ) : (
                  <Pending />
                )}
                <span className="sr-only">{r.label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {hotspots.length > 0
            ? "Tap a pin to see the exact piece Ora sourced."
            : `${room.label} — pieces coming to the catalog.`}
        </p>
      </div>

      {/* Synced detail panel */}
      <div className="lg:col-span-2" aria-live="polite">
        {product ? (
          <ProductDetail product={product} />
        ) : (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-foreground/20 p-8 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Every piece in a Mink render is a real, sourceable product. This
              room&apos;s pieces are being added to the catalog.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductDetail({ product }: { product: ProofTile }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-foreground/10 bg-card p-6 lg:p-8">
      <div className="relative aspect-square w-full">
        {product.src ? (
          <Image
            src={product.src}
            alt={product.alt}
            fill
            sizes={DETAIL_SIZES}
            className="object-contain"
          />
        ) : (
          <Pending />
        )}
      </div>
      <div className="mt-6">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Sourced by Ora
        </span>
        <h4 className="mt-2 font-display text-2xl tracking-tight text-balance lg:text-3xl">
          {product.label}
        </h4>
        {product.vendor && (
          <p className="mt-1 text-base text-muted-foreground">
            {product.vendor}
          </p>
        )}
      </div>
    </div>
  );
}
