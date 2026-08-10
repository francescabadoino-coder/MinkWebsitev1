/**
 * PLACEHOLDER CONTENT — layout scaffolding only.
 *
 * These entries exist so the blog layout can be reviewed with realistic copy
 * lengths and imagery. They intentionally have no `slug` and are rendered as
 * non-clickable cards, so nothing here can produce a 404. When the real posts
 * are written (optimized for SEO/AEO), move them into `lib/blog-data.ts` with a
 * slug and swap these out.
 */

import type { BlogTopicId } from "@/lib/blog-data";

export type PlaceholderPost = {
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  image: string;
  imageAlt: string;
};

export type BlogTopicSection = {
  /** Typed against BlogTopicId so a section id and a post's `topic` cannot
   *  drift apart — a mismatch becomes a compile error, not an empty cluster. */
  id: BlogTopicId;
  eyebrow: string;
  title: string;
  description: string;
  posts: PlaceholderPost[];
};

/** The topic clusters below the featured carousel. Each published post lives in
 *  exactly one of these, so an article is never listed twice on the index. */
export const blogTopicSections: BlogTopicSection[] = [
  {
    id: "interior-design-news",
    eyebrow: "Editorial",
    title: "The latest news on interior design",
    description:
      "Materials, color, and the shifts shaping how rooms get specified this season.",
    posts: [
      {
        title: "The quiet return of warm clay and unglazed terracotta",
        excerpt:
          "Cool greige is giving way to warmer earth tones. What is driving the shift, and how to specify it without dating a project.",
        category: "Trends",
        readingTime: "5 min read",
        image: "/blog/news-color-trends.png",
        imageAlt:
          "A serene living room corner with warm clay plaster walls and a boucle armchair",
      },
      {
        title: "Material honesty: specifying finishes that age well",
        excerpt:
          "Oak, limestone, linen, and brass all patina differently. A guide to choosing surfaces that improve over a decade of use.",
        category: "Materials",
        readingTime: "8 min read",
        image: "/blog/news-materials.png",
        imageAlt:
          "An overhead flat lay of oak veneer, terracotta tile, linen, brass and limestone samples",
      },
      {
        title: "Layered lighting plans that survive value engineering",
        excerpt:
          "Lighting is the first line item cut and the last one clients forgive. How to build a scheme that holds up under budget pressure.",
        category: "Practice",
        readingTime: "6 min read",
        image: "/blog/news-lighting.png",
        imageAlt:
          "A sculptural pendant light hanging above a solid oak dining table in warm evening light",
      },
    ],
  },
  {
    id: "ai-and-design",
    eyebrow: "Perspective",
    title: "How AI is impacting Interior Design",
    description:
      "Where automation genuinely helps a studio, and where taste still has to lead.",
    posts: [
      {
        title: "What a model actually sees when it reads your render",
        excerpt:
          "Computer vision can identify a silhouette, a material, and a finish. Understanding its limits is what makes it useful.",
        category: "Explainer",
        readingTime: "7 min read",
        image: "/blog/ai-render.png",
        imageAlt:
          "An abstract clay model of a living room interior traced with thin white contour lines",
      },
      {
        title: "The studio workflow, before and after automation",
        excerpt:
          "A side by side look at how procurement, proposals, and client approvals change when agents handle the paperwork.",
        category: "Workflow",
        readingTime: "6 min read",
        image: "/blog/ai-workflow.png",
        imageAlt:
          "Stacked matte paper cards and folders fanned across a plaster surface",
      },
      {
        title: "Why taste is the one thing AI cannot source",
        excerpt:
          "Automation compresses the search. It does not decide what belongs in the room. The distinction matters more than the hype suggests.",
        category: "Opinion",
        readingTime: "5 min read",
        image: "/blog/ai-craft.png",
        imageAlt:
          "A designer's hands arranging fabric swatches and a sample board on a wooden table",
      },
    ],
  },
  {
    // Carries no placeholders — fully populated by published posts. Comparison
    // and round-up pieces are their own content type (reader intent is "which
    // tool should I buy", not "how do I work"), so folding them into
    // Perspective would have buried them.
    id: "comparisons-and-alternatives",
    eyebrow: "Buying Guides",
    title: "Comparisons, pricing, and alternatives",
    description:
      "Honest comparisons of the AI tools designers actually evaluate, what they cost, and how to judge one before you pay for it.",
    posts: [],
  },
  {
    // Split from the buying guides because these are written for a reader who
    // already knows they want a tool and is asking "does this fit a practice my
    // size" — a persona question, not a product comparison.
    id: "freelancers-and-small-firms",
    eyebrow: "Your Practice",
    title: "For freelancers and small firms",
    description:
      "What actually changes when there's no ops team to hand the admin work to, and where automation pays off fastest at a small scale.",
    posts: [],
  },
  {
    // Fully populated by real posts, so it carries no placeholders. The
    // cluster exists because three published articles are step-by-step
    // workflow pieces that didn't belong under Perspective or Fundamentals.
    id: "how-to-and-workflows",
    eyebrow: "Practice",
    title: "How-to guides and studio workflows",
    description:
      "Step-by-step walkthroughs for putting AI to work on real projects, from first sketch to placed order.",
    posts: [],
  },
  {
    id: "ai-agents-explained",
    eyebrow: "Fundamentals",
    title: "Everything you need to know about AI Agents",
    description:
      "Plain language answers to how agents work, what they can be trusted with, and where they are headed.",
    posts: [
      {
        title: "Agent vs. chatbot: what the difference really is",
        excerpt:
          "A chatbot answers. An agent completes a task end to end, using tools on your behalf. Here is what that means in practice.",
        category: "Basics",
        readingTime: "4 min read",
        image: "/blog/agents-basics.png",
        imageAlt:
          "A matte sphere resting in a shallow plaster bowl surrounded by three smaller spheres",
      },
      {
        title: "What your agent should never do without asking",
        excerpt:
          "Spending, sending, and committing. A practical framework for deciding which actions require a human in the loop.",
        category: "Trust & Safety",
        readingTime: "6 min read",
        image: "/blog/agents-trust.png",
        imageAlt:
          "A folded charcoal paper envelope on warm plaster beside a small brass key",
      },
      {
        title: "From onboarding to install: the five agent stages",
        excerpt:
          "How a project moves through onboarding, concepting, sourcing, proposals, and delivery when agents carry the handoffs.",
        category: "Deep Dive",
        readingTime: "9 min read",
        image: "/blog/agents-future.png",
        imageAlt:
          "Five matte clay cylinders of increasing height casting parallel shadows",
      },
    ],
  },
];
