import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Eye, Youtube, Instagram, Linkedin, Music2, Megaphone, ArrowUpRight, Pause, Facebook } from "lucide-react";
import { EPISODES, ACT_STRUCTURE } from "@/data/episodes";

const IMG = {
  studio: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwaW50ZXJ2aWV3JTIwc3R1ZGlvJTIwbmVvbiUyMGxpZ2h0c3xlbnwwfHx8fDE3OTE3ODI5Njh8MA&ixlib=rb-4.1.0&q=85",
  console: "https://images.unsplash.com/photo-1615458318132-1f151a3d18f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxwb2RjYXN0JTIwaW50ZXJ2aWV3JTIwc3R1ZGlvJTIwbmVvbiUyMGxpZ2h0c3xlbnwwfHx8fDE3OTE3ODI5Njh8MA&ixlib=rb-4.1.0&q=85",
  docu: "https://images.unsplash.com/photo-1627757881009-5ab1b99f1f47?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjBmaWxtJTIwc2V0JTIwY2FtZXJhJTIwZGlyZWN0b3J8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85",
  rig: "https://images.unsplash.com/photo-1574304904744-2e6919c5a2a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxmaWxtbWFrZXIlMjBjYW1lcmElMjBwcm9kdWN0aW9uJTIwc3RhcnR1cCUyMGZvdW5kZXJ8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85",
  hero: "https://images.unsplash.com/photo-1574712255236-ce5bf8395083?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxmaWxtbWFrZXIlMjBjYW1lcmElMjBwcm9kdWN0aW9uJTIwc3RhcnR1cCUyMGZvdW5kZXJ8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85",
  director: "https://images.unsplash.com/photo-1587050265310-1a2d98ccce5f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxmaWxtbWFrZXIlMjBjYW1lcmElMjBwcm9kdWN0aW9uJTIwc3RhcnR1cCUyMGZvdW5kZXJ8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85",
};

const SHORTS = [
  { id: "s1", title: "3-Second Hook: The $0 MVP", img: IMG.studio, hook: "91%", views: "2.4M", duration: "0:38" },
  { id: "s2", title: "Founder Split-Screen: Burn Rate Confession", img: IMG.console, hook: "87%", views: "1.8M", duration: "0:44" },
  { id: "s3", title: "The Cold DM That Raised $2M", img: IMG.rig, hook: "84%", views: "3.1M", duration: "0:51" },
  { id: "s4", title: "Why We Killed Our Best Feature", img: IMG.director, hook: "89%", views: "1.2M", duration: "0:35" },
];

const VLOGS = [
  { id: "v1", title: "Vlog 014 — The Pivot Week", img: IMG.hero, views: "412K", duration: "14:22", desc: "Seven days, one brutal decision: rebuilding the core loop in public." },
  { id: "v2", title: "Vlog 013 — Inside the War Room", img: IMG.console, views: "298K", duration: "11:47", desc: "Launch night with the full crew — metrics, mistakes, and the 3am fix." },
  { id: "v3", title: "Vlog 012 — Hiring Titan #4", img: IMG.rig, views: "226K", duration: "9:58", desc: "How we interview for taste, not resumes." },
];

const ACTS = ACT_STRUCTURE.map((a) => ({
  act: a.act,
  episodes: a.slugs.map((s) => EPISODES.find((e) => e.slug === s)),
}));

const SOCIALS = [
  { icon: Youtube, name: "YouTube", stat: "380K subscribers", note: "Weekly longform vlogs", testid: "social-hub-youtube" },
  { icon: Instagram, name: "Instagram", stat: "210K followers", note: "Daily reels & BTS", testid: "social-hub-instagram" },
  { icon: Music2, name: "TikTok", stat: "640K followers", note: "Viral interview shorts", testid: "social-hub-tiktok" },
  { icon: Linkedin, name: "LinkedIn", stat: "95K followers", note: "Founder-led episodic", testid: "social-hub-linkedin" },
  { icon: Megaphone, name: "Meta Ads", stat: "$1.8M ARR tracked", note: "Paid amplification engine", testid: "social-hub-meta" },
  { icon: Facebook, name: "Facebook", stat: "120K followers", note: "Episodic clips & community", testid: "social-hub-facebook" },
];

const TABS = [
  { id: "shorts", label: "Daily Interview Shorts", testid: "media-tab-shorts-button" },
  { id: "vlogs", label: "Weekly Vlogs", testid: "media-tab-vlogs-button" },
  { id: "docuseries", label: "Docuseries: How to Startup", testid: "media-tab-docuseries-button" },
];

const MediaMatrix = () => {
  const [tab, setTab] = useState("shorts");
  const [active, setActive] = useState(null);
  const [playing, setPlaying] = useState(false);

  const openPlayer = (video) => {
    setActive(video);
    setPlaying(true);
  };

  return (
    <section id="media-matrix" data-testid="media-matrix-section" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute -left-40 top-1/3 w-[460px] h-[460px] rounded-full bg-rust/12 blur-[160px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay mb-4">02 — The Proof of Craft</p>
          <h2 className="font-syne font-bold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
            The feed <span className="text-gradient-rust">never sleeps</span>.
          </h2>
          <p className="mt-5 text-ash/60 leading-relaxed">
            Daily shorts engineered for 3-second retention, weekly build-in-public vlogs, and the flagship
            docuseries "How to Startup" — six episodes across three acts.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap gap-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              data-testid={t.testid}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                tab === t.id ? "bg-crimson text-white shadow-[0_0_24px_rgba(139,0,50,0.4)]" : "glass text-ash/70 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 min-h-[420px]">
          <AnimatePresence mode="wait">
            {tab === "shorts" && (
              <motion.div
                key="shorts"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {SHORTS.map((s, i) => (
                  <motion.button
                    key={s.id}
                    data-testid={`short-card-${s.id}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => openPlayer(s)}
                    className="group relative rounded-2xl overflow-hidden border border-white/[0.08] text-left aspect-[9/16]"
                  >
                    <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-oxide-950 via-oxide-950/30 to-transparent" />
                    <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 font-mono text-[10px] text-rustsoft">
                      {s.hook} @3s
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-14 h-14 rounded-full bg-rust/90 flex items-center justify-center shadow-[0_0_32px_rgba(211,84,0,0.6)]">
                        <Play size={20} className="text-white ml-0.5" fill="white" />
                      </span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <p className="font-syne font-semibold text-white text-sm leading-snug">{s.title}</p>
                      <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-ash/60">
                        <span className="flex items-center gap-1"><Eye size={11} /> {s.views}</span>
                        <span>{s.duration}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {tab === "vlogs" && (
              <motion.div
                key="vlogs"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="grid md:grid-cols-3 gap-5"
              >
                {VLOGS.map((v, i) => (
                  <motion.button
                    key={v.id}
                    data-testid={`vlog-card-${v.id}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => openPlayer(v)}
                    className="group relative rounded-2xl overflow-hidden border border-white/[0.08] text-left bg-oxide-900/60"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={v.img} alt={v.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-oxide-950/80 to-transparent" />
                      <span className="absolute bottom-3 right-3 glass rounded-md px-2 py-0.5 font-mono text-[10px] text-white">{v.duration}</span>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="w-12 h-12 rounded-full bg-crimson/90 flex items-center justify-center shadow-[0_0_28px_rgba(139,0,50,0.6)]">
                          <Play size={18} className="text-white ml-0.5" fill="white" />
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="font-syne font-semibold text-white">{v.title}</p>
                      <p className="mt-1.5 text-sm text-ash/55 leading-relaxed">{v.desc}</p>
                      <p className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-ash/50"><Eye size={11} /> {v.views} views</p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {tab === "docuseries" && (
              <motion.div
                key="docuseries"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6"
              >
                <button
                  data-testid="docuseries-trailer-card"
                  onClick={() => openPlayer({ title: "How to Startup — Official Trailer", duration: "2:31", views: "5.6M", img: IMG.docu })}
                  className="group relative rounded-3xl overflow-hidden border border-white/[0.08] text-left min-h-[420px]"
                >
                  <img src={IMG.docu} alt="How to Startup docuseries" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-oxide-950 via-oxide-950/25 to-transparent" />
                  <div className="absolute top-5 left-5 glass rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                    Flagship Docuseries · Season 1
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-7">
                    <h3 className="font-syne font-extrabold text-white text-3xl sm:text-4xl">How to Startup</h3>
                    <p className="mt-2 text-sm text-ash/60 max-w-md leading-relaxed">
                      A cinematic six-episode arc following real founders from first pitch to Series A — no scripts, no safety net.
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 bg-rust group-hover:bg-rustsoft transition-colors text-white text-sm font-semibold px-6 py-3 rounded-full">
                      <Play size={15} fill="white" /> Watch Trailer · 2:31
                    </span>
                  </div>
                </button>
                <div className="space-y-4">
                  {ACTS.map((a, i) => (
                    <motion.div
                      key={a.act}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                      className="glass rounded-2xl p-5"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-rust mb-3">{a.act}</p>
                      <div className="space-y-2">
                        {a.episodes.map((ep) => (
                          <Link
                            key={ep.slug}
                            to={`/episodes/${ep.slug}`}
                            data-testid={`episode-link-${ep.slug}`}
                            className="group flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 hover:bg-white/[0.06] hover:border-rust/40 transition-colors"
                          >
                            <span className="text-sm font-medium text-ash/90">{ep.short}</span>
                            <ArrowUpRight size={13} className="text-clay transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash/45 mb-5">Live Network Feed</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.name}
                href="#media-matrix"
                onClick={(e) => e.preventDefault()}
                data-testid={s.testid}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group glass rounded-2xl p-5 hover:bg-white/[0.07] transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <s.icon size={20} className="text-rust" />
                  <ArrowUpRight size={14} className="text-ash/30 transition-all duration-300 group-hover:text-rust group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="font-syne font-semibold text-white text-sm">{s.name}</p>
                <p className="mt-1 text-xs text-clay font-medium">{s.stat}</p>
                <p className="mt-0.5 text-[11px] text-ash/45">{s.note}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 bg-oxide-950/85 backdrop-blur-xl"
            onClick={() => setActive(null)}
            data-testid="video-player-modal"
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-white/10 bg-oxide-800 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
            >
              <button
                data-testid="video-modal-close-button"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                aria-label="Close player"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-video">
                <img src={active.img || IMG.docu} alt={active.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-oxide-950/40" />
                <button
                  data-testid="video-modal-play-toggle"
                  onClick={() => setPlaying(!playing)}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-rust/90 flex items-center justify-center shadow-[0_0_48px_rgba(211,84,0,0.7)] hover:scale-105 transition-transform"
                >
                  {playing ? <Pause size={26} className="text-white" fill="white" /> : <Play size={26} className="text-white ml-1" fill="white" />}
                </button>
              </div>
              <div className="p-6">
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-4">
                  {playing ? (
                    <motion.div
                      key="progress"
                      initial={{ width: "4%" }}
                      animate={{ width: "96%" }}
                      transition={{ duration: 40, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-crimson to-rust rounded-full"
                    />
                  ) : (
                    <div className="h-full w-[4%] bg-gradient-to-r from-crimson to-rust rounded-full" />
                  )}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-syne font-bold text-white text-lg">{active.title}</h4>
                    <p className="mt-1 font-mono text-[11px] text-ash/50">
                      {active.views ? `${active.views} views · ` : ""}{active.duration || ""} · 4K master
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-willow bg-willow/10 border border-willow/25 rounded-full px-3 py-1.5">
                    Client Approved
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MediaMatrix;
