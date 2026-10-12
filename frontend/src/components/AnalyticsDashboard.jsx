import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, ComposedChart, Bar, BarChart,
  PieChart, Pie, Cell, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot,
} from "recharts";

const RANGES = [
  { id: "7D", testid: "analytics-range-7d-button" },
  { id: "30D", testid: "analytics-range-30d-button" },
  { id: "90D", testid: "analytics-range-90d-button" },
];

const seeded = (i, s = 1) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const RANGE_CFG = {
  "7D": { points: 7, label: (i) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7], mult: 1 },
  "30D": { points: 15, label: (i) => `D${(i + 1) * 2}`, mult: 3.4 },
  "90D": { points: 13, label: (i) => `W${i + 1}`, mult: 8.8 },
};

const tooltipStyle = {
  backgroundColor: "#16161E",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  fontSize: "12px",
  color: "#E2D9DC",
};

const buildData = (range) => {
  const cfg = RANGE_CFG[range];
  const impressions = Array.from({ length: cfg.points }, (_, i) => ({
    label: cfg.label(i),
    shortform: Math.round(420 + i * 46 + seeded(i, 2) * 190),
    longform: Math.round(180 + i * 22 + seeded(i, 5) * 90),
  }));
  const retentionBase = [100, 84.2, 74, 63, 55, 41, 31, 24];
  const adj = range === "7D" ? 2.1 : range === "90D" ? -1.8 : 0;
  const retention = [0, 3, 5, 10, 15, 30, 45, 60].map((s, i) => ({
    t: `${s}s`,
    rate: Math.min(100, +(retentionBase[i] + adj + (seeded(i, 9) - 0.5) * 2).toFixed(1)),
  }));
  const gsc = Array.from({ length: cfg.points }, (_, i) => {
    const spike = i % 4 === 2 ? 2.6 + seeded(i, 3) : 1;
    return {
      label: cfg.label(i),
      branded: Math.round((900 + i * 60 + seeded(i, 4) * 300) * spike),
      baseline: Math.round(900 + i * 60),
      release: i % 4 === 2,
    };
  });
  const conversions = [
    { name: "App Downloads", value: Math.round(1180 * cfg.mult) },
    { name: "Sign-ups", value: Math.round(940 * cfg.mult) },
    { name: "Waitlist", value: Math.round(620 * cfg.mult) },
    { name: "Pitch Deck DLs", value: Math.round(310 * cfg.mult) },
  ];
  return { impressions, retention, gsc, conversions };
};

const KPIS = {
  "7D": [
    { label: "Total Impressions", value: "4.8M", delta: "+18.2%" },
    { label: "Hook Retention @3s", value: "86.3%", delta: "+2.1 pts" },
    { label: "Branded Search Lift", value: "+212%", delta: "post-Ep4 drop" },
    { label: "High-Value Conversions", value: "2,940", delta: "+31%" },
  ],
  "30D": [
    { label: "Total Impressions", value: "17.6M", delta: "+24.7%" },
    { label: "Hook Retention @3s", value: "84.2%", delta: "+1.4 pts" },
    { label: "Branded Search Lift", value: "+186%", delta: "4 vlog spikes" },
    { label: "High-Value Conversions", value: "10,180", delta: "+27%" },
  ],
  "90D": [
    { label: "Total Impressions", value: "52.4M", delta: "+34.1%" },
    { label: "Hook Retention @3s", value: "82.4%", delta: "+3.8 pts" },
    { label: "Branded Search Lift", value: "+243%", delta: "season arc" },
    { label: "High-Value Conversions", value: "31,760", delta: "+41%" },
  ],
};

const DONUT = [
  { name: "YouTube Organic", value: 34, color: "#D35400" },
  { name: "TikTok Viral", value: 28, color: "#8B0032" },
  { name: "LinkedIn Episodic", value: 18, color: "#C48B9F" },
  { name: "Meta Paid Ads", value: 20, color: "#4A6B5D" },
];

const Card = ({ title, mono, children, className = "" }) => (
  <div className={`rounded-3xl border border-white/[0.08] bg-oxide-900/70 p-6 ${className}`}>
    <div className="flex items-center justify-between mb-5">
      <h3 className="font-syne font-semibold text-white text-base">{title}</h3>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash/40">{mono}</span>
    </div>
    {children}
  </div>
);

const AnalyticsDashboard = () => {
  const [range, setRange] = useState("30D");
  const data = useMemo(() => buildData(range), [range]);
  const gauges = [
    { name: "Engagement Rate", value: range === "7D" ? 71 : range === "30D" ? 68 : 64, color: "#D35400" },
    { name: "Scroll Depth", value: range === "7D" ? 78 : range === "30D" ? 74 : 70, color: "#8B0032" },
  ];

  return (
    <section id="analytics" data-testid="analytics-section" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="scanline" />
      <div className="absolute -right-40 top-20 w-[460px] h-[460px] rounded-full bg-crimson/12 blur-[160px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay mb-4">03 — The Proof Engine, Not Promises</p>
            <h2 className="font-syne font-bold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
              Attribution from <span className="text-gradient-rust">hook to signup</span>.
            </h2>
            <p className="mt-5 text-ash/60 leading-relaxed">
              Top-of-funnel reach, GSC search-intent spikes, and GA4 bottom-funnel conversions — unified in one live view.
            </p>
          </motion.div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-willow bg-willow/10 border border-willow/25 rounded-full px-3 py-1.5">
              Demo Data
            </span>
            <div className="glass rounded-full p-1 flex">
              {RANGES.map((r) => (
                <button
                  key={r.id}
                  data-testid={r.testid}
                  onClick={() => setRange(r.id)}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs transition-colors duration-300 ${
                    range === r.id ? "bg-rust text-white" : "text-ash/60 hover:text-white"
                  }`}
                >
                  {r.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS[range].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash/45">{k.label}</p>
              <p className="mt-2 font-syne font-bold text-2xl sm:text-3xl text-white">{k.value}</p>
              <p className="mt-1 font-mono text-[10px] text-rustsoft">{k.delta}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <Card title="Cross-Platform Impressions" mono="Shortform vs Longform · K">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data.impressions} key={`imp-${range}`}>
                <defs>
                  <linearGradient id="gShort" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B0032" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#8B0032" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gLong" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D35400" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#D35400" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="shortform" name="TikTok / Reels / Shorts" stroke="#C48B9F" strokeWidth={2} fill="url(#gShort)" />
                <Area type="monotone" dataKey="longform" name="YouTube / LinkedIn" stroke="#E67E22" strokeWidth={2} fill="url(#gLong)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Hook Retention Curve" mono="% viewers remaining">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data.retention} key={`ret-${range}`}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="t" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="rate" name="Retention %" stroke="#D35400" strokeWidth={2.5} dot={{ r: 3, fill: "#D35400" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="GSC Branded Search Spikes" mono="Mapped to release days">
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={data.gsc} key={`gsc-${range}`}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="branded" name="Branded searches" fill="#8B0032" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="baseline" name="Organic baseline" stroke="#4A6B5D" strokeWidth={2} dot={false} />
                {data.gsc.map((d, i) =>
                  d.release ? <ReferenceDot key={i} x={d.label} y={d.branded} r={6} fill="#D35400" stroke="#E2D9DC" strokeWidth={1.5} /> : null
                )}
              </ComposedChart>
            </ResponsiveContainer>
            <p className="mt-2 flex items-center gap-2 font-mono text-[10px] text-ash/45">
              <span className="w-2 h-2 rounded-full bg-rust inline-block" /> Orange markers = vlog / episode release days
            </p>
          </Card>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card title="GA4 Referral Mix" mono="Signup source">
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie data={DONUT} dataKey="value" innerRadius={52} outerRadius={78} paddingAngle={3} strokeWidth={0}>
                    {DONUT.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-1 grid grid-cols-2 gap-1.5">
                {DONUT.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    <span className="text-[11px] text-ash/60">{d.name} · {d.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Conversion & Engagement" mono={range}>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={data.conversions} layout="vertical" key={`conv-${range}`}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" tick={{ fill: "#9CA3AF", fontSize: 10 }} axisLine={false} tickLine={false} width={88} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" name="Conversions" fill="#D35400" radius={[0, 6, 6, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 grid grid-cols-2 gap-4">
                {gauges.map((g) => (
                  <div key={g.name} className="relative">
                    <ResponsiveContainer width="100%" height={90}>
                      <RadialBarChart innerRadius="70%" outerRadius="100%" data={[g]} startAngle={90} endAngle={-270}>
                        <RadialBar dataKey="value" cornerRadius={8} fill={g.color} background={{ fill: "rgba(255,255,255,0.06)" }} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center font-syne font-bold text-white text-sm">{g.value}%</div>
                    <p className="text-center font-mono text-[9px] uppercase tracking-[0.15em] text-ash/45 mt-1">{g.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          data-testid="keyword-growth-card"
          className="mt-6 rounded-3xl border border-white/[0.08] bg-oxide-900/70 p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <h3 className="font-syne font-semibold text-white text-base">Organic Keyword Growth</h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash/40">Triggered by build-in-public content</span>
          </div>
          <div className="space-y-4">
            {[
              { term: '"how to startup" docuseries', clicks: "18.2K", growth: "+412%", w: 100 },
              { term: "build in public vlog", clicks: "11.7K", growth: "+268%", w: 64 },
              { term: "loopstack founder interview", clicks: "8.4K", growth: "+194%", w: 46 },
              { term: "startup daily vlog youtube", clicks: "6.9K", growth: "+161%", w: 38 },
              { term: "pocket talia", clicks: "5.3K", growth: "+138%", w: 29 },
            ].map((k, i) => (
              <div key={k.term} data-testid={`keyword-row-${i}`} className="grid sm:grid-cols-[minmax(0,260px)_1fr_auto] items-center gap-3">
                <span className="font-mono text-xs text-ash/80 truncate">{k.term}</span>
                <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${k.w}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-crimson to-rust"
                  />
                </div>
                <div className="flex items-center gap-2.5 sm:justify-end">
                  <span className="font-mono text-xs text-white">{k.clicks} clicks</span>
                  <span className="font-mono text-[10px] text-willow bg-willow/10 border border-willow/25 rounded-full px-2 py-0.5">{k.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
