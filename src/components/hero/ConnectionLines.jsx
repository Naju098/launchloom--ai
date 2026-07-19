import { motion, useReducedMotion } from "motion/react";

/**
 * Renders thin muted-teal SVG connection lines from surrounding cards
 * toward the centre of the 3D scene.
 */
// Convert line coordinates to SVG path `d` attribute strings
function lineToPath(x1, y1, x2, y2) {
  return `M${x1}% ${y1}% L${x2}% ${y2}%`;
}

const connections = [
  { x1: 24, y1: 20, x2: 46, y2: 44 },
  { x1: 76, y1: 18, x2: 56, y2: 44 },
  { x1: 86, y1: 50, x2: 58, y2: 48 },
  { x1: 72, y1: 82, x2: 54, y2: 56 },
  { x1: 28, y1: 80, x2: 46, y2: 56 },
  { x1: 12, y1: 48, x2: 42, y2: 46 },
];

export default function ConnectionLines() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#0d9488" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {connections.map((c, i) => (
        <g key={i}>
          {/* Static faint path */}
          <path
            d={lineToPath(c.x1, c.y1, c.x2, c.y2)}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="0.4"
            opacity={0.5}
          />

          {/* Animated dash */}
          {!prefersReducedMotion && (
            <motion.path
              d={lineToPath(c.x1, c.y1, c.x2, c.y2)}
              fill="none"
              stroke="#0d9488"
              strokeWidth="0.8"
              strokeDasharray="2 12"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3,
              }}
            />
          )}
        </g>
      ))}

      {/* Centre pulse */}
      {!prefersReducedMotion && (
        <motion.circle
          cx="50%"
          cy="50%"
          r="2"
          fill="#0d9488"
          opacity={0.3}
          animate={{ r: [2, 4, 2], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}
