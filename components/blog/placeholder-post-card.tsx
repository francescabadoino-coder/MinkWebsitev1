import Image from "next/image";
import type { PlaceholderPost } from "@/lib/blog-placeholders";

/**
 * Renders a placeholder post as an <article>, not a <Link>, because these
 * entries have no slug yet. Once the real posts exist this becomes a link.
 */
export function PlaceholderPostCard({
  post,
  priority = false,
}: {
  post: PlaceholderPost;
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      {/* rounded-2xl to match the featured carousel directly above these cards
          on the blog index, and the --radius: 1rem the brand squircle sets. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-foreground/30" />
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 font-display text-xl leading-snug tracking-tight text-balance lg:text-2xl">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <span className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
          Coming soon
        </span>
      </div>
    </article>
  );
}
