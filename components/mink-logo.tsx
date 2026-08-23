import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ── Mink logo system ────────────────────────────────────────────────────
 * Official brand assets, supplied as transparent PNGs. Three colourways,
 * named after the brand's own colour language:
 *
 *   "midnight" → #232323 artwork. Use on Day / light grounds.  (default)
 *   "dancing"  → #CFDC66 artwork. Use on Midnight / dark or photographic
 *                grounds, where it also carries the brand accent.
 *   "day"      → #E3E3E3 artwork. Reserved for Midnight grounds where the
 *                logo should stay quiet and not compete with a CTA.
 *
 * Size by setting a height class (e.g. `h-7`); width scales automatically.
 *
 * ── On the asset paths ──────────────────────────────────────────────────
 * These point at `public/brand/tight/`, NOT `public/brand/`. The supplied
 * originals sit on an oversized canvas: the wordmark artwork is only 215x70
 * inside a 250x150 frame, so the ink fills just 47% of the height and the
 * rest is transparent padding. That made every height class lie — `h-6`
 * rendered a ~11px wordmark and read as far too small next to the nav type.
 *
 * `public/brand/tight/*` are the same artwork cropped to their ink bounds
 * (no recolouring, no redrawing), so a height class now maps 1:1 to visible
 * logo. The untouched originals remain in `public/brand/`.
 *
 * Consequence: wordmark aspect is 3.07:1 and marks are exactly 1:1. If the
 * brand assets are ever resupplied, re-crop them rather than compensating
 * with a larger height class.
 */

type Colorway = "midnight" | "dancing" | "day";

const WORDMARK: Record<Colorway, string> = {
  midnight: "/brand/tight/wordmark-midnight.png",
  dancing: "/brand/tight/wordmark-dancing.png",
  // There is no Day wordmark in the asset set. Mink is a greyscale brand,
  // so dark grounds get the Midnight artwork knocked out to white rather
  // than the chartreuse wordmark, which would read as a yellow accent.
  day: "/brand/tight/wordmark-midnight.png",
};

const MARK: Record<Colorway, string> = {
  midnight: "/brand/tight/mark-midnight.png",
  dancing: "/brand/tight/mark-dancing.png",
  day: "/brand/tight/mark-day.png",
};

/**
 * The primary lockup: the lowercase "mink" wordmark. This is the default
 * brand signature and should be used in the nav, footer and any header.
 */
export function MinkWordmark({
  className,
  variant = "midnight",
  priority = false,
}: {
  className?: string;
  /** Brand colourway. Accepts the legacy "dark"/"light" names too. */
  variant?: Colorway | "dark" | "light";
  priority?: boolean;
}) {
  // Map the previous API onto the brand colour names so existing callers
  // keep working: dark artwork = midnight, light artwork = dancing.
  const colorway: Colorway =
    variant === "dark"
      ? "midnight"
      : variant === "light"
        ? "dancing"
        : variant;

  return (
    <Image
      src={WORDMARK[colorway]}
      alt="mink"
      width={215}
      height={70}
      priority={priority}
      className={cn(
        "h-7 w-auto object-contain",
        // Knock the Midnight artwork out to white for dark grounds.
        colorway === "day" && "brightness-0 invert",
        className,
      )}
    />
  );
}

/**
 * The squircle "hourglass" mark. Use only where a square footprint is
 * required and the wordmark cannot breathe — avatars, app icons, tight
 * mobile headers. Never pair it beside the wordmark; pick one.
 */
export function MinkMark({
  className,
  variant = "midnight",
  priority = false,
}: {
  className?: string;
  variant?: Colorway;
  priority?: boolean;
}) {
  return (
    <Image
      src={MARK[variant]}
      alt="mink"
      width={165}
      height={165}
      priority={priority}
      className={cn("h-8 w-8 object-contain", className)}
    />
  );
}
