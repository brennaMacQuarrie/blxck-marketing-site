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

export type Trend = "up" | "down";

/** Hero tiles: the single standout figure from each section of the page. */
export const headline: {
  section: string;
  value: string;
  label: string;
  from?: string;
  to?: string;
  trend?: Trend;
}[] = [
  { section: "Google Ads", value: "82%", label: "More calls and booking requests every month", from: "317 a month", to: "575 a month", trend: "up" },
  { section: "Website", value: "60%", label: "Smaller, faster homepage than before", from: "1 MB", to: "0.4 MB", trend: "down" },
  { section: "Website visitors", value: "7 in 100", label: "Visitors now call, book or email the clinic", from: "4 in 100", to: "7 in 100", trend: "up" },
  { section: "Meta Ads", value: "2.4×", label: "More people click the ad when they see it", from: "5 in 1,000", to: "11 in 1,000", trend: "up" },
];

/**
 * Then vs now. Previous agency = Yellow Pages, Oct 2023 – Sep 2024 (Google)
 * and Jan – Oct 2024 (Facebook). BLXCK = Oct 2025 – Sep 2026 (Google) and
 * Jan 2025 – Sep 2026 (Meta). All per-month or rate figures.
 */
export const compare = {
  thenPeriod: "Previous agency · Oct 2023 – Sep 2024",
  nowPeriod: "BLXCK · Oct 2025 – Sep 2026",
  boxes: [
    { channel: "Google Ads", label: "Calls and booking requests each month", delta: "82%", trend: "up", from: "317", to: "575", detail: "People who called, filled in a form, emailed or got directions after seeing an ad." },
    { channel: "Google Ads", label: "Money spent on ads each month", delta: "59%", trend: "down", detail: "Less than half of what the previous agency was spending." },
    { channel: "Google Ads", label: "What each new patient enquiry costs", delta: "78%", trend: "down", detail: "For every call or booking request, the clinic now pays less than a quarter of what it used to." },
    { channel: "Meta Ads", label: "People clicking through to the website each month", delta: "23%", trend: "up", from: "584", to: "720", detail: "From Facebook and Instagram ads, on about the same budget." },
    { channel: "Meta Ads", label: "How often people click the ad when they see it", delta: "2.4×", trend: "up", from: "5 in 1,000", to: "11 in 1,000", detail: "More than twice as many of the people who see an ad tap on it." },
    { channel: "Website", label: "Visitors who call, book or email", delta: "85%", trend: "up", from: "4 in 100", to: "7 in 100", detail: "The site turns far more of its visitors into real patient enquiries." },
  ] as { channel: string; label: string; delta: string; trend: Trend; from?: string; to?: string; detail: string }[],
};

/** Meta Ads, Jan 2025 – Sep 2026. No lead events tracked on Meta; reach + clicks. */
export const meta: { value: string; label: string; note: string; trend?: Trend }[] = [
  { value: "485K", label: "People who saw the clinic's video ad", note: "On Facebook and Instagram, one always-on campaign" },
  { value: "15,000+", label: "Times someone clicked through to the website", note: "Each click cost 24% less than under the previous agency" },
  { value: "2.4×", label: "More people click the ad when they see it", note: "Compared with the previous agency's ads", trend: "up" },
];
