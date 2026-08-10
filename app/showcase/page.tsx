import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BetaAccessProvider } from "@/components/landing/beta-access-provider";
import { ProductProofSection } from "@/components/landing/pricing/product-proof-section";
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

        <div className="pt-28 lg:pt-32">
          {/* Page hero — sets up the proof section that follows */}
          <section className="relative overflow-hidden pt-10 pb-4 lg:pt-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-[20%] top-[30%] h-[36vh] w-[140%] -rotate-6 bg-gradient-to-r from-accent/20 via-accent/45 to-accent/15 opacity-40 blur-3xl md:opacity-60"
            />
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

          <ProductProofSection />

          <PricingClosingCta />
        </div>

        <FooterSection />
      </main>
    </BetaAccessProvider>
  );
}
