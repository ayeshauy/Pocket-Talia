import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const STEPS = [
  { n: "01", name: "AI Ideation & Scripting", tool: "Talia Suite", desc: "Talia extracts your core moat, founder origin, and counter-intuitive insights into high-stakes narrative arcs — drafted, tagged, and broken down automatically." },
  { n: "02", name: "Client Approval Gate", tool: "Review Links", desc: "One password-protected share link. Timestamped comments, revision requests, and single-click Approve — with view-only vs edit access per stakeholder." },
  { n: "03", name: "Production & Capture", tool: "Cinema Crew", desc: "On-site videographers, trained on-camera actors and hosts, and remote founder syncs — RED/ARRI packages with live teleprompter support." },
  { n: "04", name: "Post-Production & Ad Scaling", tool: "Edit + Meta", desc: "Editors, social media managers, and Meta ads managers amplify every cut across organic and paid — kinetic captions, multi-ratio masters." },
  { n: "05", name: "GA4 + GSC Attribution", tool: "Proof Engine", desc: "True conversion value, brand search spikes after every drop, and investor-grade deal flow reporting — closed loop, no vanity metrics." },
];

const Workflow = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.6"] });

  return (
    <section id="workflow" data-testid="workflow-section" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute -left-40 bottom-0 w-[420px] h-[420px] rounded-full bg-willow/10 blur-[160px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-16">
        <div className="lg:sticky lg:top-32 self-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay mb-4">04 — Build in Public</p>
            <h2 className="font-syne font-bold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
              Your startup, run like a <span className="text-gradient-rust">media house</span>.
            </h2>
            <p className="mt-5 text-ash/60 leading-relaxed max-w-md">
              Five stages, one integrated pipeline. From Talia's first draft to attributed revenue — nothing leaves
              the system, nothing falls through.
            </p>
            <div className="mt-8 glass rounded-2xl p-5 max-w-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash/45">Average cycle time</p>
              <p className="mt-1.5 font-syne font-bold text-3xl text-white">14 days <span className="text-base text-ash/50 font-medium">idea → attributed signup</span></p>
            </div>
          </motion.div>
        </div>

        <div ref={ref} className="relative pl-10">
          <div className="absolute left-[13px] top-2 bottom-2 w-px bg-white/[0.08]" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-[13px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-rust via-rust to-crimson shadow-[0_0_12px_rgba(211,84,0,0.7)]"
          />
          <div className="space-y-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                data-testid={`workflow-step-${s.n}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span className="absolute -left-10 top-6 w-[27px] h-[27px] rounded-full bg-oxide-900 border border-rust/50 flex items-center justify-center shadow-[0_0_16px_rgba(211,84,0,0.35)]">
                  <span className="w-2 h-2 rounded-full bg-rust" />
                </span>
                <div className="rounded-3xl border border-white/[0.08] bg-oxide-900/70 p-7 hover:bg-oxide-800/70 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-rust tracking-[0.2em]">{s.n}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-clay bg-clay/10 border border-clay/20 rounded-full px-3 py-1">{s.tool}</span>
                  </div>
                  <h3 className="font-syne font-semibold text-white text-xl">{s.name}</h3>
                  <p className="mt-2.5 text-sm text-ash/60 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
