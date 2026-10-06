"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

/**
 * Minimal, precise hero mark: hairline concentric rings (echoing the BLXCK
 * logo circle) with a single light node that orbits the outer ring and eases
 * toward the cursor's angle. Line-art only — no filled body, no lens depth.
 */
export function HeroOrb({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Angle (radians) of the node around the ring.
  const angle = useMotionValue(-Math.PI / 2); // start at top
  const a = useSpring(angle, { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let idle = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const target = Math.atan2(e.clientY - cy, e.clientX - cx);
      // Unwrap so the node takes the short path around the circle.
      const cur = angle.get();
      let delta = target - (cur % (Math.PI * 2));
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;
      angle.set(cur + delta);
      idle = 0;
    };

    // Gentle idle drift when the cursor is still.
    let raf = 0;
    const tick = () => {
      idle += 1;
      if (idle > 90) angle.set(angle.get() + 0.004);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce, angle]);

  // Node position on the outer ring (radius ~48% of the box).
  const nodeX = useTransform(a, (v) => `${50 + 48 * Math.cos(v)}%`);
  const nodeY = useTransform(a, (v) => `${50 + 48 * Math.sin(v)}%`);
  // A faint glow that leans in the node's direction for depth.
  const glowX = useTransform(a, (v) => 50 + 22 * Math.cos(v));
  const glowY = useTransform(a, (v) => 50 + 22 * Math.sin(v));
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(126,190,197,0.14), transparent 55%)`;

  return (
    <div ref={ref} className={className}>
      <div className="relative aspect-square w-full">
        {/* Directional wash tied to the node — subtle, not a filled body. */}
        <motion.div
          style={reduce ? undefined : { background: glow }}
          className="absolute inset-[6%] rounded-full"
        />

        {/* Concentric rings — brand colours. */}
        <div className="absolute inset-0 rounded-full border border-teal/70" />
        <div className="absolute inset-[13%] rounded-full border border-lavender/60" />
        <div className="absolute inset-[27%] rounded-full border border-gold/55" />
        <div className="absolute inset-[43%] rounded-full border border-teal/45" />

        {/* Crosshair ticks. */}
        <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white/20" />
        <div className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-white/20" />
        <div className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/20" />
        <div className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/20" />

        {/* Center point. */}
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35" />

        {/* Orbiting node — black, with a crisp rim so it reads against the glow. */}
        <motion.div
          style={{ left: reduce ? "50%" : nodeX, top: reduce ? "0%" : nodeY }}
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/85 bg-black shadow-[0_0_0_5px_rgba(10,11,14,0.65),0_0_14px_2px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );
}
