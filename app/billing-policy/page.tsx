import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BetaAccessProvider } from "@/components/landing/beta-access-provider";
import {
  BILLING_TOPICS,
  ILLUSTRATIVE_FIGURES_TOPIC,
} from "@/lib/billing-terms";

export const metadata: Metadata = {
  title: "Billing Policy — Mink",
  description:
    "Full pricing and billing terms for Mink: renewal, cancellation, usage limits, trade vendor pricing, order tracking, price changes, and taxes.",
  alternates: { canonical: "/billing-policy" },
};

const TOPICS = [...BILLING_TOPICS, ILLUSTRATIVE_FIGURES_TOPIC];

export default function BillingPolicyPage() {
  return (
    <BetaAccessProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground noise-overlay">
        <Navigation />

        <div className="pt-28 lg:pt-32">
          <article className="mx-auto max-w-3xl px-6 py-16 lg:px-12 lg:py-24">
            <header>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Billing Policy
              </p>
              <h1 className="mt-4 font-display text-4xl tracking-tight text-balance lg:text-6xl">
                Pricing and billing terms.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                The full version of every pricing note on our{" "}
                <Link
                  href="/pricing"
                  className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground"
                >
                  pricing page
                </Link>
                . Plain language, no surprises.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Last updated July 26, 2026.
              </p>
            </header>

            <nav aria-label="On this page" className="mt-12">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                On this page
              </h2>
              <ul className="mt-4 space-y-2">
                {TOPICS.map((topic) => (
                  <li key={topic.id}>
                    <a
                      href={`#${topic.id}`}
                      className="text-sm text-muted-foreground underline decoration-foreground/15 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                    >
                      {topic.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-14 space-y-12">
              {TOPICS.map((topic) => (
                <section
                  key={topic.id}
                  id={topic.id}
                  className="scroll-mt-28 border-t border-foreground/10 pt-8"
                >
                  <h2 className="font-display text-2xl tracking-tight lg:text-3xl">
                    {topic.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {topic.paragraphs.map((p) => (
                      <p
                        key={p.slice(0, 40)}
                        className="leading-relaxed text-muted-foreground text-pretty"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <p className="mt-14 border-t border-foreground/10 pt-8 text-sm leading-relaxed text-muted-foreground">
              These terms form part of our{" "}
              <Link
                href="/terms"
                className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground"
              >
                Terms of Use
              </Link>
              . Questions about a charge? Email{" "}
              <a
                href="mailto:hello@mink.design"
                className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground"
              >
                hello@mink.design
              </a>
              .
            </p>
          </article>
        </div>

        <FooterSection />
      </main>
    </BetaAccessProvider>
  );
}
