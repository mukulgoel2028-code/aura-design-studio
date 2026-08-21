"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export default function BeforeAfter() {
  const [percent, setPercent] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const targetClientXRef = useRef<number | null>(null);
  const hasUserInteractedRef = useRef<boolean>(false);
  const autoDemoTweenRef = useRef<gsap.core.Timeline | null>(null);
  const hasAutoPlayedRef = useRef<boolean>(false);

  // Position update math clamped between 2% and 98%
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const rawX = clientX - rect.left;
    const rawPercent = (rawX / rect.width) * 100;
    const clamped = Math.min(98, Math.max(2, rawPercent));
    setPercent(clamped);
  }, []);

  // Cancel any active GSAP auto-demo when user initiates manual drag
  const stopAutoDemo = useCallback(() => {
    hasUserInteractedRef.current = true;
    if (autoDemoTweenRef.current) {
      autoDemoTweenRef.current.kill();
      autoDemoTweenRef.current = null;
    }
  }, []);

  // RAF loop for buttery smooth 60fps/120fps drag updates
  const scheduleUpdate = useCallback(
    (clientX: number) => {
      targetClientXRef.current = clientX;
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          if (targetClientXRef.current !== null) {
            updatePosition(targetClientXRef.current);
          }
          rafIdRef.current = null;
        });
      }
    },
    [updatePosition]
  );

  // Mouse and touch interaction handlers
  const handlePointerDown = (clientX: number) => {
    stopAutoDemo();
    isDraggingRef.current = true;
    setIsDragging(true);
    updatePosition(clientX);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerDown(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handlePointerDown(e.touches[0].clientX);
    }
  };

  // Keyboard accessibility handler for arrow keys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    stopAutoDemo();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPercent((prev) => Math.max(2, prev - 3));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPercent((prev) => Math.min(98, prev + 3));
    }
  };

  // Passive window event listeners for active dragging
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      scheduleUpdate(e.clientX);
    };

    const handleWindowMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      scheduleUpdate(e.touches[0].clientX);
    };

    const handleWindowTouchEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    window.addEventListener("mouseup", handleWindowMouseUp, { passive: true });
    window.addEventListener("touchmove", handleWindowTouchMove, { passive: true });
    window.addEventListener("touchend", handleWindowTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleWindowTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("touchend", handleWindowTouchEnd);
      window.removeEventListener("touchcancel", handleWindowTouchEnd);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scheduleUpdate]);

  // GSAP Auto-Demo with IntersectionObserver
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          !hasAutoPlayedRef.current &&
          !hasUserInteractedRef.current
        ) {
          hasAutoPlayedRef.current = true;
          observer.disconnect();

          const animObj = { val: 50 };
          const tl = gsap.timeline({
            onComplete: () => {
              autoDemoTweenRef.current = null;
            },
          });

          tl.to(animObj, {
            val: 22,
            duration: 0.9,
            ease: "power2.inOut",
            onUpdate: () => {
              if (!hasUserInteractedRef.current) {
                setPercent(animObj.val);
              }
            },
          }).to(animObj, {
            val: 50,
            duration: 0.9,
            delay: 0.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (!hasUserInteractedRef.current) {
                setPercent(animObj.val);
              }
            },
          });

          autoDemoTweenRef.current = tl;
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (autoDemoTweenRef.current) {
        autoDemoTweenRef.current.kill();
      }
    };
  }, []);

  return (
    <section
      id="before-after"
      ref={sectionRef}
      className="w-full bg-deep-warm text-white py-16 md:py-20 relative overflow-hidden"
    >
      {/* Header Block */}
      <div className="text-center max-w-4xl mx-auto px-6 mb-10 md:mb-14 relative z-10 flex flex-col items-center">
        <span className="font-body text-[10px] text-gold tracking-[0.22em] uppercase mb-2 block">
          TRANSFORMATION
        </span>
        <h2 className="font-display text-4xl lg:text-[56px] text-white leading-tight mb-3 uppercase">
          BEFORE &amp; AFTER
        </h2>
        <p className="font-body text-sm lg:text-base text-white/60 mb-4">
          Drag to reveal the transformation
        </p>

        {/* Oscillating Indicator */}
        <div
          className="inline-flex items-center justify-center animate-oscillate-x text-gold/80"
          aria-hidden="true"
        >
          <svg
            width="34"
            height="14"
            viewBox="0 0 34 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-gold"
          >
            <path
              d="M6 2L1 7L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 7H33"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M28 2L33 7L28 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Slider Container & Visual Layers */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Interactive before and after comparison slider"
        className={`relative w-full h-[48vh] lg:h-[68vh] overflow-hidden select-none cursor-col-resize touch-none ${
          isDragging ? "cursor-grabbing" : "cursor-col-resize"
        }`}
      >
        {/* Layer 1 (AFTER - Bottom): Actual furnished interior image with subtle overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/after-image.webp"
            alt="Furnished luxury interior after transformation"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
          {/* Subtle contrast overlay */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

        {/* Layer 2 (BEFORE - Top): Raw space image with dynamic clip-path */}
        <div
          className="absolute inset-0 w-full h-full will-change-[clip-path] pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - percent}% 0 0)`,
          }}
        >
          <img
            src="/before-image.webp"
            alt="Raw space before renovation"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
          {/* Subtle contrast overlay */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>

        {/* Badges */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-black/55 backdrop-blur-md text-white text-[11px] font-body tracking-[0.14em] px-3.5 py-1.5 rounded uppercase pointer-events-none shadow-md">
          BEFORE
        </div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-gold/85 text-white text-[11px] font-body tracking-[0.14em] px-3.5 py-1.5 rounded uppercase pointer-events-none shadow-md backdrop-blur-xs">
          AFTER
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white/90 z-20 pointer-events-none will-change-[left] shadow-[0_0_12px_rgba(0,0,0,0.35)]"
          style={{ left: `${percent}%` }}
        />

        {/* Drag Handle Circle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-[60px] h-[60px] lg:w-[52px] lg:h-[52px] rounded-full bg-white border-2 border-gold/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-200 ${
            isDragging ? "scale-110 cursor-grabbing shadow-[0_6px_24px_rgba(0,0,0,0.4)]" : "cursor-grab"
          }`}
          style={{ left: `${percent}%` }}
          role="slider"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={2}
          aria-valuemax={98}
          aria-label="Drag before and after position"
        >
          {/* 18px horizontal arrow SVG */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="fill-charcoal pointer-events-none"
            aria-hidden="true"
          >
            <path d="M8.5 7L3.5 12L8.5 17V13.5H15.5V17L20.5 12L15.5 7V10.5H8.5V7Z" />
          </svg>
        </div>
      </div>

      {/* Editorial Stat Strip (Below Slider) */}
      <div className="max-w-6xl mx-auto pt-12 pb-8 px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        {/* Box 1 */}
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-5xl lg:text-[52px] text-gold mb-1">
            200+
          </span>
          <span className="font-body text-xs lg:text-[13px] text-white/70 uppercase tracking-wider">
            Projects Completed
          </span>
        </div>

        {/* Separator 1 */}
        <div className="h-12 w-[1px] bg-gold/20 hidden md:block" aria-hidden="true" />

        {/* Box 2 */}
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-5xl lg:text-[52px] text-gold mb-1">
            15
          </span>
          <span className="font-body text-xs lg:text-[13px] text-white/70 uppercase tracking-wider">
            Years of Experience
          </span>
        </div>

        {/* Separator 2 */}
        <div className="h-12 w-[1px] bg-gold/20 hidden md:block" aria-hidden="true" />

        {/* Box 3 */}
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-5xl lg:text-[52px] text-gold mb-1">
            50+
          </span>
          <span className="font-body text-xs lg:text-[13px] text-white/70 uppercase tracking-wider">
            Design Awards
          </span>
        </div>
      </div>
    </section>
  );
}

