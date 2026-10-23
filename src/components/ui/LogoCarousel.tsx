"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Infinite logo strip. Drifts slowly on its own (eases to a stop on hover so
 * logos can be read), and visitors can move it faster: arrow buttons, drag /
 * swipe with momentum, or horizontal trackpad scroll. The list is rendered
 * twice and the offset wraps by one copy, so the loop is seamless. Under
 * reduced motion it doesn't auto-drift, but the controls still work.
 */
export function LogoCarousel({
  logos,
  speed = 38,
}: {
  logos: { name: string; src: string }[];
  /** Auto-drift speed in px per second. */
  speed?: number;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const boost = useRef(0); // extra velocity (px/s) from user input; decays

  useEffect(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let drift = reduce ? 0 : speed; // current auto speed (eases on hover)
    let hovering = false;
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let raf = 0;
    let prev = performance.now();

    const half = () => tr.scrollWidth / 2;
    const wrap = () => {
      const h = half();
      if (h > 0) x = (((x % h) - h) % h);
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const target = reduce || hovering ? 0 : speed;
      drift += (target - drift) * Math.min(1, dt * 3);
      if (!dragging) {
        x -= (drift + boost.current) * dt;
        boost.current *= Math.pow(0.04, dt); // ~96% of the push gone after 1s
        if (Math.abs(boost.current) < 1) boost.current = 0;
      }
      wrap();
      tr.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Horizontal trackpad / shift+wheel scrolls the strip.
    const onWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      x -= dx;
      boost.current = 0;
    };

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      dragging = true;
      lastX = e.clientX;
      lastT = performance.now();
      boost.current = 0;
      vp.setPointerCapture(e.pointerId);
      vp.dataset.dragging = "true";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      x += dx;
      // Fling velocity (px/s), opposite sign to drift convention.
      const v = -dx / Math.max(0.001, (now - lastT) / 1000);
      boost.current = boost.current * 0.6 + v * 0.4;
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete vp.dataset.dragging;
      if (vp.hasPointerCapture(e.pointerId)) vp.releasePointerCapture(e.pointerId);
      boost.current = Math.max(-3000, Math.min(3000, boost.current)) - drift;
    };
    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);

    vp.addEventListener("wheel", onWheel, { passive: false });
    vp.addEventListener("pointerdown", onDown);
    vp.addEventListener("pointermove", onMove);
    vp.addEventListener("pointerup", onUp);
    vp.addEventListener("pointercancel", onUp);
    vp.addEventListener("pointerenter", onEnter);
    vp.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      vp.removeEventListener("wheel", onWheel);
      vp.removeEventListener("pointerdown", onDown);
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerup", onUp);
      vp.removeEventListener("pointercancel", onUp);
      vp.removeEventListener("pointerenter", onEnter);
      vp.removeEventListener("pointerleave", onLeave);
    };
  }, [speed]);

  // Arrow buttons give a quick push in either direction.
  const push = (dir: 1 | -1) => {
    boost.current += dir * 1400;
  };

  const row = (dup: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20"
      aria-hidden={dup || undefined}
    >
      {logos.map((l) => (
        <li key={l.name} className="flex h-16 shrink-0 items-center md:h-20">
          <Image
            src={l.src}
            alt={dup ? "" : l.name}
            width={160}
            height={64}
            draggable={false}
            className="logo-img h-auto max-h-12 w-auto max-w-[170px] select-none object-contain md:max-h-14 md:max-w-[200px]"
          />
        </li>
      ))}
    </ul>
  );

  const arrow = (dir: 1 | -1) => (
    <button
      type="button"
      onClick={() => push(dir)}
      aria-label={dir === 1 ? "Scroll logos forward" : "Scroll logos back"}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-void/70 text-hi backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-void ${
        dir === 1 ? "right-3 md:right-6" : "left-3 md:left-6"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={dir === 1 ? "" : "rotate-180"}>
        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <div className="relative">
      <div
        ref={viewport}
        className="logo-carousel relative cursor-grab touch-pan-y overflow-hidden data-[dragging=true]:cursor-grabbing"
      >
        <div ref={track} className="flex w-max will-change-transform">
          {row(false)}
          {row(true)}
        </div>
      </div>
      {arrow(-1)}
      {arrow(1)}

      <style>{`
        .logo-carousel {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
        }
        .logo-img {
          transition: transform .35s cubic-bezier(.16,1,.3,1), filter .35s ease;
        }
        .logo-img:hover {
          transform: scale(1.08);
          filter: drop-shadow(0 0 14px rgb(255 255 255 / 0.28));
        }
      `}</style>
    </div>
  );
}
