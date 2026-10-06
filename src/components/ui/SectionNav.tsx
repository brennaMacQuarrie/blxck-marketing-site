"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToElement } from "@/components/providers/SmoothScroll";

export type NavSection = {
  id: string;
  label: string;
  /** CSS colour for this section (e.g. "var(--color-teal)"). */
  accent: string;
};

/** Combined height of the fixed navbar (64px) + this bar (48px). */
const STICKY_OFFSET = 112;

/**
 * Sticky in-page section bar that sits under the main navbar. Shows which
 * page you're on, which section you're in (in that section's colour), and
 * lets you jump between sections. Place it directly after the page hero.
 */
export function SectionNav({
  page,
  pageAccent,
  sections,
}: {
  page: string;
  pageAccent: string;
  sections: NavSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id);
  const [progress, setProgress] = useState(0);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const listRef = useRef<HTMLDivElement>(null);

  // Active section = the last one whose top has passed just under the bar.
  // Also drives the page progress line.
  useEffect(() => {
    const onScroll = () => {
      const line = STICKY_OFFSET + 80;
      let current = sections[0]?.id;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top <= line) current = sec.id;
      }
      // At the very bottom, the last section wins even if it's short.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY >= max - 4) {
        current = sections[sections.length - 1]?.id;
      }
      setActive(current);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  // Keep the active pill visible when the list scrolls horizontally (mobile).
  useEffect(() => {
    const pill = active ? pillRefs.current[active] : null;
    const list = listRef.current;
    if (!pill || !list) return;
    const left = pill.offsetLeft - list.clientWidth / 2 + pill.clientWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const current = sections.find((s) => s.id === active) ?? sections[0];

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollToElement(el, STICKY_OFFSET - 1);
  };

  return (
    <div className="sticky top-16 z-40 border-y border-white/[0.08] bg-void/85 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-4 px-(--spacing-gutter)">
        {/* Where am I: page / section */}
        <div className="hidden shrink-0 items-center gap-2 text-sm md:flex">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: pageAccent }}
            aria-hidden
          />
          <span className="font-semibold text-hi">{page}</span>
          <span className="text-lo">/</span>
          <span
            className="font-medium transition-colors duration-300"
            style={{ color: current?.accent }}
          >
            {current?.label}
          </span>
        </div>

        {/* Section pills */}
        <div
          ref={listRef}
          className="-mx-2 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2 [scrollbar-width:none] md:justify-end [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((s, i) => {
            const on = s.id === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  pillRefs.current[s.id] = el;
                }}
                type="button"
                onClick={() => go(s.id)}
                aria-current={on ? "true" : undefined}
                className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8rem] font-medium transition-all duration-300"
                style={
                  on
                    ? {
                        color: s.accent,
                        background: `color-mix(in oklab, ${s.accent} 14%, transparent)`,
                        boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${s.accent} 35%, transparent)`,
                      }
                    : { color: "var(--color-lo)" }
                }
              >
                <span className="tabular-nums opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress line, tinted by the current section */}
      <span
        className="absolute bottom-[-1px] left-0 h-px origin-left transition-[background] duration-300"
        style={{
          width: "100%",
          transform: `scaleX(${progress})`,
          background: current?.accent,
        }}
        aria-hidden
      />
    </div>
  );
}
