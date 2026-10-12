import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, LineChart, Line, ComposedChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot,
} from "recharts";
import { ArrowLeft, ArrowRight, Calendar, Clock, Eye, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { EPISODES } from "@/data/episodes";

const tooltipStyle = {
  backgroundColor: "#16161E",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  fontSize: "12px",
  color: "#E2D9DC",
};

const RETENTION_LABELS = ["0s", "3s", "5s", "10s", "15s", "30s", "45s", "60s"];

const Card = ({ title, mono, children, className = "" }) => (
  <div className={`rounded-3xl border border-white/[0.08] bg-oxide-900/70 p-6 ${className}`}>
    <div className="flex items-center justify-between mb-5">
      <h3 className="font-syne font-semibold text-white text-base">{title}</h3>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash/40">{mono}</span>
    </div>
    {children}
  </div>
);

const EpisodeCaseStudy = () => {
  const { slug } = useParams();
  const idx = EPISODES.findIndex((e) => e.slug === slug);
  const ep = EPISODES[idx];

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [slug]);

  if (!ep) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">404 — Reel not found</p>
        <h1 className="font-syne font-bold text-white text-3xl">This episode doesn't exist (yet).</h1>
        <Link to="/" data-testid="episode-notfound-home-link" className="text-rust hover:text-rustsoft font-semibold text-sm">
          Back to Pocket Talia
        </Link>
      </main>
    );
  }

  const prev = EPISODES[idx - 1];
  const next = EPISODES[idx + 1];
  const retentionData = ep.retention.map((v, i) => ({ t: RETENTION_LABELS[i], rate: v }));
  const kpiList = [
    { icon: Eye, label: "Total Views", value: ep.kpis.views },
    { icon: Clock, label: "Avg. Watch", value: ep.kpis.watch },
    { icon: CheckCircle2, label: "Hook Retention @3s", value: ep.kpis.hook },
    { icon: ArrowUpRight, label: "Attributed Sign-ups", value: ep.kpis.signups },
  ];

  return (
    <main data-testid="episode-case-study-page" className="relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-crimson/18 blur-[170px]" />
      <div className="absolute top-1/2 -left-40 w-[420px] h-[420px] rounded-full bg-rust/12 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-24">
        <Link
          to="/"
          state={{ scrollTo: "media-matrix" }}
          data-testid="episode-back-link"
          className="inline-flex items-center gap-2 text-sm text-ash/50 hover:text-white transition-colors font-medium"
        >
          <ArrowLeft size={15} /> All Episodes
        </Link>

        <div className="relative mt-10">
          <span aria-hidden="true" className="pointer-events-none select-none absolute -top-14 right-0 font-syne font-extrabold text-[11rem] leading-none text-white/[0.04] hidden lg:block">
            {ep.number}
          </span>
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay mb-4">
              How to Startup — {ep.act} · Episode {ep.number}
            </p>
            <h1 data-testid="episode-hero-title" className="font-syne font-extrabold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              {ep.title}
            </h1>
            <p className="mt-6 text-ash/60 leading-relaxed text-base sm:text-lg">{ep.synopsis}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="flex items-center gap-1.5 glass rounded-full px-4 py-2 font-mono text-[11px] text-ash/70">
                <Calendar size={12} className="text-rust" /> {ep.released}
              </span>
              <span className="flex items-center gap-1.5 glass rounded-full px-4 py-2 font-mono text-[11px] text-ash/70">
                <Clock size={12} className="text-rust" /> {ep.duration}
              </span>
              <span className="flex items-center gap-1.5 glass rounded-full px-4 py-2 font-mono text-[11px] text-ash/70">
                <Eye size={12} className="text-rust" /> {ep.kpis.views} views
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-willow bg-willow/10 border border-willow/25 rounded-full px-4 py-2">
                Case Study · Demo Analytics
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <img src={ep.img} alt={`${ep.title} — episode still`} className="w-full h-[320px] sm:h-[440px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-oxide-950 via-oxide-950/25 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-clay">Season 1 · How to Startup</p>
              <p className="mt-1 font-syne font-bold text-white text-2xl">EP {ep.number} — {ep.title}</p>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-ash/60">4K Anamorphic Master</span>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiList.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              data-testid={`episode-kpi-${k.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="glass rounded-2xl p-5"
            >
              <k.icon size={16} className="text-rust mb-3" />
              <p className="font-syne font-bold text-2xl sm:text-3xl text-white">{k.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ash/45">{k.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <Card title="Retention Curve" mono="% viewers remaining">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={retentionData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="t" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="rate" name="Retention %" stroke="#D35400" strokeWidth={2.5} dot={{ r: 3, fill: "#D35400" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Platform Split" mono="Share of episode views">
            <div className="space-y-5 pt-2">
              {ep.platforms.map((p, i) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-ash/80 font-medium">{p.name}</span>
                    <span className="font-mono text-xs text-ash/60">{p.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: p.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Branded Search Impact (GSC)" mono="Release-day spike correlation" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={ep.gsc}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="d" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="branded" name="Branded searches" fill="#8B0032" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="baseline" name="Pre-release baseline" stroke="#4A6B5D" strokeWidth={2} dot={false} />
                <ReferenceDot x="D-0" y={ep.gsc[4].branded} r={7} fill="#D35400" stroke="#E2D9DC" strokeWidth={1.5} />
              </ComposedChart>
            </ResponsiveContainer>
            <p className="mt-2 flex items-center gap-2 font-mono text-[10px] text-ash/45">
              <span className="w-2 h-2 rounded-full bg-rust inline-block" /> D-0 = episode release day
            </p>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 rounded-3xl border border-white/[0.08] bg-oxide-900/70 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="font-syne font-semibold text-white text-base">Conversion Attribution (GA4)</h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash/40">30-day post-release window</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="episode-attribution-table">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-ash/40 border-b border-white/[0.06]">
                  <th className="px-6 py-3.5 font-medium">Source</th>
                  <th className="px-6 py-3.5 font-medium">Sessions</th>
                  <th className="px-6 py-3.5 font-medium">Sign-ups</th>
                  <th className="px-6 py-3.5 font-medium">Waitlist</th>
                  <th className="px-6 py-3.5 font-medium">Pitch Deck DLs</th>
                </tr>
              </thead>
              <tbody>
                {ep.attribution.map((row) => (
                  <tr key={row.source} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-4 text-clay font-medium whitespace-nowrap">{row.source}</td>
                    <td className="px-6 py-4 text-ash/80 font-mono text-[13px]">{row.sessions}</td>
                    <td className="px-6 py-4 text-white font-mono text-[13px]">{row.signups}</td>
                    <td className="px-6 py-4 text-ash/80 font-mono text-[13px]">{row.waitlist}</td>
                    <td className="px-6 py-4 text-rustsoft font-mono text-[13px]">{row.decks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/[0.08] bg-oxide-900/70 p-7"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-clay mb-4">Attribution Read</p>
            <p className="text-ash/70 leading-relaxed">{ep.impact}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-crimson/30 bg-gradient-to-br from-crimson/15 to-rust/10 p-7"
          >
            <p className="font-syne text-xl text-white leading-relaxed">"{ep.quote.text}"</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ash/55">{ep.quote.author}</p>
          </motion.div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {prev ? (
            <Link
              to={`/episodes/${prev.slug}`}
              data-testid="episode-prev-link"
              className="group glass rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
            >
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash/45">
                <ArrowLeft size={13} /> Previous Episode
              </p>
              <p className="mt-2.5 font-syne font-semibold text-white text-lg group-hover:text-rustsoft transition-colors">
                EP {prev.number} — {prev.title}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {next ? (
            <Link
              to={`/episodes/${next.slug}`}
              data-testid="episode-next-link"
              className="group glass rounded-2xl p-6 hover:bg-white/[0.07] transition-colors sm:text-right"
            >
              <p className="flex items-center gap-2 sm:justify-end font-mono text-[10px] uppercase tracking-[0.2em] text-ash/45">
                Next Episode <ArrowRight size={13} />
              </p>
              <p className="mt-2.5 font-syne font-semibold text-white text-lg group-hover:text-rustsoft transition-colors">
                EP {next.number} — {next.title}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 conic-border rounded-3xl"
        >
          <div className="rounded-3xl bg-oxide-800 p-8 sm:p-12 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-clay mb-3">Your story, measured the same way</p>
            <h2 className="font-syne font-bold text-white text-2xl sm:text-3xl">Want an episode engine like this for your startup?</h2>
            <Link
              to="/#onboarding"
              data-testid="episode-cta-button"
              className="mt-6 inline-flex items-center gap-2 bg-rust hover:bg-rustsoft text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors shadow-[0_0_32px_rgba(211,84,0,0.4)]"
            >
              Start Your Build <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default EpisodeCaseStudy;
