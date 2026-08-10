import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BetaAccessProvider } from "@/components/landing/beta-access-provider";
import { AgentsRoadmapSection } from "@/components/agents/agents-roadmap-section";
import { StudioPlanSection } from "@/components/landing/studio-plan-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About mink — AI shaped by the Mink Customer Study",
  description:
    "mink exists to empower designers around the world to do what they do best: design. Built on the Mink Customer Study, 12 practicing interior designers who told us where the hours really go.",
};

const FOUNDERS = [
  {
    image: "/founder-obradovic.jpg",
    name: "Francesca Obradovic",
    title: "Co-Founder & CEO",
    bio: "Francesca Obradovic is an award-winning marketer and product innovator. While sourcing for her own interior design projects, and studying the craft at RISD, she ran headfirst into the procurement mess every designer knows. She brings a decade of product experience across T-Mobile and startups, including T-Mobile's first AI-powered shopping experience, used by 20M+ shoppers.",
  },
  {
    image: "/founder-banzhef.jpg",
    name: "Caleb Banzhaf",
    title: "Co-Founder & CTO",
    bio: "Caleb Banzhaf is a full-stack engineer with 15+ years building AI-powered products and automated systems, from R&D in T-Mobile's innovation lab to founding his own ventures. He architected the technology behind Ora, Mink's AI procurement agent. Now building his own custom container home, he knows the sourcing problem firsthand, and his LLM and agentic depth is what lets Mink solve it.",
  },
];

// Tribute to the 12 practicing designers of the Mink Customer Study. Portraits
// are AI-generated stand-ins (the real designers are not publicly named), shown
// as a cluster of small bubbles in the third team-grid cell.
const STUDY_DESIGNER_PORTRAITS = Array.from(
  { length: 12 },
  (_, i) => `/designers/designer-${String(i + 1).padStart(2, "0")}.png`,
);

export default function AboutPage() {
  return (
    <BetaAccessProvider>
      <main className="bg-background text-foreground">
        <Navigation />

      {/* SECTION 1 — Mission hero.
          The image starts below the h-20 nav so the transparent nav keeps its
          dark-on-light treatment from the home page instead of sitting on a
          dark photo. */}
      <section className="relative pt-20">
        <div className="relative flex min-h-[78vh] items-end overflow-hidden">
          <Image
            src="/hero-kitchen.jpg"
            alt="A modern luxury kitchen bathed in warm natural light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Subtle dark gradient for legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 lg:px-12 lg:pb-24">
            {/* Break is explicit so "We handle the rest." always holds one
                line. text-balance is deliberately absent: it redistributes
                words across lines and would undo the fixed break. */}
            {/* Custom min-[…] steps instead of `sm:` because Tailwind's sm is
                640px, which left everything from 400–639px stuck at the 30px
                base. Each step is the largest size at which "We handle the
                rest." still holds one line for that width (it needs roughly
                10px of width per 1px of font size). */}
            <h1 className="max-w-4xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white min-[440px]:text-4xl min-[560px]:text-5xl lg:text-7xl">
              <span className="block">You design.</span>
              <span className="block">We handle the rest.</span>
            </h1>
            {/* Deliberately short and factual. The previous line ("mink exists
                to empower designers around the world to do what they do best:
                design") restated the Our mission band one section below almost
                verbatim, so the page made its central claim twice within a
                screen. The mission band keeps that claim; this just says what
                mink is. */}
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/85 lg:text-xl">
              AI agents for interior designers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission band directly below hero */}
      <section className="border-b border-foreground/10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          {/* Eyebrow + trailing rule matches the home page section headers */}
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Our mission
            <span className="h-px w-8 bg-foreground/30" />
          </span>
          <div className="mt-6 max-w-4xl">
            <p className="text-pretty font-display text-4xl leading-[1.1] tracking-tight lg:text-6xl">
              To empower interior designers around the world to do what they do
              best,{" "}
              <span className="font-bold underline underline-offset-4">
                design beautiful spaces.
              </span>
            </p>
            <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              Sourcing. Spec sheets. Vendor email chains. Chasing lead times.
              Somewhere along the way, designing beautiful spaces became
              managing logistics. We build AI agents that take it off your
              plate.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Our Story */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[60vh] lg:min-h-[80vh]">
          <Image
            src="/our-story.jpg"
            alt="Two interior designers arranging material samples in a studio"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-6 py-24 lg:px-16 lg:py-32">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Our story
              <span className="h-px w-8 bg-foreground/30" />
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance lg:text-5xl">
              We didn&apos;t guess at the problem. We went and asked.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                &ldquo;I came to interior design and fell for the craft at once.
                Just as quickly, I met everything standing in its way. Most of
                my week had nothing to do with design. It went to sourcing,
                coordinating, chasing quotes, and the endless back and forth in
                between.
              </p>
              <p>
                I assumed the fault was mine, that experience would eventually
                teach me the shortcut I&apos;d clearly missed. So I asked the
                designers I admire most, certain they&apos;d reveal it. Not one
                did. Each described the very same grind, in the very same words.
                This was never a beginner&apos;s blind spot. It was a real
                problem, hiding in plain sight, and no one had thought to fix it.
              </p>
              <p>
                So we set out to prove it. In the Mink Customer Study, twelve
                practicing designers, from solo practitioners to studio
                principals, walked us through their real projects. Every one of
                them named the same bottleneck. We built for precisely what they
                told us, and we have never stopped listening. mink is AI shaped
                by the people who live this work.&rdquo;
              </p>
            </div>
            {/* Portrait sits beside the attribution so the quote has a face */}
            <div className="mt-8 flex items-center gap-4">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/10">
                <Image
                  src="/founder-obradovic.jpg"
                  alt="Francesca Obradovic, Founder and CEO of mink"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <div>
                <p className="text-base font-medium text-foreground">
                  Francesca Obradovic
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Founder and CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Our Vision.
          Copy is in the collective "we" voice, so it reads as a company vision
          band rather than a quote attributed to a single founder. */}
      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-background/60">
            Our vision
            <span className="h-px w-8 bg-background/30" />
          </span>
          <p className="mt-6 max-w-4xl text-pretty font-display text-4xl leading-[1.1] tracking-tight lg:text-6xl">
            We envision a world where AI agents and humans live{" "}
            <span className="font-serif italic">symbiotically.</span> Our agents
            handle the tedious work so designers and vendors can focus on making
            their clients happy.
          </p>
        </div>
      </section>

      {/* SECTION 4 — Who We Are */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Who we are
            <span className="h-px w-8 bg-foreground/30" />
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance lg:text-6xl">
            Meet the team.
          </h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FOUNDERS.map((person) => (
              <article
                key={person.title}
                // bg-background matched the page surface, so cards read as
                // invisible. Use the home page's bordered muted card instead.
                className="flex flex-col items-center rounded-3xl border border-foreground/10 bg-muted/40 p-8 text-center"
              >
                <span className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={`${person.name}, ${person.title} of mink`}
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  ) : (
                    <User
                      className="h-12 w-12 text-muted-foreground/40"
                      aria-hidden="true"
                    />
                  )}
                </span>
                {/* Falls back to the role when a founder's name is withheld. */}
                <h3 className="mt-7 text-xl font-medium font-display">
                  {person.name ?? person.title}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {person.name ? person.title : "Name withheld by request"}
                </p>
                <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                  {person.bio}
                </p>
              </article>
            ))}

            {/* Third cell: tribute to the Mink Customer Study designers. Mirrors
                the founder card frame, but swaps the single portrait for a
                cluster of 12 small bubbles. */}
            <article className="flex flex-col items-center rounded-3xl border border-foreground/10 bg-muted/40 p-8 text-center">
              {/* Media region matches the founders' 144px portrait height and
                  is vertically centered, so all three headings share a baseline. */}
              <div className="flex h-36 items-center justify-center">
                <div className="grid grid-cols-4 gap-2">
                  {STUDY_DESIGNER_PORTRAITS.map((src, i) => (
                    <span
                      key={src}
                      className="relative h-10 w-10 overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10"
                    >
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`One of the 12 interior designers from the Mink Customer Study, portrait ${i + 1}`}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="mt-7 text-xl font-medium font-display">
                The Mink Customer Study
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                The founding designers
              </p>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Twelve practicing interior designers, from solo practitioners to
                studio principals, opened up their real projects and workflows to
                us. Their hard-won insight is stitched into every corner of the
                product. Portraits are illustrative, in tribute to the
                collaborators who made Mink possible.
              </p>
            </article>
          </div>
        </div>

      </section>

      {/* SECTION 4 — What We are Building (interactive agent roadmap) */}
      <AgentsRoadmapSection />

      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground">
              Where we are today:
            </p>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              We are starting where the pain is sharpest: procurement and
              admin. Describe what you need (the best modern sofa for the
              Birchwell living room) and get real options across your vendor
              network, organized inside the project instead of buried in your
              inbox.
            </p>
          </div>
        </div>
      </section>

      {/* The "Where we are going" copy and the three-up gallery that used to
          sit here were removed: the interactive roadmap directly above now
          covers the same ground stage by stage, and the Studio plan is the
          stronger next beat. The gallery's kitchen frame is reused inside it. */}
      <StudioPlanSection />

      {/* SECTION 5 — Join Us */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <Image
          src="/cta-studio.jpg"
          alt="A designer sketching at a desk in a bright minimalist studio"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/65"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center lg:px-12">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-white lg:text-6xl">
            Build the future of design with us.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-white/85">
            mink is small, early, and bootstrapped. We are looking for designers,
            builders, advisors, and the right investors who want to empower
            designers all around the world to do what they do best, design.
          </p>
          <Button
            asChild
            className="mt-10 h-14 rounded-full bg-cta px-8 text-base text-cta-foreground hover:bg-cta/90"
          >
            <Link href="mailto:hello@mink.design">Contact us</Link>
          </Button>
        </div>
      </section>

        <FooterSection />
      </main>
    </BetaAccessProvider>
  );
}
