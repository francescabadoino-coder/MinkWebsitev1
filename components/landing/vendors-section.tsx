"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const VENDORS = [
  "Andonian Rugs",
  "Brume",
  "Craftex",
  "Designer Furniture Galleries",
  "Dixon by Roslyn",
  "Holland & Sherry",
  "J. Garner Home",
  "Kravet",
  "Leflar Ltd.",
  "Perennials & Sutherland",
  "Pindler",
  "Resource Furniture",
  "Rubenstein's",
  "Schumacher",
  "Stacy Logan",
  "The Shade Store",
  "Trammell-Gagné",
];

export function VendorsSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-balance text-foreground">
          Source from brands you love
          <Popover>
            <PopoverTrigger
              aria-label="About our relationship with these brands"
              className="ml-1 inline-flex h-6 w-6 translate-y-[-0.6em] items-center justify-center rounded-full border border-foreground/20 align-top font-sans text-xs text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:h-7 lg:w-7 lg:text-sm"
            >
              1
            </PopoverTrigger>
            <PopoverContent
              align="center"
              className="max-w-sm text-pretty text-left font-sans text-sm leading-relaxed text-muted-foreground"
            >
              We are not in any formal partnerships with these brands. We simply
              use publicly available information to help them connect with
              potential customers. If you represent one of these brands and want
              it removed, or would like to formalize a partnership, we&apos;d
              love to hear from you at{" "}
              <a
                href="mailto:partners@mymink.co"
                className="font-medium text-foreground underline underline-offset-4"
              >
                partners@mymink.co
              </a>
              .
            </PopoverContent>
          </Popover>
        </h2>
      </div>

      {/* Marquee of vendor brand names */}
      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="flex gap-12 lg:gap-16 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 lg:gap-16 items-center">
              {VENDORS.map((vendor) => (
                <span
                  key={`${vendor}-${i}`}
                  className="text-2xl lg:text-3xl font-display tracking-tight text-foreground/60 cursor-pointer transition-all duration-300 hover:scale-125 hover:text-foreground"
                >
                  {vendor}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
