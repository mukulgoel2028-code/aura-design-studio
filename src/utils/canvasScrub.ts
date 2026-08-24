import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Resolves local image asset path for sequence frame.
 * Maps calculated mobile step indices back to valid local frame files in /sequence/${folder}/.
 * Format: /sequence/${folder}/${folder}_${String(rawIndex + 1).padStart(4, '0')}.jpg
 */
export function getFrameURL(
  folder: string,
  frameIndex: number,
  step: number = 1
): string {
  const rawIndex = frameIndex * step;
  return `/sequence/${folder}/${folder}_${String(rawIndex + 1).padStart(4, "0")}.webp`;
}

export interface InitCanvasScrubOptions {
  folder: "frames1" | "frames2" | string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
  totalFrames: number;
  pinDistance?: string | number;
  textRevealAt?: number;
  onTextReveal?: (revealed: boolean, progress: number) => void;
  onFirstFrameLoaded?: () => void;
  onProgress?: (loaded: number, total: number) => void;
}

/**
 * Initializes canvas frame scrubbing with mobile memory safety,
 * Retina DPR scaling, passive touch & scroll event handling,
 * and 3-phase progressive preloading.
 */
export function initCanvasScrub({
  folder,
  canvasRef,
  triggerRef,
  totalFrames,
  pinDistance = "+=2500",
  textRevealAt = 0.5,
  onTextReveal,
  onFirstFrameLoaded,
  onProgress,
}: InitCanvasScrubOptions): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const canvas = canvasRef.current;
  const trigger = triggerRef.current;

  if (!canvas || !trigger) {
    return () => {};
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return () => {};
  }

  let isDisposed = false;
  let currentFrameIndex = 0;

  // 1. Mobile Memory Cap & Frame Sub-sampling (avoids iOS Safari OOM)
  const isMobile = window.innerWidth < 768;
  const step = isMobile ? 2 : 1;
  const effectiveFrames = isMobile
    ? Math.min(Math.ceil(totalFrames / step), 150)
    : totalFrames;

  const images: (HTMLImageElement | null)[] = new Array(effectiveFrames).fill(null);
  let loadedCount = 0;
  let idleHandle: number | ReturnType<typeof setTimeout> | null = null;

  /**
   * 2. Canvas Sharpness & DPR Scaling:
   * Sets canvas buffer dimensions multiplied by DPR (capped at 2x for mobile GPU efficiency)
   * and applies ctx.scale(dpr, dpr) for crisp Retina display.
   */
  const resizeCanvas = () => {
    if (!canvas || !ctx || isDisposed) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    // Physical pixel dimensions for Retina sharpness
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Explicit CSS logical dimensions to avoid blurry browser scaling
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    renderFrame(currentFrameIndex);
  };

  /**
   * Fallback Rendering Algorithm:
   * Checks if images[frameIndex] is loaded. If false, searches backward first
   * (frameIndex - 1, frameIndex - 2...) then forward (frameIndex + 1...)
   * to find and return the closest already-loaded HTMLImageElement.
   */
  const getNearestLoadedImage = (
    frameIndex: number
  ): HTMLImageElement | null => {
    if (images[frameIndex]?.complete && images[frameIndex]?.naturalWidth) {
      return images[frameIndex];
    }
    // Search backward
    for (let i = frameIndex - 1; i >= 0; i--) {
      if (images[i]?.complete && images[i]?.naturalWidth) {
        return images[i];
      }
    }
    // Search forward
    for (let i = frameIndex + 1; i < effectiveFrames; i++) {
      if (images[i]?.complete && images[i]?.naturalWidth) {
        return images[i];
      }
    }
    return null;
  };

  /**
   * 4. Draw & Render Logic:
   * Uses object-fit: cover math calculated against logical CSS dimensions
   * so DPR scaling does not distort aspect ratios.
   */
  const renderFrame = (index: number) => {
    if (isDisposed || !ctx || !canvas) return;
    currentFrameIndex = index;

    const img = getNearestLoadedImage(index);
    if (!img || !img.naturalWidth || !img.naturalHeight) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const logicalWidth = rect.width || window.innerWidth;
    const logicalHeight = rect.height || window.innerHeight;

    // Clear logical canvas area
    ctx.clearRect(0, 0, logicalWidth, logicalHeight);

    // Object-fit: cover scale math against logical viewport dimensions
    const scale = Math.max(
      logicalWidth / img.naturalWidth,
      logicalHeight / img.naturalHeight
    );
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const x = (logicalWidth - drawWidth) / 2;
    const y = (logicalHeight - drawHeight) / 2;

    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  };

  /**
   * Helper to load a single frame by index as a Promise.
   */
  const loadSingleFrame = (index: number): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      if (isDisposed) {
        resolve(null);
        return;
      }
      if (images[index]?.complete && images[index]?.naturalWidth) {
        resolve(images[index]);
        return;
      }

      const img = new Image();
      img.src = getFrameURL(folder, index, step);

      img.onload = () => {
        if (isDisposed) {
          resolve(null);
          return;
        }
        images[index] = img;
        loadedCount++;
        onProgress?.(loadedCount, effectiveFrames);

        // If current scrub position is at this frame (or using fallback), re-render
        if (currentFrameIndex === index) {
          renderFrame(currentFrameIndex);
        }
        resolve(img);
      };

      img.onerror = () => {
        resolve(null);
      };
    });
  };

  /**
   * 3-Phase Progressive Preloader:
   * Phase 1 — Instant Boot (~0.2s): Load Frame 0 first and render immediately.
   * Phase 2 — Keyframe Striding (~1.0s): Load every 5th frame in batches of 10.
   * Phase 3 — Background Fill: Load remaining intermediate frames silently via requestIdleCallback.
   */
  const startProgressivePreload = async () => {
    // Phase 1: Instant Boot (Frame 0)
    const firstImg = await loadSingleFrame(0);
    if (isDisposed) return;

    if (firstImg) {
      resizeCanvas();
      renderFrame(0);
      onFirstFrameLoaded?.();
      ScrollTrigger.refresh();
    }

    // Phase 2: Keyframe Striding (Every 5th frame in batches of 10)
    const keyframeIndices: number[] = [];
    for (let i = 5; i < effectiveFrames; i += 5) {
      if (!images[i]) {
        keyframeIndices.push(i);
      }
    }
    if (
      (effectiveFrames - 1) % 5 !== 0 &&
      effectiveFrames > 1 &&
      !images[effectiveFrames - 1]
    ) {
      keyframeIndices.push(effectiveFrames - 1);
    }

    const batchSize = 10;
    for (let i = 0; i < keyframeIndices.length; i += batchSize) {
      if (isDisposed) return;
      const batch = keyframeIndices.slice(i, i + batchSize);
      await Promise.all(batch.map((idx) => loadSingleFrame(idx)));
    }

    if (isDisposed) return;

    // Phase 3: Background Fill (Remaining intermediate frames via requestIdleCallback)
    const remainingIndices: number[] = [];
    for (let i = 0; i < effectiveFrames; i++) {
      if (!images[i]) {
        remainingIndices.push(i);
      }
    }

    const scheduleBackgroundFill = () => {
      if (isDisposed || remainingIndices.length === 0) return;

      const hasIdleCallback =
        typeof window !== "undefined" && "requestIdleCallback" in window;

      if (hasIdleCallback) {
        idleHandle = (
          window as Window & {
            requestIdleCallback: (
              cb: (deadline: {
                didTimeout: boolean;
                timeRemaining: () => number;
              }) => void,
              options?: { timeout: number }
            ) => number;
          }
        ).requestIdleCallback(
          (deadline) => {
            if (isDisposed) return;
            while (
              (deadline.timeRemaining() > 5 || deadline.didTimeout) &&
              remainingIndices.length > 0
            ) {
              const nextIdx = remainingIndices.shift();
              if (nextIdx !== undefined) {
                loadSingleFrame(nextIdx);
              }
            }
            if (remainingIndices.length > 0 && !isDisposed) {
              scheduleBackgroundFill();
            }
          },
          { timeout: 2000 }
        );
      } else {
        idleHandle = setTimeout(() => {
          if (isDisposed) return;
          const batch = remainingIndices.splice(0, 5);
          Promise.all(batch.map((idx) => loadSingleFrame(idx))).then(() => {
            if (remainingIndices.length > 0 && !isDisposed) {
              scheduleBackgroundFill();
            }
          });
        }, 50);
      }
    };

    scheduleBackgroundFill();
  };

  // Run resizeCanvas() once during canvas initialization before rendering initial frame
  resizeCanvas();
  startProgressivePreload();

  // 2. Bind resizeCanvas() to resize and orientationchange window events
  window.addEventListener("resize", resizeCanvas, { passive: true });
  window.addEventListener("orientationchange", resizeCanvas, { passive: true });

  // 3. Touch & Passive Event Handling
  const handleScrollOrTouch = () => {
    if (isDisposed) return;
    ScrollTrigger.update();
  };

  window.addEventListener("scroll", handleScrollOrTouch, { passive: true });
  trigger.addEventListener("touchstart", handleScrollOrTouch, { passive: true });
  trigger.addEventListener("touchmove", handleScrollOrTouch, { passive: true });

  // GSAP ScrollTrigger setup
  const endValue =
    typeof pinDistance === "number" ? `+=${pinDistance}` : pinDistance;

  const gsapCtx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: endValue,
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const frameIndex = Math.min(
          effectiveFrames - 1,
          Math.max(0, Math.floor(progress * (effectiveFrames - 1)))
        );

        renderFrame(frameIndex);

        if (onTextReveal && textRevealAt !== undefined) {
          onTextReveal(progress >= textRevealAt, progress);
        }
      },
    });
  });

  // Cleanup handler
  return () => {
    isDisposed = true;

    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("orientationchange", resizeCanvas);
    window.removeEventListener("scroll", handleScrollOrTouch);
    trigger.removeEventListener("touchstart", handleScrollOrTouch);
    trigger.removeEventListener("touchmove", handleScrollOrTouch);

    if (idleHandle !== null) {
      if (
        typeof window !== "undefined" &&
        "cancelIdleCallback" in window &&
        typeof idleHandle === "number"
      ) {
        (
          window as Window & {
            cancelIdleCallback: (handle: number) => void;
          }
        ).cancelIdleCallback(idleHandle);
      } else {
        clearTimeout(idleHandle as ReturnType<typeof setTimeout>);
      }
    }

    gsapCtx.revert();
  };
}
