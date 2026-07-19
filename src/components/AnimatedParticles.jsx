/**
 * AnimatedParticles — Subtle floating diamond particles in the hero background.
 * Lightweight, uses Motion transforms only (no canvas), respects reduced motion.
 */
import { motion } from "motion/react";

const particles = [
  { id: 1, x: "15%", y: "20%", size: 4, delay: 0, duration: 8, drift: 25, opacity: 0.12 },
  { id: 2, x: "75%", y: "15%", size: 3, delay: 1.5, duration: 10, drift: 20, opacity: 0.1 },
  { id: 3, x: "85%", y: "60%", size: 5, delay: 0.8, duration: 9, drift: 30, opacity: 0.08 },
  { id: 4, x: "20%", y: "75%", size: 3, delay: 2.5, duration: 11, drift: 22, opacity: 0.1 },
  { id: 5, x: "50%", y: "10%", size: 2, delay: 1, duration: 7, drift: 18, opacity: 0.15 },
  { id: 6, x: "60%", y: "80%", size: 4, delay: 3, duration: 12, drift: 28, opacity: 0.08 },
  { id: 7, x: "90%", y: "35%", size: 3, delay: 0.5, duration: 9.5, drift: 24, opacity: 0.1 },
  { id: 8, x: "10%", y: "50%", size: 2, delay: 2, duration: 8.5, drift: 20, opacity: 0.12 },
];

export default function AnimatedParticles({ prefersReducedMotion = false }) {
  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            y: [0, -p.drift, -p.drift * 1.5, -p.drift * 0.5],
            x: [0, p.drift * 0.5, -p.drift * 0.3, p.drift * 0.2],
            rotate: [0, 90, 180, 270],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {/* Diamond shape */}
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 10 10"
            fill="none"
            className="h-full w-full"
          >
            <path
              d="M5 0L10 5L5 10L0 5L5 0Z"
              fill="var(--va-magenta)"
              fillOpacity={0.8}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
