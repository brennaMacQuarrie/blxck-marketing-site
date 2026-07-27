"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wires Lenis smooth-scroll into the GSAP ticker so ScrollTrigger and the
 * momentum scroll stay perfectly in sync. Skips entirely when the user
 * prefers reduced motion (native scroll takes over, animations degrade).
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Touch scroll stays native for reliability on mobile.
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Dev-only: expose the instance so tooling can jump to sections.
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Recalculate once fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);

    return () => {
      cancelAnimationFrame(raf);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  // On client-side navigation, jump to top and recompute triggers.
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
