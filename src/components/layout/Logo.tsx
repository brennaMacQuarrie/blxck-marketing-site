import Image from "next/image";

/**
 * Full brand lockup: the neon "BLXCK" wordmark with "MARKETING" set beneath,
 * letter-spaced to span the same width. Used in the nav and footer.
 */
export function Logo({
  markClass = "h-[22px]",
  labelClass = "text-[9px] tracking-[0.5em]",
  priority = false,
}: {
  markClass?: string;
  labelClass?: string;
  priority?: boolean;
}) {
  return (
    <span className="inline-flex flex-col items-stretch leading-none">
      <Image
        src="/logos/blxck-wordmark-trimmed.png"
        alt="BLXCK Marketing"
        width={120}
        height={27}
        priority={priority}
        className={`${markClass} w-auto`}
      />
      <span
        className={`mt-1 self-stretch text-center font-display uppercase text-silver/75 ${labelClass}`}
      >
        Marketing
      </span>
    </span>
  );
}
