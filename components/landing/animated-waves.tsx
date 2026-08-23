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
export function AnimatedWaves({
  /**
   * When true, the bloom gently drifts toward the pointer for a live, tactile
   * feel. Left off (the default) the ribbons only do their slow autonomous
   * morph, so existing heroes are unchanged.
   */
  interactive = false,
}: {
  interactive?: boolean;
} = {}) {
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

    // Pointer-driven drift for the interactive variant. The normalised target
    // (0..1 across the viewport) is eased toward each frame so the bloom
    // follows the cursor with a soft, weighty lag rather than snapping.
    const pointer = { x: 0.5, y: 0.5 };
    const pointerTarget = { x: 0.5, y: 0.5 };
    const onPointerMove = (e: PointerEvent) => {
      pointerTarget.x = e.clientX / window.innerWidth;
      pointerTarget.y = e.clientY / window.innerHeight;
    };
    if (interactive && !prefersReduced) {
      window.addEventListener("pointermove", onPointerMove);
    }

    // Mink brand palette: a soft greyscale bloom. Mink carries no second
    // hue, so every ramp is built from Midnight (#232323) stepped up
    // through neutral greys. Alphas stay low so the ribbons read as a
    // gentle tonal haze over Day rather than a grey smear.
    const MIDNIGHT = "#232323";
    const ribbons: Ribbon[] = [
      {
        startY: -0.15,
        endY: 0.55,
        thickness: 0.5,
        colors: ["#c9c9c8", "#8f8f8e", MIDNIGHT],
        alpha: 0.3,
        phase: 0,
        speed: 0.42,
        sway: 0.2,
      },
      {
        startY: -0.05,
        endY: 0.4,
        thickness: 0.42,
        colors: ["#d8d8d7", "#a2a2a1", MIDNIGHT],
        alpha: 0.26,
        phase: 1.6,
        speed: 0.55,
        sway: 0.24,
      },
      {
        startY: 0.1,
        endY: 0.7,
        thickness: 0.55,
        colors: ["#bfbfbe", "#7d7d7c", MIDNIGHT],
        alpha: 0.24,
        phase: 3.1,
        speed: 0.36,
        sway: 0.28,
      },
      {
        startY: -0.2,
        endY: 0.5,
        thickness: 0.38,
        colors: ["#e2e2e1", "#b0b0af", MIDNIGHT],
        alpha: 0.22,
        phase: 4.4,
        speed: 0.5,
        sway: 0.18,
      },
    ];

    const drawRibbon = (r: Ribbon, t: number, ox: number, oy: number) => {
      const sway = Math.sin(t * r.speed + r.phase) * r.sway;
      const sway2 = Math.cos(t * r.speed * 0.8 + r.phase) * r.sway * 0.6;

      // The ribbon fans diagonally from the left edge to the right edge.
      // `oy`/`ox` are the eased pointer offsets (interactive mode); they nudge
      // the anchors so the whole bloom leans toward the cursor.
      const leftY = (r.startY + sway) * height + oy * height * 0.22;
      const rightY = (r.endY + sway2) * height + oy * height * 0.14;
      const thick = r.thickness * height;

      // Control points create the silky curved fan.
      const cp1x = width * 0.35 + ox * width * 0.14;
      const cp1y = leftY + (rightY - leftY) * 0.1 + Math.sin(t * r.speed + r.phase) * 110;
      const cp2x = width * 0.7 + ox * width * 0.14;
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
      // Ease the eased pointer toward its target for the soft follow.
      pointer.x += (pointerTarget.x - pointer.x) * 0.05;
      pointer.y += (pointerTarget.y - pointer.y) * 0.05;
      const ox = interactive ? pointer.x - 0.5 : 0;
      const oy = interactive ? pointer.y - 0.5 : 0;
      // Additive-style blending lets the ribbons blend into luminous hues.
      ctx.globalCompositeOperation = "multiply";
      ribbons.forEach((r) => drawRibbon(r, time, ox, oy));
      ctx.globalCompositeOperation = "source-over";
      time += prefersReduced ? 0 : 0.025;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [interactive]);

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
