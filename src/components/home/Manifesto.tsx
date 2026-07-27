"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const text =
  "Most marketing blends in. We build brands that don't — sharp strategy, cinematic content, and paid media that performs, so the right people can't scroll past you.";

export function Manifesto() {
  const root = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return; // words already rest in a readable dim color
      gsap.to(".mf-word", {
        color: "var(--color-hi)",
        stagger: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: "bottom 75%",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="border-t border-white/[0.06] bg-ink py-28 md:py-40"
    >
      <div className="mx-auto max-w-4xl px-(--spacing-gutter)">
        <span className="eyebrow mb-10 block">Why BLXCK</span>
        <p className="font-heading text-2xl leading-[1.4] sm:text-3xl md:text-[2.6rem] md:leading-[1.35]">
          {words.map((w, i) => (
            <span key={i} className="mf-word text-[#3a3d44]">
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
