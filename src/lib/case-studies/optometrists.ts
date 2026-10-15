/**
 * The Optometrists' Clinic — case study data.
 *
 * No dollar figures on the public page: spend is expressed as a percentage
 * change only. Sources:
 *  - BLXCK: client's Google Ads account + GA4 property, pulled 2026-10-15.
 *    Complete months only (Apr 2025 – Sep 2026).
 *  - Previous agency (Yellow Pages): their own "SEM Performance Review,
 *    Oct 2023 – Sep 2024" and "Facebook Ads Performance Review, Jan – Oct 2024"
 *    decks, supplied by the client.
 *  - Source files: Dropbox › Dev_2025 › blxckmarketing › clients ›
 *    optometrists-clinic › reports.
 */

export const months = [
  "Apr 25", "May 25", "Jun 25", "Jul 25", "Aug 25", "Sep 25",
  "Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26", "Mar 26",
  "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26",
];

/** Google Ads conversions per month (calls, forms, emails, directions). */
export const adConversions = [
  158.5, 386.8, 309.8, 411.7, 483.5, 479.3, 553.6, 548.6, 561.8,
  683.7, 623.9, 684.4, 651.5, 563.1, 579.2, 594.6, 480.5, 378.2,
];

/** Google Ads clicks per month. */
export const adClicks = [
  732, 1880, 1427, 1831, 2006, 2119, 2206, 2295, 2347,
  2502, 2120, 2057, 2080, 1923, 1930, 2142, 2302, 2288,
];

/** GA4 sessions per month, all channels. */
export const siteVisits = [
  14965, 19652, 15129, 16970, 15526, 16216, 16952, 16768, 16230,
  17928, 9369, 8330, 6964, 7840, 8096, 8509, 8469, 7880,
];

/** GA4 key events per month: phone_call + form_submit + email_click. */
export const siteContacts = [
  234, 561, 510, 647, 680, 630, 648, 625, 525,
  668, 512, 594, 515, 455, 499, 592, 597, 642,
];

/** Headline tiles. Four, each true at a glance, no dollars. */
export type Trend = "up" | "down";

export const headline: {
  value: string;
  label: string;
  /** Before → after, shown as a pill under the number. */
  from?: string;
  to?: string;
  note: string;
  trend?: Trend;
}[] = [
  { value: "82%", label: "More patient contacts from Google Ads", from: "317 / mo", to: "575 / mo", note: "vs. the previous agency's last 12 months", trend: "up" },
  { value: "59%", label: "Less ad spend", from: "100%", to: "41%", note: "Same five clinics, same market", trend: "down" },
  { value: "78%", label: "Lower cost per patient contact", from: "100%", to: "22%", note: "Calls, forms, emails and directions", trend: "down" },
  { value: "10,100+", label: "Patient contacts from the website", note: "Since relaunch, Apr 2025 – Sep 2026" },
];

/**
 * Then vs now. Previous agency = Yellow Pages, Oct 2023 – Sep 2024 (Google)
 * and Jan – Oct 2024 (Facebook). BLXCK = Oct 2025 – Sep 2026 (Google) and
 * Jan 2025 – Sep 2026 (Meta). All per-month or rate figures.
 */
export const compare = {
  thenLabel: "Before",
  thenPeriod: "Previous agency · Oct 2023 – Sep 2024",
  nowLabel: "After",
  nowPeriod: "BLXCK · Oct 2025 – Sep 2026",
  rows: [
    { k: "Google Ads · patient contacts per month", then: "317", now: "575", delta: "82%", trend: "up" },
    { k: "Google Ads · monthly spend", then: "100%", now: "41%", delta: "59%", trend: "down" },
    { k: "Google Ads · cost per contact", then: "100%", now: "22%", delta: "78%", trend: "down" },
    { k: "Google Ads · click-through rate", then: "3.9%", now: "4.7%", delta: "0.8 pts", trend: "up" },
    { k: "Google Ads · cost per click", then: "100%", now: "45%", delta: "55%", trend: "down" },
    { k: "Meta · clicks to the site per month", then: "584", now: "720", delta: "23%", trend: "up" },
    { k: "Meta · click-through rate", then: "0.47%", now: "1.14%", delta: "2.4×", trend: "up" },
    { k: "Meta · cost per click", then: "100%", now: "76%", delta: "24%", trend: "down" },
  ] as { k: string; then: string; now: string; delta: string; trend: Trend }[],
};

/** Meta Ads, Jan 2025 – Sep 2026. No lead events tracked on Meta; reach + clicks. */
export const meta: { value: string; label: string; note: string; trend?: Trend }[] = [
  { value: "485K", label: "People reached by the clinic's video ad", note: "One always-on campaign" },
  { value: "15,000+", label: "Clicks through to the website", note: "24% cheaper per click than before" },
  { value: "2.4×", label: "Click-through rate vs. the previous agency", note: "0.47% → 1.14%", trend: "up" },
];
