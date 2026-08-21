"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { label: "Work", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#cta" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-charcoal/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Studio Name */}
        <Link
          href="#hero"
          className="font-display text-lg tracking-widest text-charcoal hover:text-gold transition-colors duration-300 font-semibold uppercase"
        >
          AURA STUDIO
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <nav className="flex items-center space-x-8 font-body text-sm tracking-wider uppercase text-charcoal/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Far Right: Book a Call Pill Button */}
          <a
            href="#cta"
            className="bg-gold text-white font-body text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#b5955a] transition-colors duration-300 shadow-sm"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-charcoal p-2 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-charcoal/10 px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-body text-sm uppercase tracking-wider text-charcoal">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <a
              href="#cta"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block w-full text-center bg-gold text-white font-body text-sm font-medium px-5 py-3 rounded-full hover:bg-[#b5955a] transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
