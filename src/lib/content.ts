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
      "When something isn't working, there's usually a blind spot. We help you find it and give you the tools to fix it.",
    accent: "teal",
    items: [
      {
        name: "Social Content Consulting",
        detail: "Your content isn't landing. We'll show you why.",
        long: "Posting regularly but nothing's happening? There's usually a clear reason — the wrong format, a weak first few seconds, or content your audience isn't looking for. We show you what's holding your content back and give your team the tools to fix it.",
      },
      {
        name: "Digital Ads",
        detail: "Your ads aren't paying off. We'll show you why.",
        long: "Spending on ads but not seeing the sales? Something specific is getting in the way — how the campaigns are set up, who they reach, or what's being tracked. We find it, show you how to fix it, and teach you to read your own results.",
      },
      {
        name: "Business & Marketing Audits",
        detail: "Not sure why growth has stalled? We'll find out.",
        long: "When sales slow down or marketing stops paying off, guessing at the cause gets expensive. We look at your website, social, search, ads and email, and give you an honest picture of what's working, what isn't, and what to fix first.",
      },
      {
        name: "Goal Setting & Brand Positioning",
        detail: "If your marketing feels scattered, start here.",
        long: "When your team can't agree on where you're going or why customers should pick you, your marketing shows it. We help you get clear on both, and give everyone the same plan to work from.",
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
        long: "Every decision backed by numbers you can actually read — so you always know what's working, what isn't, and where to put the next dollar. Usually paired with Social Media Management or Advertising.",
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
  "social-content-consulting": [
    "A plain-English look at why your content isn't landing",
    "A simple plan your team can keep up with",
    "The skills to keep it going on your own",
  ],
  "digital-ads": [
    "Where your ad money is leaking, and why",
    "The right platforms, budget split and ad style for you",
    "The know-how to read your own results",
  ],
  "business-and-marketing-audits": [
    "An honest look at everything your customers see",
    "Where your money is working and where it isn't",
    "A clear plan you keep — biggest wins first",
  ],
  "goal-setting-and-brand-positioning": [
    "Where your team isn't on the same page",
    "A clear answer to why customers should choose you",
    "One written plan everyone can work from",
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

/** A short "how we approach it" paragraph per service slug. */
export const serviceApproach: Record<string, string> = {
  "social-content-consulting":
    "We start with what you've already posted and what your audience actually responds to, so the diagnosis is specific to you — not generic best practice. Then we build a system around your team's real capacity and coach you until you don't need us.",
  "digital-ads":
    "We look at your accounts the way a doctor reads a chart: structure, targeting, tracking, spend. Most problems show up fast. We explain what we find in plain language, fix the foundations, and make sure you leave able to read your own numbers.",
  "business-and-marketing-audits":
    "We dig into your analytics, spend, funnel, and online presence, then lay it all out in plain language. No jargon, no pitch — just a clear picture of where you stand and a prioritized list of what to do next, whoever ends up doing it.",
  "goal-setting-and-brand-positioning":
    "We facilitate the harder conversations about where you're headed and what genuinely sets you apart, then capture the answers in a framework your whole team can execute against — long after we've left the room.",
  advertising:
    "We plan around your margins and real conversion value, launch lean, and optimize relentlessly — so budget keeps flowing toward what's working and away from what isn't.",
  analytics:
    "We make sure you're tracking the right things, set up correctly, then translate the numbers into decisions — not dashboards nobody opens.",
  branding:
    "We define how your brand should look, sound, and feel, then build the assets and guidelines that keep it consistent as more people touch it.",
  "social-media-management":
    "We plan content ahead, produce it on-brand, and stay on top of engagement — so your presence stays active and intentional without eating your week.",
  strategy:
    "We get clear on positioning, audience, and message, then build a channel plan with a real reason behind every move — and revisit it as you grow.",
  videography:
    "From concept and script through to the final cut, we handle production end to end — then deliver versions sized and formatted for wherever they'll actually live.",
  photography:
    "We art-direct and shoot to your brand, then hand over a polished, web-ready image library you own outright.",
  "jingles-and-radio-ads":
    "We write, score, and produce audio that sticks — from the first concept to a broadcast-ready spot.",
  "graphic-design":
    "We design for the job each asset has to do, not just how it looks in a mockup — and hand over editable source files so you're never stuck.",
  "web-development":
    "We build fast, well-structured sites with a clear path from first visit to enquiry — on a platform your team can maintain without needing us for every change.",
  hosting:
    "We handle speed, security, backups, and uptime quietly in the background, so your site simply works and you never have to think about it.",
  seo:
    "We cover the on-page, technical, and local foundations, then report on the rankings and traffic that actually move the needle for your business.",
};

export function getServiceApproach(slug: string): string {
  return serviceApproach[slug] ?? "";
}

/* ------------------------------------------------------------------ */
/*  Service writeups — long-form copy adapted from the original site's */
/*  service pages (intro + "What we offer"). Pricing intentionally     */
/*  omitted: engagements are scoped per client.                        */
/* ------------------------------------------------------------------ */

export type ServiceOffering = {
  title: string;
  copy: string;
  bullets?: string[];
};

export type ServiceWriteup = {
  intro: string[];
  offerings: ServiceOffering[];
};

export const serviceWriteups: Record<string, ServiceWriteup> = {
  "social-content-consulting": {
    intro: [
      "Your content isn't converting. You're putting in the time, but the views, follows and enquiries aren't coming.",
      "That almost always comes down to a few blind spots — things that are hard to see from the inside. We'll point them out, show you what to do instead, and give your team the tools to make content that works on your own.",
    ],
    offerings: [
      {
        title: "Find the blind spots",
        copy: "We look at what you've posted, what's worked, what hasn't, and how your audience actually behaves on each platform. Then we tell you plainly what's holding you back.",
        bullets: [
          "A review of your current content and how it's performing",
          "A one-on-one strategy session",
          "Which formats to use on each platform (Reels, Shorts, TikTok, Stories)",
        ],
      },
      {
        title: "Give you the tools",
        copy: "We build you a simple plan your team can keep up with: what to post, how often, and how to grab attention in the first few seconds.",
        bullets: [
          "Content themes and a posting schedule",
          "Scripts and content ideas",
          "How to open strong and tell a story",
          "Which style suits you — talking to camera, behind-the-scenes, voiceover or customer-style video",
        ],
      },
      {
        title: "Hand you the keys",
        copy: "We coach your team through the first few rounds until it feels natural. After that, you run it — and we're a call away if you want a second opinion.",
        bullets: [
          "Clear feedback on what to improve",
          "Optional check-in calls to review your content",
        ],
      },
    ],
  },
  "digital-ads": {
    intro: [
      "Your ads aren't paying for themselves. Money goes out every month, but it's hard to tell what's actually bringing customers in.",
      "It's rarely the platform's fault. Usually it's a handful of blind spots in how the campaigns are set up, who they're shown to, or what's being measured. We'll find them, show you how to fix them, and give you what you need to run your ads with confidence.",
    ],
    offerings: [
      {
        title: "Find the blind spots",
        copy: "We go through your ad accounts line by line — how the campaigns are set up, who they reach, the ads themselves, and whether your tracking is telling the truth — and show you where the money's leaking.",
        bullets: [
          "A full review of your ad accounts",
          "How your campaigns are set up and who they reach",
          "Whether your sales and leads are being tracked properly",
        ],
      },
      {
        title: "Give you the tools",
        copy: "We help you decide where to advertise, how to split your budget, and what kind of ads are most likely to work on Google, Facebook, Instagram, YouTube and more.",
        bullets: [
          "Which platforms are right for you",
          "How to split your budget",
          "What your ads should look and sound like",
        ],
      },
      {
        title: "Hand you the keys",
        copy: "We teach you to read your own numbers and make the calls yourself. If you'd like someone to check in as things change, we can do that too.",
        bullets: [
          "What your results mean, in plain language",
          "How to keep improving your campaigns",
          "Optional monthly check-ins",
        ],
      },
    ],
  },
  "business-and-marketing-audits": {
    intro: [
      "Growth has stalled and you're not sure why. Leads have slowed, or the money you spend on marketing doesn't seem to be doing much.",
      "We'll go through your business top to bottom and guide you to the blind spots that are costing you. You get a clear plan in plain language — not a 40-page report you'll never read — and what you do with it is up to you.",
    ],
    offerings: [
      {
        title: "Find the blind spots",
        copy: "We look at everything your customers see — your website, social media, how you show up on Google, your ads and your emails — and the numbers behind it.",
        bullets: [
          "Your website, and how easy it is to use",
          "Your social media, and whether your brand looks consistent",
          "Your Google Business Profile and how you show up locally",
          "How your ads are performing",
          "Your email marketing",
          "Searches your website is missing out on",
        ],
      },
      {
        title: "Give you the tools",
        copy: "You get a clear plan: what to fix first, what to work toward, and what to stop doing.",
        bullets: [
          "A prioritized action plan",
          "Quick wins, plus longer-term projects",
        ],
      },
      {
        title: "Hand you the keys",
        copy: "The report is yours to keep, written so your team can act on it. If you'd like help putting it into practice, just ask.",
        bullets: [
          "A detailed report that's yours to keep",
          "Hands-on help to put it into practice, if you want it",
        ],
      },
    ],
  },
  "goal-setting-and-brand-positioning": {
    intro: [
      "Your marketing feels scattered. Every campaign, post and website update seems to pull in a slightly different direction.",
      "That usually isn't a marketing problem — it's that your team isn't on the same page about who you're for and why people should choose you. We'll guide you to the blind spots, help you get clear, and give your whole team one plan to work from.",
    ],
    offerings: [
      {
        title: "Find the blind spots",
        copy: "We find where things are fuzzy: who you're really competing with, who your best customers are, and where your team sees things differently.",
        bullets: [
          "A look at your customers and competitors",
          "Guided sessions to find where your team isn't on the same page",
        ],
      },
      {
        title: "Give you the tools",
        copy: "We help you put it into words: why you're the right choice, the story you tell, and clear goals with a plan to reach them.",
        bullets: [
          "What makes you different, in one clear sentence",
          "Your key messages and brand story",
          "Short- and long-term goals",
          "How you'll measure success",
          "What to focus on first",
        ],
      },
      {
        title: "Hand you the keys",
        copy: "We give you simple guides so everyone sounds the same — whether they're writing a social post or a sales proposal.",
        bullets: [
          "A guide to your brand's tone of voice",
          "Do's and don'ts for your messaging",
          "Example copy for common uses",
        ],
      },
    ],
  },
  advertising: {
    intro: [
      "Paid advertising only works when it's built on a solid foundation — the right targeting, the right creative, and the right tracking to know what's actually performing. We handle all of it, from strategy and setup to the ongoing refinement that makes campaigns improve over time.",
      "Every account comes with proper conversion tracking, clear analytics, and a monthly touchpoint so you're never left guessing. We don't just run ads — we make sure they're earning their budget.",
    ],
    offerings: [
      {
        title: "Paid Ad Campaigns",
        copy: "We manage campaigns across the platforms that make the most sense for your business and audience — building structure, targeting, and creative from the ground up, or stepping into existing accounts and cleaning up what's there.",
        bullets: [
          "Google Ads (Search, Display, Performance Max)",
          "YouTube ads",
          "Social platform video & static ads (Meta, Instagram, TikTok, LinkedIn)",
          "Radio ads",
          "TV commercials",
        ],
      },
      {
        title: "Tracking & Analytics",
        copy: "You can't optimize what you're not measuring. We set up proper conversion tracking, connect your ad platforms to your analytics, and build reporting that tells you exactly what your campaigns are generating — in plain language.",
        bullets: [
          "Conversion tracking & event setup",
          "Google Analytics integration",
          "Custom reporting dashboard",
        ],
      },
      {
        title: "Strategy & Optimization",
        copy: "Campaigns don't improve on their own. We continuously refine targeting, creative, bidding, and structure based on real performance data — and walk you through what we're doing and why at your monthly touchpoint.",
        bullets: [
          "Ad strategy development",
          "Ongoing keyword, headline & audience refinement",
          "Monthly performance review & strategic touchpoint",
        ],
      },
      {
        title: "Ad Asset Creation",
        copy: "Strong creative is what separates ads that convert from ads that get scrolled past. We handle the copy, the design, and where needed, the video — so your campaigns have what they need to perform.",
        bullets: [
          "Ad copywriting",
          "Static & animated graphic design",
          "Video ad production & editing",
        ],
      },
    ],
  },
  analytics: {
    intro: [
      "Good marketing decisions start with good data — and most businesses are either tracking the wrong things or not tracking at all. We set up your analytics infrastructure properly from the start so nothing important slips through the cracks.",
      "From Google Analytics setup to conversion tracking and detailed monthly reporting, you'll always know where your budget is going and what it's returning. Every recommendation we make is backed by what the numbers are actually telling us.",
      "Analytics is usually paired with Social Media Management or Advertising, so the numbers feed straight back into the work and every month gets smarter than the last.",
    ],
    offerings: [
      {
        title: "Tracking Setup & Infrastructure",
        copy: "Before you can analyze anything, you need to be collecting the right data. We audit your current tracking, close the gaps, and make sure every meaningful action on your website and in your campaigns is captured accurately.",
        bullets: [
          "Google Analytics 4 setup & configuration",
          "Conversion tracking & event setup (Google Tag Manager)",
          "Cross-platform tracking integration",
        ],
      },
      {
        title: "Reporting Dashboards",
        copy: "Custom dashboards pull your most important metrics into one place — so you can check in on performance in minutes, not hours, and always know what's happening across your marketing channels.",
        bullets: [
          "Custom reporting dashboard build & maintenance",
          "Multi-channel performance views",
          "Automated reporting setup",
        ],
      },
      {
        title: "Analysis & Recommendations",
        copy: "Numbers without context are just noise. We review your data on a regular cadence, identify what's working and what isn't, and give you clear, prioritized recommendations backed by evidence.",
        bullets: [
          "Monthly performance analysis",
          "Trend identification & anomaly flagging",
          "Strategic recommendations based on data",
        ],
      },
    ],
  },
  branding: {
    intro: [
      "Your brand is more than your logo — it's the first impression you make and the reason people remember you. We build brand identities that are distinct, intentional, and built to hold attention across every touchpoint.",
      "From logo design to typography, colour systems, and tone of voice, you get a complete foundation to work from. A consistent brand isn't just about looking good — it's how you earn trust and stay top of mind with the people you're trying to reach.",
    ],
    offerings: [
      {
        title: "Brand Identity",
        copy: "A strong identity is a visual system that works cohesively across every format and application. We design identities that are distinctive, versatile, and built to last — not trend-chasing.",
        bullets: [
          "Logo design & variations",
          "Colour palette & typography system",
          "Visual identity guidelines",
        ],
      },
      {
        title: "Brand Strategy & Messaging",
        copy: "The visual side only works when the strategic side is solid. We dig into your positioning, audience, and competitive landscape to define what your brand stands for and how it should communicate.",
        bullets: [
          "Brand positioning & differentiation",
          "Messaging framework & tagline development",
          "Tone of voice & communication guidelines",
        ],
      },
      {
        title: "Brand Guidelines & Application",
        copy: "Once a brand is defined, it needs to be applied consistently. We deliver a complete brand standards guide and extend the system across your key materials so everything looks and sounds like it belongs together.",
        bullets: [
          "Brand style guide & standards documentation",
          "Application across key collateral (business cards, email signatures, social templates)",
          "Brand consistency audit for existing businesses",
        ],
      },
    ],
  },
  "social-media-management": {
    intro: [
      "Keeping up with social media takes more than showing up — it takes strategy, consistency, and content that actually reflects your brand. Most businesses know they should be posting; few have the bandwidth to do it well.",
      "We handle everything — graphics, copy, scheduling, and community engagement — so your brand stays visible and on-point without pulling you away from what you actually do. Whether you're starting from scratch or cleaning up an inconsistent presence, we build social that works.",
    ],
    offerings: [
      {
        title: "Content Strategy & Planning",
        copy: "Consistent social starts with a clear plan. We build a strategy rooted in your brand, audience, and goals — then map it into a structured content calendar that takes the guesswork out of what to post and when.",
        bullets: [
          "Platform-specific content strategy",
          "Content pillars & theme development",
          "Monthly content calendar planning",
        ],
      },
      {
        title: "Content Creation",
        copy: "We handle full production of your social content — copy, graphics, and video — so everything that goes out is on-brand, polished, and built for the platform it lives on.",
        bullets: [
          "Copywriting & caption development",
          "Graphic design & static image creation",
          "Short-form video editing & formatting",
        ],
      },
      {
        title: "Publishing & Community Management",
        copy: "Showing up consistently and responding to your audience are two of the most important things you can do on social — and two of the easiest to let slip when you're running a business. We handle both.",
        bullets: [
          "Content scheduling & publishing",
          "Comment & DM monitoring",
          "Community engagement & response management",
        ],
      },
      {
        title: "Reporting & Optimization",
        copy: "Strategy should evolve based on what's actually performing. We track your key metrics, identify trends, and adjust the approach monthly so your presence keeps growing in the right direction.",
        bullets: [
          "Monthly performance reporting",
          "Engagement & reach analysis",
          "Ongoing content strategy refinement",
        ],
      },
    ],
  },
  strategy: {
    intro: [
      "Most businesses know they need to market themselves. Few have a clear picture of what to say, who to say it to, or why it should matter to anyone. That's the gap we fill.",
      "Strategy at BLXCK means getting honest about your positioning, your audience, and your message — then building campaigns around it that have a real reason to exist. It's the work that makes everything else actually perform.",
    ],
    offerings: [
      {
        title: "Positioning & Messaging",
        copy: "We start by finding your lane — who you're for, how you're different, and what you should (and shouldn't) be saying.",
        bullets: [
          "Brand positioning workshop (we find your lane)",
          "Target audience definition",
          "Core messaging framework (what you say, how you say it, what you never say)",
          "Competitive research — what your competitors are doing and where the gaps are",
        ],
      },
      {
        title: "Roadmap & Campaign Planning",
        copy: "Then we turn it into a plan: the channels worth your time, the campaigns worth running, and the creative direction that will actually connect.",
        bullets: [
          "Channel recommendations",
          "90-day marketing roadmap",
          "Campaign planning — themes, angles, and creative direction that actually connect with your audience",
          "Campaign briefs your team can actually execute from",
        ],
      },
      {
        title: "Content Direction & Ongoing Strategy",
        copy: "Strategy isn't a one-off deck. We give every piece of content a purpose and revisit the plan with you every month.",
        bullets: [
          "Content pillars — the 4–5 core topics your brand consistently shows up around",
          "What to post, when, and why — a clear rationale behind every content decision so nothing goes out without a purpose",
          "Monthly strategy call to review, adjust, and plan ahead",
        ],
      },
    ],
  },
  videography: {
    intro: [
      "Video is one of the most powerful tools a brand has — when it's done right. We produce high-end content that's built to stop the scroll, tell your story, and move people toward action.",
      "From initial concept through production and final delivery, we handle everything. Whether you need brand films, social content, or event coverage, the result is always video that looks intentional and performs with purpose.",
    ],
    offerings: [
      {
        title: "Brand Story Videos",
        copy: "Showcase your brand, build trust, and convert with one clear video — who you are, how you operate, and what makes you stand out from your competitors.",
      },
      {
        title: "Commercials",
        copy: "From TV commercials to ad content that runs on social platforms, we produce high-quality spots built to convert.",
      },
      {
        title: "Explainers & Automations",
        copy: "Onboarding flows, software walkthroughs, training videos — clear, professional content that saves time and scales your process.",
      },
      {
        title: "Testimonials & Case Studies",
        copy: "Real clients, real results. We capture the stories that build trust and turn prospects into believers.",
      },
      {
        title: "Short-Form Content",
        copy: "Scroll-stopping short-form video for social and beyond — keeping your brand showing up, standing out, and staying relevant.",
      },
    ],
  },
  photography: {
    intro: [
      "Good photography is one of the highest-leverage investments a business can make. It shows up everywhere — your website, your ads, your social, your proposals — and the quality of those images signals the quality of your business before anyone reads a single word.",
      "We shoot with purpose, capturing exactly what you need to market your brand effectively.",
    ],
    offerings: [
      {
        title: "Brand & Lifestyle Photography",
        copy: "We capture the people, places, and moments that tell your brand's story — images that feel authentic, look polished, and work hard across every channel you use.",
        bullets: [
          "Brand & lifestyle shoots",
          "Team & culture photography",
          "Behind-the-scenes & editorial content",
        ],
      },
      {
        title: "Product Photography",
        copy: "Your product needs to look as good in a photo as it does in person. Clean, professional images built for e-commerce, advertising, and print — with the lighting, composition, and retouching to make every product look its best.",
        bullets: [
          "E-commerce product photography",
          "Packaging & detail shots",
          "Lifestyle product photography",
        ],
      },
      {
        title: "Headshots & Events",
        copy: "First impressions matter. Whether it's individual headshots for your team or full event coverage, we deliver consistent, professional images that reflect well on your brand.",
        bullets: [
          "Professional headshots (individual & team)",
          "Corporate & networking event coverage",
          "Conference & tradeshow photography",
        ],
      },
      {
        title: "Editing & Delivery",
        copy: "Every image is professionally edited, properly formatted, and organized so you can put it to use immediately — across print, web, or social — without hunting through hundreds of raw files.",
        bullets: [
          "Professional retouching & colour correction",
          "Web- and print-optimized file delivery",
          "Organized, labeled image library",
        ],
      },
    ],
  },
  "jingles-and-radio-ads": {
    intro: [
      "Audio advertising is one of the most underused tools in a local marketing mix — and when it's done well, it's remarkably sticky. A great jingle or a well-written radio spot doesn't just get heard, it gets remembered.",
      "With decades of combined experience as songwriters and music producers, our Edmonton-based team delivers audio ads that sound professional and actually drive action — whether they're running on local radio, streaming platforms, or as part of a broader campaign.",
    ],
    offerings: [
      {
        title: "Concept & Copywriting",
        copy: "The best radio ads are built around a single, clear idea — delivered in a way that's memorable, on-brand, and designed to move the listener to action. We handle the concept, the script, and the message so your spot does more than fill airtime.",
        bullets: [
          "Radio ad scripting & copywriting",
          "Jingle concept & lyric development",
          "Call-to-action strategy & messaging",
        ],
      },
      {
        title: "Production",
        copy: "From voice talent to music to final mix, we handle the full production process and deliver broadcast-ready audio that meets platform specs and sounds like it belongs on air.",
        bullets: [
          "Voice talent coordination & direction",
          "Jingle composition & arrangement",
          "Audio production, mixing & mastering",
        ],
      },
      {
        title: "Delivery & Placement Guidance",
        copy: "We deliver your finished audio in the formats you need and advise on placement — traditional radio, streaming audio, podcast advertising, or in-store audio.",
        bullets: [
          "Platform-ready file formats & technical specs",
          "Broadcast-ready delivery",
          "Placement recommendations & media strategy guidance",
        ],
      },
    ],
  },
  "graphic-design": {
    intro: [
      "Every visual your business puts into the world is making an impression — good design makes sure it's the right one. We create graphics that are on-brand, built for their intended use, and designed to actually work as marketing collateral, not just look good in a mockup.",
    ],
    offerings: [
      {
        title: "Digital & Social Graphics",
        copy: "Social moves fast, and your visuals need to stop the scroll. We design graphics that are eye-catching, on-brand, and optimized for the platform they live on — feed post, Story, or ad.",
        bullets: [
          "Social media graphics & post templates",
          "Ad creative (static & animated)",
          "Email headers & newsletter graphics",
          "Digital banners & display ads",
        ],
      },
      {
        title: "Print & Collateral",
        copy: "Print is often the last thing businesses invest in — and the first thing a potential customer holds in their hands. We design print-ready collateral that represents your brand professionally at every touchpoint.",
        bullets: [
          "Brochures, flyers & sell sheets",
          "Business cards & stationery",
          "Signage, banners & trade show materials",
          "Menus, packaging & point-of-sale materials",
        ],
      },
      {
        title: "Presentations & Reports",
        copy: "How your information looks affects how it's received. We design decks, proposals, and reports that are polished, easy to navigate, and make the right impression — whether you're presenting to a client or an investor.",
        bullets: [
          "Pitch decks & investor presentations",
          "Branded proposal & report templates",
          "Infographics & data visualization",
        ],
      },
    ],
  },
  "web-development": {
    intro: [
      "Your website is where interest becomes trust — and trust becomes revenue. We build sites that look sharp, load fast, and are structured to do one thing: turn visitors into customers.",
      "From new builds and redesigns to ongoing maintenance, SEO, hosting, and LMS management, we work across WordPress, Shopify, Squarespace, Kajabi, and more. Whatever platform you're on, we handle the technical side so you don't have to.",
    ],
    offerings: [
      {
        title: "Web Builds",
        copy: "A professional, semi-custom site on the platform that suits you — set up properly for search and performance from day one.",
        bullets: [
          "Site build on WordPress, Squarespace, Wix, or other",
          "Semi-custom design",
          "Basic SEO setup",
          "On-page SEO optimization",
          "Custom schema management",
          "Keyword optimization",
          "Performance optimization",
          "Analytics integration",
        ],
      },
      {
        title: "Custom Builds",
        copy: "For brands that need more than a template can give — fully bespoke design, interactions, and integrations.",
        bullets: [
          "Fully customizable design & layout",
          "Advanced UI/UX considerations",
          "Custom features or interactions",
          "API integrations or webhooks",
          "Speed & performance optimization",
          "3 rounds of revisions",
        ],
      },
      {
        title: "E-Commerce Builds",
        copy: "A storefront designed to convert, with the payments, shipping, and tax setup handled for you. (Professional product photography is available separately.)",
        bullets: [
          "Shopify / WooCommerce setup",
          "Product pages (up to 25 products)",
          "Payment gateway integration",
          "Basic shipping & tax setup",
          "Conversion-focused design",
        ],
      },
    ],
  },
  hosting: {
    intro: [
      "Bad web hosting is a silent killer. Slow load times, unexpected downtime, and security gaps cost you traffic, rankings, and customers — often without you even knowing it's happening.",
      "We manage reliable, fast hosting so your site stays up, stays secure, and stays out of your way.",
    ],
    offerings: [
      {
        title: "Managed Hosting",
        copy: "We handle the server side so you never have to think about it. Your site lives on fast, reliable infrastructure — and we monitor it, maintain it, and keep it updated so you're never one missed update away from a security breach.",
        bullets: [
          "Managed site hosting",
          "SSL certificate setup & renewal",
          "Server performance optimization",
          "Uptime monitoring & alerting",
        ],
      },
      {
        title: "Security & Maintenance",
        copy: "Websites that aren't actively maintained become liabilities. We handle the ongoing updates, security scans, and backups that keep your site healthy and your data protected — so a vulnerability never becomes a crisis.",
        bullets: [
          "Core, theme & plugin updates",
          "Routine security scans",
          "Regular automated backups",
        ],
      },
      {
        title: "Technical Support",
        copy: "When something breaks or doesn't work the way it should, you don't have to figure it out alone. Ongoing support for hosted sites means issues get resolved quickly and your site stays functional.",
        bullets: [
          "Bug fixes & troubleshooting",
          "Content updates & minor edits",
          "Performance monitoring & speed optimization",
        ],
      },
    ],
  },
  seo: {
    intro: [
      "Search visibility isn't a nice-to-have — it's how people find you when they're already looking for what you offer. We build SEO strategies around real results: faster load times, cleaner site architecture, and content that earns its rankings.",
      "No black-hat shortcuts, no vanity metrics — just steady, sustainable growth in the right direction. We treat SEO as a long game, because that's the only version that actually pays off.",
    ],
    offerings: [
      {
        title: "Technical Optimization",
        copy: "Search engines reward sites that are fast, functional, and easy to crawl. We fix the foundations first.",
        bullets: [
          "Site functionality overview",
          "Site speed audit",
          "Image optimization",
        ],
      },
      {
        title: "On-Site SEO",
        copy: "Every page tuned so search engines — and people — understand exactly what it's about.",
        bullets: [
          "Headers",
          "Content",
          "Meta titles & descriptions",
          "Keyword research",
          "Sitemap & schema updates",
        ],
      },
      {
        title: "Keyword Optimization",
        copy: "We find the searches worth winning, see who's winning them now, and build them into your content and metadata.",
        bullets: [
          "Keyword research",
          "Competitor analysis",
          "Implementation via content & metadata",
        ],
      },
      {
        title: "Local SEO & Reporting",
        copy: "Show up when nearby customers search — and know every month exactly how your rankings and traffic are moving.",
        bullets: [
          "Google Business Profile optimization",
          "Local citations",
          "Review strategy",
          "Monthly performance report",
        ],
      },
      {
        title: "SEO Audit",
        copy: "Not ready for ongoing SEO? A one-time audit shows you exactly what's stopping you from the #1 spot on search engines — covering site health, on-page SEO, keyword visibility, and technical flags.",
        bullets: [
          "Core Web Vitals & speed assessment",
          "Mobile usability check",
          "Crawlability & indexation issues (broken links, redirect chains, canonical errors)",
          "Basic site structure review",
          "Header tag usage",
          "Meta title & description gaps or issues",
          "Image alt text gaps",
          "Content thin-ness flags",
          "Current keyword rankings snapshot",
          "Identifying quick-win opportunities",
          "Basic competitor visibility comparison",
          "Schema presence (or absence)",
          "Sitemap status",
          "Robots.txt review",
        ],
      },
    ],
  },
};

/**
 * Consulting is diagnose → set up → set free. For clients who'd rather hand
 * the work off, each consulting service points to its done-for-you match.
 */
export const doneForYou: Record<string, { slug: string; label: string }> = {
  "social-content-consulting": { slug: "social-media-management", label: "Social Media Management" },
  "digital-ads": { slug: "advertising", label: "Advertising" },
  "business-and-marketing-audits": { slug: "strategy", label: "Strategy" },
  "goal-setting-and-brand-positioning": { slug: "strategy", label: "Strategy" },
};

/** Friendly "in the wild" headings for the selected-work section. */
export const workHeading: Record<string, string> = {
  "web-development": "Our websites, in the wild.",
  branding: "Our brands, in the wild.",
  "graphic-design": "Our graphic designs, in the wild.",
  videography: "Our videos, in the wild.",
  photography: "Our photography, in the wild.",
  "jingles-and-radio-ads": "Our jingles, in the wild.",
  advertising: "Our ads, in the wild.",
  "social-media-management": "Our social content, in the wild.",
  "social-content-consulting": "Our social content, in the wild.",
};

/** Hero image per service page (from the portfolio) — breaks up the dark. */
export const serviceImage: Record<string, string> = {
  "social-content-consulting": "/work/yt-token-naturals.jpg",
  "digital-ads": "/portfolio/apex-labs.png",
  "business-and-marketing-audits": "/portfolio/rex-equipment.jpg",
  "goal-setting-and-brand-positioning": "/portfolio/atma-cena.webp",
  advertising: "/portfolio/tiger-gold.webp",
  analytics: "/work/optometrists-after.webp",
  branding: "/work/web/transcend.webp",
  "social-media-management": "/work/yt-hansen-reel.jpg",
  strategy: "/portfolio/csa.jpg",
  videography: "/work/yt-arpa-ymca.jpg",
  photography: "/portfolio/hansen.jpg",
  "jingles-and-radio-ads": "/work/jingles/yt-ardent-jingle.jpg",
  "graphic-design": "/portfolio/azimuth.png",
  "web-development": "/work/web/inferno.webp",
  hosting: "/work/web/solar-ninjas.webp",
  seo: "/work/web/true-aesthetics.webp",
};

export function getServiceWriteup(slug: string): ServiceWriteup | undefined {
  return serviceWriteups[slug];
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
  url?: string; // live site, shown as "See it live"
  video?: boolean; // show a play overlay and open the video externally
  /** Logos/flat art: show the whole image on a plain panel instead of cropping. */
  contain?: "light" | "dark";
};

export const work: WorkItem[] = [
  // Web builds (website screenshots)
  { name: "Inferno Defence Systems", type: "Website", image: "/work/web/inferno.webp", url: "https://infernodefencesystems.com", tags: ["web"] },
  { name: "Simply Decks", type: "Website", image: "/work/web/simply-decks.webp", url: "https://simplydecks.ca", tags: ["web"] },
  { name: "True Aesthetics", type: "Website", image: "/work/web/true-aesthetics.webp", url: "https://trueaestheticsyeg.com", tags: ["web"] },
  {
    name: "Transcend Together",
    type: "Website & Branding",
    image: "/work/web/transcend.webp", url: "https://transcendtogether.ca",
    tags: ["web", "branding"],
  },
  { name: "Solar Ninjas", type: "Website", image: "/work/web/solar-ninjas.webp", url: "https://solarninjas.energy", tags: ["web"] },
  {
    name: "Ardent Roof Systems",
    type: "Website & Branding",
    image: "/work/web/ardent.webp", url: "https://ardentroofsystems.com",
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

  // Photography
  { name: "Hansen Distillery", type: "Product Photography", image: "/work/photography/hansen-1.webp", tags: ["photo"] },
  { name: "Token Naturals", type: "Product Photography", image: "/work/photography/token-2.webp", tags: ["photo"] },
  { name: "REX Equipment", type: "Product Photography", image: "/work/photography/rex-2.webp", tags: ["photo"] },
  { name: "Hansen Distillery", type: "Product Photography", image: "/work/photography/hansen-2.webp", tags: ["photo"] },
  { name: "Token Naturals", type: "Product Photography", image: "/work/photography/token-3.webp", tags: ["photo"] },
  { name: "Ottavo", type: "Interior Photography", image: "/work/photography/ottavo.webp", tags: ["photo"] },
  { name: "Hansen Distillery", type: "Product Photography", image: "/work/photography/hansen-3.webp", tags: ["photo"] },
  { name: "REX Equipment", type: "Product Photography", image: "/work/photography/rex-1.webp", tags: ["photo"] },
  { name: "Token Naturals", type: "Product Photography", image: "/work/photography/token-1.webp", tags: ["photo"] },

  // Branding (logos)
  { name: "Hansen Distillery", type: "Logo & Identity", image: "/work/branding/hansen.webp", tags: ["branding"], contain: "light" },
  { name: "SnapThat", type: "Logo & Identity", image: "/work/branding/snapthat.webp", tags: ["branding"], contain: "dark" },
  { name: "Sundays Promotional Products", type: "Logo & Identity", image: "/work/branding/sundays.webp", tags: ["branding"], contain: "light" },
  { name: "Frank Melo Builders", type: "Logo & Identity", image: "/work/branding/frank-melo.webp", tags: ["branding"], contain: "light" },
  { name: "AIM Industrial Cleaning", type: "Logo & Identity", image: "/work/branding/aim.webp", tags: ["branding"], contain: "dark" },

  // Graphic design
  { name: "Living Skies Music Festival", type: "Festival Poster", image: "/work/design/living-skies-poster.webp", tags: ["design"] },
  { name: "Hansen Distillery", type: "Seasonal Graphic", image: "/work/design/hansen-st-patricks.webp", tags: ["design"] },

  // Advertising (ad creative)
  { name: "REX Equipment", type: "Social Ad", image: "/work/ads/rex-field-day-sale.webp", tags: ["ads"] },
  { name: "Living Skies Music Festival", type: "Social Ad", image: "/work/ads/living-skies-shamrocks.webp", tags: ["ads"] },
  { name: "Chrome Spa Salon", type: "Print & Social Ad", image: "/work/ads/chrome-students-save.webp", tags: ["ads"] },
  { name: "David B. Caseley", type: "Video Ad", image: "/work/ads/david-caseley-riding-bulls.webp", tags: ["ads"], contain: "dark" },

  // Jingles & radio
  {
    name: "Ardent Roof Systems",
    type: "Radio Jingle · Crazy About Roofs",
    image: "/work/jingles/yt-ardent-jingle.jpg",
    tags: ["audio"],
    href: "https://youtu.be/VtamRfEBqX4",
    video: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Case studies — listed under "Our work" (add new ones here).        */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  title: string;
  client: string;
  sector: string;
  href: string;
  image: string;
  blurb: string;
  accent: "teal" | "lavender" | "gold";
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Optometrists' Clinic",
    client: "The Optometrists' Clinic",
    sector: "Optometry · Web & Paid Ads",
    href: "/optometrists-case-study",
    image: "/work/optometrists-after.webp",
    blurb:
      "A rebuilt website and leaner Google Ads that nearly doubled patient contacts on 59% less ad spend.",
    accent: "teal",
  },
  {
    title: "Ardent Roof Systems",
    client: "Ardent Roof Systems",
    sector: "Roofing · Brand, Ads & Radio",
    href: "/ardent-case-study",
    image: "/work/web/ardent.webp",
    blurb:
      "A roofing brand built from the ground up: five times the website audience, Calgary up 58%, and a radio jingle that doubled the reach of the Free Roof Giveaway.",
    accent: "gold",
  },
];

/** Portfolio sections, in the order the original site presented them. */
export const workSections: {
  tag: string;
  title: string;
  service: string;
  blurb: string;
  accent: "teal" | "lavender" | "gold" | "silver";
  /** Short label for the in-page section bar. */
  short: string;
}[] = [
  {
    tag: "web",
    short: "Web",
    title: "Web Development",
    service: "web-development",
    blurb: "Fast, conversion-focused sites built for the businesses behind them.",
    accent: "teal",
  },
  {
    tag: "social",
    short: "Social",
    title: "Social Media Content",
    service: "social-media-management",
    blurb: "Short-form content made to stop the scroll and build an audience.",
    accent: "lavender",
  },
  {
    tag: "video",
    short: "Video",
    title: "Videography",
    service: "videography",
    blurb: "Brand stories and campaign video, from concept to final cut.",
    accent: "gold",
  },
  {
    tag: "audio",
    short: "Jingles",
    title: "Jingles & Radio",
    service: "jingles-and-radio-ads",
    blurb: "Written, scored and produced in-house — sound that sticks.",
    accent: "teal",
  },
  {
    tag: "photo",
    short: "Photography",
    title: "Photography",
    service: "photography",
    blurb: "Product and brand imagery that makes people stop and look twice.",
    accent: "teal",
  },
  {
    tag: "branding",
    short: "Branding",
    title: "Branding",
    service: "branding",
    blurb: "Identities built to be recognized — and carried across every touchpoint.",
    accent: "silver",
  },
  {
    tag: "design",
    short: "Design",
    title: "Graphic Design",
    service: "graphic-design",
    blurb: "Posters, campaigns and seasonal graphics with a job to do.",
    accent: "lavender",
  },
  {
    tag: "ads",
    short: "Ads",
    title: "Advertising",
    service: "advertising",
    blurb: "Ad creative built to earn the click — and the sale.",
    accent: "gold",
  },
];

/** Client logos (transparent; lightened where needed to read on dark). */
export const clientLogos: { name: string; src: string }[] = [
  { name: "SnapThat", src: "/clients/snapthat.webp" },
  { name: "Alberta ENT Sleep", src: "/clients/alberta-ent-sleep.webp" },
  { name: "REX Equipment", src: "/clients/rex.webp" },
  { name: "Tiger Gold", src: "/clients/tiger-gold.webp" },
  { name: "Azimuth Collective", src: "/clients/azimuth.webp" },
  { name: "Hansen Distillery", src: "/clients/hansen.webp" },
  { name: "Advanced Facial & Nasal Surgical Centre", src: "/clients/afnsc.webp" },
  { name: "ATMA CENA", src: "/clients/atma-cena.webp" },
  { name: "Canadian Sniper Association", src: "/clients/csa.webp" },
  { name: "Inferno Defence Systems", src: "/clients/inferno.webp" },
  { name: "Transcend Psychological", src: "/clients/transcend.webp" },
  { name: "True Aesthetics", src: "/clients/true-aesthetics.webp" },
  { name: "Ardent Roof Systems", src: "/clients/ardent.webp" },
  { name: "Simply Decks", src: "/clients/simply-decks.webp" },
  { name: "TiOS", src: "/clients/tios.webp" },
  { name: "Optometrists' Clinic", src: "/clients/optometrists.webp" },
  { name: "Backyard Grills", src: "/clients/backyard-grills.webp" },
  { name: "Bhatti Realty Group", src: "/clients/bhatti.webp" },
  { name: "Chrome Spa Salon", src: "/clients/chrome.webp" },
  { name: "David B. Caseley, Portfolio Manager", src: "/clients/david-caseley.webp" },
  { name: "Dynaline", src: "/clients/dynaline.webp" },
  { name: "Frank Melo Builders", src: "/clients/frank-melo.webp" },
  { name: "Kalteam Construction", src: "/clients/kalteam.webp" },
  { name: "Living Skies", src: "/clients/living-skies.webp" },
  { name: "Night Rider LEDs", src: "/clients/night-rider.webp" },
  { name: "OES Group Chartered LLP", src: "/clients/oes-group.webp" },
  { name: "Pactum Law", src: "/clients/pactum-law.webp" },
  { name: "Parkland Courier & Logistics", src: "/clients/parkland-courier.webp" },
  { name: "Red Cedar Chiropractic", src: "/clients/red-cedar.webp" },
  { name: "Scripts Medical Pharmacy", src: "/clients/scripts.webp" },
  { name: "Token Naturals", src: "/clients/token.webp" },
  { name: "Transcend Contracting", src: "/clients/transcend-contracting.webp" },
  { name: "KP Consulting", src: "/clients/kp-consulting.webp" },
];

/** Which work tag (if any) a given service slug should showcase. */
// Hosting and SEO intentionally have no portfolio section.
const serviceWorkTag: Record<string, string[]> = {
  "web-development": ["web"],
  branding: ["branding"],
  "graphic-design": ["design", "ads"],
  photography: ["photo"],
  advertising: ["ads"],
  videography: ["video"],
  "jingles-and-radio-ads": ["audio"],
  "social-content-consulting": ["social"],
  "social-media-management": ["social"],
};

export function getServiceWork(slug: string): WorkItem[] {
  const tags = serviceWorkTag[slug] ?? [];
  return work.filter((w) => w.tags.some((t) => tags.includes(t)));
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
  headline: "The Full Brand Audit",
  body: "A clear, honest look at where your brand and marketing stand today — what's working, what's quietly leaking, and the highest-impact moves to make next. It's the best first step, whether or not we end up working together.",
};

export type Project = {
  name: string;
  sector: string;
  image: string;
  accent: "teal" | "lavender" | "gold" | "silver";
  blurb: string;
  /** Optional case-study route; cards fall back to /contact without it. */
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Hansen Distillery",
    sector: "Alcohol",
    image: "/portfolio/hansen.jpg",
    accent: "gold",
    blurb: "Craft-spirits brand and storefront built to pour off the shelf.",
  },
  {
    name: "ATMA CENA",
    sector: "Medical",
    image: "/portfolio/atma-cena.webp",
    accent: "lavender",
    blurb:
      "A premium identity and content system for a psychedelic-therapy brand.",
  },
  {
    name: "REX Equipment",
    sector: "Farm Equipment",
    image: "/portfolio/rex-equipment.jpg",
    accent: "teal",
    blurb: "Heavy equipment, meet a site that actually converts.",
  },
  {
    name: "Tiger Gold",
    sector: "Capital",
    image: "/portfolio/tiger-gold.webp",
    accent: "gold",
    blurb: "Paid media and creative that made the brand impossible to miss.",
  },
  {
    name: "Natural History",
    sector: "Cannabis",
    image: "/portfolio/natural-history.jpg",
    accent: "silver",
    blurb: "Brand and presence for cannabis, handled with restraint.",
  },
  {
    name: "Optometrists' Clinic",
    sector: "Medical",
    image: "/portfolio/optometrists.png",
    accent: "teal",
    blurb: "84% more patient calls on 60% less ad spend.",
    href: "/optometrists-case-study",
  },
  {
    name: "Apex Labs",
    sector: "Psychedelics",
    image: "/portfolio/apex-labs.png",
    accent: "lavender",
    blurb: "A compliant, elevated brand in an emerging category.",
  },
  {
    name: "Azimuth Collective",
    sector: "Cannabis",
    image: "/portfolio/azimuth.png",
    accent: "silver",
    blurb: "Positioning and presence for a cannabis brand with range.",
  },
  {
    name: "Canadian Sniper Association",
    sector: "Non-Profit",
    image: "/portfolio/csa.jpg",
    accent: "gold",
    blurb: "Digital presence for a community with a precise mission.",
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
