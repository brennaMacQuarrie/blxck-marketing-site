/**
 * Site content — services, packages, and portfolio.
 * Copy is adapted and polished from blxckmarketing.com; all facts
 * (service names, pricing, client roster, contact details) are preserved.
 */

export type ServiceGroup = {
  key: string;
  title: string;
  blurb: string;
  accent: "teal" | "lavender" | "gold";
  // `detail` = short line (home preview). `long` = full copy from the
  // original site where it exists (shown on the Services page).
  items: { name: string; detail: string; long?: string }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    key: "consulting",
    title: "Consulting",
    blurb:
      "A clear, honest look at where your marketing actually stands — and the plan to move it forward.",
    accent: "teal",
    items: [
      {
        name: "Video for Socials",
        detail: "Short-form video strategy engineered to stop the scroll.",
        long: "Most businesses know they need video — they just don't know where to start, what to make, or why their current content isn't landing. We help you cut through that noise and build a video approach that actually fits how your audience consumes content and how your team can realistically execute it.",
      },
      {
        name: "Digital Ads",
        detail: "Paid media planning that turns spend into measurable return.",
        long: "Running ads without a strategic foundation is just burning money with extra steps. Before we touch a campaign, we make sure we understand your goals, your margins, your audience, and what success actually looks like for your business.",
      },
      {
        name: "Business & Marketing Audits",
        detail:
          "A clear, honest look at what's working — and what's quietly wasting money.",
        long: "You can't fix what you don't know is broken. A proper audit gives you a clear, honest look at where your marketing is working, where it's wasting money, and what gaps are quietly costing you leads and sales.",
      },
      {
        name: "Goal Setting & Brand Positioning",
        detail: "Define the target, then position the brand to own it.",
        long: "If your team doesn't agree on where you're going, your marketing will reflect that. We facilitate focused goal setting sessions that get your goals out of someone's head and into a framework your whole team can execute against.",
      },
    ],
  },
  {
    key: "marketing",
    title: "Marketing",
    blurb:
      "The always-on engine — advertising, analytics, and social that compounds month over month.",
    accent: "lavender",
    items: [
      {
        name: "Advertising",
        detail: "Full-funnel campaigns across the platforms that matter.",
        long: "Full-funnel paid campaigns across the platforms that matter, built and managed to turn spend into measurable, trackable return.",
      },
      {
        name: "Analytics",
        detail: "Every decision backed by data you can actually read.",
        long: "Every decision backed by numbers you can actually read — so you always know what's working, what isn't, and where to put the next dollar.",
      },
      {
        name: "Branding",
        detail: "A cohesive identity that's unmistakably yours.",
        long: "A cohesive identity — look, voice, and feel — that's unmistakably yours and holds up across every touchpoint.",
      },
      {
        name: "Social Media Management",
        detail: "Consistent, on-brand presence that builds an audience.",
        long: "Consistent, on-brand presence that builds an audience and keeps you top of mind — planned, produced, and posted so you don't have to.",
      },
      {
        name: "Strategy",
        detail: "The roadmap that ties every channel to a goal.",
        long: "We get clear on your positioning, your audience, and your message — then build campaigns around it that have a real reason to exist.",
      },
    ],
  },
  {
    key: "creation",
    title: "Creation",
    blurb:
      "In-house production — the content that makes the strategy real and the brand feel premium.",
    accent: "gold",
    items: [
      {
        name: "Videography",
        detail: "Cinematic video from concept to final cut.",
        long: "From concept to delivery, we produce high-end video content built to showcase your brand, connect with your audience, and convert.",
      },
      {
        name: "Photography",
        detail: "Product and brand imagery that sells.",
        long: "Good photography is one of the highest-leverage investments a business can make. It shows up everywhere — your website, your ads, your social, your proposals — and the quality of those images signals the quality of your business before anyone reads a single word.",
      },
      {
        name: "Jingles & Radio Ads",
        detail: "Sound that sticks — written, scored, produced.",
        long: "Audio advertising is one of the most underused tools in a local marketing mix — and when it's done well, it's remarkably sticky. A great jingle or a well-written radio spot doesn't just get heard, it gets remembered.",
      },
      {
        name: "Graphic Design",
        detail: "Visual assets built to convert, not just decorate.",
        long: "Every visual your business puts into the world is making an impression — good graphic design makes sure it's the right one. We create graphics that are on-brand, built for their intended use, and designed to actually work as marketing collateral, not just look good in a mockup.",
      },
    ],
  },
  {
    key: "web",
    title: "Web",
    blurb:
      "The foundation everything else drives traffic to — fast, found, and built to last.",
    accent: "teal",
    items: [
      {
        name: "Web Development",
        detail: "Sites that load fast and convert faster.",
        long: "Fast, trustworthy sites that load quickly and convert — the foundation everything else drives traffic toward.",
      },
      {
        name: "Hosting",
        detail: "Bad web hosting is a silent killer — ours keeps you fast and online.",
        long: "Bad web hosting is a silent killer. Slow load times, unexpected downtime, and security gaps cost you traffic, rankings, and customers — often without you even knowing it's happening. We manage reliable, fast hosting so your site stays up, stays secure, and stays out of your way.",
      },
      {
        name: "SEO",
        detail: "Get found by the people already searching for you.",
        long: "Get found by the people already searching for you — on-page, technical, and local SEO that earns rankings and keeps them.",
      },
    ],
  },
];

/** kebab-case slug for routing (e.g. "Jingles & Radio Ads" → "jingles-and-radio-ads"). */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type ServiceEntry = ServiceGroup["items"][number] & {
  slug: string;
  group: string;
  groupKey: string;
  accent: ServiceGroup["accent"];
};

/** Flat list of every service, with its slug and parent group. */
export const allServices: ServiceEntry[] = serviceGroups.flatMap((g) =>
  g.items.map((it) => ({
    ...it,
    slug: slugify(it.name),
    group: g.title,
    groupKey: g.key,
    accent: g.accent,
  })),
);

export function getService(slug: string): ServiceEntry | undefined {
  return allServices.find((s) => s.slug === slug);
}

/** Sibling services within the same group (excluding the given slug). */
export function siblingServices(slug: string): ServiceEntry[] {
  const svc = getService(slug);
  if (!svc) return [];
  return allServices.filter((s) => s.groupKey === svc.groupKey && s.slug !== slug);
}

/** "What's included" bullets per service slug — concrete, no fabricated stats. */
export const servicePoints: Record<string, string[]> = {
  "video-for-socials": [
    "A content plan matched to your audience and your team's capacity",
    "Hooks, formats, and pacing built for each platform",
    "A realistic shooting and posting cadence you can actually sustain",
  ],
  "digital-ads": [
    "Account and campaign structure built around real appointment or sale value",
    "Audience, budget, and bid strategy agreed before anything goes live",
    "Clear reporting on cost per result — not vanity metrics",
  ],
  "business-and-marketing-audits": [
    "A full review of your current marketing, spend, and presence",
    "A clear picture of where money is working and where it's leaking",
    "A prioritized list of fixes — biggest, fastest wins first",
  ],
  "goal-setting-and-brand-positioning": [
    "Facilitated goal-setting your whole team can rally behind",
    "Clear positioning: who you're for and why you win",
    "A written framework to execute against, not just talk about",
  ],
  advertising: [
    "Full-funnel campaigns across the platforms that fit your audience",
    "Creative and copy built to convert, not just to impress",
    "Ongoing optimization toward measurable return",
  ],
  analytics: [
    "Tracking set up correctly from the start",
    "Dashboards in plain language, not jargon",
    "Monthly reads on what's working and what to change",
  ],
  branding: [
    "A cohesive identity — logo, type, colour, and voice",
    "Guidelines so everything stays consistent as you grow",
    "Assets ready for web, social, and print",
  ],
  "social-media-management": [
    "A content calendar planned ahead, not scrambled day-of",
    "On-brand posts produced, scheduled, and published",
    "Community engagement and clear monthly reporting",
  ],
  strategy: [
    "Clarity on positioning, audience, and message",
    "A channel plan tied to real business goals",
    "A living roadmap — not a one-off deck",
  ],
  videography: [
    "Concept, script, and shot planning up front",
    "Professional production and editing, start to finish",
    "Deliverables cut for every platform you need",
  ],
  photography: [
    "Product, brand, and team photography",
    "Art direction that matches your brand",
    "Edited, web-ready image libraries you own",
  ],
  "jingles-and-radio-ads": [
    "Scriptwriting and concept development",
    "Original music and professional voiceover",
    "Spots mixed and delivered broadcast-ready",
  ],
  "graphic-design": [
    "On-brand design for any format you need",
    "Built for its actual use — not just the mockup",
    "Source files handed over, ready to go",
  ],
  "web-development": [
    "Fast, responsive sites built to convert",
    "A clear path from first visit to enquiry",
    "Built on a platform your team can actually manage",
  ],
  hosting: [
    "Reliable, fast, monitored hosting",
    "Security, backups, and uptime handled for you",
    "One less thing you have to think about",
  ],
  seo: [
    "On-page, technical, and local SEO",
    "Google Business Profile and listings tuned",
    "Reporting on the rankings and traffic that matter",
  ],
};

export function getServicePoints(slug: string): string[] {
  return servicePoints[slug] ?? [];
}

/* ------------------------------------------------------------------ */
/*  Work — portfolio pieces tagged so they surface on service pages    */
/* ------------------------------------------------------------------ */

export type WorkItem = {
  name: string;
  type: string;
  image: string;
  tags: string[];
  href?: string; // where the card links (defaults to /portfolio)
  video?: boolean; // show a play overlay and open the video externally
};

export const work: WorkItem[] = [
  // Web builds (website screenshots)
  { name: "Inferno Defence Systems", type: "Website", image: "/work/inferno.webp", tags: ["web"] },
  { name: "Simply Decks", type: "Website", image: "/work/simply-decks.webp", tags: ["web"] },
  { name: "TiOS", type: "Website & Branding", image: "/work/tios.webp", tags: ["web", "branding"] },
  { name: "True Aesthetics", type: "Website", image: "/work/true-aesthetics.webp", tags: ["web"] },
  {
    name: "Transcend Together",
    type: "Website & Branding",
    image: "/work/transcend.webp",
    tags: ["web", "branding"],
  },
  { name: "Solar Ninjas", type: "Website", image: "/work/solar-ninjas.webp", tags: ["web"] },
  {
    name: "Ardent Roof Systems",
    type: "Website & Branding",
    image: "/work/ardent.webp",
    tags: ["web", "branding"],
  },

  // Videography (actual videos)
  {
    name: "ATMA CENA",
    type: "Brand Story Video",
    image: "/work/yt-atma-cena.jpg",
    tags: ["video"],
    href: "https://youtu.be/O08zHqvd3U4",
    video: true,
  },
  {
    name: "Ardent Roof Systems",
    type: "Brand Story Video",
    image: "/work/yt-ardent.jpg",
    tags: ["video"],
    href: "https://youtu.be/nM_kcDVCEg4",
    video: true,
  },
  {
    name: "ARPA & YMCA",
    type: "Working in Recreation",
    image: "/work/yt-arpa-ymca.jpg",
    tags: ["video"],
    href: "https://youtu.be/fsgf5bFTLhM",
    video: true,
  },

  // Social content (reels)
  {
    name: "Token Naturals",
    type: "Social Reel",
    image: "/work/yt-token-naturals.jpg",
    tags: ["social"],
    href: "https://youtu.be/YYmersiLrqA",
    video: true,
  },
  {
    name: "Hansen",
    type: "Social Reel",
    image: "/work/yt-hansen-reel.jpg",
    tags: ["social"],
    href: "https://youtu.be/L2Zbyiamb2I",
    video: true,
  },
  {
    name: "Dynaline",
    type: "Social Reel",
    image: "/work/yt-dynaline.jpg",
    tags: ["social"],
    href: "https://youtu.be/xbkWyX3APnQ",
    video: true,
  },
];

/** Which work tag (if any) a given service slug should showcase. */
const serviceWorkTag: Record<string, string> = {
  "web-development": "web",
  hosting: "web",
  seo: "web",
  branding: "branding",
  "graphic-design": "branding",
  videography: "video",
  "video-for-socials": "social",
  "social-media-management": "social",
};

export function getServiceWork(slug: string): WorkItem[] {
  const tag = serviceWorkTag[slug];
  return tag ? work.filter((w) => w.tags.includes(tag)) : [];
}

export type Package = {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  accent: "teal" | "lavender" | "gold";
  featured?: boolean;
};

export const packages: Package[] = [
  {
    name: "Ad Management",
    price: "$750",
    cadence: "/ month",
    summary: "For brands that need paid media run right — without the guesswork.",
    accent: "teal",
    features: [
      "Paid ad management across primary platforms",
      "Campaign setup, monitoring & optimization",
      "Monthly performance reporting",
      "Direct line to your strategist",
    ],
  },
  {
    name: "Ad Mgmt, Content & Strategy",
    price: "$2,600",
    cadence: "/ month",
    summary: "The growth engine — advertising, content, and strategy working as one.",
    accent: "lavender",
    featured: true,
    features: [
      "Everything in Ad Management",
      "Ongoing content creation",
      "Recurring strategy sessions",
      "Social media management",
      "Analytics & performance reviews",
    ],
  },
  {
    name: "Marketing Agency in a Box",
    price: "$6,200",
    cadence: "/ month",
    summary: "Your entire marketing department — strategy, creative, media, and web.",
    accent: "gold",
    features: [
      "Everything in the growth tier",
      "Full-scale content production",
      "Videography & photography",
      "Web development & SEO",
      "Priority support & senior strategy",
    ],
  },
];

export const auditOffer = {
  price: "$1,500",
  headline: "The Marketing Audit",
  body: "A proper audit gives you a clear, honest look at where your marketing is working — and where it isn't. Sign onto monthly services within six months and we credit $500 of it back.",
  note: "$500 credited toward monthly services",
};

export type Project = {
  name: string;
  sector: string;
  image: string;
  accent: "teal" | "lavender" | "gold" | "silver";
};

export const projects: Project[] = [
  {
    name: "Hansen Distillery",
    sector: "E-Commerce",
    image: "/portfolio/hansen.jpg",
    accent: "gold",
  },
  {
    name: "ATMA CENA",
    sector: "Medical",
    image: "/portfolio/atma-cena.webp",
    accent: "lavender",
  },
  {
    name: "REX Equipment",
    sector: "E-Commerce",
    image: "/portfolio/rex-equipment.jpg",
    accent: "teal",
  },
  {
    name: "Tiger Gold",
    sector: "Capital",
    image: "/portfolio/tiger-gold.webp",
    accent: "gold",
  },
  {
    name: "Natural History",
    sector: "Cannabis",
    image: "/portfolio/natural-history.jpg",
    accent: "silver",
  },
  {
    name: "Optometrists' Clinic",
    sector: "Medical",
    image: "/portfolio/optometrists.png",
    accent: "teal",
  },
  {
    name: "Apex Labs",
    sector: "Psychedelics",
    image: "/portfolio/apex-labs.png",
    accent: "lavender",
  },
  {
    name: "Azimuth Collective",
    sector: "Cannabis",
    image: "/portfolio/azimuth.png",
    accent: "silver",
  },
  {
    name: "Canadian Sniper Association",
    sector: "Non-Profit",
    image: "/portfolio/csa.jpg",
    accent: "gold",
  },
];

/**
 * Our process — the engagement loop (distinct from the services list).
 * Used in the pinned horizontal "How we work" section.
 */
export const processSteps = [
  {
    n: "01",
    title: "Audit",
    copy: "We start with a clear-eyed look at where you stand — your numbers, your market, and what's quietly holding growth back.",
  },
  {
    n: "02",
    title: "Strategy",
    copy: "Then the plan: goals, positioning, and the exact channels that will move them — written down and agreed on.",
  },
  {
    n: "03",
    title: "Create",
    copy: "In-house production brings it to life — video, photography, and design built to perform, not just to look good.",
  },
  {
    n: "04",
    title: "Amplify",
    copy: "We put it in market with paid media engineered to turn spend into measurable, trackable return.",
  },
  {
    n: "05",
    title: "Optimize",
    copy: "Then we read the data and sharpen. Nothing is set-and-forget — every month compounds on the last.",
  },
];

/* ------------------------------------------------------------------ */
/*  Medical Marketing Solutions — vertical landing page                */
/* ------------------------------------------------------------------ */

export const medical = {
  eyebrow: "Medical Marketing Solutions",
  headlineLead: "Built for the health categories",
  headlineAccent: "that are hard to market.",
  headlineTail: "",
  sub: "Psychedelics, cannabis, medical aesthetics, optometry, multi-clinic networks — categories where ad platforms say no, compliance isn't optional, and trust is everything. We help these brands grow anyway: sharper systems, a presence people believe, and more of the right patients and customers.",
  trustLine:
    "Psychedelics • optometry • medical aesthetics • medical & recreational cannabis • national clinic networks • specialty",
  industries: [
    {
      name: "Psychedelics & Mental Health",
      copy: "Emerging, scrutinized, and education-first. We build demand and trust without overstepping the claims you're allowed to make.",
    },
    {
      name: "Medical & Recreational Cannabis",
      copy: "Locked out of most ad platforms. We grow you through search, content, and brand — the channels that are actually open to you.",
    },
    {
      name: "Medical Aesthetics",
      copy: "Visual, competitive, and high-ticket. We make you the obvious choice, with compliant before-and-afters and a brand that signals quality.",
    },
    {
      name: "Optometry & Eye Care",
      copy: "Local-first and retention-driven. We own your local search and keep patients coming back — clinical and retail alike.",
    },
    {
      name: "National Clinic Networks",
      copy: "Many locations, one brand. Every clinic gets a consistent, locally-visible presence as you scale across the country.",
    },
    {
      name: "Specialty & Niche",
      copy: "Hard to target and easy to misjudge. We find your specific audience and speak to them with precision.",
    },
  ],
  problems: [
    {
      title: "Ad platforms keep saying no",
      copy: "Cannabis, psychedelics, and even aesthetics get disapproved or throttled. You need growth that doesn't depend on channels that won't have you.",
    },
    {
      title: "One compliance misstep is expensive",
      copy: "Health claims, privacy, advertising standards — in these categories, getting it wrong costs far more than getting it right ever would.",
    },
    {
      title: "Your online presence tells three different stories",
      copy: "Website, listings, search, and social drift out of sync — so patients and partners get a different message everywhere they look.",
    },
    {
      title: "Revenue is leaking where you can't see it",
      copy: "It's rarely just ad spend. Follow-up, retention, pricing, and clunky systems quietly cost more than any campaign ever will.",
    },
  ],
  services: [
    {
      title: "Compliant Acquisition",
      copy: "Paid media where it's allowed — and the channels that actually work when it isn't.",
    },
    {
      title: "SEO & Owned Search",
      copy: "Own the searches your category still ranks for. Often your biggest lever when ads are off the table.",
    },
    {
      title: "Brand, Content & Education",
      copy: "Build trust and demand in categories where hype backfires and education wins.",
    },
    {
      title: "Websites & Reputation",
      copy: "A credible home with a clear next step, plus a steady, ethical review engine.",
    },
    {
      title: "Systems & Revenue Audit",
      copy: "Find the underused tools and the places revenue leaks — then make the whole thing leaner.",
    },
    {
      title: "Multi-Location Enablement",
      copy: "Consistent, locally-visible presence across every clinic as you grow or onboard new ones.",
    },
  ],
  why: [
    {
      title: "We work where ads are restricted",
      copy: "Cannabis, psychedelics, aesthetics — we know which channels are open, which aren't, and how to grow without the ones that won't have you.",
    },
    {
      title: "Compliance-aware by default",
      copy: "We work with advertising guidelines and patient privacy in mind from the first step — not once something gets flagged.",
    },
    {
      title: "We start with an audit, not a pitch",
      copy: "We dig into your tools, numbers, and presence first. You leave with clarity, even if we never work together.",
    },
    {
      title: "We support the whole business",
      copy: "From acquisition to training to multi-clinic networks — like ATMA CENA, who we support across every facet of what they do.",
    },
  ],
  clients: [
    { name: "ATMA CENA", sector: "Psychedelic Therapy · Network", image: "/portfolio/atma-cena.webp" },
    { name: "Apex Labs", sector: "Psychedelics", image: "/portfolio/apex-labs.png" },
    { name: "Natural History", sector: "Cannabis", image: "/portfolio/natural-history.jpg" },
    { name: "Azimuth Collective", sector: "Cannabis", image: "/portfolio/azimuth.png" },
    { name: "Optometrists' Clinic", sector: "Optometry", image: "/portfolio/optometrists.png" },
  ],
  steps: [
    {
      n: "01",
      title: "The audit",
      copy: "We review your systems, your numbers, and your entire online presence — and show you exactly where the gaps and leaks are.",
    },
    {
      n: "02",
      title: "The plan",
      copy: "A prioritized roadmap: what to fix, what to cut, and what to build — across marketing and the business running behind it.",
    },
    {
      n: "03",
      title: "Build & grow",
      copy: "We execute and optimize — leaner systems, a sharper presence, and growth you can actually measure.",
    },
  ],
} as const;
