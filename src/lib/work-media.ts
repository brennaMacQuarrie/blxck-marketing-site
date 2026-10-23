import type { WorkItem } from "@/lib/content";
import { workDimensions } from "@/lib/work-dimensions";

/**
 * How to frame a portfolio item. Graphics are never cropped: the image is
 * rendered at its natural aspect ratio (cards sit in a masonry layout).
 * Logos get a plain light/dark panel with breathing room around them.
 */
export function workMedia(w: WorkItem) {
  const [width, height] = workDimensions[w.image] ?? [1600, 1000];
  const panel =
    w.contain === "light"
      ? "bg-[#f2f0eb] p-[12%]"
      : w.contain === "dark"
        ? "bg-carbon p-[12%]"
        : "";
  return { width, height, panel };
}
