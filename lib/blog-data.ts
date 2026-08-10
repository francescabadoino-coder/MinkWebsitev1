/**
 * Which topic cluster on the blog index a post belongs to.
 *
 * Must stay in sync with the section ids in `lib/blog-placeholders.ts`. A post
 * with no topic still appears in the carousel and in "Recent writing", it just
 * doesn't get slotted into a cluster.
 */
export type BlogTopicId =
  | "interior-design-news"
  | "ai-and-design"
  | "how-to-and-workflows"
  | "comparisons-and-alternatives"
  | "freelancers-and-small-firms"
  | "ai-agents-explained";

/**
 * A block of article body copy.
 *
 * The original model was a flat `string[]` of paragraphs, which couldn't
 * express the structure the real articles actually have — section headings,
 * bulleted lists, a comparison table, and an FAQ. Flattening those into
 * paragraphs would have thrown away both the reading structure and the
 * FAQ markup that answer engines look for.
 *
 * A bare string is shorthand for a paragraph, so short posts stay readable.
 * Inline `**bold**`, `*italic*`, and `[text](/href)` are supported in any
 * text field — see `components/blog/rich-text.tsx`.
 */
export type ContentBlock =
  /** Opening summary. Set larger than body copy; answer-first for AEO. */
  | { type: "lead"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; columns: string[]; rows: string[][] }
  /** Rendered as a <dl> and mirrored into FAQPage structured data. */
  | { type: "faq"; items: { question: string; answer: string }[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Date-only ISO string, e.g. "2026-05-28". Format with formatPostDate. */
  date: string;
  readingTime: string;
  /** Hero image, used on the index cards and at the top of the article. */
  image?: string;
  imageAlt?: string;
  /** Provenance for the hero image. Pexels doesn't require attribution, but
   *  crediting it is good practice and records where the asset came from. */
  imageCredit?: string;
  topic?: BlogTopicId;
  author: {
    name: string;
    role: string;
  };
  content: (string | ContentBlock)[];
};

/**
 * Format a post's publish date for display.
 *
 * `timeZone: "UTC"` is load-bearing, not cosmetic. Post dates are date-only
 * strings ("2026-05-28"), which `new Date()` parses as UTC midnight. Without a
 * pinned zone, formatting uses the runtime's local zone, so the server (UTC)
 * rendered "May 28, 2026" while any browser at a negative UTC offset rendered
 * "May 27, 2026" — a React hydration mismatch that discarded and re-rendered
 * the carousel tree on the client.
 *
 * Pinning to UTC also means the date shown is the date that was authored,
 * rather than shifting by a day depending on the reader's location.
 *
 * Shared by the carousel and the post page so the two cannot drift apart.
 */
export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Normalises the `string` shorthand into a paragraph block. */
export function toContentBlock(block: string | ContentBlock): ContentBlock {
  return typeof block === "string" ? { type: "paragraph", text: block } : block;
}

/** Newest first. Used for the carousel, "Recent writing", and prev/next. */
export function sortByNewest(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-interior-design-software-pricing",
    title: "AI Interior Design Software Pricing: What Should You Actually Pay?",
    description:
      "What AI interior design software actually costs in 2026, what drives the price differences, and how to evaluate whether a tool is worth it.",
    category: "Pricing",
    date: "2026-07-18",
    readingTime: "6 min read",
    image: "/blog/software-pricing.png",
    imageAlt:
      "A brass balance scale weighing folded linen and oak veneer samples against a set of plain brass weights",
    topic: "comparisons-and-alternatives",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "AI interior design software pricing spans a wide range — free, ad-supported tiers for casual use; mid-range subscriptions around $10–$25/month for lighter professional tools; and $50+/month for full professional rendering suites with per-render caps. What you should actually pay depends less on the sticker price and more on which category of tool you're evaluating and how much of your current workflow it genuinely replaces.",
      },
      { type: "heading", text: "Why prices vary so much across the category" },
      "The spread in pricing tracks the spread in what these tools actually do. A tool that generates a single stylized image from a photo costs very little to run and is often priced accordingly, sometimes free. A tool that includes a full 2D-to-3D rendering pipeline, a large real-brand furniture library, and cloud rendering infrastructure costs meaningfully more to build and operate — and that shows up in the subscription price.",
      "Procurement-focused tools sit in their own pricing logic entirely, because the value being delivered isn't a rendered image — it's hours of manual work removed from a designer's week: vendor sourcing, spec documents, invoicing, order tracking. Pricing here tends to track the time saved rather than the compute cost of generating an image.",
      { type: "heading", text: "What actually drives the price up" },
      {
        type: "list",
        items: [
          "**Render volume and resolution.** Tools that cap the number of renders per month, or that charge more for higher-resolution output, are pricing around compute cost directly — worth checking closely if your workflow involves iterating through multiple concepts per project.",
          "**Furniture library depth.** A large library of real-brand, dimensionally accurate 3D models costs more to license and maintain than a general style-prompt generator, and tools with that depth typically price higher.",
          "**Workflow scope.** Tools that stop at the render are priced differently than tools that carry a project through sourcing, spec creation, invoicing, and order tracking — the latter is doing meaningfully more work per dollar, even when the subscription cost looks comparable.",
          "**Commercial usage rights.** Free and low-cost tiers frequently restrict commercial use of generated output. If you're presenting to paying clients, factor the cost of a commercial-use tier into your real comparison, not just the advertised entry price.",
        ],
      },
      {
        type: "heading",
        text: "How to evaluate whether a price is actually worth it",
      },
      "Don't compare subscription costs in isolation — compare them against the hours the tool actually removes from your week. A $50/month rendering tool that shaves an hour off every client presentation is a clear win if you're running several projects a month. A cheaper tool that still leaves you manually building spec documents and chasing vendor invoices may cost less on paper and more in actual time.",
      "The math that matters: take your effective hourly rate, estimate the hours a tool genuinely saves per month, and compare that to the subscription cost. For most working designers, procurement automation clears that bar quickly, because vendor sourcing, spec creation, and order tracking are exactly the kind of repetitive, non-billable hours that [add up fastest](/blog/the-40-percent-problem).",
      { type: "heading", text: "Where Mink fits" },
      "Mink's pricing is structured around tiers that scale with how much of the procurement workflow you need automated — from core sourcing and moodboard capture up through order tracking across multiple vendors. Full current details are on the [pricing page](/pricing), with a no-credit-card trial available to test the workflow against a real project before committing.",
      {
        type: "faq",
        items: [
          {
            question:
              "What's a reasonable price range for AI interior design software?",
            answer:
              "Casual tools range from free to roughly $10–25/month. Full professional rendering suites often start around $50/month and scale with render volume. Procurement-focused platforms price differently, based on workflow scope rather than render count.",
          },
          {
            question:
              "Why do some AI rendering tools charge per render instead of a flat subscription?",
            answer:
              "Because rendering is computationally expensive, and per-render or capped-tier pricing lets providers price closer to actual usage rather than charging heavy users the same as occasional ones.",
          },
          {
            question: "Is a more expensive AI design tool always better?",
            answer:
              "Not necessarily — price generally tracks feature depth and render quality, but the right tool is the one that matches your actual bottleneck. A high-end rendering suite doesn't help if your real time loss is in procurement and admin work, not visualization.",
          },
          {
            question:
              "How do I know if an AI design tool is actually worth its subscription cost?",
            answer:
              "Estimate the hours it genuinely removes from your week — sourcing, formatting, tracking — and compare that time savings, valued at your effective hourly rate, against the monthly cost.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-interior-design-free-trial",
    title: "Is There a Free AI Interior Design Trial Worth Using?",
    description:
      "What to actually test during an AI interior design free trial — and why most trials don't tell you what you need to know until you check these things.",
    category: "Evaluation",
    date: "2026-07-16",
    readingTime: "6 min read",
    image: "/blog/free-trial-evaluation.png",
    imageAlt:
      "A linen swatch fan deck bound with a brass rivet, fanned open with one sample tab pulled out and set apart",
    topic: "comparisons-and-alternatives",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "A free AI interior design trial is only worth your time if you test it against a real project — your own floorplans, your own vendor list, your own client deliverables — rather than the polished demo data most tools show by default. Here's what to actually check before deciding whether a tool earns a paid subscription.",
      },
      { type: "heading", text: "Don't evaluate on demo data" },
      "Every AI design tool looks impressive with its own curated sample project. The real test is whether it holds up with the messy inputs of an actual job: a floorplan with awkward proportions, a moodboard with mixed signals, vendors the tool has never heard of. If a trial doesn't let you upload your own project, treat the results with real skepticism.",
      { type: "heading", text: "Five things to test during any trial" },
      {
        type: "list",
        items: [
          "**1. Does it work with your actual vendors, or just demo inventory?** A sourcing or rendering tool that only shows curated sample products tells you nothing about how it'll perform on your real projects. Upload your own vendor list, or check whether the tool can prioritize showrooms you already work with and exclude ones you don't.",
          "**2. What happens with a real floorplan, not a clean sample?** Real floorplans have irregular rooms, structural quirks, and awkward proportions. Test the tool against your messiest current project, not your simplest one — that's where quality differences actually show up.",
          "**3. Can you export something client-ready, or just a preview?** Many trials cap or watermark exports, which makes it impossible to judge whether the final deliverable — a spec document, an invoice, a high-resolution render — is actually usable in front of a paying client.",
          "**4. What are the commercial usage rights during the trial?** Confirm explicitly whether anything generated during a trial period can be used in paid client work, or whether that requires a paid tier. This is a common gap between what a trial appears to offer and what it actually permits.",
          "**5. What happens to your uploaded project data?** A trial is still real client data if you're testing it against an actual project. Check the tool's data policy before uploading anything — whether it's sold, shared, or used to train the underlying model — with the same scrutiny you'd apply to a paid subscription.",
        ],
      },
      { type: "heading", text: "Red flags during a trial" },
      {
        type: "list",
        items: [
          "No option to upload your own floorplan or vendor data — everything runs on fixed demo content",
          "Exports are watermarked or capped in a way that makes it impossible to evaluate the real deliverable",
          "Vague or absent answers about data ownership and commercial usage rights",
          "The trial requires a credit card up front, with unclear cancellation terms",
        ],
      },
      { type: "heading", text: "What a good trial should let you do" },
      "A trial worth your time should let you run an actual small project end to end — upload a real moodboard or floorplan, see genuine sourcing results against real (or your own) vendor inventory, and generate a real, unwatermarked export. If a trial can't support that, it's a demo, not a trial, and it won't tell you whether the tool holds up in practice.",
      { type: "heading", text: "How Mink's trial works" },
      "Mink's trial requires no credit card to start, and is built to let you run the actual workflow — moodboard upload, vendor sourcing, [floorplan-to-render](/blog/sketch-to-render-ai-floorplan), and export — against a real project, not a fixed demo, so you can judge the tool the same way you'd judge it after paying for it.",
      {
        type: "faq",
        items: [
          {
            question:
              "What should I test during an AI interior design software trial?",
            answer:
              "Your own floorplans and vendor data, not the tool's demo content — plus whether exports are client-ready and unwatermarked, and what the tool's data and commercial-use policies actually say.",
          },
          {
            question:
              "Do free trials of AI design tools usually require a credit card?",
            answer:
              "It varies by provider. Trials that don't require a credit card upfront are generally lower-risk to test, since there's no need to remember to cancel before a charge hits.",
          },
          {
            question:
              "Can I use content generated during a free trial with real clients?",
            answer:
              "Check the tool's terms directly — many trials restrict commercial use of anything generated during the trial period, even if the same content would be permitted under a paid plan.",
          },
          {
            question:
              "Why do demo-based trials give a misleading picture of a tool's quality?",
            answer:
              "Demo data is curated to show the tool at its best. Real projects — irregular floorplans, unusual vendor requirements, mixed-signal moodboards — are where quality gaps and workflow gaps actually surface.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-tools-for-small-interior-design-firms",
    title: "AI Design Tools for Small Firms: What Actually Moves the Needle",
    description:
      "AI tools for small interior design firms — what actually saves time when you don't have dedicated ops or procurement staff.",
    category: "Your Practice",
    date: "2026-07-11",
    readingTime: "5 min read",
    image: "/blog/small-design-firms.png",
    imageAlt:
      "A compact two-person studio corner with an oak worktable, stacked material sample boards and two woven chairs",
    topic: "freelancers-and-small-firms",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "Small interior design firms don't need enterprise-grade software — they need to reclaim the hours that currently go to procurement and admin work, without hiring a dedicated project coordinator to do it. That's a different buying criteria than what larger firms optimize for, and it's worth being specific about what actually matters at a 1–5 person scale.",
      },
      {
        type: "heading",
        text: "The specific constraint small firms are working around",
      },
      "A large firm can absorb procurement inefficiency by hiring a project coordinator or an ops-focused junior designer. A small firm generally can't — every hour spent chasing vendor availability or reconciling an invoice is an hour the lead designer isn't billing, and there's often no one else to hand that work to. Industry estimates put procurement and admin work at [roughly 40% of a designer's total time](/blog/the-40-percent-problem); at a small firm, that 40% usually falls on the same one or two people responsible for winning new business and doing the design work itself.",
      'That makes the calculus different than it is for a larger firm evaluating the same tools. The question isn\'t "does this improve our workflow at scale" — it\'s "does this let me personally spend fewer hours on work that isn\'t design or client-facing."',
      { type: "heading", text: "What to prioritize at this scale" },
      {
        type: "list",
        items: [
          "**Tools that reduce hours directly, not just add capability.** A feature-rich platform with a steep learning curve can cost a small firm more time than it saves, at least initially. Prioritize tools that remove a specific, recurring task — vendor sourcing, spec document creation, invoice generation — over tools that add a broad new capability you'll use occasionally.",
          "**Pricing that scales with actual usage.** Enterprise pricing tiers built around team seats or high project volume often don't reflect how a small firm actually operates. Look for pricing structured around what you'll actually use, not a package built for a 20-person studio.",
          "**Tools that work with the vendors you already have relationships with.** Small firms tend to have tighter, more established vendor relationships than large firms managing dozens of showrooms across multiple regions. A tool that can be pointed at your specific vendor list — and that lets you exclude vendors you don't work with — is more useful than one that surfaces a generic catalog.",
          "**Deliverables that are genuinely client-ready.** At a small firm, there's rarely a dedicated person to polish a spec document or invoice before it goes to a client. Tools that produce client-ready output by default, without additional manual formatting, save real time precisely because there's no one else to do that formatting.",
        ],
      },
      {
        type: "heading",
        text: "Where the highest-leverage automation actually is",
      },
      "For most small firms, the highest-leverage place to apply AI isn't rendering — it's procurement. A polished render helps win a client, but it's the vendor sourcing, spec creation, invoicing, and order tracking after that point that consume disproportionate time relative to firm size, precisely because there's no support staff to absorb it. Automating that specific layer of the work — rather than adding another visualization tool — is where a small firm's investment tends to pay off fastest.",
      { type: "heading", text: "A practical starting point" },
      "If you're a small firm evaluating AI tools for the first time, start by tracking where your actual hours go for two or three projects — not what you assume, but what you observe. If procurement and admin work is eating a disproportionate share, a [procurement-focused tool](/blog/ai-procurement-for-interior-designers) is likely to move the needle faster than another rendering tool. If concept generation and client presentation is genuinely the bottleneck, a rendering-focused tool may be the better first investment.",
      {
        type: "faq",
        items: [
          {
            question:
              "What's different about AI tool selection for a small firm versus a large one?",
            answer:
              "Small firms usually lack dedicated ops or procurement staff, so the same administrative work that a large firm can delegate falls directly on the designer. That makes tools that remove specific recurring tasks more valuable than broad, feature-heavy platforms.",
          },
          {
            question:
              "Is AI procurement software worth it for a one- or two-person design firm?",
            answer:
              "Often yes, precisely because there's no one else to absorb the roughly 40% of time that typically goes to procurement and admin — automating even part of that directly recovers billable hours for the designer.",
          },
          {
            question:
              "What should a small firm prioritize when comparing AI design tools?",
            answer:
              "Tools that reduce specific recurring tasks (sourcing, spec creation, invoicing), pricing that scales with actual usage rather than team size, and output that's genuinely client-ready without additional manual formatting.",
          },
          {
            question:
              "Should a small firm invest in rendering tools or procurement tools first?",
            answer:
              "It depends on where the actual bottleneck is. If winning new business is the constraint, rendering and presentation quality matter most. If the constraint is time lost to admin work on already-approved projects, procurement automation is likely the higher-leverage investment.",
          },
        ],
      },
    ],
  },
  {
    slug: "freelance-interior-designer-automation",
    title:
      "The Freelance Designer's Guide to Automating Procurement Without Losing Your Personal Touch",
    description:
      "A guide for freelance interior designers on automating procurement without losing the personal touch that clients hire freelancers for.",
    category: "Your Practice",
    date: "2026-07-09",
    readingTime: "6 min read",
    image: "/blog/freelance-automation.png",
    imageAlt:
      "A solo designer's spare oak desk with one chair, an open linen notebook, a pencil and a small fan of material swatches",
    topic: "freelancers-and-small-firms",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "Freelance interior designers feel the cost of manual procurement work more acutely than anyone else in the profession, because there's no one else to hand it to. Automating the sourcing, spec creation, and order tracking behind a project doesn't have to mean losing the personal relationship clients hire a freelancer for — the two are more separable than they first appear.",
      },
      { type: "heading", text: "Why freelancers absorb this cost differently" },
      "At a firm, procurement and admin work — sourcing, spec documents, invoicing, order tracking, which industry estimates put at [roughly 40% of a designer's total time](/blog/the-40-percent-problem) — can be spread across a team, or handed to a coordinator. A freelancer doesn't have that option. Every hour spent chasing vendor availability or building a spec sheet by hand is an hour that isn't going toward design work, client relationships, or landing the next project. For a solo practitioner, that math is unforgiving in a way it isn't for a larger studio.",
      {
        type: "heading",
        text: 'The real fear behind "will this make me less personal"',
      },
      "Most freelancers who hesitate on automation aren't worried about the technology itself — they're worried about clients noticing a shift from bespoke, high-touch service to something that feels templated or impersonal. That's a legitimate concern, and it points to a real distinction worth making: automating *procurement mechanics* is different from automating the *client relationship*.",
      "A client doesn't experience the difference between you manually building a spec document at 11pm versus generating one in a few minutes — what they experience is whether you're responsive, whether the design reflects their taste, and whether the project stays on track. Automating the mechanical layer of the work frees up time for the parts of the relationship that actually are personal: the design conversation, the walkthroughs, the judgment calls only you can make.",
      { type: "heading", text: "What to automate, and what not to" },
      "**Automate:** vendor sourcing and availability checks, spec document formatting, invoice generation, order status tracking across multiple vendors. This is repetitive, rules-based work that doesn't benefit from your personal attention — it's the same task whether you do it manually or a tool does it for you.",
      "**Don't automate away:** the design conversation itself, style direction decisions, and client communication about anything that requires judgment or a personal read on the relationship. This is where a freelancer's actual value lives, and it's worth protecting your time for it specifically by removing the mechanical work around it.",
      {
        type: "heading",
        text: "Data privacy matters even more for solo practitioners",
      },
      "As a freelancer, your client list and vendor relationships often are your business — there's no larger firm brand insulating you if that information is mishandled. Before adopting any AI tool, confirm directly: is your data ever sold or shared with third parties? Do you retain full ownership of your designs and client selections? Is your project data encrypted and kept separate from other accounts? These questions matter more, not less, for a solo practice built on trust and repeat referrals.",
      { type: "heading", text: "A realistic starting point" },
      "Start with the single task that costs you the most non-billable hours per week — for most freelancers, that's either vendor sourcing or invoice/spec creation — and automate just that piece first. You don't need to overhaul your entire workflow at once, and a smaller, deliberate change is easier to evaluate honestly than a wholesale platform switch.",
      {
        type: "faq",
        items: [
          {
            question:
              "Will automating procurement make my design work feel less personal to clients?",
            answer:
              "Not if you're automating the mechanical work — sourcing, spec documents, invoicing — rather than the client-facing parts of the relationship. Clients generally notice responsiveness and design quality, not whether a spec document was built manually or generated.",
          },
          {
            question:
              "How much time can a freelance designer realistically save with procurement automation?",
            answer:
              "Industry estimates put procurement and admin work at roughly 40% of a working designer's time, with the bulk of it non-billable. For a freelancer without support staff, automating even part of that directly recovers billable hours.",
          },
          {
            question:
              "What should a freelancer prioritize when evaluating an AI procurement tool?",
            answer:
              "Whether it works with your actual vendor relationships, whether it produces genuinely client-ready deliverables without manual reformatting, and clear answers on data ownership and privacy — since your client list and vendor relationships are core business assets for a solo practice.",
          },
          {
            question: "Should I automate everything at once, or start small?",
            answer:
              "Start with whichever single task costs you the most non-billable hours — usually vendor sourcing or spec/invoice creation — and automate that first. A focused change is easier to evaluate than switching your entire workflow at once.",
          },
        ],
      },
    ],
  },
  {
    slug: "mink-vendor-sourcing-showrooms",
    title: "260+ Showrooms, One Search Bar: How Mink Sources Trade Furniture",
    description:
      "How Mink sources trade furniture across 260+ showrooms and hundreds of trade brands, so designers stop manually cross-referencing catalogs.",
    category: "Deep Dive",
    date: "2026-07-03",
    readingTime: "5 min read",
    image: "/blog/vendor-sourcing-showrooms.png",
    imageAlt:
      "An overhead grid of small material chips in oak, terracotta, limestone, linen and brass, with one chip lifted above the rest",
    topic: "ai-and-design",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "Mink matches a designer's captured design intent to real, purchasable products from hundreds of trade brands across 260+ showrooms nationwide, ranked by relevance to the brief — replacing the manual work of cross-referencing multiple showroom catalogs one at a time. This is the core mechanic behind Mink's procurement agent, and it's worth explaining in detail because it's the specific step that removes the most manual hours from a project.",
      },
      { type: "heading", text: "The problem this solves" },
      "Sourcing furniture for a client project traditionally means checking availability, style fit, and pricing across a dozen or more showrooms — a process that's manual, repetitive, and easy to get wrong when you're managing several concurrent projects. A designer working from memory or a personal shortlist of vendors is also, by definition, missing whatever's outside that shortlist, even when it would be a better fit for a specific brief.",
      { type: "heading", text: "How the matching actually works" },
      "Once a design intent is captured — from an uploaded moodboard, a style brief, or both — that intent becomes a search against real inventory across the full vendor network. Results come back ranked by match percentage against the brief, not just a visual guess: a mid-century lounge chair search returns specific, named products from specific vendors, scored on how closely they fit the stated direction, rather than a generic style-tag match.",
      'This matters because "mid-century" or "warm minimalism" means different things depending on material, proportion, and finish — a relevance score built from the actual captured intent is a meaningfully different (and more useful) result than a keyword search against product titles.',
      { type: "heading", text: "Your vendor list, not a generic catalog" },
      "A network of 260+ showrooms is only useful if it reflects how you actually work. Mink lets you:",
      {
        type: "list",
        items: [
          "**Prioritize your favorite showrooms**, so vendors you already have strong relationships with surface first",
          "**Remove vendors you don't do business with**, so they stop appearing in results entirely — no more sourcing suggestions from a showroom you have no account with",
          "**View deliveries across every vendor in one place**, once a project moves from sourcing to order",
        ],
      },
      "The result is a vendor network that narrows to reflect your actual practice over time, rather than staying a static, one-size-fits-all catalog.",
      { type: "heading", text: "Why breadth matters as much as precision" },
      "A narrow vendor list means faster, more familiar sourcing — but it also means missing better-fit products outside your usual shortlist. A network spanning hundreds of [trade brands](/blog/trade-vendors-vs-retail-sourcing) across 260+ showrooms exists specifically to solve that tradeoff: broad enough that a genuinely better-fit product for an unusual brief is still findable, while the favorite-showroom and vendor-removal controls keep day-to-day sourcing focused on vendors you actually trust.",
      { type: "heading", text: "What happens after a match" },
      "Sourcing is the first half of the workflow, not the whole thing. Once products are matched and placed into a design, the same project carries through to spec document generation, itemized client invoicing, and order tracking across every vendor involved — so the vendor-matching step feeds directly into the deliverables a designer actually needs, rather than ending at a list of suggested products.",
      {
        type: "faq",
        items: [
          {
            question: "How many showrooms and vendors does Mink source from?",
            answer:
              "Mink sources from hundreds of trade brands across a network of 260+ showrooms nationwide, matched to a designer's captured design intent.",
          },
          {
            question:
              "Can I limit sourcing to only the vendors I already work with?",
            answer:
              "Yes — Mink lets you prioritize favorite showrooms and remove vendors you don't do business with, so sourcing results reflect your actual vendor relationships over time.",
          },
          {
            question: "How does Mink decide which products match a design brief?",
            answer:
              "Design intent is captured from moodboard uploads or a style brief, then matched against real inventory and ranked by a relevance score against that brief, rather than a generic keyword or style-tag match.",
          },
          {
            question: "Does vendor sourcing connect to order tracking?",
            answer:
              "Yes — once a design is approved, the same project flows into order tracking across every vendor involved, so delivery status for every item in a project is visible in one place rather than checked separately per vendor.",
          },
        ],
      },
    ],
  },
  {
    slug: "best-ai-interior-design-tools-2026",
    title: "Best AI Interior Design Tools in 2026: A Designer's Buying Guide",
    description:
      "An honest, category-by-category round-up of the best AI interior design tools in 2026 — for rendering, moodboarding, and procurement.",
    category: "Buying Guide",
    date: "2026-08-06",
    readingTime: "6 min read",
    image: "/blog/best-ai-tools-roundup.png",
    imageAlt:
      "Four plaster plinths of different heights, each displaying a different material sample: oak veneer, terracotta, linen and brass",
    topic: "comparisons-and-alternatives",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: 'There is no single "best" AI interior design tool in 2026 — the right one depends entirely on which part of your workflow you\'re trying to fix. This guide breaks the category down by job-to-be-done, rather than ranking everything on one list, because a rendering tool and a procurement tool solve genuinely different problems.',
      },
      { type: "heading", text: "For fast, casual concept generation" },
      "**RoomGPT** is built for speed and simplicity — upload a photo, get an AI-reimagined version of the room in a preferred style, with minimal setup. It's a strong fit for early \"what if\" conversations with a client, or quick internal ideation, but it isn't designed for final client presentations, precise proportions, or sourcing real furniture. Best for: the earliest, most exploratory stage of a project.",
      { type: "heading", text: "For full professional rendering suites" },
      "**Foyr Neo** combines 2D floor planning, 3D modeling, and photorealistic rendering in one cloud-based platform, with a large library of 3D furniture models from real brands. It's built specifically for professional designers who need architectural-grade output and are willing to invest time in a steeper learning curve. Pricing sits at the higher end of the category, reflecting the depth of the toolset. Best for: firms that need polished, presentation-ready renders as their primary deliverable.",
      { type: "heading", text: "For quick, budget-friendly redesigns" },
      "**InteriorAI** offers a straightforward, accessible way to generate customizable room renders without a steep learning curve. It's a reasonable entry point for designers who want fast visual concepts without committing to a full professional suite, though — like most consumer-leaning tools in this category — it isn't built around real vendor sourcing or order management. Best for: budget-conscious visualization needs.",
      {
        type: "heading",
        text: "For procurement, sourcing, and order management",
      },
      "This is the category most round-ups skip, because it's less visually dramatic than rendering — but for working designers, it's often where the most time is lost. **Mink** is built specifically around this gap: capturing design intent from a moodboard, matching it to real products across hundreds of trade brands and 260+ showrooms, generating client-ready spec documents and invoices, and tracking every order across every vendor in one place. Best for: firms and freelancers whose bottleneck is procurement and admin, not concept generation.",
      { type: "heading", text: "Comparison at a glance" },
      {
        type: "table",
        columns: ["Tool", "Core strength", "Best for", "Watch out for"],
        rows: [
          [
            "RoomGPT",
            "Speed, simplicity",
            "Early-stage ideation",
            "Not built for final client deliverables",
          ],
          [
            "Foyr Neo",
            "Full professional rendering suite",
            "High-end presentation-ready renders",
            "Steep learning curve, higher price point",
          ],
          [
            "InteriorAI",
            "Quick, accessible renders",
            "Budget visualization",
            "Limited real-vendor sourcing",
          ],
          [
            "Mink",
            "Procurement + order automation",
            "Firms losing time to admin, not ideation",
            "Not a substitute for architectural-grade rendering",
          ],
        ],
      },
      { type: "heading", text: "How to actually choose" },
      "Ask yourself where your week actually goes before picking a tool. If concept generation and early client buy-in are the bottleneck, a rendering-focused tool is the right first investment. If vendor sourcing, spec documents, and order tracking are what's eating your hours — the roughly 40% of a designer's time that industry estimates put toward procurement and admin — a rendering tool won't move that needle at all, because it was never built to.",
      "Many firms end up using more than one tool from this list, each solving a different stage of the same project. The mistake is assuming any single tool covers the whole workflow.",
      {
        type: "faq",
        items: [
          {
            question:
              "What is the best AI tool for interior designers in 2026?",
            answer:
              "It depends on the job. RoomGPT suits fast, casual ideation. Foyr Neo suits full professional rendering. InteriorAI suits quick, budget-friendly visualization. Mink suits procurement, vendor sourcing, and order management — a category most other tools don't address.",
          },
          {
            question:
              "Is there one AI tool that does everything — rendering and procurement?",
            answer:
              "Most tools specialize in one or the other. Rendering tools focus on generating visuals; procurement tools focus on matching design intent to real, purchasable products and managing the order process. Few tools do both well, which is why many firms pair a rendering tool with a procurement tool.",
          },
          {
            question:
              "Which AI interior design tools are actually usable for professional client work?",
            answer:
              "Look for tools with clear commercial usage rights, real (not AI-invented) furniture sourcing, and output formats suited to client presentations — spec documents, invoices, and high-resolution visuals, not just a single generated image.",
          },
          {
            question:
              "What's the most overlooked category of AI interior design software?",
            answer:
              "Procurement and order management. Rendering tools get most of the attention because they're visually dramatic, but the sourcing, spec creation, invoicing, and order tracking that happen after a design is approved often consume more of a designer's actual week.",
          },
        ],
      },
    ],
  },
  {
    slug: "best-ai-interior-rendering-software",
    title: "Best AI Interior Rendering Software for Professionals",
    description:
      "A closer look at AI interior rendering software for professionals — render quality, speed, and where a rendering tool fits into a full project workflow.",
    category: "Comparison",
    date: "2026-08-05",
    readingTime: "6 min read",
    image: "/blog/ai-rendering-software.png",
    imageAlt:
      "A small architectural scale model of a living room built from cream card and balsa wood, with a scale ruler beside it",
    topic: "comparisons-and-alternatives",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "The best AI interior rendering software for professionals in 2026 depends on what you're optimizing for: raw render quality and 3D control (Foyr Neo), speed and casual iteration (RoomGPT), or rendering that's tied directly to real, sourceable furniture rather than AI-invented pieces (Mink). Here's how the leading approaches actually compare on the dimensions that matter for client-facing work.",
      },
      {
        type: "heading",
        text: 'What "good" rendering software actually means for a working designer',
      },
      "Outside of a demo video, three things determine whether a rendering tool is actually useful in professional practice:",
      {
        type: "list",
        items: [
          "**Turnaround time.** A render that takes twenty minutes still needs to fit into a real client meeting or project timeline — the gap between \"AI rendering exists\" and \"AI rendering is fast enough to use live\" matters more than raw image quality in many cases.",
          "**Proportional accuracy.** A photorealistic image that doesn't respect a room's actual dimensions, window placement, and doorway locations isn't useful for real construction or procurement decisions, no matter how polished it looks.",
          "**Whether the furniture is real.** This is the dividing line in the category. Some tools generate furniture from a style prompt — visually convincing, but not tied to anything a designer can actually order. Others render using real, purchasable products from actual vendor inventory, which means the render doubles as a sourcing tool, not just a picture.",
        ],
      },
      { type: "heading", text: "How the leading tools compare" },
      "**Foyr Neo** offers the deepest professional rendering feature set in the category — full 2D-to-3D workflow, a large library of real-brand furniture models, and 4K output built for client presentations. The tradeoff is a genuinely steep learning curve and a higher price point, which makes sense for firms whose primary deliverable is the render itself, and less sense for firms where rendering is one step among several.",
      "**RoomGPT** wins on speed and accessibility — near-instant redesigns from a photo, with essentially no learning curve. It's not built for precise proportions or final client deliverables, and it's honest about that positioning; it's a fast ideation tool, not a professional rendering suite.",
      "**Mink** takes a different approach: floorplan-to-render visualization that's connected directly to real vendor inventory from the start, so the render isn't a standalone image — it's tied to actual, purchasable products across hundreds of trade brands and 260+ showrooms, which means the same step that produces the visual also produces a sourceable spec.",
      { type: "heading", text: "Comparison at a glance" },
      {
        type: "table",
        columns: ["", "Foyr Neo", "RoomGPT", "Mink"],
        rows: [
          [
            "Render depth",
            "Full 3D, architectural-grade",
            "Fast, casual 2D redesign",
            "Photorealistic, floorplan-based",
          ],
          [
            "Furniture source",
            "Real-brand 3D model library",
            "AI-generated",
            "Real inventory, 260+ showrooms",
          ],
          ["Speed", "Slower, more control", "Fastest", "Minutes"],
          ["Learning curve", "Steep", "Minimal", "Moderate"],
          [
            "Post-render workflow",
            "Presentation-focused",
            "None",
            "Sourcing, spec docs, order tracking",
          ],
        ],
      },
      { type: "heading", text: "The tradeoff every designer should weigh" },
      "The more control and rendering depth a tool offers, the more time it takes to learn and use well. The faster and simpler a tool is, the less precise and less client-ready the output tends to be. The category is genuinely split along this line, and there isn't a tool yet that maximizes both simultaneously — which is why the right answer depends on whether rendering quality itself is your bottleneck, or whether it's what happens with the render afterward.",
      {
        type: "faq",
        items: [
          {
            question:
              "What's the highest-quality AI interior rendering software available?",
            answer:
              "Among dedicated rendering suites, tools like Foyr Neo are built specifically around rendering depth and 3D control, with the tradeoff of a steeper learning curve and higher cost.",
          },
          {
            question:
              "What's the fastest AI rendering tool for interior design?",
            answer:
              "Photo-based tools like RoomGPT are built for speed and minimal setup, though they trade off precision and aren't intended for final, client-ready deliverables.",
          },
          {
            question:
              "Does rendering software matter if I already have a procurement workflow?",
            answer:
              "It depends on whether your rendering tool connects to real, sourceable inventory. A render disconnected from actual products still requires manual work afterward to match the design to something orderable.",
          },
          {
            question:
              "Is there a rendering tool that also handles sourcing and ordering?",
            answer:
              "Some procurement-focused platforms, including Mink, build rendering into a broader workflow connected to real vendor inventory, so the same output that serves as a client visual also feeds directly into sourcing and order tracking.",
          },
        ],
      },
    ],
  },
  {
    slug: "mink-vs-foyr-neo",
    title: "Mink vs. Foyr Neo: A Procurement-First Alternative",
    description:
      "Mink vs. Foyr Neo — an honest comparison of a professional rendering suite versus a procurement-first AI platform for trade designers.",
    category: "Comparison",
    date: "2026-08-01",
    readingTime: "5 min read",
    image: "/blog/mink-vs-foyr-neo.png",
    imageAlt:
      "An architectural scale model of a room beside a neat stack of spec documents, a charcoal folder and material swatches",
    topic: "comparisons-and-alternatives",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "Foyr Neo is a full professional rendering suite — 2D floor plans, 3D modeling, and photorealistic renders in one cloud-based tool, with a large library of real-brand furniture models. Mink is a procurement agent — built around vendor sourcing, spec documents, invoicing, and order tracking, with rendering as one step in that workflow rather than the primary product. If you're comparing the two as a \"Foyr Neo alternative,\" the honest starting point is understanding they're solving overlapping but genuinely different problems.",
      },
      { type: "heading", text: "Where Foyr Neo genuinely wins" },
      "To be direct about it: Foyr Neo's rendering depth is a real strength. It combines elements of traditional CAD and rendering software with AI assistance, offers an extensive furniture library sourced from real brands, and produces high-resolution output built for professional client presentations. For designers whose primary need is architectural-grade visualization — 3D walkthroughs, detailed material control, high-fidelity renders — Foyr Neo's feature depth is hard to match with a lighter-weight tool. That capability comes with a real learning curve and a price point that reflects the depth of the toolset.",
      { type: "heading", text: "Where Mink is built differently" },
      "Foyr Neo's workflow ends, functionally, at the render — a polished 4K image ready for a client meeting. What happens after the client says yes is a separate problem: sourcing the actual products, building a spec document, generating an invoice, and tracking each item through delivery across potentially a dozen different vendors. That's the specific gap Mink is built to close, matching a captured design intent to real inventory across hundreds of trade brands and 260+ showrooms, then carrying the project through to order tracking and one-click exports.",
      { type: "heading", text: "Side-by-side comparison" },
      {
        type: "table",
        columns: ["", "Foyr Neo", "Mink"],
        rows: [
          [
            "Core function",
            "Full 2D/3D rendering suite",
            "AI procurement agent",
          ],
          [
            "Furniture library",
            "60,000+ real-brand 3D models",
            "Real products across 260+ showrooms, hundreds of trade brands",
          ],
          [
            "Learning curve",
            "Steep — full design suite",
            "Lighter — moodboard-driven intent capture",
          ],
          [
            "Post-render workflow",
            "Ends at the render/presentation",
            "Spec documents, invoicing, order tracking",
          ],
          [
            "Vendor customization",
            "Not the core focus",
            "Prioritize favorite showrooms, remove vendors you don't use",
          ],
          [
            "Best for",
            "Firms needing architectural-grade rendering as the primary deliverable",
            "Firms and freelancers losing time to procurement and admin work",
          ],
        ],
      },
      { type: "heading", text: "Who should actually choose which" },
      "**Choose Foyr Neo if:** rendering quality and presentation polish are your primary bottleneck, and you have the time to invest in learning a full professional design suite.",
      "**Choose Mink if:** your projects already get approved on the strength of your design work, but the hours afterward — vendor sourcing, spec creation, invoicing, order tracking — are what's actually costing you time. Industry estimates put that procurement and admin work at roughly 40% of a designer's total time, most of it non-billable.",
      "**Consider using both.** Many working designers already pair a dedicated rendering tool with separate project or procurement tools — Foyr Neo for the visual presentation, Mink for what happens once the client signs off.",
      { type: "heading", text: "The bottom line" },
      'Foyr Neo and Mink aren\'t really substitutes for each other so much as they\'re solving different halves of the same project. If your search for a "Foyr Neo alternative" is really a search for something more affordable that still renders well, there are lighter rendering tools worth comparing. If it\'s a search for a way to stop losing hours to the procurement side of the business after the design is approved, that\'s the problem Mink is specifically built to solve.',
      {
        type: "faq",
        items: [
          {
            question: "Is Mink cheaper than Foyr Neo?",
            answer:
              "Pricing structures differ meaningfully because the tools serve different core functions — check current pricing pages directly for both, since Foyr Neo's cost reflects a full professional rendering suite while Mink's reflects procurement and sourcing automation.",
          },
          {
            question: "Can Mink replace Foyr Neo's rendering capabilities?",
            answer:
              "Mink includes floorplan-to-render visualization, but it isn't built to match a dedicated architectural rendering suite's depth of 3D modeling and material control. Designers who need that level of rendering fidelity as their primary deliverable may still want a dedicated rendering tool.",
          },
          {
            question: "Does Foyr Neo handle vendor sourcing and order tracking?",
            answer:
              "Foyr Neo's core strength is rendering and design visualization rather than procurement — check its current feature set directly, but it's not primarily built around matching designs to real vendor inventory or tracking multi-vendor orders.",
          },
          {
            question: "Which tool has a lower learning curve?",
            answer:
              "Mink's moodboard-driven intent capture is designed to be lighter-weight than a full 2D/3D design suite. Foyr Neo's depth comes with a genuinely steeper learning curve, by its own positioning as a professional-grade tool.",
          },
        ],
      },
    ],
  },
  {
    slug: "mink-vs-interiorai",
    title: "Mink vs. InteriorAI: Which Is Built for Professional Designers?",
    description:
      "Mink vs. InteriorAI — an honest comparison for professional designers deciding between quick AI renders and a full procurement platform.",
    category: "Comparison",
    date: "2026-07-31",
    readingTime: "5 min read",
    image: "/blog/mink-vs-interiorai.png",
    imageAlt:
      "A single curled photographic print beside an organized set of cream spec sheets, material swatches and a brass paperclip",
    topic: "comparisons-and-alternatives",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: 'InteriorAI and Mink solve different problems for different users: InteriorAI is built for fast, accessible room renders, while Mink is built for professional designers managing real client projects — from vendor sourcing through order tracking and invoicing. If you\'re searching for an "InteriorAI alternative" because you need more than a quick render, here\'s the honest comparison.',
      },
      { type: "heading", text: "What InteriorAI does well" },
      'InteriorAI\'s core strength is accessibility — a simple, low-friction way to generate customizable room renders without a steep learning curve or a big time investment. For quick style exploration or budget-conscious visualization, it\'s a genuinely useful entry point. It\'s a fair choice for anyone whose need stops at "show me what this room could look like."',
      { type: "heading", text: "Where the two platforms diverge" },
      "The honest answer is that InteriorAI and Mink aren't really competing for the same job. InteriorAI is a rendering tool. Mink is a procurement platform built around Ora, its AI agent — the render is one step in a longer workflow that includes matching a design to real, purchasable products across hundreds of trade vendors, generating client-ready spec documents and invoices, and tracking every order through delivery.",
      "For a homeowner exploring what their living room could look like, that difference doesn't matter much. For a working designer managing multiple client projects across a dozen showrooms, it's the difference between a nice picture and an actual time-saving tool.",
      { type: "heading", text: "Side-by-side comparison" },
      {
        type: "table",
        columns: ["", "InteriorAI", "Mink"],
        rows: [
          [
            "Core function",
            "AI-generated room renders",
            "AI procurement agent (sourcing, spec docs, invoicing, order tracking)",
          ],
          [
            "Furniture source",
            "Style-prompt-generated",
            "Real products from 260+ showrooms, hundreds of trade brands",
          ],
          [
            "Client deliverables",
            "Rendered images",
            "Spec documents, itemized invoices, order tracking",
          ],
          [
            "Vendor customization",
            "Not applicable",
            "Prioritize favorite showrooms, remove vendors you don't use",
          ],
          [
            "Best for",
            "Quick visual concepts, budget exploration",
            "Working designers managing real client procurement",
          ],
          [
            "Data ownership",
            "Check current terms",
            "Your renders, floorplans, and selections stay fully yours",
          ],
        ],
      },
      { type: "heading", text: "Who should actually choose which" },
      "**Choose InteriorAI if:** your bottleneck is fast, low-cost visualization and you're not managing the procurement side of a client project through the platform.",
      "**Choose Mink if:** you're a professional designer or design firm losing time to vendor sourcing, spec documents, invoicing, or order tracking — the administrative work that industry estimates put at roughly 40% of a designer's total time, most of it non-billable.",
      { type: "heading", text: "The bottom line" },
      'If you landed here searching for an "InteriorAI alternative," it\'s worth being precise about what you actually need more of. If it\'s better or faster rendering, InteriorAI already does that job reasonably well, and other rendering-focused tools may be worth comparing too. If what you actually need is a way to stop manually chasing vendor availability and building spec sheets by hand, that\'s a different category of tool entirely — and it\'s the one Mink is built for.',
      {
        type: "faq",
        items: [
          {
            question: "Is Mink a direct replacement for InteriorAI?",
            answer:
              "Not exactly — they serve different primary functions. InteriorAI focuses on generating renders; Mink focuses on procurement automation, with rendering as one part of a longer workflow. Designers who need both may end up using tools from each category.",
          },
          {
            question: "Does Mink generate renders like InteriorAI does?",
            answer:
              "Yes — Mink includes floorplan-to-render visualization as part of its workflow, but the core differentiator is what happens after the render: real vendor sourcing, spec documents, invoicing, and order tracking.",
          },
          {
            question:
              "Which tool is better for a professional client presentation?",
            answer:
              "It depends on what the presentation needs to accomplish. If it's purely visual, either tool's rendering capability may suffice. If the presentation needs to lead directly into an approved order with real, purchasable products and a formal spec document, Mink's workflow is built specifically for that handoff.",
          },
          {
            question: "Can I use real vendor products in InteriorAI renders?",
            answer:
              "This depends on InteriorAI's current feature set and licensing terms — check directly. Mink's sourcing is built around real inventory from an actual vendor network by default.",
          },
        ],
      },
    ],
  },
  {
    slug: "mink-vs-roomgpt",
    title: "Mink vs. RoomGPT: More Than a Room Generator",
    description:
      "Mink vs. RoomGPT — why professional designers need more than a fast room generator, and where each tool actually fits.",
    category: "Comparison",
    date: "2026-07-25",
    readingTime: "5 min read",
    image: "/blog/mink-vs-roomgpt.png",
    imageAlt:
      "An open sketchbook showing a loose pencil drawing of a room beside a row of neatly tabbed cream folders",
    topic: "comparisons-and-alternatives",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: 'RoomGPT is built for speed and simplicity — upload a photo, get an AI-reimagined version of the room in a chosen style, in seconds. It\'s a genuinely good tool for what it\'s built to do: fast, casual, low-stakes room ideation. It was never built to be a professional procurement or client-management platform, which is the gap most designers searching for a "RoomGPT alternative" are actually trying to fill.',
      },
      { type: "heading", text: "What RoomGPT gets right" },
      'Give RoomGPT its due: it strips AI room redesign down to the essentials, and for the earliest "what if we tried a different direction" stage of a project — or for a quick, fun way to warm up a client conversation before real design work begins — it does exactly what it\'s supposed to do, with almost no learning curve.',
      { type: "heading", text: "Where the comparison breaks down" },
      "RoomGPT is not, and doesn't claim to be, a tool for final client deliverables, precise proportions, or sourcing real furniture. It's a fast concept generator, not a procurement platform. Comparing it directly to Mink is a bit like comparing a sketch pad to a project management system — they're both useful, but at completely different stages of a project and for completely different problems.",
      "Mink starts where RoomGPT's usefulness ends: capturing a real design intent from a moodboard, matching it to actual purchasable products across hundreds of trade brands and 260+ showrooms, generating client-ready spec documents and invoices, and tracking every order across every vendor through delivery.",
      { type: "heading", text: "Side-by-side comparison" },
      {
        type: "table",
        columns: ["", "RoomGPT", "Mink"],
        rows: [
          [
            "Core function",
            "Fast, casual AI room redesign from a photo",
            "AI procurement agent for professional projects",
          ],
          [
            "Furniture source",
            "AI-generated, not tied to real inventory",
            "Real products across 260+ showrooms",
          ],
          [
            "Intended user",
            "Homeowners, early-stage ideation",
            "Professional designers and firms",
          ],
          [
            "Client deliverables",
            "A single stylized image",
            "Spec documents, itemized invoices, order tracking",
          ],
          [
            "Best for",
            'Quick "what if" exploration',
            "Managing a full project from sourcing to delivery",
          ],
        ],
      },
      { type: "heading", text: "Who should actually choose which" },
      "**Choose RoomGPT if:** you want a fast, low-cost way to explore a style direction before committing real time to a project — it's genuinely well suited to that specific job.",
      '**Choose Mink if:** you\'re a working designer managing real client procurement — vendor sourcing, spec creation, invoicing, order tracking — which industry estimates put at roughly 40% of a designer\'s total time, most of it non-billable. That\'s a fundamentally different problem than "show me a redesigned photo," and it needs a different kind of tool.',
      { type: "heading", text: "The bottom line" },
      'If your search for a "RoomGPT alternative" is about wanting better or more customizable renders, there are other rendering-focused tools worth comparing directly. But if what you actually need is to stop manually chasing vendor availability, building spec sheets by hand, and reconciling invoices across a dozen showrooms after the design is approved, that\'s not a rendering problem — it\'s a procurement problem, and it\'s the one Mink was built to solve.',
      {
        type: "faq",
        items: [
          {
            question:
              "Is RoomGPT suitable for professional client presentations?",
            answer:
              "It's better suited to early-stage, casual ideation than to final, client-ready deliverables — RoomGPT itself is positioned around speed and simplicity rather than professional presentation polish or precise, purchasable furniture.",
          },
          {
            question: "Does RoomGPT source real, purchasable furniture?",
            answer:
              "Generally no — it generates stylized reimaginings of a room rather than matching design output to actual vendor inventory, which is a core difference from procurement-focused tools like Mink.",
          },
          {
            question: "Can I use RoomGPT and Mink together?",
            answer:
              "Yes, and many designers effectively do use a fast ideation tool for early client conversations alongside a separate tool for the procurement and order-management side of an approved project.",
          },
          {
            question:
              "What's the biggest gap between RoomGPT and a professional procurement platform?",
            answer:
              "RoomGPT stops at a generated image. A procurement platform continues the workflow through real vendor sourcing, spec document creation, invoicing, and order tracking — the parts of a project that happen after a design concept is approved.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-tools-for-interior-designers",
    title: "AI Tools for Interior Designers: The Complete 2026 Guide",
    description:
      "A practical, category-by-category guide to AI tools for interior designers in 2026 — what each type actually does, who it's for, and where procurement automation fits.",
    category: "Guide",
    date: "2026-08-04",
    readingTime: "7 min read",
    image: "/blog/ai-tools-guide.jpg",
    imageAlt:
      "A bright open-plan living room with a pale linen sofa, warm oak stair treads and a brass pendant light",
    imageCredit: "Photo via Pexels",
    topic: "ai-and-design",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "Interior designers now have access to four distinct categories of AI tools — rendering and visualization, moodboard and concept generation, project and client management, and procurement or sourcing automation — and most firms only know about the first two. This guide breaks down what each category actually does, which tools lead it, and where the real time savings are hiding.",
      },
      {
        type: "heading",
        text: 'Why "AI for interior design" means four different things',
      },
      'Search for "AI interior design software" and you\'ll get a flood of tools that all sound similar but solve completely different problems. Before evaluating anything, it helps to sort them into what they\'re actually built to do:',
      {
        type: "list",
        items: [
          '**Rendering and visualization** — turns a floorplan, sketch, or photo into a photorealistic image. This is the most crowded category and the one most people mean when they say "AI design tool."',
          "**Moodboard and concept generation** — takes a style reference or a few uploaded images and generates design directions, color palettes, or furniture pairings.",
          "**Project and client management** — timelines, budgets, approvals, and communication threads, with AI layered on for summarization or scheduling.",
          "**Procurement and sourcing** — matches design intent to real, purchasable products from actual vendors, tracks orders, and generates client-ready specs and invoices.",
        ],
      },
      "Most tools on the market live in the first two categories. That's not an accident — rendering is the most visually impressive demo, and it's what non-professionals search for. But it's also not where most of a working designer's time actually goes.",
      {
        type: "heading",
        text: "The category that's underserved: procurement",
      },
      'Ask any working designer where their hours disappear and the answer is rarely "coming up with ideas." It\'s chasing vendor availability, building spec sheets, reconciling invoices across a dozen showrooms, and tracking whether the sofa that was supposed to ship three weeks ago actually shipped. Industry estimates put procurement and administrative work at roughly [**40% of a designer\'s total time**](/blog/the-40-percent-problem) — and the bulk of it is non-billable. That imbalance is the gap AI rendering tools were never built to close, because generating a beautiful image of a room doesn\'t get furniture ordered, tracked, or invoiced.',
      "This is the specific problem Mink is built around: not another way to generate a pretty render, but Ora, an AI procurement agent that takes a design intent (a moodboard, a floorplan, a style brief) and does the sourcing, vendor matching, and order tracking that eats the other 40%.",
      {
        type: "heading",
        text: "What to actually look for in an AI design tool",
      },
      "Whichever category you're evaluating, four questions separate the tools worth paying for from the novelty ones:",
      "**Does it work with real, purchasable products, or generic AI-generated furniture?** A stunning render of a sofa that doesn't exist in any showroom is not useful for client presentations or actual procurement — it's a mockup you'll have to redo by hand.",
      "**Does it integrate with your actual vendor relationships?** Designers work within specific showrooms and trade brands. A tool that can't be pointed at *your* vendor list, or that can't exclude vendors you don't work with, adds friction instead of removing it.",
      "**Does the output become a deliverable, or just a pretty picture?** Client-ready spec documents, itemized invoices, and order tracking are what actually save time. A render you have to manually rebuild into a proposal is only solving half the problem.",
      "**Who owns the output?** Ask directly whether your renders, floorplans, and client selections are used to train the underlying model, sold, or shared with third parties. For a profession built on client trust and proprietary sourcing relationships, this matters more than it does in most software categories.",
      { type: "heading", text: "How the categories stack up" },
      {
        type: "table",
        columns: ["Category", "Best for", "What it won't do"],
        rows: [
          [
            "Rendering & visualization",
            "Fast concept presentations, early client buy-in",
            "Doesn't source real products or manage the order",
          ],
          [
            "Moodboard/concept generation",
            "Early-stage ideation, style exploration",
            "Rarely ties back to purchasable, vendor-specific inventory",
          ],
          [
            "Project management",
            "Timelines, approvals, communication",
            "Doesn't automate the sourcing or vendor matching itself",
          ],
          [
            "Procurement/sourcing (Mink)",
            "Vendor matching, spec docs, invoicing, order tracking",
            "Not a substitute for photorealistic architectural rendering",
          ],
        ],
      },
      "Most firms will end up using tools from more than one category. The mistake is assuming a rendering tool and a procurement tool solve the same problem — they don't, and the 40% of time lost to admin work is specifically the procurement gap.",
      {
        type: "faq",
        items: [
          {
            question:
              "What's the difference between an AI rendering tool and an AI procurement tool?",
            answer:
              "A rendering tool generates a photorealistic image of a design concept. A procurement tool takes that concept and matches it to real, purchasable products from your actual vendors, then handles the ordering, tracking, and invoicing around it.",
          },
          {
            question:
              "Do interior designers actually need AI tools, or is this overhyped?",
            answer:
              "It depends on where your time goes. If concept generation and client presentations are your bottleneck, rendering tools help. If vendor sourcing, spec documents, and order tracking eat your week, that's a different — and for most working designers, larger — problem, and it's the one procurement-focused tools are built to solve.",
          },
          {
            question: "Is AI-generated design content safe to use with clients?",
            answer:
              "Check licensing terms carefully. Many free-tier AI rendering tools restrict commercial use of their outputs. For any tool you plan to use in paid client work, confirm you retain full rights to what you create before you build a presentation around it.",
          },
          {
            question:
              "How much time can procurement automation actually save a design firm?",
            answer:
              "With roughly 40% of a typical designer's time going to procurement and admin — most of it non-billable — even partial automation of vendor sourcing, spec creation, and order tracking translates directly into more billable design hours per week.",
          },
        ],
      },
    ],
  },
  {
    slug: "how-to-use-ai-in-interior-design",
    title: "How to Use AI in Interior Design: A Step-by-Step Workflow",
    description:
      "A step-by-step walkthrough of using AI across a real interior design project — from moodboard to sourcing to a client-ready spec document.",
    category: "How-To",
    date: "2026-07-28",
    readingTime: "7 min read",
    image: "/blog/ai-workflow-steps.png",
    imageAlt:
      "An overhead flat lay of oak veneer, terracotta tile, folded linen, a brass strip and limestone samples beside a stack of spec sheets",
    topic: "how-to-and-workflows",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "Using AI in interior design isn't one action — it's a sequence of five stages that map to a real project: capturing design intent, sourcing products, filling the room, tracking orders, and exporting client-ready documents. Here's what each stage actually looks like in practice.",
      },
      {
        type: "heading",
        text: "Step 1: Capture design intent from a moodboard",
      },
      "Most projects start the same way — a handful of reference images, a Pinterest board, or photos a client sends over. The first job for AI in this workflow is translating that visual reference into something structured: a style direction, a material palette, a sense of scale and proportion.",
      'In practice, this means uploading a small set of mood images (three or four is usually enough) and letting the system extract the underlying design intent — the difference between "warm minimalism with natural wood tones" and "coastal grandmother with heavy texture," for instance — rather than you writing a design brief from scratch.',
      "**What to watch for:** the quality of intent capture depends entirely on the quality of your input images. Curate a tight, consistent moodboard rather than a scattershot one; ambiguous input produces ambiguous sourcing later in the process.",
      {
        type: "heading",
        text: "Step 2: Source real products from vendors you actually work with",
      },
      "This is where most AI design tools stop being useful for professionals, because they generate furniture that doesn't exist anywhere you can buy it. The workflow that actually saves time sources from your real vendor list — hundreds of trade brands across a network of showrooms — and matches products to your captured design intent with a relevance score, not a generic style tag.",
      "A good sourcing step should let you:",
      {
        type: "list",
        items: [
          "Prioritize showrooms you already have relationships with",
          "Remove vendors you don't do business with, so they never surface again",
          "See a match percentage against your brief, not just a visual guess",
        ],
      },
      "This step is the actual time-saver. Manually cross-referencing a design concept against a dozen showroom catalogs is exactly the kind of non-billable admin work that eats a disproportionate share of a designer's week.",
      {
        type: "heading",
        text: "Step 3: Fill the room and compare before/after",
      },
      "Once products are sourced, the next step is placing them into the actual space — not a generic render, but the specific room you're designing for, so you and your client can compare an empty (or dated) room against the finished design side by side.",
      'This is the step that closes the gap between "here\'s a moodboard" and "here\'s what your kitchen will actually look like with these specific pieces in it." A drag-to-compare view of before and after tends to be far more persuasive in client meetings than a moodboard alone, because it\'s tied to real, orderable products rather than aspirational inspiration images.',
      {
        type: "heading",
        text: "Step 4: Track every order across every vendor",
      },
      "Once a client approves a design, the sourcing step becomes a procurement problem: multiple vendors, multiple shipping timelines, multiple invoices. This is the stage most design software ignores entirely, even though it's often the most time-consuming part of the project for the designer.",
      "An order-tracking view that shows every item's status — delivered, out for delivery, in transit — across every vendor in one place removes the need to manually check in with each showroom separately. For firms managing several concurrent projects, this alone can reclaim hours per week that would otherwise go to status-check emails and phone calls.",
      {
        type: "heading",
        text: "Step 5: Export client-ready documents in one click",
      },
      "The last step is turning the project into deliverables: a spec document, an itemized client invoice, and a clean visualization file, all formatted and ready to send — not a set of screenshots you have to manually assemble into a PDF the night before a client meeting.",
      "This is a small step in a list of five, but it's often the one that determines whether a design tool actually gets used past the first project. If every stage upstream is automated but the final deliverable still requires an hour of manual formatting, most designers will quietly stop using the tool.",
      { type: "heading", text: "Putting it together" },
      'The workflow above — capture intent, source, fill and compare, track, export — is the difference between "using AI to make a pretty picture" and using AI to actually reclaim time in a real project. The rendering step gets the attention because it\'s the most visually impressive part of the demo. The sourcing, tracking, and export steps are where the actual hours get saved, because they replace work that was previously manual, repetitive, and non-billable.',
      {
        type: "faq",
        items: [
          {
            question:
              "What's the first step in using AI for an interior design project?",
            answer:
              "Capturing design intent — typically from a small set of moodboard images — so the system has a clear style and material direction to work from before any product sourcing begins.",
          },
          {
            question:
              "Can AI source real, purchasable furniture, or just generate images?",
            answer:
              "It depends on the tool. Rendering-focused tools generate images of furniture that may not exist in any catalog. Procurement-focused tools, by contrast, match design intent to real products from actual trade vendors, which is what makes the output usable for an actual client order.",
          },
          {
            question:
              "How long does an AI-assisted design workflow take, start to finish?",
            answer:
              "Moodboard capture and initial sourcing can happen in minutes. The overall project timeline still depends on vendor lead times and client approval cycles — AI compresses the design and sourcing work, not the physical shipping and installation timeline.",
          },
          {
            question:
              "Do I still need to manually build spec documents and invoices?",
            answer:
              "Not if the tool includes an export step. One-click exports for spec documents, itemized invoices, and visualizations remove the manual formatting work that otherwise falls at the end of every project.",
          },
        ],
      },
    ],
  },
  {
    slug: "what-is-ai-interior-design-software",
    title: "What Is AI Interior Design Software? (And Do You Actually Need One)",
    description:
      "What AI interior design software actually does, who benefits most, and the honest case for when you don't need one.",
    category: "Explainer",
    date: "2026-07-21",
    readingTime: "6 min read",
    image: "/blog/ai-design-software.jpg",
    imageAlt:
      "A caned folding chair beside a marble and brass side table with a single magnolia stem, on a herringbone oak floor",
    imageCredit: "Photo via Pexels",
    topic: "ai-agents-explained",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "AI interior design software is a category of tools that use machine learning to automate some part of the design process — most commonly generating renders from a floorplan or photo, but increasingly also matching design concepts to real products and automating the procurement and order-tracking work behind a project. Not every designer needs one, and the honest answer depends entirely on where your time currently goes.",
      },
      { type: "heading", text: "What these tools actually do" },
      'Strip away the marketing and "AI interior design software" almost always does one or more of the following:',
      {
        type: "list",
        items: [
          "**Generates a photorealistic image** of a room from a floorplan, sketch, or photo, based on a style prompt or reference images",
          "**Suggests furniture and layout changes** based on the space and a stated style direction",
          "**Matches design concepts to real, purchasable products** from actual vendors, rather than generating placeholder furniture",
          "**Automates procurement work** — vendor sourcing, spec documents, invoicing, and order tracking — that sits downstream of the design decision itself",
        ],
      },
      "Most tools in the category do the first two well. Fewer do the third and fourth, which is where the software stops being a visualization aid and starts being an actual workflow replacement for hours of admin work.",
      { type: "heading", text: "Who benefits most" },
      "**Firms managing high order volume across multiple vendors.** If a big share of your week goes to chasing showroom availability, building spec sheets, and reconciling invoices, procurement-focused AI tools solve a real, measurable problem — not a nice-to-have.",
      "**Freelancers without support staff.** Solo practitioners feel the cost of manual admin work more acutely than firms with a coordinator, because there's no one else to hand it to. Automating sourcing and order tracking directly recovers billable hours.",
      "**Firms that present a lot of early-stage concepts.** If client acquisition depends on fast, polished visuals before a contract is signed, rendering tools shorten the sales cycle meaningfully.",
      { type: "heading", text: "Who probably doesn't need it (yet)" },
      "**Designers whose bottleneck is genuinely creative, not administrative.** If concept generation isn't where your time goes, a rendering tool won't move the needle much — the honest use case for AI here is time savings on repeatable work, not a replacement for design judgment.",
      "**Very small, low-volume practices with established vendor relationships.** If you're managing one or two projects at a time with vendors you already know well, the procurement automation case is weaker; the tooling pays off fastest when scale or complexity is already creating friction.",
      "**Anyone unwilling to vet data and licensing terms.** AI tools vary wildly in what they do with your uploaded floorplans, client photos, and design selections. If you're not willing to check those terms, it's worth pausing before adopting any tool in this category — professional and client trust is on the line, not just convenience.",
      {
        type: "heading",
        text: "The question that matters most: what happens to your data",
      },
      "Interior design runs on trust — client budgets, unreleased floorplans, proprietary vendor relationships. Before adopting any AI design tool, ask directly:",
      {
        type: "list",
        items: [
          "Is your data ever sold or shared with third parties?",
          "Do you retain full ownership of the designs, renders, and selections you create?",
          "Is your project data encrypted, and is it ever shared across other accounts or used to train the underlying model without consent?",
        ],
      },
      "A tool that can't answer these clearly shouldn't be handling client floorplans, no matter how good the renders look in a demo.",
      { type: "heading", text: "The honest bottom line" },
      'AI interior design software is genuinely useful, but "useful" depends entirely on which part of the category you\'re evaluating. Rendering tools save time on visualization and client presentations. Procurement-focused tools save time on the vendor sourcing, spec documents, and order tracking that make up the less glamorous — and often larger — share of a designer\'s actual week. Know which problem you\'re trying to solve before you evaluate which tool solves it.',
      {
        type: "faq",
        items: [
          {
            question: "What does AI interior design software actually mean?",
            answer:
              "It's an umbrella term covering tools that use AI to generate renders, suggest layouts, match design concepts to real products, or automate the procurement and order-tracking work of a project. The specific capabilities vary widely between tools.",
          },
          {
            question:
              "Is AI interior design software only for professionals, or can homeowners use it too?",
            answer:
              "Both, but the tools differ. Consumer-facing tools focus on quick, casual room redesigns for inspiration. Professional-grade tools focus on client-ready output, real vendor sourcing, and workflow features like invoicing and order tracking that a homeowner redesigning one room doesn't need.",
          },
          {
            question: "Does AI interior design software replace an interior designer?",
            answer:
              "No — it automates specific tasks (rendering, sourcing, admin) within a design process that still requires professional judgment, client relationships, and design expertise. The tools that succeed with professionals position themselves as removing busywork, not replacing the designer.",
          },
          {
            question:
              "What should I check before trusting an AI tool with client project data?",
            answer:
              "Confirm whether your data is ever sold or shared with third parties, whether you retain full ownership of what you create, and whether project files are encrypted and kept separate across accounts.",
          },
        ],
      },
    ],
  },
  {
    slug: "the-40-percent-problem",
    title:
      "The 40% Problem: Why Interior Designers Spend Almost Half Their Time on Procurement, Not Design",
    description:
      "Nearly 40% of an interior designer's time goes to procurement and admin, not design — and most of it is unbillable. Here's where the hours actually go.",
    category: "Research",
    date: "2026-07-14",
    readingTime: "6 min read",
    image: "/blog/procurement-time.png",
    imageAlt:
      "A tall untidy stack of cream paper documents beside a small neat stack, a brass paperclip and a charcoal folder on plaster",
    topic: "ai-and-design",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "Roughly 40% of a working interior designer's time goes to procurement and administrative work — sourcing vendors, building spec documents, tracking orders, and reconciling invoices — and the bulk of it is non-billable. That means for every ten-hour week a designer bills a client, they've likely spent another six or seven hours on work the client never sees and never pays for directly.",
      },
      { type: "heading", text: "Where the hours actually go" },
      'Break down "procurement and admin" and it stops being an abstraction:',
      "**Vendor sourcing.** Cross-referencing a design concept against catalogs from a dozen or more showrooms, checking availability, comparing lead times — done manually, this is one of the single largest time sinks in a project.",
      "**Spec document creation.** Every approved design needs a formal specification: item names, SKUs, dimensions, pricing, vendor details. Built by hand, this is hours of formatting work per project, repeated for every client.",
      "**Invoicing.** Itemizing costs across multiple vendors, applying markups correctly, and producing something client-ready — a task that's mechanical but unforgiving of errors.",
      "**Order tracking.** Once a project is approved, someone has to actually know whether the sofa shipped, whether the lighting fixture is delayed, and whether the client needs to be told before they ask. Across multiple vendors and multiple concurrent projects, this becomes a full logistics job layered on top of design work.",
      "None of this is design work in the sense that got most people into the profession. It's operations work that happens to sit inside a design business.",
      { type: "heading", text: "Why this imbalance persists" },
      "Design software has historically optimized for the most visible, most demo-able part of the job: renders, mood boards, 3D walkthroughs. It's the part that photographs well for a portfolio and looks impressive in a sales pitch. Procurement and order logistics, by contrast, are invisible to clients and unglamorous to build software around — which is exactly why the tooling gap has persisted even as rendering technology has matured rapidly.",
      "The result is a profession where the tools have gotten dramatically better at the 60% of the work that's genuinely creative, and have largely ignored the 40% that isn't — even though that 40% is often the difference between a profitable project and a break-even one, once real hours are accounted for.",
      { type: "heading", text: "What closing the gap actually looks like" },
      "The fix isn't better renders — most firms already have access to rendering tools that are good enough. The fix is automating the parts of procurement that are repetitive and rules-based: matching a design concept to real vendor inventory, generating spec documents and invoices without manual formatting, and centralizing order status across every vendor in a project instead of checking each one separately.",
      "This is the specific gap Mink is built to close — not another rendering tool, but Ora, a procurement agent that handles vendor sourcing, spec documents, invoicing, and order tracking end to end, so the 40% shrinks and the time goes back to actual design work.",
      { type: "heading", text: "A note on the source of this figure" },
      "This 40% figure reflects industry-level estimates of how working interior designers allocate their time between billable design work and non-billable procurement and administrative tasks. If you're citing this figure or want the underlying methodology, reach out — we're happy to share how it was calculated.",
      {
        type: "faq",
        items: [
          {
            question:
              "How much of an interior designer's time goes to non-design work?",
            answer:
              "Roughly 40%, based on industry estimates of time spent on procurement and administrative tasks — vendor sourcing, spec documents, invoicing, and order tracking — the majority of which is non-billable.",
          },
          {
            question:
              "What specific tasks make up procurement and admin work for designers?",
            answer:
              "Primarily vendor sourcing and availability checks, building itemized spec documents, generating client invoices, and tracking order status across multiple vendors and shipping timelines.",
          },
          {
            question: "Why hasn't design software solved this already?",
            answer:
              "Most design software has focused on the most visually impressive and demo-friendly part of the job — rendering and visualization — while procurement and order logistics have remained largely manual, in part because they're less visible to clients and harder to market around.",
          },
          {
            question:
              "Can this time actually be recovered, or is it inherent to the profession?",
            answer:
              "A meaningful share of it can be automated. Vendor matching, spec and invoice generation, and centralized order tracking are all rules-based tasks that don't require the same creative judgment as the design work itself, which makes them well suited to automation.",
          },
        ],
      },
    ],
  },
  {
    slug: "sketch-to-render-ai-floorplan",
    title:
      "Sketch to Render: How AI Turns a Floorplan Into a Photorealistic Room in Minutes",
    description:
      "How AI turns a floorplan into a photorealistic room render — the process, what to expect, and where it fits into a real design workflow.",
    category: "Deep Dive",
    date: "2026-07-07",
    readingTime: "6 min read",
    image: "/blog/sketch-to-render.jpg",
    imageAlt:
      "A designer sketching with a pencil over large rolled drawings on a wooden worktable beside a laptop and scale rules",
    imageCredit: "Photo via Pexels",
    topic: "how-to-and-workflows",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      {
        type: "lead",
        text: "AI sketch-to-render tools convert a 2D floorplan into a photorealistic image of a finished room by interpreting the layout — walls, windows, doorways, proportions — and generating furnished, styled visuals that reflect a stated design direction. What used to require hours of manual 3D modeling can now happen in minutes, though the quality and usefulness of the output still depends heavily on how the tool handles real proportions and real, purchasable furniture.",
      },
      {
        type: "heading",
        text: "What actually happens between floorplan and render",
      },
      "The process breaks down into three parts, even when it looks instantaneous to the user:",
      "**1. Layout interpretation.** The system reads the floorplan — where walls, windows, and doorways sit, and the actual dimensions of the room — so the eventual render respects real scale rather than generating a generic \"room-shaped\" image.",
      "**2. Style application.** A design direction, whether from a written brief or a moodboard, determines material palette, furniture style, and lighting treatment. This is where captured design intent (see: [how designers use AI moodboards](/blog/how-to-use-ai-in-interior-design)) gets applied to the specific space.",
      "**3. Rendering.** The final photorealistic image is generated, ideally with furniture and materials that correspond to real, purchasable products rather than AI-invented pieces that don't exist in any catalog.",
      "That third step is where tools genuinely diverge. A render full of furniture that can't actually be sourced is a nice picture and not much else — the designer still has to do the real work of finding equivalent pieces from actual vendors before a client can approve and order anything.",
      {
        type: "heading",
        text: "Floorplan vs. photo: two different starting points",
      },
      "Most tools support rendering from either a floorplan or an existing photo of a space:",
      "**From a floorplan**, the tool is generating a room from scratch — useful for new construction, gut renovations, or any project where nothing exists yet to photograph.",
      "**From a photo**, the tool is modifying an existing space — useful for staging, refreshes, or showing a client what their current room could look like with new furniture and finishes, without touching the structure.",
      "Designers working across both new-build and renovation projects benefit from a tool that handles both cases well, since the two starting points require genuinely different handling under the hood.",
      {
        type: "heading",
        text: "Why turnaround time matters more than people expect",
      },
      'A render that takes twenty minutes to generate feels instantaneous compared to hand-modeling in a 3D program — but it can still be a bottleneck in an actual client meeting, where designers increasingly want to adjust a design live and see the result in real time. The gap between "AI rendering exists" and "AI rendering is fast enough to use in front of a client" is where a lot of the practical value in this category actually sits.',
      {
        type: "heading",
        text: "What to check before relying on a render for a client presentation",
      },
      "Before a render goes in front of a client, it's worth confirming:",
      {
        type: "list",
        items: [
          "Are the furniture pieces shown real, purchasable products, or AI-generated placeholders you'll have to replace?",
          "Does the render respect the actual room's proportions and window/door placement, or is it a stylized approximation?",
          "Do you have full commercial usage rights to the image for client presentations, or does the tool's license restrict paid use?",
        ],
      },
      'Skipping this check is how designers end up rebuilding a "final" render by hand the night before a client meeting, because the furniture in the AI-generated image doesn\'t actually exist anywhere.',
      { type: "heading", text: "Where rendering fits into the broader workflow" },
      "A photorealistic render is a powerful moment in a client presentation, but it's one step in a longer process. The render that gets approved still needs to become an actual order — matched to real vendor inventory, priced, tracked through delivery. Rendering tools that stop at the image leave that entire second half of the project to be done manually. This is why, at Mink, the floorplan-to-render step feeds directly into vendor sourcing and order tracking, rather than existing as a standalone visualization feature.",
      {
        type: "faq",
        items: [
          {
            question:
              "How long does it take to turn a floorplan into a photorealistic render?",
            answer:
              "With modern AI rendering, minutes rather than the hours or days required for manual 3D modeling — though actual speed varies by tool and by the complexity of the space.",
          },
          {
            question:
              "Can AI rendering tools use real, purchasable furniture instead of generic pieces?",
            answer:
              "Some can — it depends on whether the tool is connected to actual vendor inventory. Tools that generate furniture from a general style prompt often produce pieces that don't correspond to anything a designer can actually order.",
          },
          {
            question:
              "Is there a difference between rendering from a floorplan versus a photo?",
            answer:
              "Yes. Floorplan rendering generates a room from scratch and is suited to new construction or full renovations. Photo-based rendering modifies an existing space and is better suited to staging or refresh projects where the structure isn't changing.",
          },
          {
            question: "Do I own the rights to AI-generated renders I show clients?",
            answer:
              "This depends entirely on the tool's licensing terms — many free tiers restrict commercial use. Always confirm you have full rights to use the output in paid client work before building a presentation around it.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-procurement-for-interior-designers",
    title: "What AI Procurement Means for Interior Designers in 2026",
    description:
      "Sourcing furniture, fixtures, and equipment used to eat entire workdays. Here is how AI procurement agents are changing the way interior designers find products from their favorite brands.",
    category: "AI & Sourcing",
    date: "2026-05-28",
    readingTime: "6 min read",
    image: "/blog/featured-ai.png",
    imageAlt:
      "An abstract matte grey geometric sculpture casting soft shadows on warm plaster",
    topic: "ai-and-design",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      "Procurement is the quiet tax on every interior design project. Behind every beautiful room is a designer who spent hours combing through retailer catalogs, comparing trade prices, requesting samples, and assembling spec sheets by hand. That work rarely shows up in a portfolio, but it shows up in your calendar.",
      "AI procurement flips that equation. Instead of searching brand by brand, you describe what you want, or upload a render, and an AI agent identifies every element in the room and matches it to real products from vetted suppliers. The goal is simple: less time sourcing, more time designing.",
      "At Mink, our AI agent Ora reads design intent the way an experienced design assistant would. It understands that a 'warm, organic living room' implies certain materials, silhouettes, and finishes, then surfaces products that fit that brief from a network of 500+ trade vendors and your favorite retail brands.",
      "The most important part is what AI procurement does not do: it does not replace your taste. Ora handles the searching, the price requests, and the paperwork. The creative decisions, the ones your clients hire you for, stay entirely yours.",
      "As these tools mature in 2026, the designers who adopt them early gain back the hours that procurement used to consume, and they reinvest that time where it actually matters: in the design itself.",
    ],
  },
  {
    slug: "source-products-from-a-render",
    title: "How to Source Every Product in a Render in Seconds",
    description:
      "Upload your design render and let AI identify and match each element. A practical walkthrough of turning a single image into a complete, shoppable product list.",
    category: "How-To",
    date: "2026-05-14",
    readingTime: "5 min read",
    image: "/blog/featured-sourcing.png",
    imageAlt:
      "An overhead flat lay of fabric swatches, tile samples and a brass tape measure on a designer's desk",
    topic: "how-to-and-workflows",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      "A render is more than a pretty picture. It is a complete brief, packed with information about every product the room needs. The challenge has always been extracting that information and turning it into purchasable items without spending half a day on it.",
      "Here is the workflow with Mink. First, upload your render. Ora analyzes the image and identifies each element in the room, from the sofa and lighting down to the smaller decor accents.",
      "Next, Ora matches those elements to real products. For each item, it searches across 10,000+ vetted suppliers and your preferred brands, returning options that fit the look, the budget, and the availability you need.",
      "From there, you refine. Swap a match you do not love, request samples, or pull designer pricing, all without leaving the platform. When you are happy with the selections, export a fully branded, client-ready spec document in a single click.",
      "What used to be a multi-hour exercise across dozens of browser tabs becomes a focused, minutes-long task. The render does the talking, and the sourcing takes care of itself.",
    ],
  },
  {
    slug: "trade-vendors-vs-retail-sourcing",
    title: "Trade Vendors vs. Retail: Smarter Sourcing for Designers",
    description:
      "Knowing when to source from trade-only vendors and when to use retail brands can transform your margins. Here is how to think about it, and how AI makes the choice easier.",
    category: "Business",
    date: "2026-04-30",
    readingTime: "7 min read",
    image: "/blog/featured-studio.png",
    imageAlt:
      "A bright interior design studio with a drafting table, rolled drawings and a tall arched window",
    // This was the only post with no topic, so the recent grid was the sole
    // place it appeared. Now that the grid no longer repeats cluster content,
    // it needs a cluster or it would be unreachable from the index.
    topic: "how-to-and-workflows",
    author: { name: "The Mink Team", role: "Product" },
    content: [
      "Every interior designer eventually faces the same question: should this piece come from a trade vendor or a retail brand? The answer affects your margins, your lead times, and your client relationships.",
      "Trade vendors offer designer pricing and exclusive lines, but navigating dozens of separate accounts, minimums, and catalogs is its own full-time job. Retail brands are fast and familiar, but you often leave margin on the table.",
      "The smartest studios blend both, choosing the right source product by product. The hard part has always been having that comparison in front of you at the moment of decision.",
      "This is where AI procurement earns its keep. Ora surfaces both trade and retail matches side by side, so you can weigh price, availability, and fit in one view instead of toggling between portals.",
      "Sourcing well is not about always choosing the cheapest option. It is about making informed choices quickly, then getting back to the work that defines your studio.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Real, published posts belonging to a topic cluster, newest first. */
export function getPostsByTopic(topic: BlogTopicId): BlogPost[] {
  return sortByNewest(blogPosts.filter((post) => post.topic === topic));
}
