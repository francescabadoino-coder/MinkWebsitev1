"use client";

import { useEffect, useRef } from "react";

type Ribbon = {
  // Vertical anchors (0-1) for the ribbon's left and right edges.
  startY: number;
  endY: number;
  // Thickness as a fraction of height.
  thickness: number;
  // Gradient stops (left -> right).
  colors: [string, string, string];
  alpha: number;
  // Animation phase + speed for the slow morph.
  phase: number;
  speed: number;
  sway: number;
};

/**
 * Stripe-inspired hero background: silky, translucent gradient ribbons that
 * fan diagonally across the canvas with soft feathered edges and a slow,
 * fluid morph. Rendered on a canvas with additive blending and heavy blur so
 * the colors melt together like flowing light.
 */
export function AnimatedWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let time = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mink brand palette: a soft chartreuse bloom. Every ramp is built from
    // Dancing (#CFDC66) — a lighter tint, the true brand value, then a
    // deeper shade — so the signature colour is always the anchor rather
    // than an approximation that drifts around it.
    const DANCING = "#cfdc66";
    const ribbons: Ribbon[] = [
      {
        startY: -0.15,
        endY: 0.55,
        thickness: 0.5,
        colors: ["#e4ebab", DANCING, "#b3c95c"],
        alpha: 0.55,
        phase: 0,
        speed: 0.42,
        sway: 0.2,
      },
      {
        startY: -0.05,
        endY: 0.4,
        thickness: 0.42,
        colors: ["#eef2cb", DANCING, "#bcd06a"],
        alpha: 0.5,
        phase: 1.6,
        speed: 0.55,
        sway: 0.24,
      },
      {
        startY: 0.1,
        endY: 0.7,
        thickness: 0.55,
        colors: ["#d9e389", DANCING, "#a9bf55"],
        alpha: 0.45,
        phase: 3.1,
        speed: 0.36,
        sway: 0.28,
      },
      {
        startY: -0.2,
        endY: 0.5,
        thickness: 0.38,
        colors: ["#f2f5db", DANCING, "#c3d472"],
        alpha: 0.42,
        phase: 4.4,
        speed: 0.5,
        sway: 0.18,
      },
    ];

    const drawRibbon = (r: Ribbon, t: number) => {
      const sway = Math.sin(t * r.speed + r.phase) * r.sway;
      const sway2 = Math.cos(t * r.speed * 0.8 + r.phase) * r.sway * 0.6;

      // The ribbon fans diagonally from the left edge to the right edge.
      const leftY = (r.startY + sway) * height;
      const rightY = (r.endY + sway2) * height;
      const thick = r.thickness * height;

      // Control points create the silky curved fan.
      const cp1x = width * 0.35;
      const cp1y = leftY + (rightY - leftY) * 0.1 + Math.sin(t * r.speed + r.phase) * 110;
      const cp2x = width * 0.7;
      const cp2y = leftY + (rightY - leftY) * 0.85 + Math.cos(t * r.speed * 1.3 + r.phase) * 110;

      ctx.beginPath();
      ctx.moveTo(-50, leftY);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width + 50, rightY);
      ctx.lineTo(width + 50, rightY + thick);
      ctx.bezierCurveTo(
        cp2x,
        cp2y + thick,
        cp1x,
        cp1y + thick,
        -50,
        leftY + thick
      );
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, r.colors[0]);
      grad.addColorStop(0.5, r.colors[1]);
      grad.addColorStop(1, r.colors[2]);

      ctx.globalAlpha = r.alpha;
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      // Additive-style blending lets the ribbons blend into luminous hues.
      ctx.globalCompositeOperation = "multiply";
      ribbons.forEach((r) => drawRibbon(r, time));
      ctx.globalCompositeOperation = "source-over";
      time += prefersReduced ? 0 : 0.025;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: "block",
          // Heavy blur feathers the ribbon edges into Stripe's silky glow.
          filter: "blur(70px) saturate(1.2)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
