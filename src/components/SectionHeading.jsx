import { motion } from "motion/react";

export default function SectionHeading({ eyebrow, title, description, action }) {
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
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--va-green)]">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[var(--va-text)] sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--va-text-secondary)]">
            {description}
          </p>
        )}
      </div>
      {action}
    </motion.div>
  );
}
