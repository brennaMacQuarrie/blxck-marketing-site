"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const text =
  "Strategy, content, and media — handled by one team that treats your growth like its own. We build it, run it, read the numbers, and make it sharper every single month.";

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
        <p className="text-2xl font-medium leading-[1.4] tracking-tight sm:text-3xl md:text-[2.6rem] md:leading-[1.35]">
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
