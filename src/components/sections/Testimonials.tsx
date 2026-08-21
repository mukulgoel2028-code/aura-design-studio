"use client";

import { useState } from "react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "“AURA transformed our historic Tribeca loft into a living gallery of warmth and quiet grandeur. Their mastery over natural light and tactile materials is utterly incomparable in the architectural world.”",
      author: "Lord & Lady Sterling",
      title: "Private Residence, Tribeca NYC",
      year: "2025",
    },
    {
      quote:
        "“The turnkey execution was flawless. From quarrying custom travertine in Tivoli to designing custom lighting that adapts to the London sunset, every single millimeter was crafted with sublime reverence.”",
      author: "Julian Vance",
      title: "Mayfair Townhouse & Art Collector",
      year: "2024",
    },
    {
      quote:
        "“Working with AURA was the smoothest architectural journey we've ever experienced across 6 global properties. Their attention to acoustic softness and hidden functional joinery is peerless.”",
      author: "Elena Rossi-Katsaros",
      title: "Cap d'Antibes Cliff Estate",
      year: "2024",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="w-full py-24 md:py-32 bg-cream px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-body text-xs tracking-[0.25em] text-text-muted uppercase">
              Client Testimonials
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-charcoal font-normal">
            Echoes of Private Sanctuaries
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white p-8 md:p-16 rounded-3xl border border-charcoal/10 shadow-xl relative">
          {/* Subtle gold quote mark */}
          <div className="absolute top-6 left-8 font-display text-7xl text-gold/20 select-none pointer-events-none">
            “
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-1 mb-6 text-gold">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="font-display text-xl md:text-3xl text-charcoal font-normal leading-relaxed italic mb-8 min-h-[140px]">
              {current.quote}
            </p>

            <div className="flex flex-col md:flex-row md:items-center justify-between pt-6 border-t border-charcoal/10 gap-4">
              <div>
                <h4 className="font-body text-base font-semibold text-charcoal">
                  {current.author}
                </h4>
                <p className="font-body text-xs text-text-muted">
                  {current.title} • {current.year}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeIndex === idx ? "w-6 bg-gold" : "w-2 bg-charcoal/20"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-2 pl-4">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                    aria-label="Next testimonial"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
