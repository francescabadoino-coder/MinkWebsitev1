"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Bot,
  Paperclip,
  Send,
  Check,
  Bell,
  Lock,
  Folder,
  User,
  Calendar,
  LayoutList,
  ImageIcon,
  FileText,
  Truck,
  Sofa,
  Users,
  Store,
} from "lucide-react";
import { MinkWordmark } from "@/components/mink-logo";

type Recommendation = {
  src: string;
  name: string;
  vendor: string;
  price: string;
};

const RECOMMENDATIONS: Recommendation[] = [
  { src: "/demo/sofa-1.png", name: "Halden Curved Sofa", vendor: "Karvet", price: "$4,280" },
  { src: "/demo/sofa-2.png", name: "Marlow Linen Three-Seat", vendor: "Brume", price: "$3,940" },
  { src: "/demo/sofa-3.png", name: "Pell Oak Sofa", vendor: "CB2", price: "$2,690" },
];

const REFERENCE_IMAGES = ["/demo/living-room-2.png"];

const PROJECT_PROMPT = "The Birchwell living room";
const SOFA_PROMPT = "Find me the best modern sofa";

// Top-nav tabs that mirror the real app chrome.
const NAV_TABS = [
  { label: "Projects", icon: Sofa, active: true },
  { label: "Clients", icon: Users, active: false },
  { label: "Brands", icon: Store, active: false },
];

// Left rail groups, matching the product's PLANNING / DESIGN / DELIVERY nav.
const SIDEBAR_GROUPS: {
  heading: string;
  items: { label: string; icon: typeof Folder }[];
}[] = [
  {
    heading: "Planning",
    items: [
      { label: "Project", icon: Folder },
      { label: "Client", icon: User },
      { label: "Calendar", icon: Calendar },
    ],
  },
  {
    heading: "Design",
    items: [
      { label: "Products", icon: LayoutList },
      { label: "Renders", icon: ImageIcon },
      { label: "Documents", icon: FileText },
    ],
  },
  {
    heading: "Delivery",
    items: [
      { label: "Proposal", icon: FileText },
      { label: "Orders", icon: Truck },
    ],
  },
];

// Phase timeline (ms durations) — the whole sequence loops.
type Phase =
  | "uploading"
  | "typing-project"
  | "show-images"
  | "typing-sofa"
  | "thinking"
  | "show-products"
  | "selecting"
  | "spec-thinking"
  | "show-spec"
  | "hold";

/** Ora's chat avatar — a robot mark, matching the agent avatar in the app. */
function OraAvatar({ className }: { className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground ${className ?? "h-7 w-7"}`}
    >
      <Bot className="h-4 w-4" />
    </div>
  );
}

export function ProductDemoSection() {
  const [phase, setPhase] = useState<Phase>("uploading");
  const [projectText, setProjectText] = useState("");
  const [sofaText, setSofaText] = useState("");
  const [inputImages, setInputImages] = useState(0);
  const [visibleImages, setVisibleImages] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [visibleSpecFields, setVisibleSpecFields] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function after(ms: number, fn: () => void) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }

  useEffect(() => {
    function runLoop() {
      clearTimers();
      // Reset state at the top of each loop
      setProjectText("");
      setSofaText("");
      setInputImages(0);
      setVisibleImages(0);
      setVisibleProducts(0);
      setSelectedProduct(null);
      setVisibleSpecFields(0);
      setPhase("uploading");

      // 0) Upload the reference image into the composer first
      after(500, () => setInputImages(1));
      const afterUpload = 500 + 900;

      // 1) Type the project name
      after(afterUpload, () => setPhase("typing-project"));
      PROJECT_PROMPT.split("").forEach((_, i) => {
        after(afterUpload + 200 + i * 55, () =>
          setProjectText(PROJECT_PROMPT.slice(0, i + 1)),
        );
      });
      const afterProjectType = afterUpload + 200 + PROJECT_PROMPT.length * 55 + 500;

      // 2) Send — the uploaded image moves into the sent message
      after(afterProjectType, () => {
        setPhase("show-images");
        setInputImages(0);
        setVisibleImages(1);
      });
      const afterImages = afterProjectType + 1200;

      // 3) Type the sofa request
      after(afterImages, () => setPhase("typing-sofa"));
      SOFA_PROMPT.split("").forEach((_, i) => {
        after(afterImages + 200 + i * 55, () =>
          setSofaText(SOFA_PROMPT.slice(0, i + 1)),
        );
      });
      const afterSofaType = afterImages + 200 + SOFA_PROMPT.length * 55 + 500;

      // 4) Thinking, then product recommendations pop in
      after(afterSofaType, () => setPhase("thinking"));
      const afterThinking = afterSofaType + 1300;
      after(afterThinking, () => setPhase("show-products"));
      after(afterThinking + 250, () => setVisibleProducts(1));
      after(afterThinking + 550, () => setVisibleProducts(2));
      after(afterThinking + 850, () => setVisibleProducts(3));

      // 5) Hold the final state, then loop
      const afterProducts = afterThinking + 850 + 3200;
      after(afterProducts, () => setPhase("hold"));
      after(afterProducts + 200, runLoop);
    }

    runLoop();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showProjectMessage =
    phase !== "uploading" && phase !== "typing-project";
  const showSofaMessage =
    phase === "thinking" || phase === "show-products" || phase === "hold";
  const isUploading = phase === "uploading";
  const isTypingProject = phase === "typing-project";
  const isTypingSofa = phase === "typing-sofa";

  // What the input bar currently reflects
  const inputValue = isTypingSofa
    ? sofaText
    : isTypingProject
      ? projectText
      : "";

  return (
    <section className="relative pb-24 lg:pb-32 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Soft ambient shadow behind the app window */}
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent/20 opacity-60 blur-3xl pointer-events-none" />

          {/* App window — mirrors the real Mink product chrome */}
          <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-2xl shadow-foreground/10">
            {/* 1) Dark top navigation bar */}
            <div className="flex items-center justify-between gap-4 bg-foreground px-4 py-2.5 text-background lg:px-5">
              <div className="flex items-center gap-5">
                <MinkWordmark variant="dancing" className="h-4 w-auto" />
                <nav className="hidden items-center gap-1.5 sm:flex">
                  {NAV_TABS.map((tab) => (
                    <span
                      key={tab.label}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                        tab.active
                          ? "bg-accent/20 text-accent"
                          : "text-background/60"
                      }`}
                    >
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </span>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-background/60" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                  F
                </span>
              </div>
            </div>

            {/* 2) Project sub-header */}
            <div className="flex items-center justify-between gap-4 border-b border-foreground/10 bg-muted/40 px-4 py-3 lg:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Projects
                </p>
                <p className="truncate font-display text-sm text-foreground lg:text-base">
                  The Birchwell Livingroom
                </p>
              </div>
              <p className="shrink-0 font-mono text-xs text-muted-foreground">
                Budget:{" "}
                <span className="text-foreground">$30,000.00</span>
              </p>
            </div>

            {/* 3) Body: sidebar + conversation */}
            <div className="flex">
              {/* Left rail */}
              <aside className="hidden w-44 shrink-0 flex-col border-r border-foreground/10 bg-muted/30 py-4 md:flex">
                <div className="px-3">
                  <div className="flex items-center gap-2 rounded-lg bg-accent/20 px-3 py-2 text-sm font-medium text-foreground">
                    <Bot className="h-4 w-4" />
                    Agent
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-4 px-3">
                  {SIDEBAR_GROUPS.map((group) => (
                    <div key={group.heading}>
                      <p className="px-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {group.heading}
                      </p>
                      <div className="mt-1.5 flex flex-col">
                        {group.items.map((item) => (
                          <span
                            key={item.label}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground"
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Conversation column */}
              <div className="flex min-w-0 flex-1 flex-col">
                {/* Conversation header */}
                <div className="flex items-center justify-between gap-3 border-b border-foreground/10 px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Bot className="h-4 w-4 text-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      New conversation
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Connected
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex min-h-[420px] flex-col gap-5 px-5 py-6 lg:px-7">
                  {/* User: project name */}
                  {showProjectMessage && (
                    <div className="flex flex-col items-end gap-3 animate-[fadeUp_0.4s_ease]">
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-foreground text-background px-4 py-3 text-sm">
                        {PROJECT_PROMPT}
                      </div>
                      <div className="flex gap-3">
                        {REFERENCE_IMAGES.map((src, i) => (
                          <div
                            key={src}
                            className={`relative h-24 w-32 overflow-hidden rounded-xl border border-foreground/10 transition-all duration-500 ${
                              visibleImages > i
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-3 scale-95"
                            }`}
                          >
                            <Image
                              src={src || "/placeholder.svg"}
                              alt="Contemporary living room reference"
                              fill
                              className="object-cover"
                              sizes="128px"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assistant acknowledgement after images */}
                  {visibleImages >= 1 && (
                    <div className="flex items-start gap-3 animate-[fadeUp_0.4s_ease]">
                      <OraAvatar />
                      <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-foreground">
                        Project created. I&apos;ve saved a reference photo to{" "}
                        <span className="font-medium">The Birchwell Project</span>.
                      </div>
                    </div>
                  )}

                  {/* User: sofa request */}
                  {showSofaMessage && (
                    <div className="flex justify-end animate-[fadeUp_0.4s_ease]">
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-foreground text-background px-4 py-3 text-sm">
                        {SOFA_PROMPT}
                      </div>
                    </div>
                  )}

                  {/* Assistant: thinking */}
                  {phase === "thinking" && (
                    <div className="flex items-center gap-3 animate-[fadeUp_0.4s_ease]">
                      <OraAvatar />
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted px-4 py-3.5">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce"
                            style={{ animationDelay: `${d * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assistant: product recommendations */}
                  {(phase === "show-products" || phase === "hold") && (
                    <div className="flex items-start gap-3">
                      <OraAvatar />
                      <div className="flex-1">
                        <div className="mb-3 max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-foreground">
                          Here are 3 modern sofas that fit the Birchwell palette
                          and your trade budget:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {RECOMMENDATIONS.map((rec, i) => (
                            <div
                              key={rec.name}
                              className={`group rounded-2xl border border-foreground/10 bg-background overflow-hidden transition-all duration-500 ${
                                visibleProducts > i
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-4"
                              }`}
                            >
                              <div className="relative aspect-[4/3] bg-muted">
                                <Image
                                  src={rec.src || "/placeholder.svg"}
                                  alt={rec.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 100vw, 200px"
                                />
                                <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-foreground">
                                  <Check className="h-3 w-3 text-accent" /> Match
                                </span>
                              </div>
                              <div className="p-3">
                                <p className="text-sm font-medium leading-tight text-foreground">
                                  {rec.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {rec.vendor}
                                </p>
                                <p className="text-sm font-display mt-2 text-foreground">
                                  {rec.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input bar */}
                <div className="px-5 pb-5 lg:px-7">
                  <div className="rounded-2xl border border-foreground/10 bg-background px-4 py-3">
                    {/* Uploaded image chips */}
                    {inputImages > 0 && (
                      <div className="flex gap-2 pb-3">
                        {REFERENCE_IMAGES.map((src, i) => (
                          <div
                            key={src}
                            className={`relative h-14 w-16 overflow-hidden rounded-lg border border-foreground/10 transition-all duration-400 ${
                              inputImages > i
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-2 scale-90"
                            }`}
                          >
                            <Image
                              src={src || "/placeholder.svg"}
                              alt="Uploading living room reference"
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                            {inputImages > i && (
                              <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                <Check className="h-2.5 w-2.5" />
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Attach files"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5"
                      >
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <div className="flex-1 text-sm text-foreground min-h-[20px]">
                        {inputValue ? (
                          <span>
                            {inputValue}
                            {(isTypingProject || isTypingSofa) && (
                              <span className="ml-0.5 inline-block h-4 w-px align-middle bg-foreground animate-pulse" />
                            )}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            {isUploading
                              ? "Uploading references…"
                              : "Ask Ora to source, spec, or organize…"}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        aria-label="Send message"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
