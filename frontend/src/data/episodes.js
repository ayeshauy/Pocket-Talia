const IMGS = {
  hero: "https://images.unsplash.com/photo-1574712255236-ce5bf8395083?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxmaWxtbWFrZXIlMjBjYW1lcmElMjBwcm9kdWN0aW9uJTIwc3RhcnR1cCUyMGZvdW5kZXJ8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85",
  director: "https://images.unsplash.com/photo-1587050265310-1a2d98ccce5f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxmaWxtbWFrZXIlMjBjYW1lcmElMjBwcm9kdWN0aW9uJTIwc3RhcnR1cCUyMGZvdW5kZXJ8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85",
  studio: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwaW50ZXJ2aWV3JTIwc3R1ZGlvJTIwbmVvbiUyMGxpZ2h0c3xlbnwwfHx8fDE3OTE3ODI5Njh8MA&ixlib=rb-4.1.0&q=85",
  rig: "https://images.unsplash.com/photo-1574304904744-2e6919c5a2a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxmaWxtbWFrZXIlMjBjYW1lcmElMjBwcm9kdWN0aW9uJTIwc3RhcnR1cCUyMGZvdW5kZXJ8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85",
  console: "https://images.unsplash.com/photo-1615458318132-1f151a3d18f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxwb2RjYXN0JTIwaW50ZXJ2aWV3JTIwc3R1ZGlvJTIwbmVvbiUyMGxpZ2h0c3xlbnwwfHx8fDE3OTE3ODI5Njh8MA&ixlib=rb-4.1.0&q=85",
  docu: "https://images.unsplash.com/photo-1627757881009-5ab1b99f1f47?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjBmaWxtJTIwc2V0JTIwY2FtZXJhJTIwZGlyZWN0b3J8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85",
};

const PLATFORM_COLORS = { YouTube: "#D35400", TikTok: "#8B0032", Instagram: "#C48B9F", LinkedIn: "#4A6B5D" };

const platforms = (yt, tt, ig, li) => [
  { name: "YouTube", value: yt, color: PLATFORM_COLORS.YouTube },
  { name: "TikTok", value: tt, color: PLATFORM_COLORS.TikTok },
  { name: "Instagram", value: ig, color: PLATFORM_COLORS.Instagram },
  { name: "LinkedIn", value: li, color: PLATFORM_COLORS.LinkedIn },
];

const gsc = (pre, spike) => {
  const labels = ["D-4", "D-3", "D-2", "D-1", "D-0", "D+1", "D+2", "D+3", "D+4", "D+5"];
  return labels.map((d, i) => ({
    d,
    branded: i < 4 ? pre[i] : i === 4 ? spike : Math.round(spike * Math.pow(0.72, i - 4) + pre[3] * 0.28),
    baseline: Math.round(pre[0] + i * ((pre[3] - pre[0]) / 9) * 0.6 + 18),
  }));
};

export const EPISODES = [
  {
    slug: "zero-to-pre-seed",
    number: "01",
    short: "Ep 1 · Zero to Pre-Seed",
    title: "Zero to Pre-Seed",
    act: "Act I — The Spark",
    released: "Mar 3, 2026",
    duration: "22:14",
    img: IMGS.hero,
    synopsis:
      "The cold open of the season: a founder, a whiteboard of dead ideas, and ninety days of runway. We follow Northwind Labs from a borrowed desk to their first term sheet — filmed as it happened, not reconstructed after.",
    kpis: { views: "2.1M", watch: "61%", hook: "86.4%", signups: "3,420" },
    retention: [100, 86, 77, 65, 57, 45, 37, 31],
    platforms: platforms(46, 24, 17, 13),
    gsc: gsc([420, 438, 462, 448], 1480),
    attribution: [
      { source: "YouTube Organic", sessions: "38,420", signups: "1,540", waitlist: "812", decks: "204" },
      { source: "TikTok Viral", sessions: "21,310", signups: "740", waitlist: "506", decks: "88" },
      { source: "LinkedIn Episodic", sessions: "12,940", signups: "690", waitlist: "341", decks: "176" },
      { source: "Meta Paid Retargeting", sessions: "9,870", signups: "450", waitlist: "233", decks: "61" },
    ],
    impact:
      "Branded search volume for 'Northwind Labs' tripled within 72 hours of release and held 40% above baseline for the rest of the month. The episode's cold-open hook was clipped into 6 shorts that drove 61% of total discover traffic.",
    quote: {
      text: "Episode one paid for the whole quarter of production in eleven days. Our waitlist went from a spreadsheet to a pipeline.",
      author: "Maya R. — CEO, Northwind Labs",
    },
  },
  {
    slug: "the-midnight-pivot",
    number: "02",
    short: "Ep 2 · The Midnight Pivot",
    title: "The Midnight Pivot",
    act: "Act I — The Spark",
    released: "Mar 17, 2026",
    duration: "24:47",
    img: IMGS.director,
    synopsis:
      "Two weeks before launch, the data says the product is wrong. This episode lives inside the 48-hour decision to kill the original roadmap — board calls at 1am, a war-room whiteboard, and the rebuild that followed.",
    kpis: { views: "2.8M", watch: "58%", hook: "83.9%", signups: "4,105" },
    retention: [100, 84, 74, 62, 54, 42, 34, 28],
    platforms: platforms(41, 27, 18, 14),
    gsc: gsc([510, 528, 556, 540], 1890),
    attribution: [
      { source: "YouTube Organic", sessions: "44,860", signups: "1,830", waitlist: "940", decks: "246" },
      { source: "TikTok Viral", sessions: "29,540", signups: "1,020", waitlist: "688", decks: "104" },
      { source: "LinkedIn Episodic", sessions: "15,220", signups: "785", waitlist: "402", decks: "211" },
      { source: "Meta Paid Retargeting", sessions: "11,430", signups: "470", waitlist: "258", decks: "73" },
    ],
    impact:
      "The pivot confessional clip became the season's most-shared short (812K shares). Investor-sourced pitch-deck downloads spiked 3.1x in the week after release, traced via UTM-tagged deck links in the episode description.",
    quote: {
      text: "We almost didn't release this one. It turned out to be the episode VCs quoted back to us in partner meetings.",
      author: "Daniel K. — Founder, Northwind Labs",
    },
  },
  {
    slug: "hiring-titans",
    number: "03",
    short: "Ep 3 · Hiring Titans",
    title: "Hiring Titans",
    act: "Act II — The Grind",
    released: "Apr 2, 2026",
    duration: "19:32",
    img: IMGS.studio,
    synopsis:
      "How a four-person team hired engineer #5 away from a FAANG offer — no signing bonus, just a mission and a camera rolling. A tactical breakdown of employer branding built in public.",
    kpis: { views: "1.9M", watch: "64%", hook: "87.1%", signups: "2,860" },
    retention: [100, 87, 79, 68, 60, 48, 39, 33],
    platforms: platforms(38, 21, 14, 27),
    gsc: gsc([560, 575, 602, 588], 1620),
    attribution: [
      { source: "YouTube Organic", sessions: "31,200", signups: "1,060", waitlist: "548", decks: "132" },
      { source: "LinkedIn Episodic", sessions: "22,680", signups: "940", waitlist: "471", decks: "238" },
      { source: "TikTok Viral", sessions: "16,940", signups: "520", waitlist: "356", decks: "52" },
      { source: "Meta Paid Retargeting", sessions: "8,120", signups: "340", waitlist: "189", decks: "44" },
    ],
    impact:
      "LinkedIn carried this episode: 27% of views and the highest deck-download rate of the season. Inbound engineering applications to the featured startup rose 4.2x over the following sprint — hiring as a conversion event.",
    quote: {
      text: "Three of our last five hires told us they applied because of this episode. That's a recruiting channel money can't normally buy.",
      author: "Priya S. — Head of Talent, Northwind Labs",
    },
  },
  {
    slug: "the-viral-engine",
    number: "04",
    short: "Ep 4 · The Viral Engine",
    title: "The Viral Engine",
    act: "Act II — The Grind",
    released: "Apr 21, 2026",
    duration: "26:08",
    img: IMGS.rig,
    synopsis:
      "The meta episode: how the show itself was engineered for distribution. Hook testing, 3-second retention math, thumbnail psychology, and the exact clipping system that turned one shoot day into forty assets.",
    kpis: { views: "4.6M", watch: "57%", hook: "88.6%", signups: "7,940" },
    retention: [100, 89, 80, 67, 58, 44, 35, 29],
    platforms: platforms(35, 33, 19, 13),
    gsc: gsc([640, 668, 695, 672], 2740),
    attribution: [
      { source: "TikTok Viral", sessions: "68,300", signups: "2,980", waitlist: "1,860", decks: "212" },
      { source: "YouTube Organic", sessions: "52,750", signups: "2,610", waitlist: "1,294", decks: "318" },
      { source: "Instagram Reels", sessions: "27,480", signups: "1,240", waitlist: "742", decks: "96" },
      { source: "LinkedIn Episodic", sessions: "18,960", signups: "1,110", waitlist: "566", decks: "284" },
    ],
    impact:
      "The season's breakout: 4.6M views and the single largest branded-search spike on record (+243% vs baseline at D+1). TikTok out-converted YouTube for the first time, driven by a 9-clip shorts barrage in the 48 hours post-release.",
    quote: {
      text: "Ep 4 is the one founders send each other. It quadrupled our inbound demo requests in a single week.",
      author: "Maya R. — CEO, Northwind Labs",
    },
  },
  {
    slug: "war-room-launch",
    number: "05",
    short: "Ep 5 · War Room Launch",
    title: "War Room Launch",
    act: "Act III — The Scale",
    released: "May 12, 2026",
    duration: "31:20",
    img: IMGS.console,
    synopsis:
      "Launch night, unfiltered. Live dashboards on the wall, a server fire at hour three, and the 3am deploy that saved the release. The longest episode of the season — and the most-watched start to finish.",
    kpis: { views: "3.4M", watch: "66%", hook: "85.2%", signups: "5,610" },
    retention: [100, 85, 78, 69, 62, 51, 42, 36],
    platforms: platforms(44, 22, 16, 18),
    gsc: gsc([720, 745, 778, 752], 2210),
    attribution: [
      { source: "YouTube Organic", sessions: "49,640", signups: "2,480", waitlist: "1,208", decks: "296" },
      { source: "TikTok Viral", sessions: "26,880", signups: "1,140", waitlist: "734", decks: "118" },
      { source: "LinkedIn Episodic", sessions: "19,420", signups: "1,260", waitlist: "612", decks: "244" },
      { source: "Meta Paid Retargeting", sessions: "13,150", signups: "730", waitlist: "392", decks: "92" },
    ],
    impact:
      "Highest completion rate of the season (66% average watch). Same-day conversions were the strongest of any episode — viewers who finished launched-night content converted to sign-ups at 2.2x the season average.",
    quote: {
      text: "People watched us almost lose the launch and trusted us more for it. Authenticity converted better than polish ever did.",
      author: "Daniel K. — Founder, Northwind Labs",
    },
  },
  {
    slug: "series-a-horizon",
    number: "06",
    short: "Ep 6 · Series A Horizon",
    title: "Series A Horizon",
    act: "Act III — The Scale",
    released: "Jun 2, 2026",
    duration: "28:45",
    img: IMGS.docu,
    synopsis:
      "The finale: term sheets, dilution math, and the partner meeting that decided the round. We close the loop from episode one's borrowed desk to a $14M Series A — with the full attribution story on screen.",
    kpis: { views: "5.2M", watch: "62%", hook: "87.8%", signups: "9,120" },
    retention: [100, 88, 79, 66, 57, 46, 38, 32],
    platforms: platforms(39, 28, 16, 17),
    gsc: gsc([860, 892, 934, 905], 3380),
    attribution: [
      { source: "YouTube Organic", sessions: "61,380", signups: "3,410", waitlist: "1,688", decks: "486" },
      { source: "TikTok Viral", sessions: "44,920", signups: "2,260", waitlist: "1,412", decks: "188" },
      { source: "LinkedIn Episodic", sessions: "26,540", signups: "2,130", waitlist: "986", decks: "512" },
      { source: "Meta Paid Retargeting", sessions: "17,230", signups: "1,320", waitlist: "668", decks: "146" },
    ],
    impact:
      "The finale drew the season's largest audience and its most valuable one: pitch-deck downloads hit 1,332 (2.8x season average) with 38% traced to LinkedIn — the investor segment the season was built to reach.",
    quote: {
      text: "Investors walked into our Series A meetings already knowing the story. The docuseries was the diligence deck before the deck.",
      author: "Maya R. — CEO, Northwind Labs",
    },
  },
];

export const ACT_STRUCTURE = [
  { act: "Act I — The Spark", slugs: ["zero-to-pre-seed", "the-midnight-pivot"] },
  { act: "Act II — The Grind", slugs: ["hiring-titans", "the-viral-engine"] },
  { act: "Act III — The Scale", slugs: ["war-room-launch", "series-a-horizon"] },
];
