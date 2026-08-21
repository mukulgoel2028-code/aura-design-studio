"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import LoadingOverlay from "@/components/LoadingOverlay";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Services from "@/components/sections/Services";
import InteriorTour from "@/components/sections/InteriorTour";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Marquee from "@/components/sections/Marquee";
import Instagram from "@/components/sections/Instagram";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);

  return (
    <main className="min-h-screen bg-cream text-charcoal w-full relative">
      {/* Loading Overlay */}
      <LoadingOverlay
        isReady={isHeroReady}
        progress={preloadProgress}
      />

      {/* Fixed Navigation */}
      <Navbar />

      {/* 12 Sections in exact order with matching IDs */}
      {/* 1. Hero (canvas scrub - frames1) */}
      <Hero
        onFirstFrameLoaded={() => setIsHeroReady(true)}
        onPreloadProgress={(loaded, total) =>
          setPreloadProgress((loaded / total) * 100)
        }
      />

      {/* 2. Trust Bar (awards/press marquee) */}
      <TrustBar />

      {/* 3. Before & After (drag reveal slider) */}
      <BeforeAfter />

      {/* 4. Services (4-card grid) */}
      <Services />

      {/* 5. Interior Tour (canvas scrub - frames2) */}
      <InteriorTour />

      {/* 6. Portfolio (horizontal scroll gallery) */}
      <Portfolio />

      {/* 7. Process (4-step how we work) */}
      <Process />

      {/* 8. Testimonials (card carousel) */}
      <Testimonials />

      {/* 9. Marquee (quote strip) */}
      <Marquee />

      {/* 10. Instagram (photo grid) */}
      <Instagram />

      {/* 11. CTA (book a consultation) */}
      <Cta />

      {/* 12. Footer */}
      <Footer />
    </main>
  );
}
