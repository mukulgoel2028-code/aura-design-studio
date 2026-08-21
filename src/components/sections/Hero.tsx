"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { initCanvasScrub } from "@/utils/canvasScrub";

interface HeroProps {
  onFirstFrameLoaded?: () => void;
  onPreloadProgress?: (loaded: number, total: number) => void;
}

export default function Hero({
  onFirstFrameLoaded,
  onPreloadProgress,
}: HeroProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Store callback props in refs to prevent unnecessary re-initializations
  const onFirstFrameLoadedRef = useRef(onFirstFrameLoaded);
  const onPreloadProgressRef = useRef(onPreloadProgress);

  useEffect(() => {
    onFirstFrameLoadedRef.current = onFirstFrameLoaded;
  }, [onFirstFrameLoaded]);

  useEffect(() => {
    onPreloadProgressRef.current = onPreloadProgress;
  }, [onPreloadProgress]);

  // Track scroll position to fade out scroll indicator when window.scrollY > 20
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // GSAP scroll-scrub initialization with responsive matchMedia (runs once on mount)
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop (>=768px): Full scroll-scrubbed canvas animation
    mm.add("(min-width: 768px)", () => {
      // Initially hide text overlay on desktop until 85% progress
      if (textOverlayRef.current) {
        gsap.set(textOverlayRef.current, { opacity: 0, y: 24 });
      }

      const cleanupScrub = initCanvasScrub({
        folder: "frames1",
        canvasRef,
        triggerRef,
        totalFrames: 270,
        pinDistance: "+=1620px",
        textRevealAt: 0.85,
        onTextReveal: (revealed) => {
          if (!textOverlayRef.current) return;
          if (revealed) {
            gsap.to(textOverlayRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            gsap.to(textOverlayRef.current, {
              opacity: 0,
              y: 24,
              duration: 0.4,
              ease: "power2.in",
              overwrite: "auto",
            });
          }
        },
        onFirstFrameLoaded: () => {
          setIsFirstFrameLoaded(true);
          onFirstFrameLoadedRef.current?.();
        },
        onProgress: (loaded, total) => {
          onPreloadProgressRef.current?.(loaded, total);
        },
      });

      return () => {
        cleanupScrub();
      };
    });

    // Mobile Fallback (<768px): Static overlay without canvas scrub
    mm.add("(max-width: 767px)", () => {
      if (textOverlayRef.current) {
        gsap.set(textOverlayRef.current, {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
      }
      setIsFirstFrameLoaded(true);
      onFirstFrameLoadedRef.current?.();
    });

    return () => {
      mm.revert();
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
      id="hero"
      ref={triggerRef}
      className="w-full h-screen relative overflow-hidden bg-deep-warm"
    >
      {/* Desktop Canvas (hidden on mobile) */}
      <canvas
        ref={canvasRef}
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      />

      {/* Mobile Video Fallback (<768px) */}
      <video
        src="/sequence/video1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="block md:hidden absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle atmospheric vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/40 pointer-events-none" />

      {/* Loading Indicator (centered at bottom until Frame 1 is loaded) */}
      {!isFirstFrameLoaded && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-36 md:w-48 bg-white/10 backdrop-blur-xs rounded-full overflow-hidden">
          <div className="bg-gold h-0.5 md:h-1 w-full animate-pulse" />
        </div>
      )}

      {/* Overlay Text Container */}
      <div
        ref={textOverlayRef}
        className="absolute z-10 bottom-12 left-1/2 -translate-x-1/2 w-[90%] text-center md:bottom-[60px] md:left-[60px] md:translate-x-0 md:w-auto md:max-w-xl md:text-left pointer-events-auto"
      >
        {/* Top Label */}
        <span className="font-body text-[11px] text-gold tracking-[0.18em] uppercase mb-3 block">
          AWARD-WINNING STUDIO
        </span>

        {/* Main Headline */}
        <h1 className="font-display text-4xl lg:text-[72px] text-white leading-[0.95] mb-4 uppercase">
          SPACES THAT TELL YOUR STORY
        </h1>

        {/* Subtext */}
        <p className="font-body text-base lg:text-lg text-white/70 mb-6">
          Crafting interiors that feel like home
        </p>

        {/* CTA Button */}
        <div>
          <a
            href="#portfolio"
            onClick={handleScrollToPortfolio}
            className="bg-gold text-white font-body text-sm px-6 py-3 rounded-full hover:bg-gold/90 transition-colors inline-block cursor-pointer font-medium tracking-wide shadow-md"
          >
            View Our Work &rarr;
          </a>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`mt-8 flex items-center justify-center md:justify-start transition-opacity duration-500 ${
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          <a
            href="#portfolio"
            onClick={handleScrollToPortfolio}
            className="inline-flex items-center space-x-2 text-white/60 hover:text-gold transition-colors cursor-pointer group"
            aria-label="Scroll down to explore"
          >
            <span className="font-body text-[11px] tracking-[0.2em] uppercase text-white/50 group-hover:text-gold transition-colors">
              Scroll
            </span>
            <svg
              className="w-4 h-4 text-gold animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
