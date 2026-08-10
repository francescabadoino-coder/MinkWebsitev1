import { PRICING_FOOTNOTES } from "./pricing-footnote-data";

/**
 * Small muted superscript marker that anchor-scrolls to the numbered "Details"
 * list rendered directly beneath the plan comparison table.
 *
 * `primary` marks the single instance that the footnote's back-link returns to.
 * A claim can appear more than once (card + comparison table), so only one
 * instance may own the `fn-ref-N` id.
 *
 * Size is `min(0.6em, 0.6875rem)`, i.e. "0.6em but never larger than 11px".
 * The em keeps the marker proportional to whatever text it annotates, which is
 * right for the body copy and table cells it usually sits in (8–11px there).
 * The 11px ceiling exists because this marker is also used inside the
 * `lg:text-7xl` pricing headline, where a bare 0.6em resolved to 43px and read
 * as a display numeral rather than a reference mark. Don't swap this back to a
 * plain `text-[0.6em]`.
 */
export function Fn({ n, primary = false }: { n: number; primary?: boolean }) {
  return (
    <a
      href={`#footnote-${n}`}
      id={primary ? `fn-ref-${n}` : undefined}
      aria-label={`See footnote ${n} in pricing details`}
      className="ml-0.5 inline-flex min-h-[24px] min-w-[16px] items-start justify-center align-super text-[min(0.6em,0.6875rem)] leading-none text-muted-foreground/70 underline-offset-2 transition-colors hover:text-foreground hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      {n}
    </a>
  );
}

export function PricingFootnotes() {
  return (
    <section
      id="pricing-details"
      aria-labelledby="pricing-details-heading"
      className="relative scroll-mt-24 border-t border-foreground/10 py-14"
    >
      {/* max-w-6xl matches the comparison table's container so the left edges
          line up; the inner max-w-4xl keeps a readable measure for the notes. */}
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="max-w-4xl">
        <h2
          id="pricing-details-heading"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          Details
        </h2>

        <ol className="mt-5 space-y-3">
          {PRICING_FOOTNOTES.map((note, i) => {
            const n = i + 1;
            return (
              <li
                key={n}
                id={`footnote-${n}`}
                className="flex scroll-mt-28 gap-3 text-[13px] leading-relaxed text-muted-foreground"
              >
                <span className="shrink-0 font-mono text-muted-foreground/60 tabular-nums">
                  {n}.
                </span>
                <p className="text-pretty">
                  {note}{" "}
                  <a
                    href={`#fn-ref-${n}`}
                    aria-label={`Back to the claim for footnote ${n}`}
                    className="ml-0.5 inline-block text-muted-foreground/60 transition-colors hover:text-foreground focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  >
                    {/* Plain arrow: U+21A9 renders as a blue emoji glyph in
                        Chrome even with a text variation selector. */}
                    <span aria-hidden="true">&#8593;</span>
                  </a>
                </p>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-[13px] text-muted-foreground">
          <a
            href="/billing-policy"
            className="underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            Full pricing and billing terms.
          </a>
        </p>
        </div>
      </div>
    </section>
  );
}
