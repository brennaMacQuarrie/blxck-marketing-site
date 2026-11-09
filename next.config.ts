import type { NextConfig } from "next";

/** Old WordPress URLs (blxckmarketing.com before Nov 2026) → their new homes. */
const legacy: [string, string][] = [
  ["/packages", "/services"],
  ["/thank-you", "/contact"],
  ["/case-studies/brand-rebuild-for-a-roofing-company-that-had-outgrown-its-website", "/ardent-case-study"],
  ["/case-studies/atma-cena-full-lms-migration-course-rebuild", "/case-studies"],
  ["/portfolio/ardent-roof-systems-website", "/ardent-case-study"],
  ["/portfolio/optometrists-clinic-website", "/optometrists-case-study"],
  ["/portfolio/transcend-together-website", "/portfolio#web"],
  ["/portfolio/solar-ninjas-website", "/portfolio#web"],
  ["/portfolio/true-aesthetics-website", "/portfolio#web"],
  ["/portfolio/tios-website", "/portfolio#web"],
  ["/portfolio/simply-decks-website", "/portfolio#web"],
  ["/portfolio/inferno-defence-systems-website", "/portfolio#web"],
  ["/portfolio/ardent-roof-systems-brand-story-video", "/portfolio#video"],
  ["/portfolio/atma-cena-brand-story-video", "/portfolio#video"],
  ["/portfolio/arpa-ymca-working-in-recreation", "/portfolio#video"],
  ["/portfolio/dynaline-social-media-reel", "/portfolio#social"],
  ["/portfolio/token-naturals-social-media-reel", "/portfolio#social"],
  ["/portfolio/hansen-social-media-reel", "/portfolio#social"],
  ["/portfolio/atma-cena", "/portfolio"],
  ["/services/business-marketing-audits", "/services/business-and-marketing-audits"],
  ["/services/goal-setting-brand-positioning", "/services/goal-setting-and-brand-positioning"],
  ["/services/jingles-radio-ads", "/services/jingles-and-radio-ads"],
  ["/services/social-content-management", "/services/social-media-management"],
  ["/services/video-for-socials", "/services/videography"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.blxckmarketing.com" }],
        destination: "https://blxckmarketing.com/:path*",
        permanent: true,
      },
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      // Any other old WordPress portfolio or case study entry.
      { source: "/portfolio/:slug", destination: "/portfolio", permanent: true },
      { source: "/case-studies/:slug", destination: "/case-studies", permanent: true },
      // WordPress feeds, admin and login.
      { source: "/feed/:path*", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/wp-login.php", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
