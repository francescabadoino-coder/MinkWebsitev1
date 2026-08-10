import Image from "next/image";
import {
  CAROUSEL_DESIGNS,
  CAROUSEL_ITEMS,
  type CarouselItem,
} from "./showcase-carousel-items";

type Kind = "design" | "item";
type Card = CarouselItem & { kind: Kind };

/**
 * Interleave designs and sourced items into one sequence so a single row reads
 * as varied — room, product, room, product — rather than grouped.
 */
function buildSequence(): Card[] {
  const designs: Card[] = CAROUSEL_DESIGNS.map((d) => ({ ...d, kind: "design" }));
  const items: Card[] = CAROUSEL_ITEMS.map((i) => ({ ...i, kind: "item" }));
  const out: Card[] = [];
  const max = Math.max(designs.length, items.length);
  for (let i = 0; i < max; i++) {
    if (designs[i]) out.push(designs[i]);
    if (items[i]) out.push(items[i]);
  }
  return out;
}

const SEQUENCE = buildSequence();

/**
 * A single card. Every card shares the same height; landscape room designs are
 * wider and silhouetted items are square, so widths vary naturally and the row
 * feels editorial rather than uniform.
 */
function ShowcaseCard({ card }: { card: Card }) {
  const isDesign = card.kind === "design";
  return (
    <figure className="shrink-0">
      <div
        className={`relative h-52 overflow-hidden rounded-2xl shadow-sm lg:h-64 ${
          isDesign ? "aspect-[3/2] bg-muted" : "aspect-square bg-card"
        }`}
      >
        <Image
          src={card.src}
          alt={card.alt}
          fill
          loading="lazy"
          sizes={isDesign ? "384px" : "256px"}
          className={isDesign ? "object-cover" : "object-contain p-6"}
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-display text-base tracking-tight text-foreground lg:text-lg">
          {card.label}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {card.meta}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * A single continuously looping row mixing room designs and sourced items. The
 * track duplicates its content twice because the shared `.marquee` keyframes
 * translate by -50%, making the loop seam invisible. Hovering pauses it, and
 * the animation is disabled under prefers-reduced-motion (see globals.css).
 * Content is placeholder (see `showcase-carousel-items.ts`).
 */
export function ShowcaseCarousel() {
  return (
    <section
      aria-labelledby="showcase-carousel-heading"
      className="relative overflow-hidden py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          In the wild
          <span className="h-px w-8 bg-foreground/30" />
        </span>
        <h2
          id="showcase-carousel-heading"
          className="mt-5 max-w-2xl font-display text-3xl tracking-tight text-balance lg:text-5xl"
        >
          A rolling look at rooms designed and pieces sourced.
        </h2>
      </div>

      <div className="group relative mt-12 lg:mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent lg:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent lg:w-32" />
        <div className="marquee flex w-max gap-6 group-hover:[animation-play-state:paused] lg:gap-8">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex gap-6 lg:gap-8"
              aria-hidden={copy === 1}
            >
              {SEQUENCE.map((card) => (
                <ShowcaseCard key={`${card.label}-${copy}`} card={card} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
