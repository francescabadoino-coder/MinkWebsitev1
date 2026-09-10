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
          {/* Page hero — the same centered marketing-hero treatment as the home
              and agents pages: a top-center chartreuse bloom faded before the
              text, the same pt-44 lg:pt-56 rhythm below the fixed nav, and a
              centered display headline with a serif-italic accent word. */}
          <section className="relative flex flex-col overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none"
              style={{
                WebkitMaskImage:
                  "radial-gradient(110% 80% at 50% -10%, #000 28%, transparent 62%)",
                maskImage:
                  "radial-gradient(110% 80% at 50% -10%, #000 28%, transparent 62%)",
              }}
            >
              <AnimatedWaves />
            </div>

            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-44 pb-8 text-center lg:px-12 lg:pt-56 lg:pb-10">
              <h1 className="mb-8 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-tight text-balance">
                The work designers{" "}
                {/* Signature headline emphasis: serif italic + Dancing pill,
                    matching the home and agents heroes. */}
                <span className="relative inline-block font-serif italic pr-1 text-foreground">
                  <span className="inline-flex">ship</span>
                  <span className="absolute -bottom-1 left-0 right-1 h-1 rounded-full bg-accent" />
                </span>{" "}
                with Mink.
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground text-pretty lg:text-2xl">
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
