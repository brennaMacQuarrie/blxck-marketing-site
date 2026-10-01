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
  headline: "Marketing for clinics that want a fuller calendar.",
  sub: "We help medical and health practices attract the right patients, book more of them, and build a reputation that compounds — without running campaigns that put your licence at risk.",
  // Honest, qualitative pain points (no fabricated stats).
  problems: [
    {
      title: "Patients pick whoever shows up first",
      copy: "If you're not at the top of local search and maps, the clinic down the street is booking the patients who were looking for you.",
    },
    {
      title: "Gaps in the calendar you can't explain",
      copy: "Inconsistent new-patient flow makes revenue lumpy and makes it hard to staff and plan with confidence.",
    },
    {
      title: "Ad accounts flagged or rejected",
      copy: "Health is a sensitive category. Campaigns built without regard for medical ad policy get disapproved — or quietly throttled.",
    },
    {
      title: "A website that informs but doesn't book",
      copy: "Plenty of practice sites explain services beautifully and still make it hard to actually take the next step.",
    },
  ],
  // Tailored capabilities (a medical framing of the core services).
  services: [
    {
      title: "Patient-Acquisition Ads",
      copy: "Google & Meta campaigns designed around real appointment value — and built to stay inside medical advertising policy.",
    },
    {
      title: "Local SEO & Google Business",
      copy: "Own your city's search results and map pack so nearby patients find you first.",
    },
    {
      title: "Websites & Online Booking",
      copy: "Fast, trustworthy sites with a clear path from 'just looking' to 'booked'.",
    },
    {
      title: "Reputation & Reviews",
      copy: "A steady, ethical review engine that turns happy patients into your best marketing.",
    },
    {
      title: "Brand & Content",
      copy: "Photography, video, and design that make an established practice look the part.",
    },
    {
      title: "Tracking & Reporting",
      copy: "Know what a new patient costs and where they came from — reported in plain language.",
    },
  ],
  why: [
    {
      title: "Compliance-aware by default",
      copy: "We build campaigns with medical advertising guidelines and patient privacy in mind — not as an afterthought.",
    },
    {
      title: "We speak clinic",
      copy: "We've worked across optometry, aesthetics, mental health, and specialty practices — so we start with context, not a template.",
    },
    {
      title: "Measured on patients, not vanity",
      copy: "Impressions are nice. Booked appointments pay the bills — so that's what we optimize toward.",
    },
    {
      title: "Discreet and senior-led",
      copy: "Sensitive category, senior strategy. Your account isn't handed to a junior and forgotten.",
    },
  ],
  // Real medical-sector clients pulled from the portfolio.
  clients: [
    { name: "ATMA CENA", sector: "Mental Health", image: "/portfolio/atma-cena.webp" },
    { name: "Optometrists' Clinic", sector: "Optometry", image: "/portfolio/optometrists.png" },
    { name: "Apex Labs", sector: "Psychedelic Therapy", image: "/portfolio/apex-labs.png" },
  ],
  steps: [
    {
      n: "01",
      title: "Free clinic audit",
      copy: "We review your current marketing, search presence, and patient flow — and show you exactly where the leaks are.",
    },
    {
      n: "02",
      title: "Compliant campaigns, live",
      copy: "We build and launch the ads, pages, and local SEO that bring the right patients to your door.",
    },
    {
      n: "03",
      title: "A calendar that fills",
      copy: "We measure booked appointments and optimize monthly — so growth keeps compounding.",
    },
  ],
} as const;
