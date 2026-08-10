import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BetaAccessProvider } from "@/components/landing/beta-access-provider";
import { PricingHero } from "@/components/landing/pricing/pricing-hero";
import { ProductProofSection } from "@/components/landing/pricing/product-proof-section";
import { PricingSavingsCalculator } from "@/components/landing/pricing/pricing-savings-calculator";
import { PricingPlans } from "@/components/landing/pricing/pricing-plans";
import { PricingFaq } from "@/components/landing/pricing/pricing-faq";
import { PricingClosingCta } from "@/components/landing/pricing/pricing-closing-cta";

export const metadata: Metadata = {
  title: "Pricing — Mink, the AI procurement platform for interior designers",
  description:
    "Start free, no credit card required. Compare Starter, Pro, and Studio plans and pick the one that fits how you work. Cancel any time.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing that pays for itself — Mink",
    description:
      "Start free, no credit card required. Compare Starter, Pro, and Studio plans and pick the one that fits how you work.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <BetaAccessProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground noise-overlay">
        <Navigation />

        <div className="pt-28 lg:pt-32">
          <PricingHero />
          <ProductProofSection />
          <PricingSavingsCalculator />

          <div id="plan-details" className="scroll-mt-24 pt-16 lg:pt-24">
            <PricingPlans />
          </div>
          <PricingFaq />

          <PricingClosingCta />
        </div>

        <FooterSection />
      </main>
    </BetaAccessProvider>
  );
}
