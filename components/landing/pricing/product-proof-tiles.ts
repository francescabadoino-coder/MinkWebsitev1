/**
 * NOT CLEARED FOR PUBLIC RELEASE
 *
 * The three room images referenced below are GENERATED ILLUSTRATIONS created
 * for internal stakeholder review only. They do NOT depict work produced on
 * Mink. This section must not be published publicly until they are replaced
 * with genuine output from the product.
 *
 * PERMISSION REQUIRED BEFORE PUBLISHING
 *
 * Thayer Coggin and Visual Comfort are real trade lines. Written permission
 * from each brand is required before this section is published publicly.
 *
 * SWAPPING ANY IMAGE IS A SINGLE-LINE EDIT
 *
 * Every image is wired through the `src` field below. To replace one, drop the
 * asset into /public and update that tile's `src`. A `null` value renders a
 * correctly sized "Image pending" placeholder instead. Nothing in the section
 * component needs to change either way.
 *
 * Art direction for every tile: contemporary organic modern with a biophilic
 * emphasis. Low horizontal proportions, soft rounded volumes, plinth and
 * floating bases, warm neutral palettes, natural materials, visible daylight.
 * No traditional detailing (no turned legs, nailhead trim, skirts, cane,
 * carved wood, or rolled arms). Every tile stays in a warm neutral range: the
 * supplied product photography is cream and grey, so no tile carries a
 * saturated accent color.
 *
 * Product photography must be silhouetted on a plain white background (not
 * shot in a styled room) so each image reads as one continuous white field
 * with its tile surface, with no visible seam.
 */

/**
 * A shoppable pin placed on a room image. `x`/`y` are percentages of the
 * image's width/height (0-100) marking the pin center, and `product` matches
 * a `PRODUCT_TILES` label so the viewer can resolve the piece Ora sourced.
 * Coordinates are tuned to the current renders; re-tune them if an image src
 * is swapped.
 */
export type Hotspot = {
  x: number;
  y: number;
  product: string;
};

export type ProofTile = {
  /** Visible label beneath the tile. */
  label: string;
  /** Vendor line, shown one step smaller and muted. Product tiles only. */
  vendor?: string;
  /** Image path. `null` renders an "Image pending" placeholder. */
  src: string | null;
  /** Describes the image itself, never repeats the visible label. */
  alt: string;
  /**
   * True when the image is a generated illustration rather than genuine
   * output or real vendor photography. Internal flag only: never rendered as
   * a badge or disclaimer in the UI.
   */
  isIllustrative: boolean;
  /**
   * Internal sourcing note: the exact product this tile depicts.
   * Never rendered anywhere in the UI.
   */
  reference?: string;
  /**
   * Shoppable pins for room tiles: each links a point in the render to the
   * product Ora sourced for it. Rooms with no catalogued pieces omit this.
   */
  hotspots?: Hotspot[];
};

/** Room designs. Full-bleed 3:2 landscape photography on a muted surface. */
export const ROOM_TILES: ProofTile[] = [
  {
    label: "Living Room",
    src: "/rooms/living-room.png",
    alt: "Living room anchored by a low cream tuxedo sofa on slim cylindrical metal legs, a grey chenille swivel tub chair on an upholstered plinth base, and a black linear chandelier hung with opal glass globes above a white oak floor.",
    isIllustrative: true,
    hotspots: [
      { x: 52, y: 25, product: "Viaggio Linear Chandelier" },
      { x: 64, y: 57, product: "855 Design Classic Sofa" },
      { x: 22, y: 71, product: "Heidi Swivel Lounge Chair" },
    ],
  },
  {
    label: "Kitchen",
    src: "/rooms/kitchen.png",
    alt: "Open kitchen in warm neutrals with a low waterfall-edge stone island, flat-panel white oak cabinetry, and a black linear chandelier hung with opal glass globes above the island.",
    isIllustrative: true,
    hotspots: [{ x: 48, y: 31, product: "Viaggio Linear Chandelier" }],
  },
  {
    label: "Bathroom",
    src: "/rooms/bathroom.png",
    alt: "Spa-like bathroom with a floating white oak vanity, large-format stone tile, minimal matte fixtures, and daylight washing down the stone wall.",
    isIllustrative: true,
  },
];

/**
 * Products. 1:1 squares on a pure white surface, silhouetted photography.
 *
 * These are the genuine vendor product photographs supplied by the client,
 * stored in /public/products/. They are real brand assets, so the permission
 * note at the top of this file applies to all three.
 */
export const PRODUCT_TILES: ProofTile[] = [
  {
    label: "Heidi Swivel Lounge Chair",
    vendor: "Thayer Coggin",
    src: "/products/thayer-coggin-heidi-chair.png",
    alt: "Rounded tub-shell swivel lounge chair in grey chenille with a single loose back cushion, resting on a low rounded plinth base, silhouetted on white.",
    isIllustrative: false,
    reference:
      "Thayer Coggin, Heidi, No. 1514-113 Swivel Chair, https://www.thayercoggin.com/products/heidi-plinth-chair",
  },
  {
    label: "855 Design Classic Sofa",
    vendor: "Milo Baughman for Thayer Coggin",
    src: "/products/thayer-coggin-855-sofa.png",
    alt: "Low three-seat tuxedo sofa in a cream woven fabric with arms level with the back, two striped accent pillows, floating on slim cylindrical metal legs, silhouetted on white.",
    isIllustrative: false,
    reference:
      "Thayer Coggin, 855 Design Classic Sofa, No. 855-303, designed by Milo Baughman 1964, polished stainless steel legs standard, https://www.thayercoggin.com/products/855-design-classic-sofa",
  },
  {
    label: "Viaggio Linear Chandelier",
    vendor: "Visual Comfort",
    src: "/products/visual-comfort-viaggio-chandelier.avif",
    alt: "Linear chandelier shown at three-quarter angle: a flat matte black rectangular frame suspended from two aged brass rods, with aged brass arms angling out to opal white glass globes of varying sizes clustered above and below the frame. Silhouetted on a transparent background.",
    isIllustrative: false,
    reference:
      "Visual Comfort, Viaggio Linear Chandelier, SKU 700LSVGO, https://www.visualcomfort.com/viaggio-linear-chandelier-700lsvgo/",
  },
];

/** Resolve a hotspot's `product` label to its full product tile. */
export function getProductByLabel(label: string): ProofTile | undefined {
  return PRODUCT_TILES.find((tile) => tile.label === label);
}
