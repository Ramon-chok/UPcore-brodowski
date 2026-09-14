import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ComingBig from "./components/ComingBig";
import Inauguration from "./components/Inauguration";
import Manifesto from "./components/Manifesto";
import Experience3D from "./components/Experience3D";
import About from "./components/About";
import StickyStory from "./components/StickyStory";
import Gallery from "./components/Gallery";
import Differentials from "./components/Differentials";
import Partners from "./components/Partners";
import InstagramSection from "./components/InstagramSection";
import LocationSection from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { BeamDivider, GrainOverlay, ScrollProgressRail } from "./components/ui";
import { useReducedMotion } from "./hooks/use-app";
import { initLenis } from "./lib/scroll";

/**
 * =========================================================
 * UPCORE BRODOWSKI — Experiência digital institucional
 * =========================================================
 * Narrativa: IMPACTO → CURIOSIDADE → INAUGURAÇÃO → MANIFESTO
 * → EXPERIÊNCIA → MARCA → JORNADA → ESTRUTURA → DIFERENCIAIS
 * → PARCEIROS → INSTAGRAM → LOCALIZAÇÃO → CONTATO
 */
export default function App() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const destroy = initLenis();
    return destroy;
  }, [reduced]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-void text-mist">
      <CustomCursor />
      <ScrollProgressRail />
      <GrainOverlay />
      <Navbar />

      <main>
        {/* IMPACTO */}
        <Hero />
        {/* CURIOSIDADE */}
        <ComingBig />
        {/* INAUGURAÇÃO */}
        <Inauguration />
        <BeamDivider />
        {/* MANIFESTO */}
        <Manifesto />
        {/* EXPERIÊNCIA 3D */}
        <Experience3D />
        {/* MARCA */}
        <About />
        {/* JORNADA (sticky story) */}
        <StickyStory />
        {/* ESTRUTURA */}
        <Gallery />
        <BeamDivider />
        {/* DIFERENCIAIS */}
        <Differentials />
        {/* PARCEIROS */}
        <Partners />
        <BeamDivider />
        {/* INSTAGRAM */}
        <InstagramSection />
        {/* LOCALIZAÇÃO */}
        <LocationSection />
        {/* CONTATO */}
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
      </div>
    </MotionConfig>
  );
}
