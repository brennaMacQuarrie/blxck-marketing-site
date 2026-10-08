/* eslint-disable */
// @ts-nocheck
/**
 * BLXCK Custom Plan Builder — pricing engine + UI controller.
 * Ported from the standalone "BLXCK Plan Builder.html". All prices live in
 * `P` below; edit them there. Markup lives in ./markup.ts, styles in
 * ./plan-builder.css. Call once per mounted root.
 */
export function initPlanBuilder(root, opts) {
  if (!root || root.dataset.bxInit) return;
  root.dataset.bxInit = "1";


  /* =====================================================================
     PRICING. Every number the calculator uses lives here.
     Graduated tiers: [up to this many per month, price each].
     ===================================================================== */
  var P = {
    socialBase: 750, socialBasePosts: 4,          // first 4 posts + account management; extra posts at the rates below
    graphic: 80, carousel: 125,                   // per post
    reelEdit: 125,                                // you film, we edit: per reel
    reelFilmMin: 4,                               // we film & edit: minimum reels per month
    videoDay: 2400,                               // one videography day, filming + editing
    reelsPerShoot: 12,                            // one shoot day captures up to 12 reels
    blog: 150, newsletter: 150, sameContentOff: 0.20,   // 20% off blogs + newsletters when they share content
    premium: { none: 0, quarterly: 800, bimonthly: 1200, monthly: 2400 },   // AD video days ($2,400/day, 1 ad per day); once = billed one-time
    premiumVideo: 3500,                           // brand story video: starting price
    otherVideo: 2950,                             // testimonials, case studies, promo, automation, explainer: starting price each
    tvSpot: 4500,                                 // TV commercial: starting price each
    photoDay: 900, photoDayPaired: 600,           // photography day; paired = same day as a videography day
    ads: [0, 650, 750, 850],                      // price by number of ad platforms (Google, social, ChatGPT)
    adsSingle: 650,
    staticAd: 400, staticPack4: 1200, videoAd: 2500,
    seo: { none: 0, basic: 500, advanced: 1250, premium: 2750 },
    gbp: 300, gbpWithSeo: 250,                    // Google Business Profile management add-on
    fullAudit: 1500, digitalAudit: 750, webAudit: 500, seoAudit: 1200, auditCredit: 1000,   // fullAudit = Full Brand Audit (earns the credit)
    refreshBase: 1000, refreshExtra: 100,
    buildBase: 2000, creativeBase: 3500, buildIncluded: 8, buildExtra: 200,
    ecom: 5000, ecomBlock: 500,                   // per extra 25 products
    // website add-ons, estimated at the $100/hr development rate
    addBooking: 1000, addPortal: 1500, addLms: 2500, addMotion: 800, addApi: 800,
    hosting: { none: 0, domain: 25, advanced: 150, email: 300 },   // domain = $300/yr shown as monthly equivalent
    hourNonCode: 75, hourCode: 100,
    strategy: { none: 0, quarterly: 250, monthly: 400 },
    checkin: { monthly: 0, biweekly: 150, weekly: 450 },
    logo: 500, brandKit: { none: 0, basic: 500, premium: 2500 },
    brandStory: 7500,
    discounts: [[7, 0.20], [5, 0.15], [3, 0.10], [2, 0.05]]
  };

  var CATS = [
    { id: "social",   name: "Social media",     desc: "Posts, carousels & reels, fully managed", from: "from $750/mo", g: "g1" },
    { id: "content",  name: "Blogs & email",    desc: "Blog posts and e-newsletters",             from: "$150 per piece", g: "g2" },
    { id: "video",    name: "Video & photo",    desc: "Shoot days, video ads, premium video & photo", from: "from $300/mo", g: "g3" },
    { id: "ads",      name: "Paid ads",         desc: "Google, social & ChatGPT ads",             from: "from $650/mo", g: "g1" },
    { id: "seo",      name: "SEO",              desc: "Get found on Google, month after month",   from: "from $300/mo", g: "g2" },
    { id: "web",      name: "Website",          desc: "Custom-built sites, hosting & care",    from: "builds from $2,000", g: "g3" },
    { id: "strategy", name: "Strategy & brand", desc: "Planning, check-ins, logos & brand kits",    from: "from $250/mo", g: "g1" },
    { id: "audits",   name: "Audits",           desc: "Find out where you stand first",           from: "from $500", g: "g2" }
  ];

  var PLATFORMS = [["ig","Instagram"],["fb","Facebook"],["li","LinkedIn"],["tt","TikTok"],["x","X"],["yt","YouTube"],["gbp","Google Business"]];

  function blank() {
    return {
      cats: { social:false, content:false, video:false, ads:false, seo:false, web:false, strategy:false, audits:false },
      platforms: ["ig","fb"], graphics: 0, carousels: 0, reels: 0, reelMode: "edit", reelShoot: "quarterly", videoAuto: false,
      blogs: 0, newsletters: 0, sameContent: false,
      premium: "none", photo: "none",
      adsGoogle: false, adsSocial: false, adsChatGPT: false, adSpend: 1500, staticAds: 0, videoAds: 0,
      seo: "none", gbp: true, contentAuto: false,
      webProject: "none", refreshPages: 1, buildPages: 8, extraProducts: 0,
      addBooking: false, addPortal: false, addLms: false, addMotion: false, apiCount: 0,
      hosting: "none",
      strategy: "none", checkin: "monthly", consultHours: 0,
      logo: false, brandKit: "none", brandStory: false,
      brandVideo: false, otherVideos: 0, tvSpots: 0,
      fullAudit: false, digitalAudit: false, webAudit: false, seoAudit: false
    };
  }
  function example() {
    var s = blank();
    s.cats.social = true; s.cats.ads = true; s.cats.strategy = true;
    s.graphics = 4; s.carousels = 2; s.reels = 2; s.reelMode = "edit";
    s.adsSocial = true; s.strategy = "quarterly";
    return s;
  }
  var S = example();
  var isExample = true;

  /* ---------- helpers ---------- */
  function money(n) { var v = Math.round(Math.abs(n)); return (n < 0 ? "−$" : "$") + v.toLocaleString("en-CA"); }
  function grad(n, tiers) {
    var c = 0, prev = 0;
    for (var i = 0; i < tiers.length; i++) {
      if (n <= prev) break;
      var k = Math.min(n, tiers[i][0]) - prev; c += k * tiers[i][1]; prev = tiers[i][0];
    }
    return c;
  }
  function tierHint(n, tiers, noun) {
    if (n === 0) return money(tiers[0][1]) + " per " + noun;
    var prev = 0;
    for (var i = 0; i < tiers.length; i++) {
      if (n <= tiers[i][0]) {
        var now = money(tiers[i][1]) + " per " + noun + " at this volume";
        if (i + 1 < tiers.length && n === tiers[i][0]) return now + " · the next ones drop to " + money(tiers[i + 1][1]);
        if (i + 1 < tiers.length) return now + " · " + noun + "s " + (tiers[i][0] + 1) + "+ drop to " + money(tiers[i + 1][1]);
        return now;
      }
      prev = tiers[i][0];
    }
    return "";
  }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : (many || one + "s")); }
  function shootsPerYear(freq) { return ({ quarterly: 4, bimonthly: 6, monthly: 12, twice: 24 })[freq] || 0; }
  var SHOOT_LABEL = { quarterly: "quarterly", bimonthly: "every 2 months", monthly: "monthly", twice: "twice a month" };
  var SHOOT_ORDER = ["quarterly", "bimonthly", "monthly", "twice"];
  function reelDayCost() { return Math.round(shootsPerYear(S.reelShoot) * P.videoDay / 12); }
  function shootFits(freq, reels) { return shootsPerYear(freq) * P.reelsPerShoot / 12 >= reels; }
  // Every post, priced. Filmed reels are $0 here because shoot days cover them (Video & photo).
  // Sorted most expensive first, so the base plan's 4 posts always cover the priciest ones.
  function socialPosts() {
    var list = [], i;
    for (i = 0; i < S.carousels; i++) list.push({ type: "carousel", price: P.carousel });
    for (i = 0; i < S.reels; i++) list.push({ type: S.reelMode === "film" ? "reelFilm" : "reel", price: S.reelMode === "film" ? 0 : P.reelEdit });
    for (i = 0; i < S.graphics; i++) list.push({ type: "graphic", price: P.graphic });
    return list.sort(function (a, b) { return b.price - a.price; });
  }
  function premiumSeoOn() { return S.cats.seo && S.seo === "premium"; }
  function cheapestShoot(reels) {
    for (var i = 0; i < SHOOT_ORDER.length; i++) if (shootFits(SHOOT_ORDER[i], reels)) return SHOOT_ORDER[i];
    return SHOOT_ORDER[SHOOT_ORDER.length - 1];
  }
  function fixShoot() {
    if (!S.reels || shootFits(S.reelShoot, S.reels)) return;
    for (var i = 0; i < SHOOT_ORDER.length; i++) if (shootFits(SHOOT_ORDER[i], S.reels)) { S.reelShoot = SHOOT_ORDER[i]; return; }
  }
  function videoShootsYr() {
    var r = (S.cats.social && S.reels > 0 && S.reelMode === "film") ? shootsPerYear(S.reelShoot) : 0;
    var p = S.cats.video ? (S.premium === "once" ? 1 : shootsPerYear(S.premium)) : 0;
    return r + p;   // reel days and premium video days are separate days
  }
  function platformNames() { return S.platforms.map(function (p) { for (var i = 0; i < PLATFORMS.length; i++) if (PLATFORMS[i][0] === p) return PLATFORMS[i][1]; }); }

  /* ---------- pricing engine ---------- */
  function compute() {
    var monthly = [], once = [], quoted = [], services = [];
    function grp(list, cat) { var g = { cat: cat, items: [], total: 0 }; list.push(g); return g; }
    function add(g, label, amt, svc) { g.items.push({ label: label, amt: amt }); g.total += amt; if (svc) services.push(svc); }

    var catName = {}; CATS.forEach(function (c) { catName[c.id] = c.name; });

    // Social
    var social = { total: 0 };
    if (S.cats.social) {
      var g = grp(monthly, "Social media");
      var posts = S.graphics + S.carousels + S.reels;
      if (posts > 0) {
        // graphics, carousels and reels (incl. reel shoot days) all count as ONE service: Social media
        var list = socialPosts(), extra = list.slice(P.socialBasePosts), names = { graphic: "graphic post", carousel: "carousel", reel: "reel (you film)", reelFilm: "reel (filmed on shoot days)" };
        var base = list.slice(0, P.socialBasePosts), baseCount = {};
        base.forEach(function (x) { baseCount[x.type] = (baseCount[x.type] || 0) + 1; });
        add(g, "Base plan: 4 posts (" + Object.keys(baseCount).map(function (k) { return plural(baseCount[k], names[k]); }).join(", ") +
          ") + scheduling, captions, DMs & comments, reporting", P.socialBase, "Social media");
        var extraCount = {}, extraCost = {};
        extra.forEach(function (x) { extraCount[x.type] = (extraCount[x.type] || 0) + 1; extraCost[x.type] = (extraCost[x.type] || 0) + x.price; });
        Object.keys(extraCount).forEach(function (k) { add(g, "Additional: " + plural(extraCount[k], names[k]), extraCost[k]); });
        if (S.reelMode === "film" && S.reels) add(g, "Reel filming is covered by your shoot days (see Video & photo)", 0);
      }
      g.hideItems = true;   // summary shows the social total only, not the per-post breakdown
      social = g;
      if (!g.items.length) monthly.pop();
    }

    // Blogs & email
    var seoBlogs = premiumSeoOn();   // Premium SEO covers blogs: "6+ a month", scaled to what makes sense
    if (S.cats.content && (seoBlogs || S.blogs || S.newsletters)) {
      var g2 = grp(monthly, "Blogs & email");
      var paidBlogs = seoBlogs ? 0 : S.blogs;
      if (seoBlogs) add(g2, "6+ blog posts /mo · included with Premium SEO", 0);
      if (paidBlogs) add(g2, plural(paidBlogs, "blog post") + " /mo", paidBlogs * P.blog, "Blog");
      if (S.newsletters) add(g2, plural(S.newsletters, "e-newsletter") + " /mo", S.newsletters * P.newsletter, "E-newsletter");
      if (S.sameContent && paidBlogs && S.newsletters)
        add(g2, "Same content for blog & newsletter (20% off)", -Math.round((paidBlogs * P.blog + S.newsletters * P.newsletter) * P.sameContentOff));
    }

    // Video & photo
    if (S.cats.video) {
      var vShoots = videoShootsYr();
      var gv = grp(monthly, "Video & photo");
      if (S.cats.social && S.reels && S.reelMode === "film")
        add(gv, "Social media shoot days · " + SHOOT_LABEL[S.reelShoot] + " (" + plural(shootsPerYear(S.reelShoot), "day") + "/yr, " + plural(S.reels, "reel") + "/mo)", reelDayCost());
      if (S.premium !== "none" && S.premium !== "once") add(gv, "Ad video days · " + SHOOT_LABEL[S.premium] + " (1 finished ad per day)", P.premium[S.premium], "Video ads");
      if (S.photo !== "none" && S.photo !== "once") {
        var n = shootsPerYear(S.photo), paired = Math.min(n, vShoots);
        var yr = paired * P.photoDayPaired + (n - paired) * P.photoDay;
        add(gv, "Photography days · " + SHOOT_LABEL[S.photo] + (paired ? (paired === n ? " (paired with shoot days)" : " (" + paired + " of " + n + " a year paired)") : ""), Math.round(yr / 12), "Photography");
      }
      if (!gv.items.length) monthly.pop();
      if (S.photo === "once") {
        var og = grp(once, "Video & photo");
        add(og, "One photography day" + (vShoots ? " (paired with a shoot day)" : ""), vShoots ? P.photoDayPaired : P.photoDay);
      }
      if (S.premium === "once") {
        var op = once.filter(function (x) { return x.cat === "Video & photo"; })[0] || grp(once, "Video & photo");
        add(op, "One ad video day (1 finished ad)", P.videoDay);
      }
      if (S.brandVideo || S.otherVideos || S.tvSpots) {
        var gp = once.filter(function (x) { return x.cat === "Video & photo"; })[0] || grp(once, "Video & photo");
        if (S.brandVideo) add(gp, "Brand story video (starting price)", P.premiumVideo);
        if (S.otherVideos) add(gp, plural(S.otherVideos, "video production") + " (starting price, " + money(P.otherVideo) + " each)", S.otherVideos * P.otherVideo);
        if (S.tvSpots) add(gp, plural(S.tvSpots, "TV commercial") + " (starting price, " + money(P.tvSpot) + " each)", S.tvSpots * P.tvSpot);
      }
    }

    // Paid ads
    var adCount = S.cats.ads ? (S.adsGoogle ? 1 : 0) + (S.adsSocial ? 1 : 0) + (S.adsChatGPT ? 1 : 0) : 0;
    var adsOn = adCount > 0;
    if (adsOn) {
      var ga = grp(monthly, "Paid ads");
      // any mix of platforms counts as ONE service toward the bundle discount
      if (S.adsGoogle) add(ga, "Google Ads management", P.adsSingle);
      if (S.adsSocial) add(ga, "Social ads management (Meta, TikTok, LinkedIn)", P.adsSingle);
      if (S.adsChatGPT) add(ga, "ChatGPT ads management", P.adsSingle);
      services.push("Paid ads");
      if (adCount > 1) add(ga, (adCount === 3 ? "All three platforms" : "Two platforms") + ": " + money(P.ads[adCount]) + " rate", P.ads[adCount] - adCount * P.adsSingle);
      add(ga, "1 graphic ad, sized and optimized for each platform", 0);
      add(ga, "Analytics, reporting dashboard & 2 creative refreshes a year", 0);
    }
    if (S.cats.ads && S.staticAds) {
      var oa = grp(once, "Ad creative");
      if (S.staticAds) {
        var packs = Math.floor(S.staticAds / 4), rem = S.staticAds % 4;
        add(oa, plural(S.staticAds, "static ad") + (rem === 3 ? " (4-pack price: add one more at no extra cost)" : packs ? " (4-pack pricing)" : ""), packs * P.staticPack4 + Math.min(rem * P.staticAd, P.staticPack4));
      }
    }

    // SEO (tier + Google Business Profile add-on count as ONE service)
    if (S.cats.seo) {
      var gs = grp(monthly, "SEO");
      var tier = S.seo !== "none";
      if (tier) add(gs, S.seo.charAt(0).toUpperCase() + S.seo.slice(1) + " SEO", P.seo[S.seo]);
      if (S.gbp) add(gs, "Google Business Profile management" + (tier ? " (bundled rate)" : ""), tier ? P.gbpWithSeo : P.gbp);
      if (gs.items.length) { add(gs, "Monthly SEO report", 0); services.push("SEO"); }
      else monthly.pop();
    }

    // Website
    if (S.cats.web) {
      var ow = grp(once, "Website");
      if (S.webProject === "refresh") add(ow, "Site refresh · " + plural(S.refreshPages, "page"), P.refreshBase + Math.max(0, S.refreshPages - 1) * P.refreshExtra);
      if (S.webProject === "build" || S.webProject === "creative")
        add(ow, (S.webProject === "build" ? "New site, your vision" : "New site, our creative direction") + " · " + plural(S.buildPages, "page"),
          (S.webProject === "build" ? P.buildBase : P.creativeBase) + Math.max(0, S.buildPages - P.buildIncluded) * P.buildExtra);
      if (S.webProject === "ecom") {
        add(ow, "eCommerce build · up to 25 products", P.ecom);
        if (S.extraProducts) add(ow, (S.extraProducts * 25) + " more products", S.extraProducts * P.ecomBlock);
      }
      if (S.webProject !== "none") {
        if (S.addBooking) add(ow, "Booking or scheduling system", P.addBooking);
        if (S.addPortal) add(ow, "Member login or client portal", P.addPortal);
        if (S.addLms) add(ow, "Learning platform (courses)", P.addLms);
        if (S.addMotion) add(ow, "Custom animations & interactions", P.addMotion);
        if (S.apiCount) add(ow, plural(S.apiCount, "API integration"), S.apiCount * P.addApi);
      }
      if (!ow.items.length) once.pop();

      var gw = grp(monthly, "Website");
      var hostLabels = { domain: "Hosting only ($300 billed yearly; changes billed hourly)", advanced: "Hosting & care: unlimited fixes and changes", email: "Hosting, care & email support" };
      if (S.hosting !== "none") add(gw, hostLabels[S.hosting], P.hosting[S.hosting], "Hosting");
      if (!gw.items.length) monthly.pop();
    }

    // Strategy & brand
    if (S.cats.strategy) {
      var gt = grp(monthly, "Strategy & brand");
      if (S.strategy !== "none") add(gt, (S.strategy === "monthly" ? "Monthly" : "Quarterly") + " strategy session", P.strategy[S.strategy], "Strategy sessions");
      if (S.checkin !== "monthly") add(gt, (S.checkin === "weekly" ? "Weekly" : "Every-other-week") + " check-ins", P.checkin[S.checkin]);
      if (S.consultHours) add(gt, plural(S.consultHours, "hour") + " of design or consulting /mo", S.consultHours * P.hourNonCode, "Design & consulting");
      if (!gt.items.length) monthly.pop();
      var ob = grp(once, "Brand");
      if (S.logo) add(ob, "Logo design (2 rounds of revisions)", P.logo);
      if (S.brandKit === "basic") add(ob, "Brand kit", P.brandKit.basic);
      if (S.brandKit === "premium") add(ob, "Brand kit + brand guidelines", P.brandKit.premium);
      if (!ob.items.length) once.pop();
    }

    // Audits
    if (S.cats.audits) {
      var ou = grp(once, "Audits");
      if (S.fullAudit) add(ou, "Full brand audit", P.fullAudit);
      if (S.digitalAudit) add(ou, "Digital marketing audit", P.digitalAudit);
      if (S.webAudit) add(ou, "Website audit", P.webAudit);
      if (S.seoAudit) add(ou, "SEO audit", P.seoAudit);
      if (!ou.items.length) once.pop();
    }

    var subtotal = monthly.reduce(function (a, g) { return a + g.total; }, 0);
    var count = services.length, pct = 0;
    for (var i = 0; i < P.discounts.length; i++) if (count >= P.discounts[i][0]) { pct = P.discounts[i][1]; break; }
    var discount = Math.round(subtotal * pct);
    var total = subtotal - discount;
    var onceTotal = once.reduce(function (a, g) { return a + g.total; }, 0);
    var auditPicked = S.cats.audits && S.fullAudit;
    var credit = (auditPicked && total > 0) ? P.auditCredit : 0;
    var comboSave = adCount > 1 ? adCount * P.adsSingle - P.ads[adCount] : 0;

    return { monthly: monthly, once: once, quoted: quoted, services: services, count: count, pct: pct, subtotal: subtotal,
             discount: discount, total: total, onceTotal: onceTotal, credit: credit, auditPicked: auditPicked, save: discount + comboSave, social: social };
  }

  /* ---------- control builders ---------- */
  function stepper(key, label, min, max, unit) {
    return '<div class="bx-stp" data-stp="' + key + '" data-min="' + min + '" data-max="' + max + '">' +
      '<button type="button" id="bx-' + key + '-dn" data-d="-1" aria-label="Fewer ' + label + '">−</button>' +
      '<output id="bx-' + key + '-out">0</output>' +
      '<button type="button" id="bx-' + key + '-up" data-d="1" aria-label="More ' + label + '">+</button></div>';
  }
  function seg(key, opts, label) {
    return '<div class="bx-seg" role="radiogroup" aria-label="' + label + '" data-seg="' + key + '">' +
      opts.map(function (o) { return '<button type="button" role="radio" id="bx-' + key + '-' + o[0] + '" data-v="' + o[0] + '">' + o[1] + '</button>'; }).join("") + '</div>';
  }
  function cards(key, opts, label, cls) {
    return '<div class="bx-cards' + (cls ? " " + cls : "") + '" role="radiogroup" aria-label="' + label + '" data-seg="' + key + '">' +
      opts.map(function (o) {
        return '<button type="button" role="radio" class="bx-card" id="bx-' + key + '-' + o.v + '" data-v="' + o.v + '"><span class="c-t">' + o.t + '</span>' +
          (o.p ? '<span class="c-p">' + o.p + '</span>' : '') + (o.d ? '<span class="c-d">' + o.d + '</span>' : '') + '</button>';
      }).join("") + '</div>';
  }
  function sw(key, label) { return '<button type="button" role="switch" class="bx-sw" id="bx-' + key + '" data-sw="' + key + '" aria-label="' + label + '"></button>'; }
  function row(label, help, control, opts) {
    opts = opts || {};
    return '<div class="bx-row' + (opts.stack ? ' stack' : '') + '"' + (opts.iff ? ' data-if="' + opts.iff + '"' : '') + '>' +
      '<div><div class="r-label">' + label + '</div>' + (help ? '<div class="r-help">' + help + '</div>' : '') +
      (opts.hint ? '<div class="r-hint" data-hint="' + opts.hint + '"></div>' : '') + '</div>' +
      '<div>' + control + '</div></div>';
  }
  function sub(t, iff) { return '<div class="bx-sub"' + (iff ? ' data-if="' + iff + '"' : '') + '>' + t + '</div>'; }

  var PANELS = {
    social: function () {
      return sub("Where you post") +
        row("Platforms", "Adding platforms costs nothing extra.",
          '<div class="bx-chips" data-chips="platforms">' + PLATFORMS.map(function (p) { return '<button type="button" id="bx-pf-' + p[0] + '" data-v="' + p[0] + '" aria-pressed="false">' + p[1] + '</button>'; }).join("") + '</div>', { stack: true }) +
        '<div class="bx-note">Not every post goes out on every platform. Your mix of graphic posts, carousels and reels is planned around <b>Instagram and Facebook</b>, and we choose and adapt what suits each of your other platforms.</div>' +
        sub("Your monthly post mix") +
        '<div class="bx-note">Plans start at <b>4 posts a month</b>, with account management, captions, scheduling and DMs included.</div>' +
        row("Graphic posts", "Single designed image posts.", stepper("graphics", "graphic posts", 0, 20)) +
        row("Carousels", "Multi-slide posts with more design and copy.", stepper("carousels", "carousels", 0, 12)) +
        row("Reels", "Short-form vertical video, edited and captioned from footage you send us. <b>Filming isn\'t included</b>; choose <b>We film &amp; edit</b> below to add it.", stepper("reels", "reels", 0, 24), { hint: "reelRoom" }) +
        '<div class="bx-cal" id="bx-cal" aria-label="How your month could look"><div class="bx-caldow" aria-hidden="true"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div><div class="bx-calgrid" id="bx-calgrid"></div>' +
        '<div class="bx-legend"><span><i class="dot graphic"></i>Graphic</span><span><i class="dot carousel"></i>Carousel</span><span><i class="dot reel"></i>Reel</span><span class="cadence" id="bx-cadence"></span></div></div>' +
        '<div class="bx-note bx-warn" id="bx-post-err" role="alert" hidden><b>Social plans start at 4 posts a month.</b> To go lower, mix in a different post type first, or remove Social media from your plan.</div>' +
        sub("Reel production", "reelsOn") +
        row("Who films?", "You film on your phone and send us the footage, or we come to you with a full crew on a social media shoot day.",
          seg("reelMode", [["edit", "You film, we edit"], ["film", "We film & edit"]], "Who films the reels"), { iff: "reelsOn", stack: true }) +
        '<div class="bx-note bx-warn" id="bx-reel-err" role="alert" hidden></div>' +
        '<div class="bx-note" data-if="reelFilm">Filming happens on <b>social media shoot days</b>. We\'ve added them to <b>Video &amp; photo</b> below, where you can pick how often we shoot.</div>' +
        sub("Included with every social plan") +
        '<div class="bx-note">Also included: content calendar, captions & hashtags, DM & comment management, and a monthly performance report.</div>';
    },
    content: function () {
      return sub("Long-form content") +
        row("Blog posts", "SEO-minded articles written and published to your site. $150 each.", stepper("blogs", "blog posts", 0, 12), { iff: "noSeoBlogs" }) +
        '<div class="bx-note" data-if="seoPremium"><b>6+ blog posts a month are included with Premium SEO.</b> We scale the number to what makes sense for your site.</div>' +
        row("E-newsletters", "Designed, written and sent to your list. $150 each.", stepper("newsletters", "e-newsletters", 0, 4)) +
        row("Same content for both", "Your newsletter shares your blog content with your list. Saves 20% on your blogs and newsletters.", sw("sameContent", "Blog and newsletter share the same content"), { iff: "blogAndNews" }) +
        '<div class="bx-note" data-if="noContent">Add a blog post or newsletter to include this in your plan.</div>';
    },
    video: function () {
      return '<div class="bx-vday" aria-label="Our two kinds of shoot day">' +
          '<div class="vd-opts">' +
          '<div class="vd-o"><span class="vd-k">Social media shoot day</span><b>About 12 reels</b><span>filmed and edited for your feeds</span></div>' +
          '<div class="vd-o"><span class="vd-k">Ad video day</span><b>1 finished video ad</b><span>scripted, shot and edited for your campaigns</span></div>' +
          '</div></div>' +
        '<div class="bx-note" data-if="vdaysTotal" id="bx-vdays"></div>' +
        sub("Social media shoot days", "reelFilm") +
        row("How often we shoot", "Each shoot day covers about 12 reels. Only schedules that cover your " + '<span id="bx-reelcount-txt"></span>' + " are shown.",
          seg("reelShoot", [["quarterly", "Quarterly"], ["bimonthly", "Every 2 months"], ["monthly", "Monthly"], ["twice", "Twice a month"]], "Social media shoot days"), { iff: "reelFilm", stack: true, hint: "shoot" }) +
        '<div class="bx-note" data-if="reelsElsewhere">Want us to film your reels? Add reels under <b>Social media</b> and choose <b>We film &amp; edit</b>.</div>' +
        sub("Ad video days") +
        cards("premium", [
          { v: "none", t: "None", d: "No video ads for now." },
          { v: "once", t: "One day", p: "$2,400 one-time", d: "A single finished video ad." },
          { v: "quarterly", t: "Quarterly", p: "$800/mo", d: "One new ad every three months." },
          { v: "bimonthly", t: "Every 2 months", p: "$1,200/mo", d: "One new ad every two months." },
          { v: "monthly", t: "Monthly", p: "$2,400/mo", d: "One new ad every month." }
        ], "Ad video frequency", "five") +
        sub("Photography") +
        cards("photo", [
          { v: "none", t: "None" },
          { v: "once", t: "One day", p: "$900 one-time", d: "$600 on a shoot day." },
          { v: "quarterly", t: "Quarterly", p: "$300/mo", d: "$200/mo paired with shoot days." },
          { v: "bimonthly", t: "Every 2 months", p: "$450/mo", d: "$300/mo paired with shoot days." },
          { v: "monthly", t: "Monthly", p: "$900/mo", d: "$600/mo paired with shoot days." }
        ], "Photography", "five") +
        '<div class="bx-note" data-if="photoPaired"><b>Paired days:</b> a photography day booked on the same day as a social media shoot day or ad video day is $600 instead of $900. Applied automatically.</div>' +
        '<div class="bx-note" data-if="photoCouldPair">Tip: book social media shoot days or ad video days, and photography on those days drops from $900 to $600.</div>' +
        '<div class="bx-break" role="separator"><span>One-time productions</span></div>' +
        sub("Premium video") +
        row("Brand story video", "Your story, told properly: who you are, why you do it, and why it matters to your customers. From $3,500.", sw("brandVideo", "Brand story video")) +
        row("Other video productions", "Testimonials, case studies, sales &amp; promo videos, automation videos and explainer videos. From $2,950 each.", stepper("otherVideos", "video productions", 0, 10)) +
        sub("TV commercials") +
        row("TV commercials", "Broadcast-ready spots, from concept and script through to final delivery. From $4,500 each.", stepper("tvSpots", "TV commercials", 0, 6)) +
        '<div class="bx-note">Productions are scoped to your idea, so these are starting prices. We confirm the final number once we know the concept.</div>';
    },
    ads: function () {
      return sub("Ad management") +
        row("Google Ads", "Search, Display, Performance Max and YouTube.", sw("adsGoogle", "Google Ads management"), { hint: "adsG" }) +
        row("Social ads", "Meta (Facebook & Instagram), TikTok and LinkedIn.", sw("adsSocial", "Social ads management"), { hint: "adsS" }) +
        row("ChatGPT ads", "Sponsored placements inside ChatGPT, in front of people asking about what you offer.", sw("adsChatGPT", "ChatGPT ads management"), { hint: "adsC" }) +
        '<div class="bx-note" data-if="adsOn">Included: <b>one graphic ad, sized and optimized for each platform you run on</b>, plus account setup, conversion tracking, analytics & reporting dashboard, ongoing optimization, and 2 ad creative refreshes a year.</div>' +
        row("Your monthly ad budget", "Paid directly to Google or Meta. Not part of our fee; it just helps us plan.",
          '<div style="display:grid;gap:4px;justify-items:end"><span class="bx-rangeval" id="bx-adSpend-out"></span><input class="bx-range" type="range" id="bx-adSpend" min="300" max="20000" step="100" aria-label="Monthly ad budget"></div>', { iff: "adsOn" }) +
        sub("Extra ad creative (one-time)") +
        row("Static ads", "Extra graphic ads beyond the one included. $400 each, or $1,200 for a pack of 4.", stepper("staticAds", "static ads", 0, 16)) +
        '<div class="bx-note">Need video ads? Book <b>ad video days</b> under <b>Video &amp; photo</b>: $2,400 per day, one finished ad per day.</div>';
    },
    seo: function () {
      return sub("Search engine optimization") +
        cards("seo", [
          { v: "none", t: "None" },
          { v: "basic", t: "Basic", p: "$500/mo", d: "On-page, technical & keyword optimization." },
          { v: "advanced", t: "Advanced", p: "$1,250/mo", d: "Full program: speed, schema, competitor research, content & local." },
          { v: "premium", t: "Premium", p: "$2,750/mo", d: "Everything in Advanced, plus 6+ blog posts a month from an automated content engine that publishes search-optimized blogs, proprietary ranking tools, and continuous research and competitor analysis. Rankings that keep compounding." }
        ], "SEO level") +
        '<div class="bx-note" data-if="seoPremium"><b>Premium includes 6+ blog posts a month.</b> We\'ve added them under <b>Blogs &amp; email</b>, where you can also add a newsletter.</div>' +
        '<div class="bx-note" data-if="seoTier">Every SEO plan includes a <b>monthly SEO report</b>: rankings, search traffic and what we\'re working on next.</div>' +
        sub("Google Business Profile") +
        row("Google Business Profile management", "Keep your listing current, post updates, respond to reviews and improve how you show up in local search and Maps.", sw("gbp", "Google Business Profile management"), { hint: "gbp" });
    },
    web: function () {
      return sub("Website project (one-time)") +
        cards("webProject", [
          { v: "none", t: "No project", d: "Hosting and care only." },
          { v: "refresh", t: "Refresh", p: "from $1,000", d: "New layout, copy and on-page SEO for your current site." },
          { v: "build", t: "Your vision", p: "from $2,000", d: "You know the look and feel you\'re after, whether that\'s a brand guide, sites you admire or a sketch on a napkin. We design and build it to your direction." },
          { v: "creative", t: "Our creative direction", p: "from $3,500", d: "You\'d rather hand us the brief. We shape the look, layout and messaging, show you concepts, then build the one you choose." },
          { v: "ecom", t: "eCommerce", p: "from $5,000", d: "Fully custom online store. Up to 25 products, payments, shipping & tax setup." }
        ], "Website project", "five") +
        '<div class="bx-note" data-if="webAny">Every site we build is <b>fully custom-built</b>, with no templates or page builders. New sites include SEO setup, analytics and up to 8 pages. Add the features you need below.</div>' +
        row("Pages to refresh", "$1,000 covers the first page, then $100 per page.", stepper("refreshPages", "pages", 1, 40), { iff: "webRefresh" }) +
        row("Pages", "Up to 8 pages included, then $200 per page.", stepper("buildPages", "pages", 1, 40), { iff: "webBuild" }) +
        row("More products", "Blocks of 25 extra products, $500 per block.", stepper("extraProducts", "product blocks", 0, 20, "×25"), { iff: "webEcom", hint: "products" }) +
        sub("Add features (one-time)", "webAny") +
        row("Booking or scheduling", "Clients book appointments or classes right on your site. $1,000.", sw("addBooking", "Booking or scheduling system"), { iff: "webAny" }) +
        row("Member login or client portal", "Private pages, accounts and gated content. $1,500.", sw("addPortal", "Member login or client portal"), { iff: "webAny" }) +
        row("Learning platform", "Sell and host courses with lessons and progress tracking. $2,500.", sw("addLms", "Learning platform"), { iff: "webAny" }) +
        row("Custom animations & interactions", "Scroll effects, interactive elements, motion that makes the site feel alive. $800.", sw("addMotion", "Custom animations and interactions"), { iff: "webAny" }) +
        row("API integrations", "Connect your CRM, email platform, inventory or other tools. $800 each.", stepper("apiCount", "API integrations", 0, 10), { iff: "webAny" }) +
        sub("Hosting") +
        cards("hosting", [
          { v: "none", t: "None" },
          { v: "domain", t: "Hosting only", p: "$300/yr", d: "Fast, secure hosting. Any changes are billed hourly: $75/hr, or $100/hr for anything that needs code." },
          { v: "advanced", t: "Hosting & care", p: "$150/mo", d: "Unlimited fixes and content changes, plus backups and security. Structural changes are quoted separately." },
          { v: "email", t: "Hosting, care & email", p: "$300/mo", d: "Everything in Hosting & care, plus email on your domain: setup, support and help whenever you need it." }
        ], "Hosting");
    },
    strategy: function () {
      return sub("Strategy sessions") +
        cards("strategy", [
          { v: "none", t: "None" },
          { v: "quarterly", t: "Quarterly sessions", p: "$250/mo", d: "A planning session every three months to review results and set direction ($750/quarter)." },
          { v: "monthly", t: "Monthly sessions", p: "$400/mo", d: "A planning session every month to review results and adjust the plan." }
        ], "Strategy sessions") +
        row("Check-in meetings", "Quick calls on day-to-day work and upcoming content, separate from strategy sessions. One a month is included; more often is $150 per extra check-in.", seg("checkin", [["monthly", "Monthly"], ["biweekly", "Every 2 weeks"], ["weekly", "Weekly"]], "Check-in frequency"), { stack: true }) +
        row("Design or consulting hours", "One-off design or advice outside your plan. $75/hr.", stepper("consultHours", "consulting hours", 0, 20)) +
        sub("Branding (one-time)") +
        row("Logo design", "A custom logo designed for your business, with 2 rounds of revisions. $500.", sw("logo", "Logo design")) +
        row("Brand kit", "Choose the level of brand support you need.", cards("brandKit", [
          { v: "none", t: "None" },
          { v: "basic", t: "Brand kit", p: "$500", d: "Your colour palette, fonts and core visual elements, organized and ready to use. Logo sold separately." },
          { v: "premium", t: "Brand kit + guidelines", p: "$2,500", d: "Everything in the brand kit, plus a complete brand guide showing how to use it: pairings, spacing, do\'s and don\'ts, and examples across web, social and print." }
        ], "Brand kit"), { stack: true });
    },
    audits: function () {
      return sub("Audits (one-time)") +
        row("Full brand audit", "A deep look at your positioning, audience and messaging, and how consistently your brand shows up across your website, social and ads. Includes a 90-minute strategy session and a report you keep. $1,500, plus a $1,000 credit toward monthly services if you sign on within six months.", sw("fullAudit", "Full brand audit")) +
        row("Digital marketing audit", "How your current ads are performing, whether conversion tracking is set up correctly, and whether your ad spend is working as hard as it should. $750.", sw("digitalAudit", "Digital marketing audit")) +
        row("Website audit", "Does your site feel clean, modern and trustworthy? We look at your design, layout and user experience to see whether it grabs attention and keeps visitors around, then give you a prioritized list of fixes. $500.", sw("webAudit", "Website audit")) +
        row("SEO audit", "Site health, on-page, keyword visibility and technical flags. $1,200.", sw("seoAudit", "SEO audit"));
    }
  };

  var IF = {
    noPosts: function () { return S.graphics + S.carousels + S.reels === 0; },
    hasPosts: function () { return S.graphics + S.carousels + S.reels > 0; },
    reelsOn: function () { return S.reels > 0; },
    reelFilm: function () { return S.reels > 0 && S.reelMode === "film"; },
    noContent: function () { return !premiumSeoOn() && !S.blogs && !S.newsletters; },
    noSeoBlogs: function () { return !premiumSeoOn(); },
    blogAndNews: function () { return !premiumSeoOn() && S.blogs > 0 && S.newsletters > 0; },
    seoTier: function () { return S.seo !== "none"; },
    reelsElsewhere: function () { return !(S.cats.social && S.reels > 0 && S.reelMode === "film"); },
    vdaysTotal: function () { return videoShootsYr() > 0; },
    photoPaired: function () { return S.photo !== "none" && videoShootsYr() > 0; },
    photoCouldPair: function () { return S.photo !== "none" && videoShootsYr() === 0; },
    adsOn: function () { return S.adsGoogle || S.adsSocial || S.adsChatGPT; },
    webRefresh: function () { return S.webProject === "refresh"; },
    webBuild: function () { return S.webProject === "build" || S.webProject === "creative"; },
    webEcom: function () { return S.webProject === "ecom"; },
    webAny: function () { return S.webProject !== "none"; },
    seoPremium: function () { return premiumSeoOn(); }
  };

  /* ---------- build DOM ---------- */
  var tilesEl = document.getElementById("bx-tiles");
  var panelsEl = document.getElementById("bx-panels");
  var check = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6.5 4.8 9 10 3" fill="none" stroke="#16161a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  tilesEl.innerHTML = CATS.map(function (c) {
    return '<button type="button" class="bx-tile" id="bx-tile-' + c.id + '" data-cat="' + c.id + '" aria-pressed="false" aria-controls="bx-panel-' + c.id + '">' +
      '<span class="t-check">' + check + '</span><span class="t-name">' + c.name + '</span><span class="t-desc">' + c.desc + '</span><span class="t-from">' + c.from + '</span></button>';
  }).join("");
  panelsEl.innerHTML = CATS.map(function (c) {
    return '<section class="bx-panel" id="bx-panel-' + c.id + '" data-panel="' + c.id + '" hidden aria-labelledby="bx-ph-' + c.id + '">' +
      '<div class="bx-phead ' + c.g + '"><h3 id="bx-ph-' + c.id + '">' + c.name + '</h3><span class="p-amt" id="bx-pamt-' + c.id + '"></span></div>' +
      '<div class="bx-pbody">' + PANELS[c.id]() + '</div></section>';
  }).join("");

  /* ---------- sync UI from state ---------- */
  var shownTotal = 0, rafId = null;
  function tweenTotal(to) {
    var el = document.getElementById("bx-total"), mb = document.getElementById("bx-mb-total");
    var from = shownTotal; shownTotal = to;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rafId) cancelAnimationFrame(rafId);
    if (reduce || from === to) { el.textContent = money(to); mb.textContent = money(to); return; }
    var t0 = null, dur = 420;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      var v = from + (to - from) * e;
      el.textContent = money(v); mb.textContent = money(v);
      if (k < 1) rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
  }

  function sync() {
    fixShoot();
    var R = compute();

    CATS.forEach(function (c) {
      var on = S.cats[c.id];
      document.getElementById("bx-tile-" + c.id).setAttribute("aria-pressed", on ? "true" : "false");
      document.getElementById("bx-panel-" + c.id).hidden = !on;
    });
    document.getElementById("bx-empty").hidden = CATS.some(function (c) { return S.cats[c.id]; });

    root.querySelectorAll("[data-stp]").forEach(function (el) {
      var k = el.getAttribute("data-stp"), v = S[k];
      el.querySelector("output").textContent = v;
      el.querySelector('[data-d="-1"]').disabled = v <= +el.getAttribute("data-min");
      el.querySelector('[data-d="1"]').disabled = v >= +el.getAttribute("data-max");
    });
    root.querySelectorAll("[data-seg]").forEach(function (el) {
      var k = el.getAttribute("data-seg");
      el.querySelectorAll("[data-v]").forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-v") === S[k] ? "true" : "false"); });
    });
    // only show shoot schedules that can cover the reel count (12 reels per shoot day)
    document.querySelectorAll('[data-seg="reelShoot"] [data-v]').forEach(function (b) { b.hidden = !shootFits(b.getAttribute("data-v"), S.reels); });
    root.querySelectorAll("[data-sw]").forEach(function (b) { b.setAttribute("aria-checked", S[b.getAttribute("data-sw")] ? "true" : "false"); });
    root.querySelectorAll("[data-chips]").forEach(function (el) {
      var k = el.getAttribute("data-chips");
      el.querySelectorAll("[data-v]").forEach(function (b) { b.setAttribute("aria-pressed", S[k].indexOf(b.getAttribute("data-v")) > -1 ? "true" : "false"); });
    });
    root.querySelectorAll("[data-if]").forEach(function (el) { el.hidden = !IF[el.getAttribute("data-if")](); });


    // hints
    var nAds = (S.adsGoogle ? 1 : 0) + (S.adsSocial ? 1 : 0) + (S.adsChatGPT ? 1 : 0);
    var adHint = nAds === 3 ? "All three platforms: $850/mo total" :
                 nAds === 2 ? "Two platforms: $750/mo total · add the third for $850" :
                 "$650/mo for one platform · $750 for any two · $850 for all three";
    var hints = {
      adsG: adHint, adsS: adHint, adsC: adHint,
      gbp: S.seo !== "none" ? "$250/mo with your SEO plan (normally $300)" : "$300/mo on its own · $250/mo with any SEO plan",
      shoot: S.reels ? (function () {
        var min = SHOOT_ORDER.filter(function (f) { return shootFits(f, S.reels); })[0];
        var cap = shootsPerYear(S.reelShoot) * P.reelsPerShoot / 12, room = cap - S.reels;
        return plural(S.reels, "reel") + " a month needs a shoot day at least " + SHOOT_LABEL[min] + ". " +
          (room > 0 ? "Your " + SHOOT_LABEL[S.reelShoot] + " shoot days cover up to " + cap + " a month, so you can add " + plural(room, "more reel") + " at no extra cost."
                    : "Your " + SHOOT_LABEL[S.reelShoot] + " shoot days are fully used.");
      })() : "",
      reelRoom: (S.reelMode === "film" && S.reels) ? (function () {
        var room = shootsPerYear(S.reelShoot) * P.reelsPerShoot / 12 - S.reels;
        return room > 0 ? "Your shoot days have room for " + plural(room, "more reel") + " a month at no extra cost." : "";
      })() : "",
      products: 25 + S.extraProducts * 25 + " products total",
      _: ""
    };
    root.querySelectorAll("[data-hint]").forEach(function (el) { el.textContent = hints[el.getAttribute("data-hint")] || ""; });

    var spend = document.getElementById("bx-adSpend");
    spend.value = S.adSpend; document.getElementById("bx-adSpend-out").textContent = money(S.adSpend) + "/mo";

    // panel header amounts
    var byCat = {};
    R.monthly.forEach(function (g) { byCat[g.cat] = (byCat[g.cat] || { m: 0, o: 0 }); byCat[g.cat].m += g.total; });
    R.once.forEach(function (g) {
      var map = { "Ad creative": "Paid ads", "Brand": "Strategy & brand" };
      var k = map[g.cat] || g.cat; byCat[k] = (byCat[k] || { m: 0, o: 0 }); byCat[k].o += g.total;
    });
    CATS.forEach(function (c) {
      var b = byCat[c.name], parts = [];
      if (b && b.m) parts.push(money(b.m) + "<small>/mo</small>");
      if (b && b.o) parts.push(money(b.o) + "<small> once</small>");
      document.getElementById("bx-pamt-" + c.id).innerHTML = parts.join(" + ");
    });

    var rd = (S.cats.social && S.reels && S.reelMode === "film") ? shootsPerYear(S.reelShoot) : 0;
    var pOnce = S.cats.video && S.premium === "once";
    var pd = S.cats.video && !pOnce ? shootsPerYear(S.premium) : 0;
    var vd = document.getElementById("bx-vdays");
    var parts = [rd ? "<b>" + plural(rd, "social media shoot day") + "</b> a year" : "", pd ? "<b>" + plural(pd, "ad video day") + "</b> a year" : "", pOnce ? "<b>one ad video day</b>" : ""].filter(Boolean);
    if (parts.length) vd.innerHTML = "Your plan books " + parts.join(" and ") + ".";
    document.getElementById("bx-reelcount-txt").textContent = plural(S.reels, "reel") + " a month";



    renderCalendar();
    renderSummary(R);
  }

  function renderCalendar() {
    var grid = document.getElementById("bx-calgrid"); if (!grid) return;
    var list = [];
    [["graphic", S.graphics], ["carousel", S.carousels], ["reel", S.reels]].forEach(function (t) {
      for (var j = 0; j < t[1]; j++) list.push({ type: t[0], pos: (j + 0.5) / t[1] + (t[0] === "carousel" ? 0.013 : t[0] === "reel" ? 0.026 : 0) });
    });
    list.sort(function (a, b) { return a.pos - b.pos; });
    var days = []; for (var d = 0; d < 28; d++) days.push([]);
    var T = list.length;
    list.forEach(function (p, i) {
      var day = Math.min(27, Math.floor((i + 0.5) * 28 / Math.max(T, 1)));
      // keep posts off weekends when there's room
      if (T <= 20) { var dow = day % 7; if (dow === 5) day -= 1; if (dow === 6) day = Math.min(27, day + 1); }
      days[day].push(p.type);
    });
    grid.innerHTML = days.map(function (arr) {
      return '<div class="d' + (arr.length ? ' has' : '') + '">' + arr.slice(0, 3).map(function (t) { return '<i class="dot ' + t + '"></i>'; }).join("") + '</div>';
    }).join("");
    var perWeek = T / 4.33;
    document.getElementById("bx-cadence").textContent = T ? "≈ " + (perWeek < 1 ? perWeek.toFixed(1) : Math.round(perWeek * 10) / 10) + " posts / week" : "";
  }

  function lines(groups, title, suffix) {
    if (!groups.length) return "";
    return "<h4>" + title + "</h4>" + groups.map(function (g) {
      return '<div class="bx-grp"><div class="bx-l cat"><span>' + g.cat + '</span><span>' + money(g.total) + suffix + '</span></div>' +
        (g.hideItems ? [] : g.items).map(function (it) {
          return '<div class="bx-l item' + (it.amt < 0 ? ' minus' : '') + '"><span>' + it.label + '</span><span>' + (it.amt === 0 ? "Included" : money(it.amt)) + '</span></div>';
        }).join("") + '</div>';
    }).join("");
  }

  function renderSummary(R) {
    tweenTotal(R.total);
    var onceEl = document.getElementById("bx-once");
    onceEl.textContent = R.onceTotal ? "+ " + money(R.onceTotal) + " one-time" : "";
    var save = document.getElementById("bx-save");
    save.hidden = !R.save;
    save.textContent = "You save " + money(R.save) + "/mo by bundling";
    document.getElementById("bx-mb-once").textContent = money(R.onceTotal);
    var mbNotes = [];
    if (R.save) mbNotes.push("Saving " + money(R.save) + "/mo");
    if (R.credit) mbNotes.push("Includes a " + money(R.credit) + " audit credit");
    document.getElementById("bx-mb-save").textContent = mbNotes.join(" · ");

    // meter
    var th = [2, 3, 5, 7];
    document.getElementById("bx-m-count").textContent = plural(R.count, "service") + (R.pct ? " · " + Math.round(R.pct * 100) + "% off" : "");
    var segs = document.querySelectorAll("#bx-meter .m-seg i"), labs = document.querySelectorAll("#bx-meter .m-labels span");
    th.forEach(function (t, i) {
      var lo = i === 0 ? 0 : th[i - 1];
      var f = Math.max(0, Math.min(1, (R.count - lo) / (t - lo)));
      segs[i].style.transform = "scaleX(" + f + ")";
      labs[i].className = R.count >= t ? "on" : "";
    });
    var next = null; for (var i = 0; i < th.length; i++) if (R.count < th[i]) { next = i; break; }
    var pcts = [5, 10, 15, 20];
    document.getElementById("bx-m-next").textContent = next === null ? "Top bundle discount unlocked" :
      "Add " + plural(th[next] - R.count, "more service") + " for " + pcts[next] + "% off";

    var m = document.getElementById("bx-monthly");
    if (R.monthly.length) {
      var html = lines(R.monthly, "Monthly", "");
      if (R.discount) {
        html += '<div class="bx-l minus" style="font-size:13px;padding-top:6px"><span>Bundle discount (' + Math.round(R.pct * 100) + '%, ' + plural(R.count, "service") + ')</span><span>' + money(-R.discount) + '</span></div>';
      }
      html += '<div class="bx-l tot"><span>Monthly total</span><span>' + money(R.total) + '</span></div>';
      if (R.credit) {
        html += '<div class="bx-l minus" style="font-size:13px;padding-top:6px"><span>Audit credit toward your monthly services</span><span>' + money(-R.credit) + '</span></div>';
      }
      m.innerHTML = html;
    } else {
      m.innerHTML = '<h4>Monthly</h4><div class="bx-none">No monthly services yet.</div>';
    }
    var o = document.getElementById("bx-onetime");
    o.innerHTML = R.once.length ? lines(R.once, "One-time", "") + '<div class="bx-l tot"><span>One-time total</span><span>' + money(R.onceTotal) + '</span></div>' : "";

    var cr = document.getElementById("bx-credit");
    cr.hidden = !R.auditPicked;
    if (R.credit) {
      var firstMonth = R.total - R.credit;
      cr.textContent = "Your audit earns a " + money(R.credit) + " credit toward monthly services when you sign on within six months. " +
        (firstMonth >= 0 ? "First month after credit: " + money(firstMonth) + "."
                         : "It covers your first month, and the remaining " + money(-firstMonth) + " applies to month two.");
    } else {
      cr.textContent = "Add any monthly service to unlock a $1,000 credit from your audit.";
    }

    var q = document.getElementById("bx-quoted");
    q.hidden = !R.quoted.length;
    q.innerHTML = "<b>Quoted after a quick call</b><ul>" + R.quoted.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
  }

  /* ---------- events ---------- */
  function markEdited() {
    if (isExample) { isExample = false; document.getElementById("bx-exampletag").hidden = true; }
  }
  function setReelMode(mode) {
    S.reelMode = mode;
    if (mode === "film" && !S.cats.video) { S.cats.video = true; S.videoAuto = true; }   // filming needs shoot days
    if (mode === "edit" && (S.videoAuto || (S.premium === "none" && S.photo === "none"))) S.cats.video = false;
    if (mode === "edit") S.videoAuto = false;
  }
  function reelError() {
    var el = document.getElementById("bx-reel-err");
    el.innerHTML = "<b>Filming starts at " + P.reelFilmMin + " reels a month.</b> We film reels in batches on social media shoot days, so we need at least " +
      P.reelFilmMin + " a month to make a shoot day worth it. " + (S.reelMode === "film" ? "For fewer reels, switch to <b>You film, we edit</b>." : "Add more reels, or send us your own footage with <b>You film, we edit</b>.");
    el.hidden = false;
  }
  function clearReelError() { document.getElementById("bx-reel-err").hidden = true; }
  root.addEventListener("click", function (e) {
    var t = e.target.closest("button"); if (!t || !root.contains(t)) return;

    var tile = t.closest("[data-cat]");
    if (tile) {
      var id = tile.getAttribute("data-cat");
      S.cats[id] = !S.cats[id];
      // sensible defaults the first time a category is switched on
      if (S.cats[id]) {
        if (id === "social" && S.graphics + S.carousels + S.reels === 0) S.graphics = 4;
        if (id === "content" && !S.blogs && !S.newsletters) S.blogs = 1;
        if (id === "ads" && !IF.adsOn()) S.adsGoogle = true;
        if (id === "seo" && S.seo === "none") S.seo = "basic";
        if (id === "web" && S.webProject === "none" && S.hosting === "none") { S.webProject = "build"; S.hosting = "advanced"; }
        if (id === "strategy" && S.strategy === "none" && !S.logo && S.brandKit === "none") S.strategy = "quarterly";
        if (id === "audits" && !S.fullAudit && !S.digitalAudit && !S.webAudit && !S.seoAudit) S.fullAudit = true;
      }
      if (id === "video") S.videoAuto = false;
      if (id === "content") S.contentAuto = false;
      if (id === "video" && !S.cats.video && S.reelMode === "film") S.reelMode = "edit";
      if (id === "social" && !S.cats.social && S.reelMode === "film") setReelMode("edit");
      markEdited(); sync();
      return;
    }
    var stp = t.closest("[data-stp]");
    if (stp && t.hasAttribute("data-d")) {
      var k = stp.getAttribute("data-stp"), next = S[k] + (+t.getAttribute("data-d"));
      if (k === "reels" && S.reelMode === "film" && next < P.reelFilmMin && next > 0) { reelError(); return; }
      var postKeys = { graphics: 1, carousels: 1, reels: 1 };
      if (postKeys[k] && next < S[k] && S.graphics + S.carousels + S.reels - 1 < P.socialBasePosts) {
        document.getElementById("bx-post-err").hidden = false; return;
      }
      document.getElementById("bx-post-err").hidden = true;
      S[k] = Math.max(+stp.getAttribute("data-min"), Math.min(+stp.getAttribute("data-max"), next));
      if (k === "reels") S.reelShoot = cheapestShoot(S.reels);   // price follows the reel count up AND down
      if (k === "reels" && S.reels === 0 && S.reelMode === "film") setReelMode("edit");
      clearReelError(); markEdited(); sync(); return;
    }
    var sg = t.closest("[data-seg]");
    if (sg && t.hasAttribute("data-v")) {
      var key = sg.getAttribute("data-seg"), val = t.getAttribute("data-v");
      if (key === "reelMode") {
        if (val === "film" && S.reels < P.reelFilmMin) { reelError(); return; }
        clearReelError(); setReelMode(val);
        if (val === "film") S.reelShoot = cheapestShoot(S.reels);
      } else if (key === "seo") {
        var wasPremium = S.seo === "premium"; S.seo = val;
        if (val === "premium" && !wasPremium) {
          if (!S.cats.content) { S.cats.content = true; S.contentAuto = true; S.blogs = 0; S.newsletters = 0; }
        }
        if (val !== "premium" && wasPremium && S.contentAuto) {
          S.contentAuto = false;
          if (!S.blogs && !S.newsletters) S.cats.content = false;
        }
      } else S[key] = val;
      markEdited(); sync(); return;
    }
    if (t.hasAttribute("data-sw")) {
      var sk = t.getAttribute("data-sw"); S[sk] = !S[sk];
      markEdited(); sync(); return;
    }
    var ch = t.closest("[data-chips]");
    if (ch && t.hasAttribute("data-v")) {
      var ck = ch.getAttribute("data-chips"), v = t.getAttribute("data-v"), arr = S[ck], ix = arr.indexOf(v);
      if (ix > -1) { if (arr.length > 1) arr.splice(ix, 1); } else arr.push(v);
      markEdited(); sync(); return;
    }
  });
  document.getElementById("bx-adSpend").addEventListener("input", function (e) { S.adSpend = +e.target.value; markEdited(); sync(); });

  document.getElementById("bx-reset").addEventListener("click", function () {
    S = blank(); isExample = false;
    document.getElementById("bx-exampletag").hidden = true;
    document.getElementById("bx-reset").hidden = true;
    document.getElementById("bx-example").hidden = false;
    sync();
  });
  document.getElementById("bx-example").addEventListener("click", function () {
    S = example(); isExample = true;
    document.getElementById("bx-exampletag").hidden = false;
    document.getElementById("bx-reset").hidden = false;
    document.getElementById("bx-example").hidden = true;
    sync();
  });
  document.getElementById("bx-mb-go").addEventListener("click", function () {
    opts.scrollTo(document.getElementById("bx-sum"));
  });

  function planText() {
    var R = compute(), out = ["BLXCK Marketing: plan estimate", ""];
    if (R.monthly.length) {
      out.push("MONTHLY");
      R.monthly.forEach(function (g) {
        out.push(g.cat + ": " + money(g.total) + "/mo");
        g.items.forEach(function (it) { out.push("  - " + it.label + ": " + (it.amt === 0 ? "included" : money(it.amt))); });
      });
      if (R.discount) out.push("Bundle discount (" + Math.round(R.pct * 100) + "%, " + plural(R.count, "service") + "): " + money(-R.discount));
      out.push("Monthly total: " + money(R.total) + "/mo", "");
    }
    if (R.once.length) {
      out.push("ONE-TIME");
      R.once.forEach(function (g) { g.items.forEach(function (it) { out.push("  - " + it.label + ": " + money(it.amt)); }); });
      out.push("One-time total: " + money(R.onceTotal), "");
    }
    if (R.credit) out.push("Audit credit toward monthly services: " + money(-R.credit) + " (sign on within six months)");
    if (R.quoted.length) out.push("Quoted separately: " + R.quoted.join("; "));
    if (S.cats.social && S.graphics + S.carousels + S.reels) out.push("Platforms: " + platformNames().join(", "));
    if (S.cats.ads && IF.adsOn()) out.push("Planned ad budget (paid to platforms): " + money(S.adSpend) + "/mo");
    out.push("", "Prices in CAD, before tax.");
    return out.join("\n");
  }
  var form = document.getElementById("bx-form"), cta = document.getElementById("bx-cta"), doneEl = document.getElementById("bx-done");
  document.getElementById("bx-done-back").addEventListener("click", function () { doneEl.hidden = true; form.hidden = false; });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = document.getElementById("bx-f-err");
    var name = document.getElementById("bx-f-name").value.trim(), email = document.getElementById("bx-f-email").value.trim();
    if (!name) { err.textContent = "Add your name so we know who to reply to."; err.hidden = false; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = "Enter a valid email address, like you@business.ca."; err.hidden = false; return; }
    err.hidden = true;
    var business = document.getElementById("bx-f-biz").value.trim();
    var message = document.getElementById("bx-f-msg").value.trim();
    var trap = document.getElementById("bx-f-web").value.trim();
    var plan = planText();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = "Sending…";
    function done(sent) {
      btn.disabled = false; btn.textContent = "Send my quote";
      var title = document.getElementById("bx-done-title"), msg = document.getElementById("bx-done-msg"), mail = document.getElementById("bx-done-mail");
      if (sent) {
        title.textContent = "Quote sent";
        msg.textContent = "Thanks, " + name.split(" ")[0] + ". The BLXCK team has your plan and will reply to " + email + " within one business day.";
        mail.hidden = true;
      } else {
        title.textContent = "Almost there";
        msg.textContent = "We couldn't send it automatically. Email it to us instead and we'll reply within one business day. Your plan is already filled in.";
        var subj = "Plan estimate" + (business ? " — " + business : " — " + name);
        var bodyTxt = "Name: " + name + "\nEmail: " + email + (business ? "\nBusiness: " + business : "") + (message ? "\n\n" + message : "") + "\n\n" + plan;
        mail.href = "mailto:" + opts.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(bodyTxt);
        mail.hidden = false;
      }
      form.hidden = true; doneEl.hidden = false;
    }
    fetch(opts.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, business: business, message: message, plan: plan, website: trap })
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { done(r.ok && d.ok); }); })
      .catch(function () { done(false); });
  });

  sync();
}
