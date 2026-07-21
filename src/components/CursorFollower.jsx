import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * CursorFollower — Animated custom cursor with:
 * - A bright center dot (magenta glow)
 * - A trailing ring that expands on interactive elements
 * - GPU-composited via motion animate prop
 * - Respects prefers-reduced-motion
 */
export default function CursorFollower() {
  const prefersReducedMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      dotRef.current.x = e.clientX;
      dotRef.current.y = e.clientY;

      const target = e.target;
      const interactive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest('[class*="venture-card"]') ||
        target.closest('[class*="hover-scale"]') ||
        target.closest('[class*="border-glow"]');

      setIsHovering(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      setPos({
        x: dotRef.current.x,
        y: dotRef.current.y,
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Glow dot - using motion animate for GPU compositing */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          background: "var(--va-magenta)",
          boxShadow: "0 0 15px var(--va-magenta), 0 0 30px rgba(233,64,127,0.3)",
          translate: "-50% -50%",
          willChange: "transform",
        }}
        animate={{
          left: pos.x,
          top: pos.y,
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          left: { duration: 0 },
          top: { duration: 0 },
          width: { duration: 0.2, ease: "easeOut" },
          height: { duration: 0.2, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Glow ring - using motion animate for GPU compositing */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          border: "1px solid rgba(233,64,127,0.2)",
          translate: "-50% -50%",
          willChange: "transform",
        }}
        animate={{
          left: pos.x,
          top: pos.y,
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          borderColor: isHovering ? "rgba(233,64,127,0.5)" : "rgba(233,64,127,0.2)",
          background: isHovering ? "rgba(233,64,127,0.05)" : "transparent",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          left: { duration: 0.05, ease: "linear" },
          top: { duration: 0.05, ease: "linear" },
          width: { duration: 0.3, ease: "easeOut" },
          height: { duration: 0.3, ease: "easeOut" },
          borderColor: { duration: 0.3 },
          background: { duration: 0.3 },
          opacity: { duration: 0.3 },
        }}
      />
    </>
  );
}
