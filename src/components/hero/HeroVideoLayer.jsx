import { useRef, useState, useCallback } from "react";

/**
 * HeroVideoLayer — Plays ONLY the Flow-generated hero video.
 *
 * No DribbbleAnimation — that lives only in LivePreviewSection below.
 * Uses import.meta.env.BASE_URL so the path works on both
 * localhost (/) and GitHub Pages (/launchloom--ai/).
 */
const videoSrc = `${import.meta.env.BASE_URL}videos/launchloom-hero-loop.mp4`;

export default function HeroVideoLayer({ className = "" }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[var(--va-border)] bg-[var(--va-panel)] shadow-2xl shadow-black/40 ${className}`}
    >
      {/* Gradient placeholder — fades out once video loads */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--va-elevated)] via-[var(--va-panel)] to-[var(--va-base)] transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video — fades in once loaded */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`h-full w-full object-contain transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onCanPlay={handleLoad}
        onLoadedData={handleLoad}
        onError={() => console.warn("[HeroVideoLayer] Video failed to load")}
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Subtle bottom gradient to blend video with the dark theme */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-transparent to-[var(--va-base)]/30" />

      {/* Edge ring */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[var(--va-magenta)]/15" />
    </div>
  );
}
