import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { AnimatedWaves } from "@/components/landing/animated-waves";
import { ProductDemoSection } from "@/components/landing/product-demo-section";
import { VendorsSection } from "@/components/landing/vendors-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { VendorNetworkSection } from "@/components/landing/vendor-network-section";
import { PrivacySection } from "@/components/landing/privacy-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { BetaAccessProvider } from "@/components/landing/beta-access-provider";

export default function Home() {
  return (
    <BetaAccessProvider>
      <main className="relative min-h-screen overflow-x-hidden noise-overlay">
        <Navigation />
        {/* Hero + demo share one stage so the gradient wave spans both */}
        <div className="relative overflow-hidden">
          {/* Encompassing gradient wave, anchored bottom-left, behind hero + demo */}
          <div
            className="absolute -bottom-24 -left-24 w-[85vw] h-full pointer-events-none z-0"
            style={{
              WebkitMaskImage:
                "radial-gradient(75% 70% at 22% 80%, #000 22%, transparent 70%)",
              maskImage:
                "radial-gradient(75% 70% at 22% 80%, #000 22%, transparent 70%)",
            }}
          >
            <AnimatedWaves />
          </div>
          <div className="relative z-10">
            <HeroSection />
            <ProductDemoSection />
          </div>
        </div>
        <VendorsSection />
        <ProblemSection />
        <FeaturesSection />
        <PrivacySection />
        <VendorNetworkSection />
        <PricingSection />
        <CtaSection />
        <FooterSection />
      </main>
    </BetaAccessProvider>
  );
}
