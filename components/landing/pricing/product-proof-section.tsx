import Image from "next/image";
import { PRODUCT_TILES, type ProofTile } from "./product-proof-tiles";
import { ShoppableRoom } from "./shoppable-room";

/** Product panels span 65% of the 1152px container on desktop. */
const PRODUCT_SIZES = "(min-width: 1024px) 730px, 100vw";

/**
 * One full-width product row: a 35% text column and a 65% white image panel.
 * `textFirst` flips the sides on desktop only. On mobile every row stacks
 * panel-then-text, so the reading order never alternates.
 */
function ProductRow({
  tile,
  textFirst,
}: {
  tile: ProofTile;
  textFirst: boolean;
}) {
  return (
    <li className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
      {/* Panel is first in the DOM so mobile stacks panel above text. */}
      <div
        className={`w-full lg:w-[65%] ${textFirst ? "lg:order-2" : "lg:order-1"}`}
      >
        {/* bg-card, not bg-white, so the panel tracks the brand ground tone. */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-card p-8 shadow-sm lg:p-12">
          {tile.src ? (
            <div className="relative h-full w-full">
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                loading="lazy"
                sizes={PRODUCT_SIZES}
                className="object-contain"
              />
            </div>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              aria-hidden
            >
              <span className="px-4 text-center text-xs text-neutral-500">
                Image pending
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex w-full flex-col gap-2 lg:w-[35%] ${
          textFirst ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <span className="font-display text-2xl tracking-tight text-balance text-foreground lg:text-3xl">
          {tile.label}
        </span>
        <span className="text-base leading-relaxed text-muted-foreground">
          {tile.vendor}
        </span>
      </div>
    </li>
  );
}

export function ProductProofSection() {
  return (
    <section id="product-proof" className="relative scroll-mt-24 py-24 lg:py-32">
      {/* Container width and header treatment match the home page sections */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Proof
          <span className="h-px w-8 bg-foreground/30" />
        </span>
        <h2 className="mt-5 font-display text-4xl tracking-tight text-balance lg:text-6xl">
          Real rooms, real products.
        </h2>

        {/* Group separation is roughly double the old gap-16/20. */}
        <div className="mt-12 flex flex-col gap-32 lg:mt-16 lg:gap-40">
          <div>
            <h3 className="font-display text-2xl tracking-tight lg:text-3xl">
              Designs made on <span className="font-bold underline underline-offset-4">Pro</span>
            </h3>
            <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-muted-foreground text-pretty">
              Every render is built from real, sourceable pieces. Explore a room
              and see exactly what Ora specified.
            </p>
            <div className="mt-8 lg:mt-10">
              <ShoppableRoom />
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl tracking-tight lg:text-3xl">
              Products sourced by <span className="font-bold underline underline-offset-4">Pro</span>
            </h3>
            {/* Row rhythm is deliberately looser than the room tile gap. */}
            <ul className="mt-10 flex flex-col gap-16 lg:mt-12 lg:gap-24">
              {PRODUCT_TILES.map((tile, index) => (
                <ProductRow
                  key={tile.label}
                  tile={tile}
                  textFirst={index % 2 === 0}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
