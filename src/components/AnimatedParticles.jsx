import { motion } from "motion/react";

const particles = [
  // Diamonds
  { id: 1, x: "15%", y: "20%", size: 4, delay: 0, duration: 8, drift: 25, opacity: 0.12, shape: "diamond" },
  { id: 2, x: "75%", y: "15%", size: 3, delay: 1.5, duration: 10, drift: 20, opacity: 0.1, shape: "diamond" },
  { id: 3, x: "85%", y: "60%", size: 5, delay: 0.8, duration: 9, drift: 30, opacity: 0.08, shape: "diamond" },
  { id: 4, x: "20%", y: "75%", size: 3, delay: 2.5, duration: 11, drift: 22, opacity: 0.1, shape: "diamond" },
  { id: 5, x: "50%", y: "10%", size: 2, delay: 1, duration: 7, drift: 18, opacity: 0.15, shape: "diamond" },
  // Circles
  { id: 6, x: "60%", y: "80%", size: 4, delay: 3, duration: 12, drift: 28, opacity: 0.08, shape: "circle" },
  { id: 7, x: "90%", y: "35%", size: 3, delay: 0.5, duration: 9.5, drift: 24, opacity: 0.1, shape: "circle" },
  { id: 8, x: "10%", y: "50%", size: 2, delay: 2, duration: 8.5, drift: 20, opacity: 0.12, shape: "circle" },
  // Triangles
  { id: 9, x: "35%", y: "65%", size: 3, delay: 1.2, duration: 10.5, drift: 26, opacity: 0.09, shape: "triangle" },
  { id: 10, x: "70%", y: "45%", size: 4, delay: 0.3, duration: 7.5, drift: 22, opacity: 0.07, shape: "triangle" },
  // Plus signs
  { id: 11, x: "45%", y: "30%", size: 3, delay: 2.8, duration: 11.5, drift: 20, opacity: 0.06, shape: "plus" },
  { id: 12, x: "5%", y: "85%", size: 2, delay: 1.8, duration: 9, drift: 16, opacity: 0.1, shape: "plus" },
];

function ParticleShape({ shape, size, color }) {
  const s = size;
  switch (shape) {
    case "diamond":
      return (
        <svg width={s} height={s} viewBox="0 0 10 10" fill="none" className="h-full w-full">
          <path d="M5 0L10 5L5 10L0 5L5 0Z" fill={color} fillOpacity={0.8} />
        </svg>
      );
    case "circle":
      return (
        <svg width={s} height={s} viewBox="0 0 10 10" fill="none" className="h-full w-full">
          <circle cx="5" cy="5" r="4.5" fill={color} fillOpacity={0.6} />
        </svg>
      );
    case "triangle":
      return (
        <svg width={s} height={s} viewBox="0 0 12 10" fill="none" className="h-full w-full">
          <path d="M6 0L12 10H0L6 0Z" fill={color} fillOpacity={0.5} />
        </svg>
      );
    case "plus":
      return (
        <svg width={s * 1.2} height={s * 1.2} viewBox="0 0 10 10" fill="none" className="h-full w-full">
          <rect x="3.5" y="0" width="3" height="10" rx="1" fill={color} fillOpacity={0.5} />
          <rect x="0" y="3.5" width="10" height="3" rx="1" fill={color} fillOpacity={0.5} />
        </svg>
      );
    default:
      return null;
  }
}

export default function AnimatedParticles({ prefersReducedMotion = false }) {
  if (prefersReducedMotion) return null;

  const colors = [
    "var(--va-magenta)",
    "var(--va-teal)",
    "var(--va-amber)",
    "var(--va-violet)",
    "var(--va-green)",
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            width: p.size * 1.2,
            height: p.size * 1.2,
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
          <ParticleShape shape={p.shape} size={p.size} color={colors[i % colors.length]} />
        </motion.div>
      ))}
    </div>
  );
}
