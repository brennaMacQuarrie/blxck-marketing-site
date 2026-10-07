import Image from "next/image";

/**
 * Infinite, auto-scrolling logo strip. The list is rendered twice and the
 * track slides by exactly one copy, so the loop is seamless. Pauses on
 * hover; edges fade into the background. Under reduced motion it becomes a
 * static, wrapped row. Pure CSS.
 */
export function LogoCarousel({
  logos,
  seconds = 45,
}: {
  logos: { name: string; src: string }[];
  seconds?: number;
}) {
  const row = (dup: boolean) => (
    <ul
      className={`logo-row flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20 ${dup ? "logo-dup" : ""}`}
      aria-hidden={dup || undefined}
    >
      {logos.map((l) => (
        <li key={l.name} className="flex h-16 shrink-0 items-center md:h-20">
          <Image
            src={l.src}
            alt={dup ? "" : l.name}
            width={160}
            height={64}
            className="h-auto max-h-10 w-auto max-w-[150px] object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 md:max-h-12 md:max-w-[170px]"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="logo-carousel group relative overflow-hidden">
      <div
        className="logo-track flex w-max"
        style={{ animationDuration: `${seconds}s` }}
      >
        {row(false)}
        {row(true)}
      </div>

      <style>{`
        .logo-carousel {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
        }
        .logo-track {
          animation: logo-scroll linear infinite;
        }
        .logo-carousel:hover .logo-track {
          animation-play-state: paused;
        }
        @keyframes logo-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-carousel { -webkit-mask-image: none; mask-image: none; }
          .logo-track { animation: none; width: 100%; }
          .logo-row { flex-wrap: wrap; justify-content: center; row-gap: 1rem; padding-right: 0; width: 100%; }
          .logo-dup { display: none; }
        }
      `}</style>
    </div>
  );
}
