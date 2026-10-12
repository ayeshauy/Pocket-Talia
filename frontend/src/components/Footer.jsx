import Logo from "./Logo";
import { scrollToSection } from "./Navbar";

const COLUMNS = [
  { title: "Platform", links: [{ l: "Talia AI Suite", h: "#ai-suite" }, { l: "Media Matrix", h: "#media-matrix" }, { l: "Analytics", h: "#analytics" }, { l: "Pricing", h: "#pricing" }] },
  { title: "Ecosystem", links: [{ l: "Pocket", h: "#top" }, { l: "How to Startup", h: "#media-matrix" }, { l: "Build in Public", h: "#workflow" }, { l: "Media Kit", h: "#top" }] },
  { title: "Legal", links: [{ l: "Privacy Policy", h: "#top" }, { l: "Terms of Service", h: "#top" }, { l: "API Docs", h: "#top" }] },
];

const Footer = () => (
  <footer data-testid="footer" className="relative border-t border-white/[0.06] overflow-hidden">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
      <div className="grid lg:grid-cols-[1.2fr_1.8fr] gap-12">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={38} />
            <span className="font-syne font-bold text-xl text-white">
              Pocket <span className="text-gradient-rust">Talia</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-ash/50 leading-relaxed max-w-xs">
            The independent digital media, production, and AI filmmaking arm of Pocket. Raw idea to viral distribution.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 glass rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-willow shadow-[0_0_8px_#4A6B5D] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash/60">
              Talia AI Engine v2.4 — All systems operational
            </span>
          </div>
          <p className="mt-5 font-mono text-[11px] text-ash/35">San Francisco · New York · London</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-clay mb-4">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map((link) => (
                  <li key={link.l}>
                    <a
                      href={link.h}
                      onClick={(e) => scrollToSection(e, link.h)}
                      className="text-sm text-ash/55 hover:text-white transition-colors duration-300"
                    >
                      {link.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 select-none pointer-events-none" aria-hidden="true">
        <p className="font-syne font-extrabold text-center leading-none text-[13.5vw] tracking-tight bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-transparent whitespace-nowrap">
          POCKET TALIA
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-ash/35">© 2026 Pocket Talia · pockettalia.tech · A Pocket ecosystem company</p>
        <p className="font-mono text-[11px] text-ash/35">From raw idea to viral distribution.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
