import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { CtaSection, AccentWord } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { BetaAccessProvider } from "@/components/landing/beta-access-provider";
import { AgentsHero } from "@/components/agents/agents-hero";
import { AgentsCapabilitiesSection } from "@/components/agents/agents-capabilities-section";
import { AgentsByDesigners } from "@/components/agents/agents-by-designers";
import { AgentsArchitectureSection } from "@/components/agents/agents-architecture-section";
import { AgentsFounderQuote } from "@/components/agents/agents-founder-quote";

const siteUrl = "https://mink.design";

export const metadata: Metadata = {
  title: "Meet Ora — the AI Design Agent for Interior Designers",
  description:
    "Ora is agentic AI for interior designers. It sources products from 150+ trade vendors, handles vendor outreach, compares options, and builds client-ready specs. Built to be LLM-agnostic, so you're always on the frontier of AI.",
  keywords: [
    "agentic AI for interior design",
    "AI procurement agent",
    "Ora AI agent",
    "LLM agnostic AI platform",
    "AI product sourcing for designers",
    "interior design AI assistant",
  ],
  alternates: {
    canonical: "/agents",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/agents`,
    title: "Agentic AI for Interior Design — Meet Ora",
    description:
      "Ora is agentic AI for interior designers, sourcing products, handling vendor outreach, and building specs so you can focus on design.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ora, agentic AI for interior designers.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic AI for Interior Design — Meet Ora",
    description:
      "Ora is agentic AI for interior designers: sourcing, outreach, and specs, handled.",
    images: ["/og-image.png"],
  },
};

const agentJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/agents/#webpage`,
      url: `${siteUrl}/agents`,
      name: "Agentic AI for Interior Design — Meet Ora",
      isPartOf: { "@id": `${siteUrl}/#website` },
      description:
        "Ora is agentic AI for interior designers, sourcing products, handling vendor outreach, comparing options, and building client-ready specs.",
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      name: "Ora — AI Procurement Agent",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Ora is an agentic AI procurement assistant for interior designers. It sources furniture, fixtures, and equipment from 150+ trade vendors, handles vendor communication, compares options, and generates client-ready spec documents. Built to be LLM-agnostic.",
      featureList: [
        "AI product sourcing across 150+ trade vendors",
        "Automated vendor outreach and communication",
        "Side-by-side vendor comparison",
        "One-click spec sheets and invoices",
        "LLM-agnostic architecture",
      ],
      audience: {
        "@type": "Audience",
        audienceType: "Interior Designers",
      },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is agentic AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Agentic AI goes beyond chat. Instead of waiting for prompts, agents take initiative, researching products, drafting emails, comparing vendors, and completing multi-step tasks on your behalf. You set the intent; they handle the execution.",
          },
        },
        {
          "@type": "Question",
          name: "Is Ora tied to a single AI model?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Ora is built to be LLM-agnostic, supporting the best series of LLMs so you're always on the edge of what's happening in AI. Ora routes each task to the model that performs it best and adopts new models as they ship.",
          },
        },
      ],
    },
  ],
};

export default function AgentsPage() {
  return (
    <BetaAccessProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentJsonLd) }}
      />
      <main className="relative min-h-screen overflow-x-hidden noise-overlay">
        <Navigation />
        <AgentsHero />
        <AgentsByDesigners />
        <AgentsCapabilitiesSection />
        <AgentsFounderQuote />
        <AgentsArchitectureSection />
        <CtaSection
          headline={
            <>
              Set the intent. Ora does the <AccentWord>rest</AccentWord>.
            </>
          }
          description="Sourcing, vendor outreach, side-by-side comparisons, and client-ready specs, handled end to end by an agent that's always on the best available model."
        />
        <FooterSection />
      </main>
    </BetaAccessProvider>
  );
}
