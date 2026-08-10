"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus, ArrowUp, Check } from "lucide-react";

type Recommendation = {
  src: string;
  name: string;
  vendor: string;
  price: string;
};

/** Modern Mink brand monogram, used here as Ora's chat avatar. The mark stays
 *  branded Mink — only the agent's name is Ora. */
function MinkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 18V7.5c0-.6.7-.9 1.1-.4L12 14l6.9-6.9c.4-.5 1.1-.2 1.1.4V18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const RECOMMENDATIONS: Recommendation[] = [
  { src: "/demo/sofa-1.png", name: "Halden Curved Sofa", vendor: "Karvet", price: "$4,280" },
  { src: "/demo/sofa-2.png", name: "Marlow Linen Three-Seat", vendor: "Brume", price: "$3,940" },
  { src: "/demo/sofa-3.png", name: "Pell Oak Sofa", vendor: "CB2", price: "$2,690" },
];

// Spec generated when the user selects the first recommendation.
const SPEC_FIELDS: { label: string; value: string }[] = [
  { label: "Dimensions", value: '84" W × 38" D × 28" H' },
  { label: "Upholstery", value: "Cream performance bouclé" },
  { label: "Frame", value: "Kiln-dried solid oak" },
  { label: "Lead time", value: "6–8 weeks" },
];

const REFERENCE_IMAGES = ["/demo/living-room-2.png"];

const PROJECT_PROMPT = "The Birchwell living room";
const SOFA_PROMPT = "Find me the best modern sofa";

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
        {/* Liquid glass demo panel */}
        <div className="relative">
          {/* Ambient color glow behind the glass */}
          <div className="absolute -inset-8 -z-10 opacity-60 blur-3xl pointer-events-none">
            <div className="absolute left-[10%] top-0 h-48 w-48 rounded-full bg-chart-1/40" />
            <div className="absolute right-[15%] top-10 h-56 w-56 rounded-full bg-chart-3/40" />
            <div className="absolute left-[40%] bottom-0 h-48 w-48 rounded-full bg-chart-5/40" />
          </div>

          <div className="rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur-2xl shadow-2xl shadow-foreground/5 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-foreground/10">
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <span className="ml-3 text-xs font-mono text-muted-foreground">
                Ora AI Agent
              </span>
            </div>

            {/* Conversation */}
            <div className="px-5 py-6 lg:px-8 lg:py-8 min-h-[440px] flex flex-col gap-5">
              {/* User: project name */}
              {showProjectMessage && (
                <div className="flex flex-col items-end gap-3 animate-[fadeUp_0.4s_ease]">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-foreground text-background px-4 py-3 text-sm">
                    {PROJECT_PROMPT}
                  </div>
                  {/* Attached reference images */}
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
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <MinkMark className="h-4 w-4" />
                  </div>
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
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <MinkMark className="h-4 w-4" />
                  </div>
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
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <MinkMark className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3 max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-foreground">
                      Here are 3 modern sofas that fit the Birchwell palette and
                      your trade budget:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {RECOMMENDATIONS.map((rec, i) => (
                        <div
                          key={rec.name}
                          className={`group rounded-2xl border border-foreground/10 bg-background/80 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
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
            <div className="px-5 pb-5 lg:px-8 lg:pb-7">
              <div className="rounded-2xl border border-foreground/10 bg-background/70 backdrop-blur-md px-4 py-3">
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
                    aria-label="Add attachments, pictures, or links"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-muted-foreground transition-colors hover:bg-foreground/5"
                  >
                    <Plus className="h-4 w-4" />
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
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
