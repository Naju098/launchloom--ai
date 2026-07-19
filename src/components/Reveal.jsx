import { motion } from "motion/react";

/**
 * Reusable scroll-triggered reveal wrapper.
 * Animates children with fade-up when they enter the viewport.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
  duration = 0.5,
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
