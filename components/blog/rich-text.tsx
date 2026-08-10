import Link from "next/link";

/**
 * Minimal inline formatter for article copy.
 *
 * Supports exactly three things, because that is all the articles use:
 *   **bold**            — the lead-in labels the articles open list items with
 *   *italic*            — occasional emphasis on a single word
 *   [text](/href)       — internal cross-links between posts
 *
 * Deliberately not a Markdown library: pulling one in to parse three inline
 * patterns would ship a parser (and its sanitisation surface) for no gain.
 * Nothing here renders raw HTML, so the copy can't inject markup.
 *
 * Order matters — `**` is matched before `*` so bold doesn't get shredded into
 * two italics.
 */
const TOKEN =
  /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

export function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        const key = `${i}-${part.slice(0, 12)}`;

        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={key} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }

        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={key}>{part.slice(1, -1)}</em>;
        }

        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const isInternal = href.startsWith("/");
          const className =
            "underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground";

          if (isInternal) {
            return (
              <Link key={key} href={href} className={className}>
                {label}
              </Link>
            );
          }

          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {label}
            </a>
          );
        }

        return <span key={key}>{part}</span>;
      })}
    </>
  );
}

/** Strips inline markers for use in metadata and structured data. */
export function stripInlineMarkup(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}
