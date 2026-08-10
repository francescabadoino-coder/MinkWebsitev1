import { toContentBlock, type BlogPost } from "@/lib/blog-data";
import { RichText } from "@/components/blog/rich-text";

/**
 * Renders an article body from its content blocks.
 *
 * Lives outside the page component because the block switch is long enough
 * that inlining it buried the actual page structure.
 */
export function PostContent({ content }: { content: BlogPost["content"] }) {
  return (
    <div className="mt-10">
      {content.map((raw, i) => {
        const block = toContentBlock(raw);
        const key = `${block.type}-${i}`;

        switch (block.type) {
          case "lead":
            // Answer-first opening paragraph. Larger than body copy and set in
            // full-strength foreground so the summary reads as a summary.
            return (
              <p
                key={key}
                className="mb-10 text-pretty text-xl leading-relaxed text-foreground lg:text-2xl lg:leading-relaxed"
              >
                <RichText text={block.text} />
              </p>
            );

          case "heading":
            return (
              <h2
                key={key}
                className="mt-12 mb-4 font-display text-2xl leading-snug tracking-tight text-balance lg:text-3xl"
              >
                <RichText text={block.text} />
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={key}
                className="mb-6 text-pretty text-lg leading-relaxed text-foreground/90"
              >
                <RichText text={block.text} />
              </p>
            );

          case "list":
            return (
              <ul key={key} className="mb-6 flex flex-col gap-3">
                {block.items.map((item, j) => (
                  <li
                    key={`${key}-${j}`}
                    className="flex gap-3 text-pretty text-lg leading-relaxed text-foreground/90"
                  >
                    {/* Marker is decorative, so it's aria-hidden and the li
                        carries no list-style that a screen reader would
                        announce twice. mt-3 optically centres it on the
                        first line of text at this line-height. */}
                    <span
                      aria-hidden="true"
                      className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30"
                    />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "table":
            return (
              // Horizontally scrollable so a three-column comparison doesn't
              // force the article column wider than the reading measure on
              // narrow screens.
              <div
                key={key}
                className="mb-6 overflow-x-auto rounded-2xl border border-foreground/10"
              >
                <table className="w-full min-w-[36rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-foreground/10 bg-muted/40">
                      {block.columns.map((col, k) =>
                        // The "Mink vs. X" tables label rows rather than the
                        // first column, so their first header cell is blank.
                        // An empty <th scope="col"> announces a phantom column
                        // header, so the corner cell becomes a plain <td> —
                        // the standard markup for a matrix table's corner.
                        col === "" ? (
                          <td key={`${key}-col-${k}`} />
                        ) : (
                          <th
                            key={`${key}-col-${k}`}
                            scope="col"
                            className="px-5 py-4 font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground"
                          >
                            {col}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr
                        key={`${key}-row-${j}`}
                        className="border-b border-foreground/10 last:border-b-0"
                      >
                        {row.map((cell, k) =>
                          // Every comparison table here uses its first column
                          // as the row's label ("Core function", "Speed"), so
                          // it's a row header, not data. scope="row" lets a
                          // screen reader announce which attribute a cell
                          // belongs to when reading across.
                          k === 0 ? (
                            <th
                              key={`${key}-cell-${j}-${k}`}
                              scope="row"
                              className="px-5 py-4 text-left align-top font-medium text-foreground"
                            >
                              <RichText text={cell} />
                            </th>
                          ) : (
                            <td
                              key={`${key}-cell-${j}-${k}`}
                              className="px-5 py-4 align-top text-muted-foreground"
                            >
                              <RichText text={cell} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "faq":
            return (
              <section key={key} className="mt-14" aria-labelledby={`${key}-h`}>
                <h2
                  id={`${key}-h`}
                  className="font-display text-2xl leading-snug tracking-tight lg:text-3xl"
                >
                  Frequently asked questions
                </h2>
                {/* A description list is the honest markup for Q/A pairs, and
                    it mirrors the FAQPage structured data on the page. */}
                <dl className="mt-6 flex flex-col divide-y divide-foreground/10 border-t border-foreground/10">
                  {block.items.map((item, j) => (
                    <div key={`${key}-qa-${j}`} className="py-6">
                      {/* RichText here too: FAQ copy is authored in the same
                          markup as body copy, so a bold or linked phrase in an
                          answer would otherwise render as literal asterisks. */}
                      <dt className="text-pretty text-lg font-medium leading-relaxed text-foreground">
                        <RichText text={item.question} />
                      </dt>
                      <dd className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                        <RichText text={item.answer} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
        }
      })}
    </div>
  );
}
