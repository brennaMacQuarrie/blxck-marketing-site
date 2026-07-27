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
  items: { name: string; detail: string }[];
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
      },
      {
        name: "Digital Ads",
        detail: "Paid media planning that turns spend into measurable return.",
      },
      {
        name: "Business & Marketing Audits",
        detail:
          "A proper audit gives you a clear, honest look at what's working — and what's quietly wasting money.",
      },
      {
        name: "Goal Setting & Brand Positioning",
        detail: "Define the target, then position the brand to own it.",
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
      { name: "Advertising", detail: "Full-funnel campaigns across the platforms that matter." },
      { name: "Analytics", detail: "Every decision backed by data you can actually read." },
      { name: "Branding", detail: "A cohesive identity that's unmistakably yours." },
      {
        name: "Social Media Management",
        detail: "Consistent, on-brand presence that builds an audience.",
      },
      { name: "Strategy", detail: "The roadmap that ties every channel to a goal." },
    ],
  },
  {
    key: "creation",
    title: "Creation",
    blurb:
      "In-house production — the content that makes the strategy real and the brand feel premium.",
    accent: "gold",
    items: [
      { name: "Videography", detail: "Cinematic video from concept to final cut." },
      { name: "Photography", detail: "Product and brand imagery that sells." },
      { name: "Jingles & Radio Ads", detail: "Sound that sticks — written, scored, produced." },
      { name: "Graphic Design", detail: "Visual assets built to convert, not just decorate." },
    ],
  },
  {
    key: "web",
    title: "Web",
    blurb:
      "The foundation everything else drives traffic to — fast, found, and built to last.",
    accent: "teal",
    items: [
      { name: "Web Development", detail: "Sites that load fast and convert faster." },
      {
        name: "Hosting",
        detail: "Bad web hosting is a silent killer — ours keeps you fast and online.",
      },
      { name: "SEO", detail: "Get found by the people already searching for you." },
    ],
  },
];

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
  blurb: string;
  accent: "teal" | "lavender" | "gold" | "silver";
};

export const projects: Project[] = [
  {
    name: "Hansen Distillery",
    sector: "Spirits · E-commerce",
    blurb: "Craft distillery brand and storefront built to pour off the shelf.",
    accent: "gold",
  },
  {
    name: "ATMA CENA",
    sector: "Lifestyle · Brand",
    blurb: "A premium identity system with content to match.",
    accent: "lavender",
  },
  {
    name: "REX Equipment",
    sector: "Industrial · Web",
    blurb: "Heavy equipment, meet a site that actually converts.",
    accent: "teal",
  },
  {
    name: "Tiger Gold",
    sector: "Retail · Campaign",
    blurb: "Paid media and creative that made the brand impossible to miss.",
    accent: "gold",
  },
  {
    name: "Natural History",
    sector: "Culture · Non-profit",
    blurb: "Storytelling and reach for a mission that deserved both.",
    accent: "silver",
  },
  {
    name: "Optometrists' Clinic",
    sector: "Medical · Local SEO",
    blurb: "Local search dominance for a practice on the grow.",
    accent: "teal",
  },
  {
    name: "Apex Labs",
    sector: "Cannabis · Brand",
    blurb: "A compliant, elevated brand in a crowded category.",
    accent: "lavender",
  },
  {
    name: "Azimuth Collective",
    sector: "Creative · Studio",
    blurb: "Positioning and presence for a studio with range.",
    accent: "silver",
  },
  {
    name: "Canadian Sniper Association",
    sector: "Membership · Non-profit",
    blurb: "Digital presence for a community with a precise mission.",
    accent: "gold",
  },
];

/** High-level pillars used on the home page overview. */
export const pillars = [
  {
    n: "01",
    title: "Strategy",
    copy: "We start with the plan — goals, positioning, and the channels that get you there.",
  },
  {
    n: "02",
    title: "Creation",
    copy: "In-house video, photo, and design that make the brand feel premium.",
  },
  {
    n: "03",
    title: "Advertising",
    copy: "Full-funnel paid media that turns spend into measurable return.",
  },
  {
    n: "04",
    title: "Web & SEO",
    copy: "Fast sites that get found — the foundation everything drives toward.",
  },
];
