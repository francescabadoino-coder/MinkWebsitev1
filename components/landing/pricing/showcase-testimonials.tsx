/**
 * Social-proof slot for the showcase page.
 *
 * HIDDEN UNTIL WE HAVE REAL REVIEWS. The layout is fully designed and ready;
 * it renders nothing while `SHOW_TESTIMONIALS` is false. To ship it: flip the
 * flag to true and replace TESTIMONIALS with genuine, attributable quotes.
 * Never ship fabricated testimonials.
 */

const SHOW_TESTIMONIALS = false;

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

// Placeholder copy only — do not publish until replaced with real quotes.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Ora sourced an entire living room in an afternoon. The pieces were exactly on brief.",
    name: "Designer name",
    title: "Studio, City",
  },
  {
    quote:
      "It reads the brief the way a junior designer would, then does the vendor legwork I hate.",
    name: "Designer name",
    title: "Studio, City",
  },
  {
    quote:
      "The reasoning on every pick is what sold me. I can defend each choice to a client.",
    name: "Designer name",
    title: "Studio, City",
  },
];

export function ShowcaseTestimonials() {
  if (!SHOW_TESTIMONIALS) return null;

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          From the studio
          <span className="h-px w-8 bg-foreground/30" />
        </span>
        <h2 className="mt-5 font-display text-4xl tracking-tight text-balance lg:text-6xl">
          What designers say.
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.quote}
              className="flex flex-col justify-between rounded-2xl border border-foreground/10 bg-card p-8"
            >
              <blockquote className="text-lg leading-relaxed text-foreground text-pretty">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="mt-8">
                <p className="font-medium text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.title}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
