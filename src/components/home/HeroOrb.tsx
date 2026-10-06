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
 * Hero mark: hairline concentric rings (echoing the BLXCK logo circle) with a
 * black-hole node that orbits the outer ring and eases toward the cursor's
 * angle. A soft brand-colour nebula rides with it — a bright teal core locked
 * to the node, a lavender cloud trailing a beat behind, and a gold wisp
 * trailing further — so the densest glow always sits on the black hole.
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

  // Trailing springs on the same target: the nebula's outer clouds lag
  // behind the core, so movement smears into a soft drifting tail.
  const aTrail = useSpring(angle, { stiffness: 26, damping: 14, mass: 1 });
  const aWisp = useSpring(angle, { stiffness: 12, damping: 11, mass: 1.2 });

  // Node position on the outer ring (radius ~48% of the box).
  // `lag` offsets a cloud backwards along the orbit (radians) so the three
  // colours fan out behind the black hole instead of stacking into white.
  const ringPos = (r: number, lag = 0) => ({
    x: (v: number) => `${50 + r * Math.cos(v - lag)}%`,
    y: (v: number) => `${50 + r * Math.sin(v - lag)}%`,
  });
  const ring = ringPos(48);
  const nodeX = useTransform(a, ring.x);
  const nodeY = useTransform(a, ring.y);
  // Lavender cloud sits slightly inside the ring, trailing.
  const inner = ringPos(42, 0.5);
  const trailX = useTransform(aTrail, inner.x);
  const trailY = useTransform(aTrail, inner.y);
  // Gold wisp trails furthest, drifting just outside the ring.
  const outer = ringPos(52, 1.05);
  const wispX = useTransform(aWisp, outer.x);
  const wispY = useTransform(aWisp, outer.y);
  // Faint directional wash across the inner rings for depth.
  const glowX = useTransform(a, (v) => 50 + 22 * Math.cos(v));
  const glowY = useTransform(a, (v) => 50 + 22 * Math.sin(v));
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(126,190,197,0.16), transparent 55%)`;

  return (
    <div ref={ref} className={className}>
      <div className="relative aspect-square w-full">
        {/* ---- Nebula (behind the rings) ---- */}
        {/* Ambient base so the glow never fully leaves the rings. */}
        <div className="nebula-ambient absolute inset-[-12%] rounded-full" />

        {/* Gold wisp — trails furthest. */}
        <motion.div
          style={{ left: reduce ? "8%" : wispX, top: reduce ? "28%" : wispY }}
          className="nebula-blob nebula-gold absolute h-[46%] w-[46%]"
        />
        {/* Lavender cloud — trails a beat behind the core. */}
        <motion.div
          style={{ left: reduce ? "30%" : trailX, top: reduce ? "13%" : trailY }}
          className="nebula-blob nebula-lavender absolute h-[78%] w-[78%]"
        />
        {/* Teal core — locked to the black hole, densest point of the nebula. */}
        <motion.div
          style={{ left: reduce ? "50%" : nodeX, top: reduce ? "2%" : nodeY }}
          className="nebula-blob nebula-teal absolute h-[58%] w-[58%]"
        />

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
          className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90 bg-black shadow-[0_0_0_4px_rgba(10,11,14,0.75),0_0_18px_6px_rgba(126,190,197,0.45)]"
        />
      </div>

      <style>{`
        .nebula-blob {
          translate: -50% -50%;
          border-radius: 9999px;
          mix-blend-mode: screen;
          pointer-events: none;
          will-change: left, top;
          animation: nebula-breathe 9s ease-in-out infinite;
        }
        .nebula-teal {
          background: radial-gradient(
            circle,
            rgba(96, 214, 226, 0.8) 0%,
            rgba(80, 196, 208, 0.45) 24%,
            rgba(80, 196, 208, 0.14) 48%,
            transparent 70%
          );
        }
        .nebula-lavender {
          background: radial-gradient(
            circle,
            rgba(178, 112, 250, 0.6) 0%,
            rgba(166, 110, 235, 0.28) 32%,
            rgba(166, 110, 235, 0.08) 56%,
            transparent 72%
          );
          animation-duration: 12s;
          animation-delay: -4s;
        }
        .nebula-gold {
          background: radial-gradient(
            circle,
            rgba(240, 182, 72, 0.55) 0%,
            rgba(224, 168, 70, 0.24) 32%,
            transparent 68%
          );
          animation-duration: 10s;
          animation-delay: -7s;
        }
        .nebula-ambient {
          background:
            radial-gradient(circle at 40% 45%, rgba(183, 148, 223, 0.14), transparent 60%),
            radial-gradient(circle at 60% 58%, rgba(126, 190, 197, 0.12), transparent 62%);
          pointer-events: none;
        }
        @keyframes nebula-breathe {
          0%, 100% { scale: 1; opacity: 1; }
          50%      { scale: 1.12; opacity: 0.85; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nebula-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
