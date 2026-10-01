/**
 * Morphing nebula — the brand's three soft cloud plates. One plate stays fully
 * present at all times (so the glow never dims); the other two gently drift in
 * and out on top, shifting the colour. Each layer slowly rotates/scales.
 * Masked into a soft cloud that melts into the black. Pure CSS; static under
 * reduced-motion. Decorative only.
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
          will-change: transform, opacity;
          transform-origin: 50% 50%;
        }
        /* Base plate — always fully present so the glow never dims. */
        .nebula-1 {
          background-image: url('/hero/nebula-1.jpg');
          opacity: 1;
          animation: nebula-spin-a 60s ease-in-out infinite;
        }
        /* Overlays drift in and out on top, alternating, to shift the colour. */
        .nebula-2 {
          background-image: url('/hero/nebula-2.jpg');
          opacity: 0;
          animation: nebula-spin-b 70s ease-in-out infinite,
                     nebula-drift 34s ease-in-out infinite;
        }
        .nebula-3 {
          background-image: url('/hero/nebula-3.jpg');
          opacity: 0;
          animation: nebula-spin-c 64s ease-in-out infinite,
                     nebula-drift 34s ease-in-out infinite;
          animation-delay: 0s, -17s;
        }
        @keyframes nebula-drift {
          0%   { opacity: 0; }
          25%  { opacity: 0.9; }
          50%  { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes nebula-spin-a {
          0%   { transform: rotate(0deg)   scale(1.1); }
          100% { transform: rotate(360deg) scale(1.1); }
        }
        @keyframes nebula-spin-b {
          0%   { transform: rotate(0deg)    scale(1.18); }
          100% { transform: rotate(-360deg) scale(1.18); }
        }
        @keyframes nebula-spin-c {
          0%   { transform: rotate(8deg)   scale(1.14); }
          100% { transform: rotate(368deg) scale(1.14); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nebula-layer { animation: none !important; }
          .nebula-1 { opacity: 1; transform: scale(1.1); }
          .nebula-2 { opacity: 0.45; transform: scale(1.14) rotate(120deg); }
          .nebula-3 { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
