import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(90deg, var(--va-magenta) 0%, var(--va-teal) 50%, var(--va-amber) 100%)",
          boxShadow: "0 0 10px var(--va-magenta), 0 0 20px rgba(233,64,127,0.3)",
          opacity: progress > 0.01 ? 1 : 0,
        }}
      />
      {/* Glow trail */}
      <motion.div
        className="fixed top-[3px] left-0 right-0 z-[199] h-[8px] origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(90deg, rgba(233,64,127,0.15) 0%, rgba(6,182,212,0.1) 50%, rgba(245,158,11,0.05) 100%)",
          filter: "blur(6px)",
          opacity: progress > 0.01 ? 0.6 : 0,
        }}
      />
    </>
  );
}
