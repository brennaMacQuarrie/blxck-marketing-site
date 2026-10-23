import type { WorkItem } from "@/lib/content";

/** Card frame + image classes for a portfolio item, based on its shape. */
export function workMedia(w: WorkItem) {
  const aspect = w.video
    ? "aspect-video"
    : w.shape === "portrait"
      ? "aspect-[4/5]"
      : "aspect-square";
  const panel =
    w.contain === "light" ? "bg-[#f2f0eb]" : w.contain === "dark" ? "bg-carbon" : "";
  const img = w.contain ? "object-contain p-[12%]" : "object-cover";
  return { aspect, panel, img };
}
