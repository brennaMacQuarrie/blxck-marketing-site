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
 * Interactive neon orb — a textless take on the BLXCK logo circle.
 * The whole thing tilts toward the cursor and its glow (box-shadow) shifts
 * direction as if lit by a moving light source. Idle-floats; static and
 * calm under reduced-motion.
 */
export function HeroOrb({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 80, damping: 18, mass: 0.7 };
  const smx = useSpring(mx, spring);
  const smy = useSpring(my, spring);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / (window.innerWidth / 2);
      const ny = (e.clientY - cy) / (window.innerHeight / 2);
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  const rotateX = useTransform(smy, [-1, 1], [12, -12]);
  const rotateY = useTransform(smx, [-1, 1], [-12, 12]);

  // Glow offset trails the light source (opposite the cursor side).
  const glowX = useTransform(smx, [-1, 1], [46, -46]);
  const glowY = useTransform(smy, [-1, 1], [46, -46]);
  const boxShadow = useMotionTemplate`${glowX}px ${glowY}px 120px 6px rgba(126,190,197,0.30), 0 0 70px 0 rgba(183,148,223,0.16)`;

  // Specular highlight follows the cursor across the surface.
  const hlX = useTransform(smx, [-1, 1], [70, 30]);
  const hlY = useTransform(smy, [-1, 1], [70, 30]);
  const highlight = useMotionTemplate`radial-gradient(circle at ${hlX}% ${hlY}%, rgba(255,255,255,0.55), rgba(126,190,197,0.18) 28%, transparent 55%)`;

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
        className="relative aspect-square w-full"
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Sphere + outer neon glow (direction reacts to cursor). */}
        <motion.div
          style={reduce ? undefined : { boxShadow }}
          className="absolute inset-0 rounded-full bg-black shadow-[0_0_90px_6px_rgba(126,190,197,0.22)]"
        />

        {/* Bright neon rim — the logo's signature ring. */}
        <div className="absolute inset-0 rounded-full border-[3px] border-teal shadow-[inset_0_0_70px_rgba(126,190,197,0.55),0_0_70px_rgba(126,190,197,0.6)]" />
        <div className="absolute inset-[2%] rounded-full border border-white/75 shadow-[0_0_20px_rgba(255,255,255,0.45)] blur-[0.3px]" />
        <div className="absolute inset-[8%] rounded-full border border-lavender/45 shadow-[0_0_24px_rgba(183,148,223,0.35)]" />

        {/* Slow rotating conic sheen for life. */}
        {!reduce && (
          <motion.div
            className="absolute inset-[3%] rounded-full opacity-40 [mask-image:radial-gradient(circle,transparent_58%,black_62%)]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(126,190,197,0.6), transparent 40%, rgba(183,148,223,0.5), transparent 70%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Moving specular highlight. */}
        <motion.div
          style={reduce ? undefined : { background: highlight }}
          className="absolute inset-0 rounded-full mix-blend-screen"
        />

        {/* Dark event-horizon core. */}
        <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_50%_38%,#0b0e13,#000_72%)] shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]" />
      </motion.div>
    </div>
  );
}
