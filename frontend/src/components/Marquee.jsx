const ITEMS = [
  "EPISODIC DOCUSERIES 'HOW TO STARTUP'",
  "AI SCRIPT BREAKDOWN ENGINE",
  "META & TIKTOK VIRAL GROWTH",
  "ON-CAMERA FOUNDER COACHING",
  "AUTOMATED CALL SHEETS & BUDGETS",
  "4K ANAMORPHIC CINEMATOGRAPHY",
  "CLIENT REVIEW WORKSPACE WITH TIMECODE APPROVALS",
];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {ITEMS.map((item, i) => (
      <div key={i} className="flex items-center">
        <span className="font-syne font-semibold text-sm sm:text-base tracking-[0.12em] text-ash/35 px-8 whitespace-nowrap">
          {item}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-rust/70 shadow-[0_0_8px_rgba(211,84,0,0.8)]" />
      </div>
    ))}
  </div>
);

const Marquee = () => (
  <div data-testid="editorial-marquee" className="relative border-y border-white/[0.06] bg-oxide-900/40 py-5 overflow-hidden">
    <div className="marquee-track">
      <Row />
      <Row />
    </div>
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-oxide-950 to-transparent pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-oxide-950 to-transparent pointer-events-none" />
  </div>
);

export default Marquee;
