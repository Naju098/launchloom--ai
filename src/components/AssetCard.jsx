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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
      className={`venture-card rounded-2xl p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${accentBg} ${accent}`}>
          <Icon className="h-4 w-4" />
        </div>
        {subtitle && (
          <span className="shrink-0 rounded-md bg-[var(--va-green-dim)] px-2 py-0.5 text-[10px] font-bold text-[var(--va-green)]">
            {subtitle}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-sm font-bold text-[var(--va-text)]">{title}</h3>

      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
}
