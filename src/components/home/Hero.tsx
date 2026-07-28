"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroOrb } from "@/components/home/HeroOrb";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: reduce ? 0.001 : 1 },
      });
      tl.from(".h-badge", { y: 16, opacity: 0 })
        .from(".h-line span", { yPercent: 115, stagger: 0.1 }, "-=0.8")
        .from(".h-sub", { y: 18, opacity: 0 }, "-=0.7")
        .from(".h-cta", { y: 18, opacity: 0 }, "-=0.6");
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Minimal, precise line-art mark — the hero centerpiece. */}
      <HeroOrb className="pointer-events-none absolute right-[-18%] top-[6%] z-0 aspect-square w-[80vw] max-w-[560px] opacity-45 sm:right-[-8%] sm:w-[62vw] md:opacity-70 lg:right-[2%] lg:top-1/2 lg:w-[40vw] lg:-translate-y-1/2 lg:opacity-100" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-veil opacity-[0.08]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-(--spacing-gutter)">
        <div className="flex max-w-3xl flex-col items-start">
          <span className="h-badge mb-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[0.78rem] text-mid backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]" />
            Edmonton-based · Working globally
          </span>

          <h1 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] uppercase leading-[0.92] tracking-[-0.01em] text-hi">
            <span className="h-line block overflow-hidden">
              <span className="block">Grow your</span>
            </span>
            <span className="h-line block overflow-hidden">
              <span className="block text-spectrum">brand.</span>
            </span>
          </h1>

          <p className="h-sub mt-8 max-w-xl text-lg leading-relaxed text-mid">
            We partner with businesses ready to grow — blending sharp strategy,
            cinematic content, and paid media that performs. The result: a brand
            that&apos;s impossible to ignore.
          </p>

          <div className="h-cta mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" variant="primary" withArrow>
              Start a project
            </ButtonLink>
            <ButtonLink href="/portfolio" variant="ghost" withArrow={false}>
              See the work
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
