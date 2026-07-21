import { motion } from "motion/react";

export default function SectionHeading({ eyebrow, title, description, action, variant = "fade" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
    >
      <div>
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-[var(--va-green)]"
          >
            {eyebrow}
          </motion.span>
        )}
        <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[var(--va-text)] sm:text-4xl">
          {title}
        </h2>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 max-w-2xl text-base leading-7 text-[var(--va-text-secondary)]"
          >
            {description}
          </motion.p>
        )}
      </div>
      {action && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
