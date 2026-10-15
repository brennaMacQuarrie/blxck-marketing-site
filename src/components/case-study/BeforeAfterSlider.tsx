"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";

type Props = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  /** Starting divider position, 0–100 (percent of width showing "after"). */
  initial?: number;
  className?: string;
};

/**
 * Before/after comparison: two stacked images with a draggable vertical
 * divider. Pointer events handle mouse and touch; a visually hidden range
 * input gives keyboard and screen-reader control. The "after" image sits
 * on top and is clipped to the divider position.
 */
export function BeforeAfterSlider({ before, after, initial = 50, className = "" }: Props) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    update(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) update(e.clientX);
  };
  const stop = () => setDragging(false);

  return (
    <div className={className}>
      <div
        ref={ref}
        className={`relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-white/[0.1] bg-carbon ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        onPointerLeave={stop}
      >
        {/* Before: full width underneath */}
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(min-width: 1152px) 1120px, 100vw"
          className="object-cover object-top opacity-80 saturate-50"
          draggable={false}
          priority={false}
        />
        {/* After: on top, clipped to the divider */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden
        >
          <Image
            src={after.src}
            alt=""
            fill
            sizes="(min-width: 1152px) 1120px, 100vw"
            className="object-cover object-top"
            draggable={false}
          />
        </div>
        <span className="sr-only">{after.alt}</span>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-gold shadow-[0_0_16px_color-mix(in_oklab,var(--color-gold)_60%,transparent)]"
          style={{ left: `calc(${pos}% - 1px)` }}
          aria-hidden
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-void/90 text-hi backdrop-blur-sm">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
              <path d="M5 1 1 6l4 5M13 1l4 5-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/20 bg-void/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-mid backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-void">
          After
        </span>
        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-void/80 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-mid backdrop-blur-sm">
          Drag to compare
        </span>

        {/* Keyboard / assistive control */}
        <label htmlFor={id} className="sr-only">
          Reveal the after image
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 h-full w-full cursor-grab opacity-0"
          aria-valuetext={`${Math.round(pos)}% after`}
        />
      </div>
    </div>
  );
}
