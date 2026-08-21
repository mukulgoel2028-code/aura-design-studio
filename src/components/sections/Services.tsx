"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    id: "residential",
    title: "Residential Design",
    description:
      "Bespoke spatial planning, turnkey architectural renovations, and refined living palettes crafted for luxury private residences.",
    icon: (
      <svg
        className="w-10 h-10 mb-6 text-gold stroke-[1.5]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5 18L20 6L35 18V34H5V18Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 34V22H25V34"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M20 11V15" strokeLinecap="round" />
        <path d="M5 34H35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "commercial",
    title: "Commercial Spaces",
    description:
      "High-impact corporate headquarters, boutique hospitality venues, and experiential retail environments engineered for distinction.",
    icon: (
      <svg
        className="w-10 h-10 mb-6 text-gold stroke-[1.5]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="6"
          y="6"
          width="16"
          height="28"
          rx="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="22"
          y="14"
          width="12"
          height="20"
          rx="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 12H17M11 18H17M11 24H17M27 20H30M27 26H30"
          strokeLinecap="round"
        />
        <path d="M4 34H36" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "furniture",
    title: "Furniture & Styling",
    description:
      "Custom artisan joinery, rare European collectible curation, and tactile textile orchestration tailored to each unique interior.",
    icon: (
      <svg
        className="w-10 h-10 mb-6 text-gold stroke-[1.5]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M9 31V35M31 31V35" strokeLinecap="round" />
        <path
          d="M7 18C7 15.7909 8.79086 14 11 14H29C31.2091 14 33 15.7909 33 18V24C33 26.2091 31.2091 28 29 28H11C8.79086 28 7 26.2091 7 24V18Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 14V10C11 7.79086 12.7909 6 15 6H25C27.2091 6 29 7.79086 29 10V14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6 21H10M30 21H34" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "visualization",
    title: "3D Visualization",
    description:
      "Photorealistic architectural renderings, cinematic spatial simulations, and precise lighting walkthroughs prior to construction.",
    icon: (
      <svg
        className="w-10 h-10 mb-6 text-gold stroke-[1.5]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M20 5L34 13V27L20 35L6 27V13L20 5Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M20 5V35" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M6 13L20 20.5L34 13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 9L27 16.5"
          strokeLinecap="round"
          strokeDasharray="1.5 2"
        />
      </svg>
    ),
  },
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#services",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="w-full bg-cream py-20 px-6 md:px-12 relative"
    >
      {/* Centered Header Container */}
      <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-[60px]">
        <span className="font-body text-[10px] text-gold tracking-[0.2em] uppercase mb-2 block font-medium">
          WHAT WE OFFER
        </span>
        <h2 className="font-display text-3xl lg:text-[48px] text-charcoal leading-tight uppercase font-normal">
          OUR EXPERTISE
        </h2>
      </div>

      {/* 4-Card Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card bg-white border border-gold/40 rounded-[2px] p-8 lg:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out flex flex-col justify-between group"
          >
            {/* Top Content: Architectural Icon + Title + Description */}
            <div>
              {/* 1. Architectural SVG Icon */}
              {service.icon}

              {/* 2. Service Title */}
              <h3 className="font-display text-xl lg:text-[22px] text-charcoal mb-3 font-normal">
                {service.title}
              </h3>

              {/* 3. Service Description */}
              <p className="font-body text-sm lg:text-[15px] text-text-muted leading-relaxed mb-6 line-clamp-2">
                {service.description}
              </p>
            </div>

            {/* 4. Footer Link */}
            <a
              href="#contact"
              className="font-body text-[13px] text-gold font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200 cursor-pointer mt-auto"
            >
              Learn more &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

