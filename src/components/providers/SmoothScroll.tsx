"use client";

import { useEffect, useRef } from "react";
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
  const lenisRef = useRef<Lenis | null>(null);

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
      // Higher lerp = tighter tracking = snappier (less floaty smoothing).
      lerp: 0.16,
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6,
      // Touch scroll stays native for reliability on mobile.
    });
    lenisRef.current = lenis;

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
      lenisRef.current = null;
    };
  }, []);

  // On client-side navigation, jump to top and recompute triggers.
  // Deferred to the next frame so it runs AFTER the browser's own scroll
  // handling, then re-synced so Lenis and the window agree on 0.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const lenis = lenisRef.current;
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.resize();
      }
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
