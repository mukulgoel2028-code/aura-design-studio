"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.96,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#cta",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="w-full min-h-[65vh] bg-deep-warm flex items-center justify-center py-20 px-6 relative overflow-hidden"
    >
      {/* Soft Spotlight Overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(201,169,110,0.08)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      {/* Centered Content Container */}
      <div
        ref={contentRef}
        className="max-w-[700px] mx-auto text-center relative z-10 flex flex-col items-center"
      >
        <span className="font-body text-[10px] text-gold tracking-[0.22em] uppercase mb-3 block font-medium">
          GET STARTED
        </span>

        <h2 className="font-display text-4xl lg:text-[60px] text-white leading-none uppercase font-normal mb-4">
          READY TO TRANSFORM YOUR SPACE?
        </h2>

        <p className="font-body text-base lg:text-[17px] text-white/70 leading-relaxed max-w-[580px] mb-10">
          Book a complimentary 30-minute consultation with our lead designer. We&apos;ll discuss your vision, your space, and the possibilities.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 w-full sm:w-auto">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-gold text-white font-body text-base lg:text-[18px] px-9 py-4 rounded-[2px] font-medium hover:bg-[#B8954A] transition-colors duration-300 text-center cursor-pointer"
          >
            Book a Consultation
          </a>

          <a
            href="#portfolio"
            className="w-full sm:w-auto bg-transparent border border-gold text-gold font-body text-base lg:text-[18px] px-9 py-4 rounded-[2px] font-medium hover:bg-white hover:text-charcoal hover:border-white transition-all duration-300 text-center cursor-pointer"
          >
            View Our Portfolio &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
