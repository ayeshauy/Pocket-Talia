import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { scrollToSection } from "./Navbar";

const SOFTWARE = [
  { name: "Creator / Filmmaker", price: "$0", cadence: "forever", tag: "Free tier", popular: false, cta: "Start Free", features: ["1 user seat", "Script editor + Talia AI trial", "Basic breakdown tools", "3 projects, community presets", "Watermarked exports"] },
  { name: "Pro Studio", price: "$149", cadence: "/month", tag: "Most popular", popular: true, cta: "Launch Pro Studio", features: ["5 team seats", "Unlimited Talia script generation", "Shot lists, storyboards & budgets", "Automated call sheets", "Client review links with timecode approvals", "Priority GPU pipeline"] },
  { name: "Enterprise Production House", price: "$399", cadence: "/month", tag: "Scale", popular: false, cta: "Talk to Sales", features: ["Unlimited seats & projects", "Custom fine-tuned Talia on your voice", "Dedicated render nodes", "API access + Slack sync", "Custom NDA & SLA"] },
];

const AGENCY = [
  { name: "Launch Engine", price: "$4,500", cadence: "/month", tag: "Pre-Seed", popular: false, cta: "Apply for Launch", features: ["Daily shortform engine (12+ assets/mo)", "Social media management", "Client review portal included", "Editing, grade & kinetic captions", "Monthly GA4 tracking report"] },
  { name: "Build-in-Public Scale", price: "$8,500", cadence: "/month", tag: "Seed / Series A", popular: true, cta: "Apply for Scale", features: ["Full crew: videographer, editor, SMM, Meta manager", "24 shorts + 2 weekly longform vlogs", "On-camera founder direction", "GSC search-intent tracking", "Ad creative scaling pack", "Talia AI Enterprise suite included"] },
  { name: "Flagship Media House", price: "$16,000", cadence: "/month", tag: "Enterprise / Docuseries", popular: false, cta: "Apply for Flagship", features: ["End-to-end 'How to Startup' docuseries season", "40+ omnichannel assets / month", "Dedicated actors, hosts & DP", "Executive PR & tier-1 distribution", "Full GA4/GSC attribution modeling", "24/7 Talia war room access"] },
];

const PricingCard = ({ t, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    className={`relative rounded-3xl ${t.popular ? "conic-border lg:-mt-4 lg:mb-[-1rem]" : ""}`}
    data-testid={`pricing-card-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
  >
    <div className={`rounded-3xl p-7 h-full flex flex-col ${t.popular ? "bg-oxide-800" : "bg-oxide-900/70 border border-white/[0.08]"}`}>
      <div className="flex items-center justify-between mb-5">
        <span className={`font-mono text-[10px] uppercase tracking-[0.2em] rounded-full px-3 py-1 ${
          t.popular ? "text-rustsoft bg-rust/10 border border-rust/30" : "text-ash/50 bg-white/[0.04] border border-white/10"
        }`}>
          {t.tag}
        </span>
        {t.popular && <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-clay">Featured</span>}
      </div>
      <h3 className="font-syne font-bold text-white text-xl">{t.name}</h3>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="font-syne font-extrabold text-4xl text-white">{t.price}</span>
        <span className="text-sm text-ash/50">{t.cadence}</span>
      </div>
      <ul className="mt-6 space-y-3 flex-1">
        {t.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ash/75">
            <Check size={15} className="text-rust mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button
        data-testid={`pricing-cta-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-button`}
        onClick={(e) => scrollToSection(e, "#onboarding")}
        className={`group mt-7 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
          t.popular ? "bg-rust hover:bg-rustsoft text-white shadow-[0_0_28px_rgba(211,84,0,0.4)]" : "glass hover:bg-white/[0.08] text-white"
        }`}
      >
        {t.cta}
        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  </motion.div>
);

const Pricing = () => {
  const [tab, setTab] = useState("software");
  const tiers = tab === "software" ? SOFTWARE : AGENCY;

  return (
    <section id="pricing" data-testid="pricing-section" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute -right-40 bottom-0 w-[460px] h-[460px] rounded-full bg-crimson/12 blur-[160px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay mb-4">05 — Engage the Engine</p>
          <h2 className="font-syne font-bold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
            Software tiers. <span className="text-gradient-rust">Agency firepower.</span>
          </h2>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <div className="glass rounded-full p-1.5 flex">
            <button
              data-testid="pricing-tab-software-button"
              onClick={() => setTab("software")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${tab === "software" ? "bg-rust text-white" : "text-ash/60 hover:text-white"}`}
            >
              Software Tiers
            </button>
            <button
              data-testid="pricing-tab-agency-button"
              onClick={() => setTab("agency")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${tab === "agency" ? "bg-crimson text-white" : "text-ash/60 hover:text-white"}`}
            >
              Agency Retainers
            </button>
          </div>
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-6 items-stretch"
            >
              {tiers.map((t, i) => (
                <PricingCard key={t.name} t={t} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
