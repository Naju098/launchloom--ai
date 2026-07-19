import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import DribbbleAnimation from "./DribbbleAnimation";

/**
 * HeroVideoLayer — Plays the Flow-generated video as the primary hero visual.
 *
 * - The video at /videos/launchloom-hero-loop.mp4 contains a realistic moving
 *   laptop with floating interface cards and animated connection lines.
 * - While the video loads, DribbbleAnimation renders as a seamless fallback.
 * - Once the video can play, DribbbleAnimation fades out and the video fades in.
 * - Respects prefers-reduced-motion.
 */
export default function HeroVideoLayer({ className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showFallback, setShowFallback] = useState(true);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    // Brief delay to let the video render its first frame, then fade out fallback
    setTimeout(() => setShowFallback(false), 400);
  }, []);

  const handleError = useCallback(() => {
    setVideoError(true);
    setShowFallback(true); // Keep fallback visible on error
    console.warn(
      "[HeroVideoLayer] Video failed to load. " +
        "Ensure /videos/launchloom-hero-loop.mp4 exists. " +
        "Keeping CSS animation fallback."
    );
  }, []);

  useEffect(() => {
    if (prefersReducedMotion && videoRef.current) {
      // Pause video when reduced motion is preferred
      videoRef.current.pause();
    }
  }, [prefersReducedMotion]);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[var(--va-border)] bg-[var(--va-panel)] shadow-2xl shadow-black/40 ${className}`}
    >
      {/* DribbbleAnimation fallback — visible while video loads or on error */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: showFallback && (videoError || !videoReady) ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ pointerEvents: "none" }}
      >
        <DribbbleAnimation className="h-full w-full" />
      </motion.div>

      {/* Actual video — fades in once ready */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady && !videoError && !prefersReducedMotion ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-contain"
          onCanPlay={handleCanPlay}
          onLoadedData={handleCanPlay}
          onError={handleError}
          aria-hidden="true"
        >
          <source src="/videos/launchloom-hero-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Subtle inner glow overlay to blend video with the dark theme */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-transparent to-[var(--va-base)]/40" />

      {/* Edge ring */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[var(--va-magenta)]/15" />
    </div>
  );
}
