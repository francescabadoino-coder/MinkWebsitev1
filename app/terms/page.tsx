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
  title: "Terms of Use — Mink",
  description:
    "The terms that govern your use of Mink, including subscriptions, billing and renewal, usage limits, trade vendor pricing, and order tracking.",
  alternates: { canonical: "/terms" },
};

const GENERAL_SECTIONS = [
  {
    id: "your-account",
    title: "Your account",
    paragraphs: [
      "Mink is currently in private beta and access is granted by application. You are responsible for the accuracy of the information you provide and for activity that happens under your account.",
      "You must be able to enter a binding contract to use Mink, and you may not share your account credentials with people outside your studio.",
    ],
  },
  {
    id: "how-mink-works",
    title: "How Mink works",
    paragraphs: [
      "Mink analyzes your design briefs, recommends products from vetted brands, generates 2D visualizations, and on paid plans runs procurement tasks such as requesting vendor pricing and drafting vendor and client emails.",
      "Mink acts on your instructions. You remain responsible for reviewing specifications, pricing, and orders before they are sent, and for the final decisions you present to your clients. AI output can be wrong, so treat it as a draft to check rather than a finished answer.",
    ],
  },
  {
    id: "your-content",
    title: "Your content and data",
    paragraphs: [
      "Your projects, briefs, and client details belong to you. Mink does not train models on your designer, client, or project data, and does not sell it.",
      "You grant Mink the permissions needed to operate the service on your behalf, such as processing your brief to generate recommendations and contacting vendors when you ask it to.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    paragraphs: [
      "Do not use Mink to break the law, infringe someone else's rights, misrepresent your trade status to a vendor, scrape or resell the service, or attempt to disrupt its security or availability.",
      "We may suspend access for conduct that puts the service, our vendors, or other users at risk.",
    ],
  },
];

const CLOSING_SECTIONS = [
  {
    id: "vendors-and-third-parties",
    title: "Vendors and third parties",
    paragraphs: [
      "Mink connects you to third-party vendors and processors. Purchases you make from a vendor are governed by that vendor's own terms, pricing, and return policy. Payments are processed by Stripe, and Mink does not store your full card number.",
      "Mink is not liable for a vendor's products, lead times, or fulfillment decisions.",
    ],
  },
  {
    id: "disclaimers-and-liability",
    title: "Disclaimers and liability",
    paragraphs: [
      "Mink is provided as is, without warranties of any kind beyond those that cannot be excluded by law. We do not warrant that the service will be uninterrupted or error free, or that recommendations, availability, or pricing will be accurate at all times.",
      "To the extent permitted by law, Mink's total liability arising from your use of the service is limited to the amount you paid us in the twelve months before the claim.",
    ],
  },
  {
    id: "changes-to-these-terms",
    title: "Changes to these terms",
    paragraphs: [
      "We may update these terms as the product changes. If a change is material, we will notify account holders before it takes effect. Continuing to use Mink after that point means you accept the updated terms.",
    ],
  },
];

const SUBSCRIPTION_SECTIONS = [...BILLING_TOPICS, ILLUSTRATIVE_FIGURES_TOPIC];

const ALL_SECTIONS = [
  ...GENERAL_SECTIONS,
  ...SUBSCRIPTION_SECTIONS,
  ...CLOSING_SECTIONS,
];

function Section({
  section,
}: {
  section: { id: string; title: string; paragraphs: string[] };
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 border-t border-foreground/10 pt-8"
    >
      <h2 className="font-display text-2xl tracking-tight lg:text-3xl">
        {section.title}
      </h2>
      <div className="mt-4 space-y-4">
        {section.paragraphs.map((p) => (
          <p
            key={p.slice(0, 40)}
            className="leading-relaxed text-muted-foreground text-pretty"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <BetaAccessProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground noise-overlay">
        <Navigation />

        <div className="pt-28 lg:pt-32">
          <article className="mx-auto max-w-3xl px-6 py-16 lg:px-12 lg:py-24">
            <header>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Legal
              </p>
              <h1 className="mt-4 font-display text-4xl tracking-tight text-balance lg:text-6xl">
                Terms of Use.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                The agreement between you and Mink. Written to be read, not
                skipped.
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
                {ALL_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-muted-foreground underline decoration-foreground/15 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-14 space-y-12">
              {GENERAL_SECTIONS.map((section) => (
                <Section key={section.id} section={section} />
              ))}

              <div className="space-y-12">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Subscriptions and billing
                </h2>
                {SUBSCRIPTION_SECTIONS.map((section) => (
                  <Section key={section.id} section={section} />
                ))}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  These are also collected on the{" "}
                  <Link
                    href="/billing-policy"
                    className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground"
                  >
                    Billing Policy
                  </Link>{" "}
                  page.
                </p>
              </div>

              {CLOSING_SECTIONS.map((section) => (
                <Section key={section.id} section={section} />
              ))}
            </div>

            <p className="mt-14 border-t border-foreground/10 pt-8 text-sm leading-relaxed text-muted-foreground">
              Questions about these terms? Email{" "}
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
