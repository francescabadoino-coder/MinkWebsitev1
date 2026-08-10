"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const MISSION = "To empower designers around the world to do what they do best: design.";

export function MissionTyping() {
  const [text, setText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only start typing once the block scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typing loop: type out, hold, erase nothing — just pause then restart
  useEffect(() => {
    if (!hasStarted) return;

    let timeout: ReturnType<typeof setTimeout>;
    let index = 0;

    const type = () => {
      if (index <= MISSION.length) {
        setText(MISSION.slice(0, index));
        setIsComplete(false);
        // Vary the speed slightly to feel human
        const char = MISSION[index - 1];
        const delay =
          char === " " ? 60 : char === ":" || char === "." ? 320 : 38 + Math.random() * 55;
        index += 1;
        timeout = setTimeout(type, delay);
      } else {
        setIsComplete(true);
        // Hold the finished sentence, then restart the loop
        timeout = setTimeout(() => {
          index = 0;
          setText("");
          type();
        }, 3200);
      }
    };

    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, [hasStarted]);

  // Render the typed text with the highlight on "design." once fully typed
  const renderText = () => {
    const splitWord = "design.";
    if (isComplete && text.endsWith(splitWord)) {
      const base = text.slice(0, text.length - splitWord.length);
      return (
        <>
          {base}
          <span className="font-serif italic underline underline-offset-4 decoration-foreground/30">
            {splitWord}
          </span>
        </>
      );
    }
    return text;
  };

  return (
    <div ref={containerRef} className="mt-20 lg:mt-28 max-w-3xl">
      <span className="font-mono text-xs uppercase tracking-widest text-foreground">
        That is why we&apos;re on a mission
      </span>

      {/* Editorial "note" being typed by Francesca */}
      <div className="mt-6 rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-sm p-6 lg:p-8 shadow-sm">
        {/* Header: who is writing */}
        <div className="flex items-center gap-3 pb-5 mb-5 border-b border-foreground/10">
          <span className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-foreground/15">
            <Image
              src="/founders/francesca-obradovic.png"
              alt="Francesca Obradovic, Co-Founder and CEO of Mink"
              fill
              className="object-cover grayscale"
              sizes="36px"
            />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-foreground">
              Francesca is typing
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Co-Founder, CEO
            </span>
          </div>
        </div>

        {/* The typed sentence */}
        <p className="text-2xl lg:text-3xl font-display leading-snug text-pretty min-h-[2.5em]">
          {renderText()}
          <span
            className={`inline-block w-[0.06em] -mb-1 ml-0.5 h-[1em] translate-y-[0.12em] bg-foreground ${
              isComplete ? "animate-pulse" : "opacity-100"
            }`}
            aria-hidden="true"
          />
        </p>
      </div>
    </div>
  );
}
