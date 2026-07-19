import { motion } from "motion/react";

/**
 * A single floating card in the 3D launch workspace.
 * Accepts depth (translateZ), position, and card content.
 */
export default function FloatingLaunchCard({
  children,
  className = "",
  depth = 0, // translateZ value (px)
  initialX = 0,
  initialY = 0,
  floatAmount = 4,
  floatDuration = 5,
  delay = 0,
  style = {},
}) {
  return (
    <motion.div
      className={`absolute rounded-xl border border-slate-200/80 bg-white/90 shadow-lg shadow-slate-200/30 backdrop-blur-sm ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${depth}px)`,
        willChange: "transform",
        ...style,
      }}
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0.9 }}
      animate={{
        x: initialX,
        y: [initialY - floatAmount, initialY + floatAmount, initialY - floatAmount],
        opacity: 1,
        scale: 1,
      }}
      transition={{
        x: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
