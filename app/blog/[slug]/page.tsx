import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BetaAccessProvider } from "@/components/landing/beta-access-provider";
import { BlogPostCta } from "@/components/blog/blog-post-cta";
import { PostContent } from "@/components/blog/post-content";
import { stripInlineMarkup } from "@/components/blog/rich-text";
import {
  blogPosts,
  formatPostDate,
  getPostBySlug,
  toContentBlock,
} from "@/lib/blog-data";

const siteUrl = "https://mink.design";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  // Prefer the post's own hero image for link previews, falling back to the
  // generic site card. Previously every article shared as the same /og-image.png.
  const socialImage = post.image ?? "/og-image.png";

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author.name],
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [socialImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // These articles are written answer-first with explicit FAQ sections, so
  // emit FAQPage structured data alongside the BlogPosting. Built from the
  // same content blocks the page renders, so the markup can't describe
  // questions that aren't actually on the page. Inline markup is stripped
  // because structured data expects plain text, not "**bold**".
  const faqItems = post.content
    .map(toContentBlock)
    .flatMap((block) => (block.type === "faq" ? block.items : []));

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: stripInlineMarkup(item.question),
            acceptedAnswer: {
              "@type": "Answer",
              text: stripInlineMarkup(item.answer),
            },
          })),
        }
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
    image: `${siteUrl}${post.image ?? "/og-image.png"}`,
    author: { "@type": "Organization", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: "Mink",
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/mark-midnight.png` },
    },
  };

  return (
    <BetaAccessProvider>
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Navigation />

      {/* lg:px-12, not lg:px-8: 48px is the site-wide content column that the
          nav logo and every other page align to. max-w-3xl stays because an
          article wants a narrow reading measure. */}
      <article className="mx-auto max-w-3xl px-6 pt-40 pb-24 lg:px-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>

        <header>
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-6">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>{formatPostDate(post.date)}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground text-pretty">
            {post.description}
          </p>
          <div className="mt-8 flex items-center gap-3 pb-10 border-b border-foreground/10">
            <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-medium">
              {post.author.name.charAt(0)}
            </div>
            <div className="text-sm">
              <div className="font-medium">{post.author.name}</div>
              <div className="text-muted-foreground">{post.author.role}</div>
            </div>
          </div>
        </header>

        {/* Hero image. Every post already carries `image`/`imageAlt`, but only
            the index carousel was rendering them, so the article itself opened
            with no visual. Guarded because `image` is optional on BlogPost.
            `priority` because this is above the fold and is the LCP element.
            No hover scale here: on the carousel that signals "clickable", but
            this image is not a link. */}
        {post.image && (
          <figure className="mt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src={post.image}
                alt={post.imageAlt ?? ""}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
            {post.imageAlt && (
              <figcaption className="mt-3 text-sm text-muted-foreground text-pretty">
                {post.imageAlt}
              </figcaption>
            )}
          </figure>
        )}

        <PostContent content={post.content} />

        <BlogPostCta />
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section
          className="mx-auto max-w-3xl px-6 pb-32 lg:px-12"
          aria-label="Related articles"
        >
          {/* Site-standard eyebrow: mono, xs, uppercase, wide tracking, with
              the short rule accent. This was text-sm sentence-case mono, which
              read as body copy rather than a section label. */}
          <h2 className="mb-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Keep reading
            <span className="h-px w-8 bg-foreground/30" />
          </h2>
          <div className="grid sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 rounded-2xl overflow-hidden">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-background p-6 flex flex-col hover-lift"
              >
                <span className="text-xs font-mono text-muted-foreground mb-4">
                  {p.category}
                </span>
                <h3 className="text-lg font-display tracking-tight text-balance group-hover:text-muted-foreground transition-colors">
                  {p.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                  Read
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <FooterSection />
    </main>
    </BetaAccessProvider>
  );
}
