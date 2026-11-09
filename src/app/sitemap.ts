import type { MetadataRoute } from "next";
import { allServices } from "@/lib/content";
import { site } from "@/lib/site";

const base = `https://${site.domain}`;

/** Public pages only. The plan builder and medical marketing page stay out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/services",
    "/our-work",
    "/case-studies",
    "/ardent-case-study",
    "/optometrists-case-study",
    "/portfolio",
    "/contact",
    "/privacy-policy",
  ];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...allServices.map((s) => ({ url: `${base}/services/${s.slug}` })),
  ];
}
