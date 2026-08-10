import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BetaAccessProvider } from "@/components/landing/beta-access-provider";
import { FeaturedCarousel } from "@/components/blog/featured-carousel";
import { PlaceholderPostCard } from "@/components/blog/placeholder-post-card";
import { PostCard } from "@/components/blog/post-card";
import { blogPosts, getPostsByTopic, sortByNewest } from "@/lib/blog-data";
import { blogTopicSections } from "@/lib/blog-placeholders";

const siteUrl = "https://mink.design";

export const metadata: Metadata = {
  title: "Blog — Sourcing, AI, and the Business of Interior Design",
  description:
    "Insights on AI procurement, product sourcing, and running a modern interior design studio. Learn how to find products from your favorite brands in seconds with Mink.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "Mink Blog — Sourcing, AI, and the Business of Interior Design",
    description:
      "Insights on AI procurement, product sourcing, and running a modern interior design studio.",
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  // The hero carousel shows four slides. Its numbered rail renders one item per
  // slide, so passing the full post list made that rail grow with every new
  // article until the labels were unreadably narrow.
  const featuredPosts = sortByNewest(blogPosts).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Mink Blog",
    url: `${siteUrl}/blog`,
    description:
      "Insights on AI procurement, product sourcing, and running a modern interior design studio.",
    // Only real, published posts are described here. Placeholder cards are
    // deliberately excluded so search engines never see phantom URLs.
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${siteUrl}/blog/${post.slug}`,
      author: { "@type": "Organization", name: post.author.name },
    })),
  };

  return (
    <BetaAccessProvider>
      <main className="noise-overlay relative min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />

        {/* Header */}
        <header className="mx-auto max-w-[1200px] px-6 pt-40 pb-14 lg:px-12">
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            The Mink Blog
            <span className="h-px w-8 bg-foreground/30" />
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-balance lg:text-7xl">
            Sourcing, AI, and the business of design.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">
            Practical insights for interior designers who want to source
            smarter, spec faster, and spend more time on the work that matters.
          </p>
        </header>

        {/* Featured carousel */}
        <section
          className="mx-auto max-w-[1200px] px-6 lg:px-12"
          aria-label="Featured articles"
        >
          <FeaturedCarousel posts={featuredPosts} />
        </section>

        {/* Article count. The "Recent writing" grid that used to sit here was
            removed because every post it showed also appears in a topic
            cluster below, so each article was listed twice on one page. The
            carousel is the deliberate exception. */}
        <section
          className="mx-auto max-w-[1200px] px-6 pt-20 lg:px-12 lg:pt-28"
          aria-label="Article count"
        >
          <div className="flex items-end justify-between gap-6 border-b border-foreground/10 pb-6">
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Browse everything by topic below.
            </p>
            <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {blogPosts.length} articles
            </span>
          </div>
        </section>

        {/* Topic clusters — the single home for every published post */}
        {blogTopicSections.map((section, sectionIndex) => (
          <section
            key={section.id}
            id={section.id}
            // The first cluster sits directly under the article-count rule, so
            // it gets tighter top padding — full cluster spacing there left the
            // rule floating in dead space once the recent grid was removed.
            className={`mx-auto max-w-[1200px] scroll-mt-24 px-6 lg:px-12 ${
              sectionIndex === 0 ? "pt-12 lg:pt-16" : "pt-24 lg:pt-32"
            }`}
            aria-labelledby={`${section.id}-heading`}
          >
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {section.eyebrow}
              <span className="h-px w-8 bg-foreground/30" />
            </span>
            <h2
              id={`${section.id}-heading`}
              className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-balance lg:text-5xl"
            >
              {section.title}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {section.description}
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-12 border-t border-foreground/10 pt-10 md:grid-cols-2 lg:grid-cols-3">
              {/* Published posts lead the cluster; the remaining placeholder
                  titles trail behind so a partly-written cluster still reads
                  as a full grid. */}
              {/* No `priority` here: every cluster sits below the fold, so the
                  carousel's first slide is the only LCP candidate and these
                  should lazy-load. */}
              {getPostsByTopic(section.id).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
              {section.posts.map((post) => (
                <PlaceholderPostCard key={post.title} post={post} />
              ))}
            </div>
          </section>
        ))}

        <div className="pb-24 lg:pb-32" />

        <FooterSection />
      </main>
    </BetaAccessProvider>
  );
}
