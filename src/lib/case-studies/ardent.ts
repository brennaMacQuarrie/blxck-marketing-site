/**
 * Ardent Roof Systems — case study data.
 *
 * No dollar figures on the public page: spend is expressed as a percentage
 * change only. Sources: the client's GA4 property (443341198), Google Ads
 * account and Meta ad account, pulled through the BLXCK ops warehouse on
 * 2026-10-23 (`node ops sync --client ardent-roofing --days 730` plus GA4
 * API pulls back to the property's first month, May 2024).
 *
 * Complete months only: June 2024 – September 2026. The radio jingle
 * ("Crazy About Roofs") has been on air in Edmonton and Calgary since
 * May 2026; the Free Roof Giveaway ran in August of both 2025 and 2026.
 */

import type { Trend } from "./optometrists";
export type { Trend };

export const months = [
  "Jun 24", "Jul 24", "Aug 24", "Sep 24", "Oct 24", "Nov 24", "Dec 24",
  "Jan 25", "Feb 25", "Mar 25", "Apr 25", "May 25", "Jun 25", "Jul 25", "Aug 25", "Sep 25", "Oct 25", "Nov 25", "Dec 25",
  "Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26",
];

/** Index of May 2026 in `months`: the first month the jingle was on air. */
export const jingleFrom = 23;

/** GA4 total users per month, all channels. */
export const siteUsers = [
  132, 131, 842, 145, 156, 162, 257,
  721, 863, 846, 842, 841, 903, 1284, 1544, 608, 710, 730, 614,
  633, 874, 1282, 1200, 1459, 1263, 1055, 3574, 1146,
];

/** GA4 sessions per month, all channels. */
export const siteVisits = [
  218, 194, 1072, 197, 241, 199, 918,
  1087, 1166, 1192, 1163, 1158, 1188, 1763, 2446, 814, 907, 819, 651,
  728, 987, 1518, 1396, 1630, 1448, 1257, 4412, 1261,
];

/** GA4 sessions per month from the Direct channel (typed the address, no search, no ad). */
export const directVisits = [
  85, 43, 264, 26, 37, 14, 37,
  159, 111, 182, 170, 186, 256, 377, 1094, 135, 317, 433, 314,
  228, 283, 303, 242, 262, 308, 313, 1974, 402,
];

/** GA4 key events per month: phone_call + form_submit + email_click. */
export const siteContacts = [
  22, 44, 83, 72, 108, 85, 27,
  32, 54, 83, 92, 71, 59, 100, 81, 26, 45, 22, 4,
  65, 43, 59, 68, 77, 72, 57, 35, 57,
];

/** Hero tiles: the single standout figure from each section of the page. */
export const headline: {
  section: string;
  value: string;
  label: string;
  from?: string;
  to?: string;
  trend?: Trend;
}[] = [
  { section: "Website", value: "5×", label: "More people visiting the website each month", from: "about 260 a month", to: "about 1,400 a month", trend: "up" },
  { section: "Radio", value: "2.3×", label: "More people reached by the Free Roof Giveaway with the jingle on air", from: "1,544 people", to: "3,574 people", trend: "up" },
  { section: "Meta Ads", value: "2.3×", label: "More clicks from Facebook and Instagram ads on the same budget", from: "2,050", to: "4,638", trend: "up" },
  { section: "Calgary", value: "58%", label: "More Calgary visitors as the brand grew in its second city", from: "2,488 visits", to: "3,923 visits", trend: "up" },
];

/**
 * Then vs now. "Then" is 2025, "now" is 2026, same months in each case.
 * Peak season = May – September. Full period = January – September.
 */
export const compare = {
  thenPeriod: "2025",
  nowPeriod: "2026, jingle on air from May",
  boxes: [
    { channel: "Website", label: "People visiting the site each month", delta: "64%", trend: "up", from: "1,036", to: "1,699", detail: "Peak roofing season, May to September, against the same months a year earlier." },
    { channel: "Website", label: "Visitors who typed the address in", delta: "59%", trend: "up", from: "2,048", to: "3,259", detail: "Direct visits, the kind a jingle creates: no search, no ad, just the name remembered. May to September. Still 35% more with the giveaway month left out." },
    { channel: "Radio", label: "People reached by the Free Roof Giveaway", delta: "2.3×", trend: "up", from: "1,544", to: "3,574", detail: "Same contest, same month. In 2026 the jingle and a giveaway radio spot carried it, and the busiest week brought 2,041 visits in seven days." },
    { channel: "Meta Ads", label: "Clicks to the website each month", delta: "2.3×", trend: "up", from: "410", to: "928", detail: "Facebook and Instagram, May to September, on the same budget as the year before. Each click now costs 55% less." },
    { channel: "Meta Ads", label: "People who saw the ads", delta: "65%", trend: "up", from: "249K", to: "410K", detail: "Reach on Facebook and Instagram, May to September, for about the same spend." },
    { channel: "Google Ads", label: "What each enquiry costs", delta: "26%", trend: "down", detail: "The Google Ads budget was cut in half in late 2025. Each call, form or email it brings in now costs 26% less. January to September 2026 against the same months of 2025." },
  ] as { channel: string; label: string; delta: string; trend: Trend; from?: string; to?: string; detail: string }[],
};

/** Radio: the jingle went on air in May 2026 in Edmonton and Calgary. */
export const radio: { value: string; label: string; note: string; trend?: Trend }[] = [
  { value: "59%", label: "More people typing the address in", note: "May to September 2026 against the same months of 2025", trend: "up" },
  { value: "2.3×", label: "More people reached by the roof giveaway", note: "3,574 people in August 2026 against 1,544 in August 2025, with the jingle and a giveaway radio spot behind it", trend: "up" },
  { value: "779", label: "Visits on the busiest day", note: "24 August 2026, the first day of giveaway voting. Nearly 700 different people in one day" },
];

/** Hear the jingle. */
export const jingleUrl = "https://youtu.be/VtamRfEBqX4";

/** Brand story video. */
export const brandVideoUrl = "https://youtu.be/nM_kcDVCEg4";

/** Meta Ads, October 2024 – October 2026. */
export const meta: { value: string; label: string; note: string; trend?: Trend }[] = [
  { value: "3M", label: "Times Ardent's ads were shown", note: "Facebook and Instagram, October 2024 to October 2026" },
  { value: "13,500+", label: "Clicks through to the website", note: "October 2024 to October 2026, on a small always-on budget" },
  { value: "55%", label: "Less paid for each click", note: "May to September 2026 against the same months of 2025, on the same budget", trend: "down" },
];
