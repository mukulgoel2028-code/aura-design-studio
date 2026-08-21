"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Discovery & Brief",
    description:
      "Understanding your vision, spatial requirements, and aesthetic aspirations in detail.",
  },
  {
    number: "02",
    title: "Concept Design",
    description:
      "Translating ideas into mood boards, 3D visualizations, and spatial layout plans.",
  },
  {
    number: "03",
    title: "Material Sourcing",
    description:
      "Curating bespoke furniture, premium finishes, and artisanal interior accents.",
  },
  {
    number: "04",
    title: "Final Delivery",
    description:
      "Precision execution, on-site installation, and final styling for seamless handover.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".process-step", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#process",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="w-full bg-charcoal text-white py-20 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Centered Header Container */}
      <div className="max-w-xl mx-auto text-center mb-16 lg:mb-20">
        <span className="font-body text-[10px] text-gold tracking-[0.2em] uppercase mb-2 block font-medium">
          HOW WE WORK
        </span>
        <h2 className="font-display text-3xl lg:text-[48px] text-white leading-tight uppercase font-normal">
          THE PROCESS
        </h2>
      </div>

      {/* 4-Step Grid & Timeline Architecture */}
      <div className="max-w-6xl mx-auto relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
        {/* Desktop Connecting Line */}
        <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-[1px] bg-gold/30 z-0" />

        {steps.map((step) => (
          <div
            key={step.number}
            className="process-step relative flex flex-col items-center text-center z-10 group"
          >
            {/* Step Number Badge */}
            <div className="w-12 h-12 rounded-full border border-gold/40 bg-charcoal flex items-center justify-center mb-4 transition-colors duration-300 group-hover:border-gold">
              <span className="font-display text-[20px] text-gold font-normal">
                {step.number}
              </span>
            </div>

            {/* Step Title */}
            <h3 className="font-display text-xl lg:text-[22px] text-white font-normal mb-2 mt-2">
              {step.title}
            </h3>

            {/* Description */}
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-[280px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
