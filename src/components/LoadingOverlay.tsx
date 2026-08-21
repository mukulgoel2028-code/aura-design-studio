"use client";

import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  progress?: number;
  isReady?: boolean;
}

export default function LoadingOverlay({
  progress = 0,
  isReady = false,
}: LoadingOverlayProps) {
  const [visible, setVisible] = useState(true);
  const [internalProgress, setInternalProgress] = useState(15);

  useEffect(() => {
    if (isReady) {
      setInternalProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const interval = setInterval(() => {
        setInternalProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 12;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isReady]);

  const displayProgress = progress > 0 ? progress : internalProgress;

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream transition-opacity duration-700 ${
        isReady ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-xs px-6 flex flex-col items-center">
        {/* Studio Monogram / Title */}
        <span className="font-display text-lg tracking-[0.25em] text-charcoal font-medium uppercase mb-6">
          AURA
        </span>

        {/* Thin Warm Gold Loading Bar */}
        <div className="w-full bg-charcoal/10 h-1 rounded-full overflow-hidden mb-3">
          <div
            className="bg-gold h-1 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, displayProgress))}%` }}
          />
        </div>

        {/* Subtitle */}
        <div className="flex items-center justify-between w-full font-body text-xs tracking-widest text-text-muted uppercase">
          <span>Loading Experience</span>
          <span>{Math.round(displayProgress)}%</span>
        </div>
      </div>
    </div>
  );
}
