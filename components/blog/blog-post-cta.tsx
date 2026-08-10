"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBetaAccess } from "@/components/landing/beta-access-provider";

/**
 * End-of-article conversion block.
 *
 * Extracted into a client component because the post page is an async server
 * component and this needs `useBetaAccess`. Previously this was an inline
 * <Link href="/#pricing"> with a hand-rolled button, which broke two site
 * conventions: every other CTA on the site opens the beta dialog in place
 * rather than bouncing the reader to the pricing anchor, and the primary
 * button is `bg-cta` at `h-14 px-8 text-base`, not `bg-foreground` at `h-12`.
 *
 * `open()` is called with no argument, matching the other plan-agnostic CTAs
 * (hero, closing CTA); only the pricing cards pass a specific plan.
 */
export function BlogPostCta() {
  const { open } = useBetaAccess();

  return (
    <div className="mt-16 rounded-2xl border border-foreground/10 bg-muted/40 p-8">
      <h2 className="font-display text-2xl tracking-tight text-balance">
        Source products in seconds with Mink.
      </h2>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
        Meet Ora, the AI procurement agent that finds products from your
        favorite brands so you can get back to designing.
      </p>
      <Button
        size="lg"
        onClick={() => open()}
        className="group mt-6 h-14 rounded-full bg-cta px-8 text-base text-cta-foreground hover:bg-cta/90"
      >
        Sign up
        <ArrowRight
          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}
