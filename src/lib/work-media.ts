import type { WorkItem } from "@/lib/content";
import { workDimensions } from "@/lib/work-dimensions";

/**
 * How to frame a portfolio item. Graphics are never cropped: the image is
 * rendered at its natural aspect ratio (cards sit in a masonry layout).
 * Transparent artwork ("bare") sits directly on the page with no card.
 */
export function workMedia(w: WorkItem) {
  const [width, height] = workDimensions[w.image] ?? [1600, 1000];
  const mockup = w.image.startsWith("/work/web/");
  const bare = mockup || Boolean(w.transparent);
  const panel =
    w.contain === "light"
      ? "bg-[#f2f0eb] p-[12%]"
      : w.transparent
        ? "p-[10%]"
        : "";
  return { width, height, panel, bare };
}

/** Split work into sub-headed groups, ungrouped items first, keeping order. */
export function groupWork(items: WorkItem[]) {
  const groups: { group?: string; items: WorkItem[] }[] = [];
  for (const w of [...items.filter((i) => !i.group), ...items.filter((i) => i.group)]) {
    const existing = groups.find((g) => g.group === w.group);
    if (existing) existing.items.push(w);
    else groups.push({ group: w.group, items: [w] });
  }
  return groups;
}
