import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { Play, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { scrollToSection } from "./Navbar";

const HERO_IMG =
  "https://images.unsplash.com/photo-1574712255236-ce5bf8395083?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxmaWxtbWFrZXIlMjBjYW1lcmElMjBwcm9kdWN0aW9uJTIwc3RhcnR1cCUyMGZvdW5kZXJ8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85";

const STATS = [
  { value: 142, suffix: "M+", label: "Network Views Generated", delta: "+34% this month" },
  { value: 84.2, suffix: "%", decimals: 1, label: "Avg. Hook Retention (3s)", delta: "2.4x industry avg" },
  { value: 420, suffix: "+", label: "Videos & Films Produced", delta: "Across 18 tech hubs" },
  { value: 90, prefix: "< ", suffix: "s", label: "Talia Script-to-Shotlist", delta: "Full production packet" },
];

const Counter = ({ value, decimals = 0, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

const LINES = [
  { text: "The Digital Media Engine", gradient: false },
  { text: "Built for Tech", gradient: true },
  { text: "Startups & Founders.", gradient: false },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[72px]">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-crimson/25 blur-[160px]" />
      <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-rust/20 blur-[160px]" />
      <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-clay/10 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pt-16 pb-10 lg:pt-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rust shadow-[0_0_10px_#D35400] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-clay">
                AI-Native Filmmaking &amp; Media Platform
              </span>
            </motion.div>

            <h1 className="font-syne font-extrabold tracking-tight leading-[1.06] text-white text-4xl sm:text-5xl lg:text-[3.6rem]">
              {LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <motion.span
                    className={`block ${line.gradient ? "text-gradient-rust" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-ash/60"
            >
              We turn raw startup execution into viral distribution. Pocket Talia combines an all-in-one AI
              pre-production suite with full-stack media operations for high-growth tech startups.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                data-testid="hero-cta-explore-button"
                onClick={(e) => scrollToSection(e, "#ai-suite")}
                className="group flex items-center gap-2 bg-rust hover:bg-rustsoft text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-colors duration-300 shadow-[0_0_36px_rgba(211,84,0,0.4)]"
              >
                <Sparkles size={17} />
                Try Talia AI Platform
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                data-testid="hero-cta-partner-button"
                onClick={(e) => scrollToSection(e, "#onboarding")}
                className="group flex items-center gap-2 glass hover:bg-white/[0.08] text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                <Play size={15} className="text-rust" />
                Explore Agency Services
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div style={{ y: imgY }} className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
              <img src={HERO_IMG} alt="Pocket Talia cinema crew on set" className="w-full h-[480px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-oxide-950 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-crimson/10 mix-blend-overlay" />
            </motion.div>

            <motion.div style={{ y: cardY }} className="absolute -bottom-8 -left-10 glass rounded-2xl p-5 w-56 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={15} className="text-rust" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">Hook Retention</span>
              </div>
              <div className="font-syne font-bold text-3xl text-white">84.2%</div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "84%" }}
                  transition={{ duration: 1.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-crimson to-rust"
                />
              </div>
              <p className="mt-2 text-[11px] text-ash/50">2.4x industry average past 3s</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="absolute -top-6 -right-6 glass rounded-2xl px-5 py-4 shadow-2xl"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-willow shadow-[0_0_10px_#4A6B5D] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash/70">Talia Copilot</span>
              </div>
              <p className="mt-1.5 text-xs text-ash/60 max-w-[170px]">Scene 14 broken down — shot list & call sheet ready.</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          data-testid="hero-stats-bar"
          className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-white/[0.08] bg-oxide-900/60 backdrop-blur-md overflow-hidden"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`p-6 lg:p-7 ${i !== 0 ? "border-l border-white/[0.06]" : ""} ${i >= 2 ? "border-t lg:border-t-0 border-white/[0.06]" : ""}`}
            >
              <div className="font-syne font-bold text-3xl lg:text-4xl text-white">
                <Counter value={s.value} decimals={s.decimals || 0} prefix={s.prefix || ""} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-xs sm:text-sm text-ash/60 font-medium">{s.label}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-rust/80">{s.delta}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
