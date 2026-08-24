"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { initCanvasScrub } from "@/utils/canvasScrub";

export default function InteriorTour() {
  const triggerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 12 });
    }

    const cleanupScrub = initCanvasScrub({
      folder: "frames2",
      canvasRef,
      triggerRef,
      totalFrames: 270,
      pinDistance: "+=1620px",
      textRevealAt: 0.9,
      onTextReveal: (revealed) => {
        if (!ctaRef.current) return;
        if (revealed) {
          gsap.to(ctaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(ctaRef.current, {
            opacity: 0,
            y: 12,
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
          });
        }
      },
    });

    return () => {
      cleanupScrub();
    };
  }, []);

  const handleScrollToPortfolio = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const portfolioEl = document.getElementById("portfolio");
    if (portfolioEl) {
      portfolioEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#portfolio";
    }
  };

  return (
    <section
      id="interior-tour"
      ref={triggerRef}
      className="w-full h-screen relative overflow-hidden bg-charcoal"
    >
      {/* Full-bleed Canvas Element */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover absolute inset-0 z-0"
      />

      {/* Readability Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-charcoal/80 via-charcoal/30 to-transparent md:from-charcoal/65 md:via-charcoal/20 md:to-transparent" />

      {/* Left-Side Text Content (Always visible during pin) */}
      <div className="absolute left-1/2 -translate-x-1/2 md:left-[60px] md:translate-x-0 top-1/2 -translate-y-1/2 z-20 w-[90%] md:w-auto md:max-w-[380px] text-center md:text-left pointer-events-auto">
        {/* Small Label */}
        <span className="font-body text-[10px] text-gold tracking-[0.2em] uppercase mb-3 block font-medium">
          INTERIOR SPACES
        </span>

        {/* Main Heading */}
        <h2 className="font-display text-3xl md:text-[52px] text-white leading-none mb-4 uppercase font-normal">
          WHERE FUNCTION MEETS BEAUTY
        </h2>

        {/* Body Text */}
        <p className="font-body text-sm md:text-base text-white/75 leading-relaxed mb-6">
          Every material, every detail chosen with intention. Spaces that
          inspire as much as they serve.
        </p>

        {/* Scroll Progress CTA Reveal (Triggers at 90% scroll progress) */}
        <div>
          <a
            href="#portfolio"
            ref={ctaRef}
            onClick={handleScrollToPortfolio}
            className="inline-flex items-center gap-2 font-body text-base text-gold font-medium hover:underline cursor-pointer transition-colors"
          >
            Explore Full Portfolio &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

