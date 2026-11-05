import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

/** A single behind-the-scenes photo, between "Why BLXCK" and "What we do". */
export function OnSet() {
  return (
    <section className="bg-ink pb-24 md:pb-32">
      <Reveal amount={0.15} className="mx-auto max-w-6xl px-(--spacing-gutter)">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-carbon md:aspect-[16/9]">
            <Image
              src="/bts/atma-cena-on-set.webp"
              alt="The BLXCK crew filming an interview on set at ATMA CENA"
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-lo">
            On set with ATMA CENA.
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
