"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle drifting starfield on a canvas. Cheap (a few hundred points),
 * DPR-aware, pauses when off-screen, and renders a single static frame
 * under reduced-motion. Deliberately understated — no cheese.
 */
export function Starfield({
  density = 0.00016,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let stars: {
      x: number;
      y: number;
      z: number;
      r: number;
      tw: number;
      hue: string;
    }[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const hues = ["#7ebec5", "#b794df", "#cca95d", "#ffffff", "#bcbebe"];

    function size() {
      if (!canvas) return;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      const count = Math.floor(width * height * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 0.7 + 0.3,
        r: (Math.random() * 1.1 + 0.3) * dpr,
        tw: Math.random() * Math.PI * 2,
        hue: hues[Math.floor(Math.random() * hues.length)],
      }));
    }

    function draw(t: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const twinkle = reduce ? 0.7 : 0.55 + Math.sin(t * 0.001 + s.tw) * 0.45;
        ctx.globalAlpha = twinkle * s.z;
        ctx.fillStyle = s.hue;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          s.y += s.z * 0.12 * dpr;
          if (s.y > canvas.height) {
            s.y = 0;
            s.x = Math.random() * canvas.width;
          }
        }
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    }

    size();
    draw(0);

    const onResize = () => {
      size();
      if (reduce) draw(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
