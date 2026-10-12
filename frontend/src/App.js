import { useEffect } from "react";
import "@/App.css";
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
    <div className="min-h-screen bg-oxide-950 text-ash font-inter antialiased overflow-x-clip">
      <Navbar />
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
  );
}

export default App;
