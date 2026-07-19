/**
 * ScrollProgress — A thin animated progress bar at the top of the page.
 * Uses a scroll event listener for reliable cross-browser behavior.
 */
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

    handleScroll(); // Set initial value
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left"
      style={{
        scaleX: progress,
        background:
          "linear-gradient(90deg, var(--va-magenta) 0%, var(--va-teal) 50%, var(--va-amber) 100%)",
        boxShadow: "0 0 10px var(--va-magenta), 0 0 20px rgba(233,64,127,0.3)",
        opacity: progress > 0.01 ? 1 : 0,
      }}
    />
  );
}
