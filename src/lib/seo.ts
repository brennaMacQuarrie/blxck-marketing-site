/**
 * Search-only text: <title> and meta descriptions, plus JSON-LD structured data.
 * None of this appears on the page itself, so it can carry location and search
 * terms (Edmonton, Calgary, Alberta, Canada) without changing the visible copy.
 * Keep titles under ~60 characters and descriptions under ~160.
 */
import { site } from "@/lib/site";

export const baseUrl = `https://${site.domain}`;

/** Per-service search title (before " | BLXCK Marketing") and description. */
export const serviceSeo: Record<string, { title: string; description: string }> = {
  "social-content-consulting": {
    title: "Social Media Content Consulting in Edmonton",
    description: "Posting but not growing? BLXCK reviews your social content and shows you what to change. Social media consulting for businesses in Edmonton and across Canada.",
  },
  "digital-ads": {
    title: "Digital Ads Consulting in Edmonton",
    description: "Ads not paying off? BLXCK audits your Google and social ads and shows you exactly what to fix. Ads consulting for businesses in Edmonton and across Canada.",
  },
  "business-and-marketing-audits": {
    title: "Business & Marketing Audits in Edmonton",
    description: "Not sure why growth has stalled? A BLXCK marketing audit finds what's holding you back and what to do next. For businesses in Edmonton, Calgary and across Canada.",
  },
  "goal-setting-and-brand-positioning": {
    title: "Brand Positioning & Goal Setting in Edmonton",
    description: "Get clear on where you're going and why customers should choose you. Brand positioning and goal setting for businesses in Edmonton and across Canada.",
  },
  advertising: {
    title: "Paid Advertising Agency in Edmonton",
    description: "Full-funnel paid campaigns, creative and ongoing optimization built for measurable return. Ads management for businesses in Edmonton, Calgary and across Canada.",
  },
  analytics: {
    title: "Marketing Analytics & Reporting in Edmonton",
    description: "Tracking set up properly, dashboards in plain language and monthly reads on what's working. Marketing analytics for businesses in Edmonton and across Canada.",
  },
  branding: {
    title: "Branding Agency in Edmonton",
    description: "Logos, identity, voice and brand guides that make your business unmistakable. BLXCK is a branding agency in Edmonton working with brands across Canada.",
  },
  "social-media-management": {
    title: "Social Media Management in Edmonton",
    description: "Consistent, on-brand social media, planned, created and managed for you. Social media management for businesses in Edmonton, Calgary and across Canada.",
  },
  strategy: {
    title: "Marketing Strategy Agency in Edmonton",
    description: "A clear marketing roadmap that ties every channel to a goal: positioning, audience and message. Marketing strategy for businesses in Edmonton and across Canada.",
  },
  videography: {
    title: "Video Production Company in Edmonton",
    description: "Brand videos, ads and social content, from concept and script to final cut. BLXCK is a video production team in Edmonton working across Alberta and Canada.",
  },
  photography: {
    title: "Commercial & Product Photography in Edmonton",
    description: "Product, brand and team photography with art direction and web-ready image libraries you own. Commercial photography in Edmonton and across Alberta.",
  },
  "jingles-and-radio-ads": {
    title: "Jingles & Radio Ad Production in Edmonton",
    description: "Custom jingles and radio ads, written, scored and produced in-house. BLXCK creates radio advertising for businesses in Edmonton, Calgary and across Canada.",
  },
  "graphic-design": {
    title: "Graphic Design Agency in Edmonton",
    description: "On-brand graphic design for ads, social, print and web, with source files handed over. Graphic design for businesses in Edmonton and across Canada.",
  },
  "web-development": {
    title: "Web Design & Development in Edmonton",
    description: "Fast, responsive websites built to turn visitors into enquiries. BLXCK designs and builds websites for businesses in Edmonton, Calgary and across Canada.",
  },
  hosting: {
    title: "Website Hosting & Maintenance in Edmonton",
    description: "Fast, monitored website hosting with security, backups and uptime handled for you. Managed hosting for businesses in Edmonton and across Canada.",
  },
  seo: {
    title: "SEO Services in Edmonton",
    description: "On-page, technical and local SEO, Google Business Profile and clear reporting. SEO services for businesses in Edmonton, Calgary and across Canada.",
  },
};

const org = {
  "@type": "ProfessionalService",
  "@id": `${baseUrl}/#organization`,
  name: site.name,
  url: baseUrl,
  logo: `${baseUrl}/icon.png`,
  image: `${baseUrl}/opengraph-image`,
  description:
    "Full-service marketing agency in Edmonton, Alberta: strategy, branding, advertising, social media, video, photography, jingles, web design and SEO.",
  email: site.contact.email,
  telephone: site.contact.phone,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "11715H 108 Ave",
    addressLocality: "Edmonton",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Edmonton" },
    { "@type": "City", name: "Calgary" },
    { "@type": "AdministrativeArea", name: "Alberta" },
    { "@type": "Country", name: "Canada" },
  ],
  sameAs: [site.social.instagram, site.social.linkedin],
};

/** Business details for every page (rendered once in the root layout). */
export const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    org,
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: site.name,
      inLanguage: "en-CA",
      publisher: { "@id": `${baseUrl}/#organization` },
    },
  ],
};

/** A service page: the service plus breadcrumbs. */
export function serviceLd(slug: string, name: string, description: string) {
  const url = `${baseUrl}/services/${slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        serviceType: name,
        description,
        url,
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: org.areaServed,
      },
      breadcrumbs([
        ["Services", "/services"],
        [name, `/services/${slug}`],
      ]),
    ],
  };
}

/** BreadcrumbList from [label, path] pairs (Home is added first). */
export function breadcrumbs(items: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as [string, string], ...items].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${baseUrl}${path === "/" ? "" : path}`,
    })),
  };
}

/** A case study page as an Article with breadcrumbs. */
export function caseStudyLd(path: string, headline: string, description: string, image: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline,
        description,
        image: `${baseUrl}${image}`,
        url: `${baseUrl}${path}`,
        inLanguage: "en-CA",
        author: { "@id": `${baseUrl}/#organization` },
        publisher: { "@id": `${baseUrl}/#organization` },
      },
      breadcrumbs([
        ["Case studies", "/case-studies"],
        [headline, path],
      ]),
    ],
  };
}

/** Render JSON-LD safely (escapes "<" so content can't close the script tag). */
export function ldJson(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
