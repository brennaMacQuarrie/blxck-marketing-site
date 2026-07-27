"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { pillars } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const accents = [
  "var(--color-teal)",
  "var(--color-lavender)",
  "var(--color-gold)",
  "var(--color-silver)",
];

export function Pillars() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = track.current!;
          const getScrollLen = () => el.scrollWidth - window.innerWidth;
          gsap.to(el, {
            x: () => -getScrollLen(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${getScrollLen()}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative border-t border-white/[0.06] bg-void"
    >
      <div
        ref={track}
        className="flex flex-col md:h-[100svh] md:flex-row md:flex-nowrap md:items-stretch"
      >
        {/* Intro panel */}
        <div className="flex shrink-0 flex-col justify-center px-(--spacing-gutter) py-20 md:h-full md:w-[70vw] md:py-0 lg:w-[46vw]">
          <span className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-white/25" />
            How we work
          </span>
          <h2 className="max-w-xl text-balance font-heading text-4xl leading-[1.08] text-hi sm:text-5xl">
            Four moving parts. One growth engine.
          </h2>
          <p className="mt-6 max-w-md text-mid">
            Strategy, creation, advertising, and web — engineered to work
            together, not in silos.
          </p>
          <span className="mt-10 hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-lo md:flex">
            Scroll to explore
            <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
              <path d="M0 4h24M22 1l3 3-3 3" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </div>

        {/* Pillar cards */}
        {pillars.map((p, i) => (
          <article
            key={p.n}
            className="group relative flex shrink-0 flex-col justify-center border-t border-white/[0.06] px-(--spacing-gutter) py-16 transition-colors duration-500 hover:bg-white/[0.015] md:h-full md:w-[46vw] md:border-l md:border-t-0 md:py-0 lg:w-[30vw]"
            style={{ ["--pc" as string]: accents[i % accents.length] }}
          >
            <div className="flex max-w-sm flex-col gap-6">
              <div className="flex items-center gap-4">
                <span
                  className="font-heading text-lg tabular-nums"
                  style={{ color: "var(--pc)" }}
                >
                  {p.n}
                </span>
                <span
                  className="h-px w-10 origin-left transition-transform duration-500 group-hover:scale-x-[1.6]"
                  style={{ background: "var(--pc)" }}
                />
              </div>
              <h3 className="font-heading text-4xl leading-none text-hi md:text-5xl">
                {p.title}
              </h3>
              <p className="text-base leading-relaxed text-mid">{p.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
