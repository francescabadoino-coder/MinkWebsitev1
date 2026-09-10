import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BetaAccessProvider } from "@/components/landing/beta-access-provider";
import { AnimatedWaves } from "@/components/landing/animated-waves";
import { ShowcaseCarousel } from "@/components/landing/pricing/showcase-carousel";
import { ProductProofSection } from "@/components/landing/pricing/product-proof-section";
import { ShowcaseTestimonials } from "@/components/landing/pricing/showcase-testimonials";
import { PricingClosingCta } from "@/components/landing/pricing/pricing-closing-cta";

export const metadata: Metadata = {
  title: "Showcase — Real rooms and products sourced by Mink",
  description:
    "See the real work designers ship with Mink: rooms designed on Pro and the trade products Ora sourced for them, end to end.",
  alternates: { canonical: "/showcase" },
  openGraph: {
    title: "Showcase — Real rooms and products sourced by Mink",
    description:
      "See the real work designers ship with Mink: rooms designed on Pro and the trade products Ora sourced for them.",
    url: "/showcase",
  },
};

export default function ShowcasePage() {
  return (
    <BetaAccessProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground noise-overlay">
        <Navigation />

        <div>
          {/* Page hero — proportioned to match the home/agents/pricing heroes:
              the same pt-44 lg:pt-56 top rhythm below the fixed nav so the
              header breathes, with the bloom anchored into the top corner. */}
          <section className="relative overflow-hidden pt-44 pb-4 lg:pt-56">
            {/* Same signature chartreuse bloom as the other pages, here
                anchored top-right and interactive so it drifts with the
                cursor — a variation on the treatment, not a copy. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[62vh]"
              style={{
                WebkitMaskImage:
                  "radial-gradient(95% 75% at 82% -8%, #000 26%, transparent 64%)",
                maskImage:
                  "radial-gradient(95% 75% at 82% -8%, #000 26%, transparent 64%)",
              }}
            >
              <AnimatedWaves interactive />
            </div>
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Showcase
                <span className="h-px w-8 bg-foreground/30" />
              </span>
              <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.04] tracking-tight text-balance md:text-5xl lg:text-7xl">
                The work designers ship with Mink.
              </h1>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground text-pretty lg:text-xl">
                Rooms designed on Pro, and the real trade products Ora sourced
                for them, from brief to purchase order.
              </p>
            </div>
          </section>

          {/* Looping variety band — a quick, alive overview of the breadth of
              work, sitting right under the hero. Placeholder content for now. */}
          <ShowcaseCarousel />

          <ProductProofSection />

          {/* Social proof — renders only once SHOW_TESTIMONIALS is flipped on
              with real quotes; hidden today so we never ship fabricated ones. */}
          <ShowcaseTestimonials />

          <PricingClosingCta
            headline={
              <>
                Your next design gem could be{" "}
                <span className="relative inline-block font-serif italic pr-1">
                  <span className="inline-flex">here</span>
                  <span className="absolute -bottom-1 left-0 right-1 h-1 rounded-full bg-accent" />
                </span>
                .
              </>
            }
            description="Upload your brief and vision, and let Ora do the heavy work for you."
          />
        </div>

        <FooterSection />
      </main>
    </BetaAccessProvider>
  );
}
