import Image from "next/image";
import {
  CAROUSEL_DESIGNS,
  CAROUSEL_ITEMS,
  type CarouselItem,
} from "./showcase-carousel-items";

/** Design cards are landscape room photography. */
function DesignCard({ item }: { item: CarouselItem }) {
  return (
    <figure className="w-[300px] shrink-0 lg:w-[400px]">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted shadow-sm">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 400px, 300px"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-display text-lg tracking-tight text-foreground">
          {item.label}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {item.meta}
        </span>
      </figcaption>
    </figure>
  );
}

/** Item cards are silhouetted products on a light card surface. */
function ItemCard({ item }: { item: CarouselItem }) {
  return (
    <figure className="w-[220px] shrink-0 lg:w-[260px]">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-card p-6 shadow-sm">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 260px, 220px"
          className="object-contain p-6"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-display text-base tracking-tight text-foreground">
          {item.label}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {item.meta}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * A continuously looping, two-row showcase carousel. The top row of room
 * designs drifts left and the bottom row of sourced items drifts right, so the
 * band always reads as alive. Each row duplicates its content twice because the
 * shared `.marquee` keyframes translate the track by -50%, making the seam
 * invisible. Hovering a row pauses it. Content is placeholder (see
 * `showcase-carousel-items.ts`).
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

      <div className="mt-12 flex flex-col gap-8 lg:mt-16 lg:gap-10">
        {/* Row 1 — designs, drifting left */}
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent lg:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent lg:w-32" />
          <div className="marquee flex w-max gap-6 group-hover:[animation-play-state:paused] lg:gap-8">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex gap-6 lg:gap-8"
                aria-hidden={copy === 1}
              >
                {CAROUSEL_DESIGNS.map((item) => (
                  <DesignCard key={`${item.label}-${copy}`} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — sourced items, drifting right */}
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent lg:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent lg:w-32" />
          <div className="marquee-reverse flex w-max gap-6 group-hover:[animation-play-state:paused] lg:gap-8">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex gap-6 lg:gap-8"
                aria-hidden={copy === 1}
              >
                {CAROUSEL_ITEMS.map((item) => (
                  <ItemCard key={`${item.label}-${copy}`} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
