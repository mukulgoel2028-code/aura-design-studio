"use client";

import React, { useRef } from "react";

interface Project {
  title: string;
  tag: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Andheri Residence",
    tag: "RESIDENTIAL",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Lower Parel Office",
    tag: "COMMERCIAL",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Bandra Villa",
    tag: "RESIDENTIAL",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Worli Penthouse",
    tag: "RESIDENTIAL",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Juhu Townhouse",
    tag: "RESIDENTIAL",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "BKC Studio",
    tag: "COMMERCIAL",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Portfolio() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = galleryRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !galleryRef.current) return;
    e.preventDefault();
    const walk = e.clientX - startX.current;
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <section
      id="portfolio"
      className="w-full bg-white py-20 relative overflow-hidden"
    >
      {/* Section Header Block */}
      <div className="max-w-xl mx-auto text-center mb-12 px-6">
        <span className="font-body text-[10px] text-gold tracking-[0.2em] uppercase mb-2 block font-medium">
          OUR WORK
        </span>
        <h2 className="font-display text-3xl lg:text-[48px] text-charcoal leading-tight uppercase font-normal mb-3">
          SELECTED PROJECTS
        </h2>
        <p className="font-body text-base text-text-muted max-w-[50ch] mx-auto">
          A collection of spaces we&apos;ve had the privilege to design
        </p>
      </div>

      {/* Horizontal Scroll Gallery Container */}
      <div
        ref={galleryRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex gap-6 overflow-x-auto px-6 md:px-[60px] py-6 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="w-[340px] flex-shrink-0 snap-start flex flex-col group"
          >
            {/* Image Wrapper */}
            <div className="relative w-[340px] h-[460px] overflow-hidden rounded-[2px] mb-4">
              <img
                src={project.image}
                alt={project.title}
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out flex items-center justify-center">
                <span className="font-body text-sm text-white font-medium tracking-wide">
                  View Project &rarr;
                </span>
              </div>
            </div>

            {/* Metadata Block */}
            <span className="font-body text-[11px] text-gold tracking-[0.14em] uppercase mb-1 font-medium">
              {project.tag}
            </span>
            <h3 className="font-display text-xl lg:text-[20px] text-charcoal font-normal">
              {project.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
