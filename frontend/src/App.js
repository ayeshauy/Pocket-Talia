import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AISuite from "@/components/AISuite";
import MediaMatrix from "@/components/MediaMatrix";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import Workflow from "@/components/Workflow";
import Pricing from "@/components/Pricing";
import OnboardingForm from "@/components/OnboardingForm";
import Footer from "@/components/Footer";
import EpisodeCaseStudy from "@/pages/EpisodeCaseStudy";

const Landing = () => {
  const location = useLocation();
  useEffect(() => {
    const target = location.state?.scrollTo
      ? `#${location.state.scrollTo}`
      : window.location.hash;
    if (target) {
      const t = setTimeout(() => {
        const el = document.querySelector(target);
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -76, immediate: true });
        else el.scrollIntoView();
      }, 200);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <main>
      <Hero />
      <Marquee />
      <AISuite />
      <MediaMatrix />
      <AnalyticsDashboard />
      <Workflow />
      <Pricing />
      <OnboardingForm />
    </main>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-oxide-950 text-ash font-inter antialiased overflow-x-clip">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/episodes/:slug" element={<EpisodeCaseStudy />} />
        </Routes>
        <Footer />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#16161E",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#E2D9DC",
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
