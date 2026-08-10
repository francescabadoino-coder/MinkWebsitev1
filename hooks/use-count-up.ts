"use client";

import { useEffect, useRef, useState } from "react";

/** Ease-out cubic: fast at first, decelerating as it lands. */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Tracks the user's prefers-reduced-motion setting. */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}

/**
 * Fires once, the first time the element scrolls into view.
 * Falls back to `true` where IntersectionObserver is unavailable.
 */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}

type CountUpOptions = {
  /** Animation only runs once this is true (i.e. scrolled into view). */
  active: boolean;
  /** First reveal, counting up from zero. */
  initialDuration?: number;
  /** Subsequent input changes, counting from the previous value. */
  updateDuration?: number;
};

/**
 * Animates towards `target` with requestAnimationFrame.
 *
 * The first run counts up from 0 over `initialDuration`. Every later change
 * counts from whatever is currently on screen (even mid-animation, so dragging
 * a slider stays smooth) over the shorter `updateDuration`.
 */
export function useCountUp(
  target: number,
  { active, initialDuration = 1200, updateDuration = 500 }: CountUpOptions,
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const currentRef = useRef(0);
  const hasRunRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const from = currentRef.current;
    const to = target;
    const duration = hasRunRef.current ? updateDuration : initialDuration;
    hasRunRef.current = true;

    if (prefersReducedMotion || from === to) {
      currentRef.current = to;
      setDisplayValue(to);
      return;
    }

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / duration);
      const value = from + (to - from) * easeOutCubic(progress);

      currentRef.current = value;
      setDisplayValue(value);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        currentRef.current = to;
        setDisplayValue(to);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, active, prefersReducedMotion, initialDuration, updateDuration]);

  return Math.round(displayValue);
}
