import type { WorkItem } from "@/lib/content";

/**
 * How to frame a portfolio item in the tidy tile grid. Tiles are the same
 * shape within a type of work, and graphics are never cropped: each image is
 * shown whole and centred in its tile. Transparent artwork ("bare") sits
 * directly on the page with no card; dark lettering gets a soft white glow.
 */
export function workMedia(w: WorkItem) {
  const light = w.contain === "light";
  const bare = w.image.startsWith("/work/web/") || Boolean(w.transparent) || light;
  const tile = w.tags.includes("social")
    ? "aspect-[9/16]"
    : w.video
      ? "aspect-video"
      : w.tags.some((t) => t === "web" || t === "branding")
        ? "aspect-[4/3]"
        : "aspect-[4/5]";
  const panel = light ? "white-glow" : bare ? "" : "bg-carbon";
  const img = `object-contain ${light ? "p-[16%]" : w.transparent ? "p-[12%]" : ""}`;
  return { tile, panel, img, bare };
}

/** Grid columns: vertical reels fit four across, everything else three. */
export function workGrid(items: WorkItem[]) {
  return items.every((w) => w.tags.includes("social"))
    ? "grid grid-cols-2 gap-5 lg:grid-cols-4"
    : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3";
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
