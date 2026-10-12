import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { label: "AI Suite", href: "#ai-suite", testid: "nav-link-ai-suite" },
  { label: "Media Matrix", href: "#media-matrix", testid: "nav-link-media-matrix" },
  { label: "Analytics", href: "#analytics", testid: "nav-link-analytics" },
  { label: "Workflow", href: "#workflow", testid: "nav-link-workflow" },
  { label: "Pricing", href: "#pricing", testid: "nav-link-pricing" },
];

export const scrollToSection = (e, href) => {
  if (e) e.preventDefault();
  const el = document.querySelector(href);
  if (!el) {
    window.location.href = `/${href}`;
    return;
  }
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -76 });
  else el.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-500 border-b ${
        scrolled ? "bg-oxide-950/85 backdrop-blur-xl border-white/[0.08]" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <a
          href="#top"
          data-testid="navbar-brand-link"
          onClick={(e) => scrollToSection(e, "#top")}
          className="flex items-center gap-3 group"
        >
          <Logo size={34} />
          <span className="font-syne font-bold text-lg tracking-tight text-white leading-none">
            Pocket <span className="text-gradient-rust">Talia</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={l.testid}
              onClick={(e) => scrollToSection(e, l.href)}
              className="text-sm text-ash/70 hover:text-white transition-colors duration-300 font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            data-testid="nav-cta-consultation-button"
            onClick={(e) => scrollToSection(e, "#onboarding")}
            className="group flex items-center gap-1.5 text-sm font-semibold text-white bg-crimson hover:bg-crimson/80 px-5 py-2.5 rounded-full transition-colors duration-300 shadow-[0_0_24px_rgba(139,0,50,0.45)]"
          >
            Book Consultation
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <button
          data-testid="nav-mobile-menu-button"
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-oxide-950/95 backdrop-blur-xl border-b border-white/[0.08]"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  data-testid={`mobile-${l.testid}`}
                  onClick={(e) => {
                    setOpen(false);
                    scrollToSection(e, l.href);
                  }}
                  className="text-base font-syne font-semibold text-ash/80 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <button
                data-testid="mobile-nav-cta-consultation-button"
                onClick={(e) => {
                  setOpen(false);
                  scrollToSection(e, "#onboarding");
                }}
                className="mt-2 text-sm font-semibold text-white bg-crimson px-5 py-3 rounded-full w-fit"
              >
                Book Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
