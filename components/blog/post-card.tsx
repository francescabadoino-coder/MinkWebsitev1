import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPostDate, type BlogPost } from "@/lib/blog-data";

/**
 * A published post in a grid.
 *
 * Deliberately mirrors PlaceholderPostCard's layout — same aspect ratio, same
 * metadata row, same type scale — so real and upcoming posts can sit in the
 * same grid without the rows looking mismatched. The differences are the ones
 * that carry meaning: this is a <Link>, and the footer shows the publish date
 * and a read affordance instead of "Coming soon".
 */
export function PostCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
        {post.image && (
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-foreground/30" />
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 font-display text-xl leading-snug tracking-tight text-balance transition-colors group-hover:text-muted-foreground lg:text-2xl">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>{formatPostDate(post.date)}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
