import { motion } from "motion/react";

const lines = [
  { x1: "0%", y1: "20%", x2: "100%", y2: "30%", delay: 0, duration: 8 },
  { x1: "0%", y1: "50%", x2: "100%", y2: "45%", delay: 1.5, duration: 10 },
  { x1: "0%", y1: "75%", x2: "100%", y2: "70%", delay: 0.8, duration: 9 },
  { x1: "20%", y1: "0%", x2: "30%", y2: "100%", delay: 2, duration: 11 },
  { x1: "60%", y1: "0%", x2: "55%", y2: "100%", delay: 0.5, duration: 7.5 },
  { x1: "85%", y1: "0%", x2: "80%", y2: "100%", delay: 1.2, duration: 9.5 },
];

const nodes = [
  { cx: "15%", cy: "25%", size: 4, delay: 0 },
  { cx: "50%", cy: "18%", size: 3, delay: 1 },
  { cx: "80%", cy: "35%", size: 5, delay: 0.5 },
  { cx: "25%", cy: "60%", size: 3, delay: 1.5 },
  { cx: "65%", cy: "72%", size: 4, delay: 0.8 },
  { cx: "90%", cy: "55%", size: 2, delay: 2 },
  { cx: "40%", cy: "85%", size: 3, delay: 0.3 },
  { cx: "10%", cy: "80%", size: 4, delay: 1.8 },
];

export default function ConnectionLines({ prefersReducedMotion = false }) {
  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--va-magenta)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--va-magenta)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--va-teal)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#lineGrad)"
            strokeWidth="0.3"
            strokeDasharray="2 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated pulse particles along lines */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={node.size}
            fill="var(--va-magenta)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.15, 0],
              r: [node.size, node.size * 2, node.size],
            }}
            transition={{
              duration: 4,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
