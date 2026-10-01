/**
 * Morphing nebula — the brand's three soft cloud plates crossfading into one
 * another (so one colour dominates at a time, like the original site) while
 * each slowly rotates, scales and drifts. Masked into a soft cloud that melts
 * into the black. Pure CSS; static under reduced-motion. Decorative only.
 */
export function HeroNebula({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <div className="nebula-mask relative h-full w-full">
        <div className="nebula-layer nebula-1" />
        <div className="nebula-layer nebula-2" />
        <div className="nebula-layer nebula-3" />
      </div>

      <style>{`
        .nebula-mask {
          -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 76%);
          mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 76%);
        }
        .nebula-layer {
          position: absolute;
          inset: -25%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          will-change: transform, opacity;
          transform-origin: 50% 50%;
          /* 36s crossfade cycle shared across the three layers (delays stagger them). */
          animation: nebula-cross 36s linear infinite;
        }
        .nebula-1 { background-image: url('/hero/nebula-1.jpg'); animation-delay: 0s;   animation-name: nebula-cross, nebula-spin-a; animation-duration: 36s, 48s; animation-timing-function: linear, ease-in-out; animation-iteration-count: infinite, infinite; }
        .nebula-2 { background-image: url('/hero/nebula-2.jpg'); animation-delay: -12s; animation-name: nebula-cross, nebula-spin-b; animation-duration: 36s, 58s; animation-timing-function: linear, ease-in-out; animation-iteration-count: infinite, infinite; }
        .nebula-3 { background-image: url('/hero/nebula-3.jpg'); animation-delay: -24s; animation-name: nebula-cross, nebula-spin-c; animation-duration: 36s, 52s; animation-timing-function: linear, ease-in-out; animation-iteration-count: infinite, infinite; }

        /* One cloud dominates at a time, with soft overlap at the hand-offs. */
        @keyframes nebula-cross {
          0%   { opacity: 0; }
          6%   { opacity: 1; }
          28%  { opacity: 1; }
          40%  { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes nebula-spin-a {
          0%   { transform: rotate(0deg)   scale(1.08); }
          100% { transform: rotate(360deg) scale(1.08); }
        }
        @keyframes nebula-spin-b {
          0%   { transform: rotate(0deg)    scale(1.16); }
          100% { transform: rotate(-360deg) scale(1.16); }
        }
        @keyframes nebula-spin-c {
          0%   { transform: rotate(10deg)  scale(1.12); }
          100% { transform: rotate(370deg) scale(1.12); }
        }

        @media (prefers-reduced-motion: reduce) {
          .nebula-layer { animation: none !important; }
          .nebula-1 { opacity: 1; transform: scale(1.1); }
          .nebula-2 { opacity: 0; }
          .nebula-3 { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
