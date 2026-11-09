import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/custom-plan-builder"] },
    sitemap: `https://${site.domain}/sitemap.xml`,
  };
}
