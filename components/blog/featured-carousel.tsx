"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { formatPostDate, type BlogPost } from "@/lib/blog-data";

export function FeaturedCarousel({ posts }: { posts: BlogPost[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
      <CarouselContent className="-ml-0">
        {posts.map((post, i) => (
          <CarouselItem key={post.slug} className="pl-0">
            <Link
              href={`/blog/${post.slug}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/9] lg:aspect-[21/9]"
            >
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.imageAlt ?? ""}
                  fill
                  // Only the first slide is visible on load, so it's the sole
                  // LCP candidate. Marking every slide priority preloaded all
                  // of them at once and starved the one that actually renders.
                  priority={i === 0}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <span className="absolute inset-0 bg-muted" />
              )}

              {/* Gradient keeps the white overlay copy legible on any photo */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
              />

              <span className="absolute inset-x-0 bottom-0 flex flex-col p-6 lg:p-10">
                <span className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/70">
                  <span>{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span>{formatPostDate(post.date)}</span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span>{post.readingTime}</span>
                </span>
                <span className="mt-4 max-w-3xl font-display text-2xl leading-[1.1] tracking-tight text-balance text-white lg:text-5xl">
                  {post.title}
                </span>
                <span className="mt-4 hidden max-w-2xl text-pretty leading-relaxed text-white/80 lg:block">
                  {post.description}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Numbered rail doubles as the slide indicator */}
      <div className="mt-6 flex items-center gap-4">
        {posts.map((post, i) => (
          <button
            key={post.slug}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Show featured article ${i + 1}: ${post.title}`}
            aria-current={selected === i}
            className="group flex flex-1 flex-col gap-2 text-left"
          >
            <span
              className={`h-px w-full transition-colors ${
                selected === i
                  ? "bg-foreground"
                  : "bg-foreground/15 group-hover:bg-foreground/40"
              }`}
            />
            <span
              className={`font-mono text-xs tabular-nums transition-colors ${
                selected === i
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </Carousel>
  );
}
