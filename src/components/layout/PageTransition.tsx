"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Route-change transition: a miniature of the home hero mark (brand rings,
 * a black hole orbiting once with its teal core and trailing lavender/gold
 * glow), centered on a dark veil that then lifts to reveal the new page.
 * Skipped on first load; under reduced motion it resolves instantly.
 */
export function PageTransition() {
  const pathname = usePathname();
  const [prev, setPrev] = useState(pathname);
  const [run, setRun] = useState(0);

  // Detect navigation during render so the veil is in the same commit as
  // the new page — it never flashes uncovered.
  if (pathname !== prev) {
    setPrev(pathname);
    setRun((r) => r + 1);
  }

  if (run === 0) return null;

  return (
    <div key={run} className="pt-veil" aria-hidden>
      <div className="pt-orb">
        <span className="pt-ring" style={{ inset: 0, borderColor: "rgb(126 190 197 / 0.7)" }} />
        <span className="pt-ring" style={{ inset: "13%", borderColor: "rgb(183 148 223 / 0.6)" }} />
        <span className="pt-ring" style={{ inset: "27%", borderColor: "rgb(204 169 93 / 0.55)" }} />
        <span className="pt-ring" style={{ inset: "43%", borderColor: "rgb(126 190 197 / 0.45)" }} />
        <span className="pt-arm pt-arm-gold"><i className="pt-glow pt-glow-gold" /></span>
        <span className="pt-arm pt-arm-lav"><i className="pt-glow pt-glow-lav" /></span>
        <span className="pt-arm pt-arm-core">
          <i className="pt-glow pt-glow-teal" />
          <i className="pt-node" />
        </span>
      </div>

      <style>{`
        .pt-veil {
          position: fixed; inset: 0; z-index: 100;
          display: grid; place-items: center;
          background: var(--color-void);
          pointer-events: none;
          animation: pt-veil 1.05s ease-in-out forwards;
        }
        .pt-orb {
          position: relative; width: clamp(160px, 22vmin, 240px); aspect-ratio: 1;
          animation: pt-orb 1.05s ease-in-out forwards;
        }
        .pt-ring { position: absolute; border-radius: 9999px; border: 1px solid; }
        /* Each arm spans the orb and rotates once; its child sits on the outer ring. */
        .pt-arm {
          position: absolute; inset: 0;
          animation: pt-spin 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.08s both;
        }
        .pt-arm-lav  { animation-delay: 0.14s; }
        .pt-arm-gold { animation-delay: 0.2s; }
        .pt-glow, .pt-node {
          position: absolute; left: 50%; top: 2%;
          translate: -50% -50%; border-radius: 9999px;
        }
        .pt-glow { mix-blend-mode: screen; }
        .pt-glow-teal { width: 64%; height: 64%; background: radial-gradient(circle, rgba(96,214,226,.8), rgba(80,196,208,.3) 35%, transparent 70%); }
        .pt-glow-lav  { width: 82%; height: 82%; top: 10%; background: radial-gradient(circle, rgba(178,112,250,.55), rgba(166,110,235,.2) 38%, transparent 70%); }
        .pt-glow-gold { width: 50%; height: 50%; top: -2%; background: radial-gradient(circle, rgba(240,182,72,.55), rgba(224,168,70,.2) 35%, transparent 70%); }
        .pt-node {
          width: 16px; height: 16px; background: #000;
          border: 2px solid rgba(255,255,255,.9);
          box-shadow: 0 0 0 4px rgba(10,11,14,.75), 0 0 22px 8px rgba(126,190,197,.45);
        }
        @keyframes pt-spin { from { rotate: 0deg; } to { rotate: 360deg; } }
        @keyframes pt-orb {
          0%   { opacity: 0; scale: 0.9; }
          14%  { opacity: 1; scale: 1; }
          80%  { opacity: 1; scale: 1; }
          100% { opacity: 0; scale: 1.06; }
        }
        @keyframes pt-veil {
          0%, 78% { opacity: 1; }
          100%    { opacity: 0; visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pt-veil { animation: none; opacity: 0; visibility: hidden; }
        }
      `}</style>
    </div>
  );
}
