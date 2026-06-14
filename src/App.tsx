import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./lib/gsap";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { Pipeline } from "./components/Pipeline";
import { Features } from "./components/Features";
import { DevSection } from "./components/DevSection";
import { UseCases } from "./components/UseCases";
import { Pricing } from "./components/Pricing";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { LegalPage } from "./components/LegalPage";
import { InfoPage } from "./components/InfoPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<InfoPage slug="about" />} />
      <Route path="/contact" element={<InfoPage slug="contact" />} />
      <Route path="/privacy" element={<LegalPage slug="privacy" />} />
      <Route path="/terms" element={<LegalPage slug="terms" />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }

    const lenis = new Lenis({ lerp: 0.12, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    // defer the (layout-heavy) refresh a frame so the hero intro animates on a clean thread
    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    return () => window.removeEventListener("load", refresh);
  }, [ready]);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Navbar started={ready} />
      <main>
        <Hero started={ready} />
        <Ticker />
        <Pipeline />
        <Features />
        <DevSection />
        <UseCases />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
