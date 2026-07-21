import { motion } from "motion/react";

export default function AssetCard({
  icon: Icon,
  title,
  subtitle,
  children,
  accent = "text-[var(--va-green)]",
  accentBg = "bg-[var(--va-green)]/10",
  className = "",
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`border-glow venture-card group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 ${className}`}
    >
      {/* Shimmer overlay on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="flex items-start justify-between gap-3">
        <motion.div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${accentBg} ${accent} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
          whileHover={{ scale: 1.15 }}
        >
          <Icon className="h-4 w-4" />
        </motion.div>
        {subtitle && (
          <motion.span
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            className="shrink-0 rounded-md bg-[var(--va-green-dim)] px-2 py-0.5 text-[10px] font-bold text-[var(--va-green)]"
          >
            {subtitle}
          </motion.span>
        )}
      </div>

      <h3 className="mt-3 text-sm font-bold text-[var(--va-text)] group-hover:text-gradient-magenta transition-all duration-300">
        {title}
      </h3>

      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
}
