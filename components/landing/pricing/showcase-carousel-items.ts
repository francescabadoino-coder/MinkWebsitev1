/**
 * PLACEHOLDER SHOWCASE CAROUSEL DATA
 *
 * These are intentionally generated placeholder assets used to demonstrate the
 * looping showcase carousel with visual variety. They are NOT real work
 * produced on Mink and carry no brand association. Swap each `src` for genuine
 * output (and update the label/vendor) once real showcase content is ready.
 *
 * Kept separate from `product-proof-tiles.ts` on purpose: that file holds real,
 * permission-restricted brand assets, while everything here is safe placeholder
 * content.
 *
 * Art direction mirrors the rest of the showcase: contemporary organic modern,
 * warm neutrals, natural materials, biophilic. Designs are 3:2 landscape room
 * photography; items are silhouetted on white.
 */

export type CarouselItem = {
  /** Visible caption. */
  label: string;
  /** Optional smaller muted line (vendor / room type). */
  meta: string;
  /** Image path in /public. */
  src: string;
  /** Describes the image; never repeats the label verbatim. */
  alt: string;
};

/** Room designs — the top row of the carousel. */
export const CAROUSEL_DESIGNS: CarouselItem[] = [
  {
    label: "Garden Dining Room",
    meta: "Full room design",
    src: "/showcase/design-dining-room.png",
    alt: "Warm dining room with an oval travertine table, curved boucle chairs, a sculptural paper pendant, and a potted olive tree by a sunlit window.",
  },
  {
    label: "Study & Home Office",
    meta: "Full room design",
    src: "/showcase/design-home-office.png",
    alt: "Serene home office with a rounded white oak desk, cream boucle task chair, floating oak shelves, and an arched window with linen drapes.",
  },
  {
    label: "Foyer & Entryway",
    meta: "Full room design",
    src: "/showcase/design-entryway.png",
    alt: "Welcoming entryway with a rounded white oak console, an organic plaster-framed mirror, a woven bench, and dried pampas grass in a stoneware vase.",
  },
  {
    label: "Sunroom Lounge",
    meta: "Full room design",
    src: "/showcase/design-sunroom.png",
    alt: "Relaxed sunroom with a curved cream boucle sofa, a round travertine coffee table, an arc floor lamp, and large plants against floor-to-ceiling windows.",
  },
];

/** Sourced items — the bottom row of the carousel. */
export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    label: "Arc Floor Lamp",
    meta: "Lighting",
    src: "/showcase/item-floor-lamp.png",
    alt: "Sculptural arc floor lamp in aged brass with an ivory linen drum shade on a travertine base, silhouetted on white.",
  },
  {
    label: "Free-form Coffee Table",
    meta: "Tables",
    src: "/showcase/item-coffee-table.png",
    alt: "Low organic free-form coffee table in cream travertine on a chunky cylindrical pedestal base, silhouetted on white.",
  },
  {
    label: "Boucle Barrel Chair",
    meta: "Seating",
    src: "/showcase/item-accent-chair.png",
    alt: "Curvy barrel-shell lounge chair fully upholstered in ivory boucle on a plinth base, silhouetted on white.",
  },
  {
    label: "Reeded Oak Credenza",
    meta: "Storage",
    src: "/showcase/item-sideboard.png",
    alt: "Low white oak sideboard with ribbed reeded doors, rounded corners, and slim tapered legs, silhouetted on white.",
  },
  {
    label: "Stoneware Table Lamp",
    meta: "Lighting",
    src: "/showcase/item-table-lamp.png",
    alt: "Sculptural hand-thrown ivory stoneware table lamp with a ridged base and an oatmeal linen drum shade, silhouetted on white.",
  },
];
