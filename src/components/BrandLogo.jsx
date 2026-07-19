import { motion, useReducedMotion } from "motion/react";

/**
 * Unique custom SVG diamond/facet logo with premium Motion animations:
 * - Slow continuous rotation (12s per cycle)
 * - Pulsing neon glow on the background
 * - Orbiting sparkle accent
 * - Hover pauses the rotation and intensifies the glow
 */
export default function BrandLogo({ compact = false }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-3">
      {/* ── Animated Diamond Logo Mark ── */}
      <motion.div
        className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl"
        style={{
          boxShadow: "0 0 20px var(--va-magenta)/0.15, 0 4px 12px rgba(0,0,0,0.2)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                boxShadow: [
                  "0 0 20px rgba(233,64,127,0.15), 0 4px 12px rgba(0,0,0,0.2)",
                  "0 0 28px rgba(233,64,127,0.25), 0 4px 16px rgba(0,0,0,0.25)",
                  "0 0 20px rgba(233,64,127,0.15), 0 4px 12px rgba(0,0,0,0.2)",
                ],
              }
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}        whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  scale: 1.08,
                  transition: { duration: 0.3 },
                }
          }
      >
        {/* Background gradient layer (static) */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full"
        >
          <rect width="40" height="40" rx="10" fill="var(--va-magenta)" />
          <rect
            width="40"
            height="40"
            rx="10"
            fill="url(#logo-grad)"
            opacity={0.3}
          />
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>          {/* Animated diamond rotation group */}
        <motion.svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10"
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Main diamond */}
          <path
            d="M12 2L3 9L12 22L21 9L12 2Z"
            fill="white"
            fillOpacity={0.15}
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Top facet */}
          <path
            d="M12 2L3 9L12 9.5L21 9L12 2Z"
            fill="white"
            fillOpacity={0.35}
            stroke="none"
          />
          {/* Center line */}
          <line
            x1="5.5"
            y1="9.5"
            x2="18.5"
            y2="9.5"
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity={0.3}
          />
          {/* Inner glow diamond */}
          <path
            d="M12 6.5L8 9L12 16L16 9L12 6.5Z"
            fill="white"
            fillOpacity={0.2}
            stroke="none"
          />
          {/* Pulsing sparkle dot (opacity/scale only — no r animation to avoid SVG attribute issues) */}
          <motion.circle
            cx="14"
            cy="12"
            r="1.2"
            fill="white"
            fillOpacity={0.8}
            initial={{ scale: 1 }}
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 1.8, 0.6, 1.8, 1], opacity: [0.8, 1, 0.3, 1, 0.8] }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "center" }}
          />
        </motion.svg>
      </motion.div>

      {!compact && (
        <div>
          <p className="text-base font-black tracking-tight text-[var(--va-text)]">
            LaunchLoom <span className="text-[var(--va-magenta)]">AI</span>
          </p>
          <p className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--va-text-muted)]">
            Business Launch System
          </p>
        </div>
      )}
    </div>
  );
}
